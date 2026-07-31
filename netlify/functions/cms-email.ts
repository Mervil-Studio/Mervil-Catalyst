/**
 * CSST Email CMS — Netlify Serverless Function
 *
 * Receives a webhook POST from Zapier (or any email-to-webhook service),
 * calls Claude with tool use to interpret the email, then commits the
 * resulting JSON changes back to GitHub. Netlify auto-deploys on push.
 *
 * Required environment variables (set in Netlify dashboard):
 *   ANTHROPIC_API_KEY      — Anthropic Claude API key
 *   GITHUB_TOKEN           — GitHub PAT with repo write scope
 *   GITHUB_OWNER           — e.g. "Mervil-Studio"
 *   GITHUB_REPO            — e.g. "Mervil-Catalyst"
 *   CMS_ALLOWED_SENDERS    — comma-separated emails, e.g. "principal@csrockets.org,staff@csrockets.org"
 *   CMS_WEBHOOK_SECRET     — (optional) secret token Zapier sends for verification
 */

import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// ── Types ─────────────────────────────────────────────────────────────────────

interface EmailPayload {
  from: string;
  subject: string;
  body: string;
  attachments?: Array<{ filename: string; url: string }>;
}

interface GitHubFile {
  content: string; // base64
  sha: string;
  path: string;
}

interface ClaudeTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
}

// ── GitHub helpers ─────────────────────────────────────────────────────────────

async function ghGet(path: string): Promise<GitHubFile> {
  const owner = process.env.GITHUB_OWNER!;
  const repo  = process.env.GITHUB_REPO!;
  const token = process.env.GITHUB_TOKEN!;

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!res.ok) throw new Error(`GitHub GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json() as Promise<GitHubFile>;
}

async function ghPut(path: string, data: unknown, sha: string, message: string): Promise<void> {
  const owner   = process.env.GITHUB_OWNER!;
  const repo    = process.env.GITHUB_REPO!;
  const token   = process.env.GITHUB_TOKEN!;
  const content = Buffer.from(JSON.stringify(data, null, 2) + "\n").toString("base64");

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    method: "PUT",
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, content, sha }),
  });

  if (!res.ok) throw new Error(`GitHub PUT ${path} → ${res.status}: ${await res.text()}`);
}

async function readJson<T>(path: string): Promise<{ data: T; sha: string }> {
  const file = await ghGet(path);
  const data = JSON.parse(Buffer.from(file.content, "base64").toString("utf-8")) as T;
  return { data, sha: file.sha };
}

// ── Tool definitions for Claude ───────────────────────────────────────────────

const CMS_TOOLS: ClaudeTool[] = [
  {
    name: "add_announcement",
    description: "Add a new announcement banner to the site. It appears at the top of every page and auto-hides after the expiry date.",
    input_schema: {
      type: "object",
      properties: {
        text:      { type: "string",  description: "The announcement text shown to visitors." },
        link:      { type: "string",  description: "Optional URL the announcement links to (e.g. '/apply')." },
        linkLabel: { type: "string",  description: "Label for the link, e.g. 'Apply Now'." },
        expires:   { type: "string",  description: "ISO date after which the banner hides automatically, e.g. '2026-09-15'." },
      },
      required: ["text"],
    },
  },
  {
    name: "remove_announcement",
    description: "Remove an announcement by its id.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The id field of the announcement to remove." },
      },
      required: ["id"],
    },
  },
  {
    name: "add_event",
    description: "Add a new upcoming event (open house, info night, etc.) to the Upcoming Open Houses section.",
    input_schema: {
      type: "object",
      properties: {
        type:         { type: "string", description: "Event type label, e.g. 'Open House' or 'Info Night'." },
        title:        { type: "string", description: "Event title." },
        date:         { type: "string", description: "ISO date, e.g. '2026-11-13'." },
        time:         { type: "string", description: "Human-readable time, e.g. '6:00 PM'." },
        location:     { type: "string", description: "Address or venue name." },
        locationNote: { type: "string", description: "Optional extra directions, e.g. 'Enter on the west side at the CSST entrance'." },
        description:  { type: "string", description: "Short description of the event." },
        link:         { type: "string", description: "Optional CTA link, e.g. '/apply'." },
        linkLabel:    { type: "string", description: "Label for the CTA link." },
      },
      required: ["type", "title", "date", "time", "location", "description"],
    },
  },
  {
    name: "remove_event",
    description: "Remove an event by its id.",
    input_schema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The id of the event to remove." },
      },
      required: ["id"],
    },
  },
  {
    name: "update_event",
    description: "Update one or more fields of an existing event.",
    input_schema: {
      type: "object",
      properties: {
        id:     { type: "string", description: "The id of the event to update." },
        fields: { type: "object", description: "Key-value pairs of fields to update, e.g. { date: '2026-12-01', time: '7:00 PM' }." },
      },
      required: ["id", "fields"],
    },
  },
  {
    name: "add_staff_member",
    description: "Add a new staff member to leadership, faculty, or board.",
    input_schema: {
      type: "object",
      properties: {
        section:  { type: "string", enum: ["leadership", "faculty", "board"], description: "Which group to add them to." },
        name:     { type: "string", description: "Full name." },
        title:    { type: "string", description: "Job title or role." },
        bio:      { type: "string", description: "Short bio (1-3 sentences)." },
        email:    { type: "string", description: "Work email address." },
        linkedin: { type: "string", description: "LinkedIn profile URL." },
        photo:    { type: "string", description: "URL to a photo. Use a placeholder if not provided." },
      },
      required: ["section", "name", "title"],
    },
  },
  {
    name: "update_staff_member",
    description: "Update one or more fields of an existing staff member.",
    input_schema: {
      type: "object",
      properties: {
        section: { type: "string", enum: ["leadership", "faculty", "board"] },
        name:    { type: "string", description: "Full name of the person to update." },
        fields:  { type: "object", description: "Key-value pairs of fields to update." },
      },
      required: ["section", "name", "fields"],
    },
  },
  {
    name: "remove_staff_member",
    description: "Remove a staff member from the site.",
    input_schema: {
      type: "object",
      properties: {
        section: { type: "string", enum: ["leadership", "faculty", "board"] },
        name:    { type: "string", description: "Full name of the person to remove." },
      },
      required: ["section", "name"],
    },
  },
  {
    name: "reply",
    description: "Send a reply message back to the sender. Always call this at the end to confirm what was done, or to ask for clarification if the request was ambiguous.",
    input_schema: {
      type: "object",
      properties: {
        message: { type: "string", description: "The reply message to send back to the staff member." },
      },
      required: ["message"],
    },
  },
];

// ── Tool executor ──────────────────────────────────────────────────────────────

interface StaffMember {
  name: string;
  title: string;
  bio?: string;
  email?: string;
  linkedin?: string;
  photo?: string;
  [key: string]: unknown;
}

interface StaffFile {
  members: StaffMember[];
}

interface Announcement {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
  expires?: string;
}

interface CalendarEvent {
  id: string;
  type: string;
  title: string;
  date: string;
  time: string;
  location: string;
  locationNote?: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

type ToolResult = { reply?: string; error?: string };

async function executeTool(name: string, input: Record<string, unknown>): Promise<ToolResult> {
  // ── Announcements ────────────────────────────────────────────────────────
  if (name === "add_announcement") {
    const { data, sha } = await readJson<Announcement[]>("data/announcements.json");
    const newId = String(Date.now());
    const item: Announcement = {
      id: newId,
      text: input.text as string,
      ...(input.link      && { link:      input.link      as string }),
      ...(input.linkLabel && { linkLabel: input.linkLabel as string }),
      ...(input.expires   && { expires:   input.expires   as string }),
    };
    data.push(item);
    await ghPut("data/announcements.json", data, sha,
      `cms: add announcement "${(input.text as string).slice(0, 60)}"`);
    return {};
  }

  if (name === "remove_announcement") {
    const { data, sha } = await readJson<Announcement[]>("data/announcements.json");
    const filtered = data.filter((a) => a.id !== input.id);
    await ghPut("data/announcements.json", filtered, sha,
      `cms: remove announcement id=${input.id}`);
    return {};
  }

  // ── Events ───────────────────────────────────────────────────────────────
  if (name === "add_event") {
    const { data, sha } = await readJson<CalendarEvent[]>("data/events.json");
    const newId = String(Date.now());
    const item: CalendarEvent = {
      id: newId,
      type:        input.type        as string,
      title:       input.title       as string,
      date:        input.date        as string,
      time:        input.time        as string,
      location:    input.location    as string,
      description: input.description as string,
      ...(input.locationNote && { locationNote: input.locationNote as string }),
      ...(input.link         && { link:         input.link         as string }),
      ...(input.linkLabel    && { linkLabel:    input.linkLabel    as string }),
    };
    data.push(item);
    // Sort by date ascending
    data.sort((a, b) => a.date.localeCompare(b.date));
    await ghPut("data/events.json", data, sha,
      `cms: add event "${input.title}" on ${input.date}`);
    return {};
  }

  if (name === "remove_event") {
    const { data, sha } = await readJson<CalendarEvent[]>("data/events.json");
    const filtered = data.filter((e) => e.id !== input.id);
    await ghPut("data/events.json", filtered, sha,
      `cms: remove event id=${input.id}`);
    return {};
  }

  if (name === "update_event") {
    const { data, sha } = await readJson<CalendarEvent[]>("data/events.json");
    const idx = data.findIndex((e) => e.id === input.id);
    if (idx === -1) return { error: `Event id=${input.id} not found.` };
    data[idx] = { ...data[idx], ...(input.fields as Partial<CalendarEvent>) };
    await ghPut("data/events.json", data, sha,
      `cms: update event id=${input.id}`);
    return {};
  }

  // ── Staff ────────────────────────────────────────────────────────────────
  const SECTION_FILES: Record<string, string> = {
    leadership: "content/leadership.json",
    faculty:    "content/faculty.json",
    board:      "content/board.json",
  };

  if (name === "add_staff_member") {
    const section = input.section as string;
    const file    = SECTION_FILES[section];
    if (!file) return { error: `Unknown section: ${section}` };
    const { data, sha } = await readJson<StaffFile>(file);
    const member: StaffMember = {
      name:  input.name  as string,
      title: input.title as string,
      ...(input.bio      && { bio:      input.bio      as string }),
      ...(input.email    && { email:    input.email    as string }),
      ...(input.linkedin && { linkedin: input.linkedin as string }),
      photo: (input.photo as string) || "https://i.pravatar.cc/300",
    };
    data.members.push(member);
    await ghPut(file, data, sha,
      `cms: add ${section} member ${input.name}`);
    return {};
  }

  if (name === "update_staff_member") {
    const section = input.section as string;
    const file    = SECTION_FILES[section];
    if (!file) return { error: `Unknown section: ${section}` };
    const { data, sha } = await readJson<StaffFile>(file);
    const idx = data.members.findIndex(
      (m) => m.name.toLowerCase() === (input.name as string).toLowerCase()
    );
    if (idx === -1) return { error: `Staff member "${input.name}" not found in ${section}.` };
    data.members[idx] = { ...data.members[idx], ...(input.fields as Partial<StaffMember>) };
    await ghPut(file, data, sha,
      `cms: update ${section} member ${input.name}`);
    return {};
  }

  if (name === "remove_staff_member") {
    const section = input.section as string;
    const file    = SECTION_FILES[section];
    if (!file) return { error: `Unknown section: ${section}` };
    const { data, sha } = await readJson<StaffFile>(file);
    const before = data.members.length;
    data.members = data.members.filter(
      (m) => m.name.toLowerCase() !== (input.name as string).toLowerCase()
    );
    if (data.members.length === before) return { error: `Staff member "${input.name}" not found.` };
    await ghPut(file, data, sha,
      `cms: remove ${section} member ${input.name}`);
    return {};
  }

  if (name === "reply") {
    return { reply: input.message as string };
  }

  return { error: `Unknown tool: ${name}` };
}

// ── Claude caller ──────────────────────────────────────────────────────────────

async function callClaude(email: EmailPayload): Promise<string> {
  const systemPrompt = `You are the AI content manager for the Colorado Springs School of Technology (CSST) website.
Staff members email you to update the website. You have tools to manage announcements, upcoming events (open houses / info nights), and staff directory entries.

Rules:
- Only use the tools provided. Do not make up data.
- If a date is mentioned without a year and it's ambiguous, assume the current or next school year.
- If the request is ambiguous or incomplete, call the reply tool to ask for clarification instead of guessing.
- Always call the reply tool at the end to confirm what you did in plain, friendly language.
- When adding staff, if no photo URL is provided, use the placeholder — a real photo can be swapped in later.
- Announcements should be concise (1-2 sentences max).
- Be helpful and assume good intent from all authorized senders.`;

  const userMessage = `From: ${email.from}
Subject: ${email.subject}

${email.body}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key":         process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type":      "application/json",
    },
    body: JSON.stringify({
      model:      "claude-opus-4-5",
      max_tokens: 1024,
      system:     systemPrompt,
      tools:      CMS_TOOLS,
      messages:   [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let response: any = await res.json();
  let replyMessage = "Done! Your update has been applied and the site will rebuild in about 2 minutes.";
  const errors: string[] = [];

  // Agentic loop — Claude may call multiple tools in sequence
  while (response.stop_reason === "tool_use") {
    const toolResults = [];

    for (const block of response.content) {
      if (block.type !== "tool_use") continue;

      const result = await executeTool(block.name, block.input as Record<string, unknown>);

      if (result.reply)  replyMessage = result.reply;
      if (result.error)  errors.push(result.error);

      toolResults.push({
        type:        "tool_result",
        tool_use_id: block.id,
        content:     result.error
          ? `Error: ${result.error}`
          : "Success",
      });
    }

    // Continue the conversation with tool results
    const continueRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key":         process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
        "content-type":      "application/json",
      },
      body: JSON.stringify({
        model:      "claude-opus-4-5",
        max_tokens: 1024,
        system:     systemPrompt,
        tools:      CMS_TOOLS,
        messages: [
          { role: "user",      content: userMessage },
          { role: "assistant", content: response.content },
          { role: "user",      content: toolResults },
        ],
      }),
    });

    response = await continueRes.json();
  }

  if (errors.length > 0) {
    replyMessage += `\n\nNote: Some items had issues:\n${errors.map((e) => `• ${e}`).join("\n")}`;
  }

  return replyMessage;
}

// ── Main handler ───────────────────────────────────────────────────────────────

export const handler: Handler = async (event: HandlerEvent, _ctx: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Verify optional webhook secret
  const secret = process.env.CMS_WEBHOOK_SECRET;
  if (secret) {
    const provided = event.headers["x-cms-secret"] ?? event.headers["x-webhook-secret"];
    if (provided !== secret) {
      console.warn("CMS: rejected request — wrong secret");
      return { statusCode: 401, body: "Unauthorized" };
    }
  }

  let payload: EmailPayload;
  try {
    payload = JSON.parse(event.body ?? "{}") as EmailPayload;
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  // Check sender is authorized
  const allowed = (process.env.CMS_ALLOWED_SENDERS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length > 0 && !allowed.includes(payload.from?.toLowerCase())) {
    console.warn(`CMS: rejected sender ${payload.from}`);
    return { statusCode: 403, body: "Sender not authorized" };
  }

  try {
    const reply = await callClaude(payload);
    console.log(`CMS: processed email from ${payload.from} — "${payload.subject}" → ${reply}`);
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, reply }),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("CMS error:", msg);
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: msg }),
    };
  }
};
