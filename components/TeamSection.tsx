"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, X } from "lucide-react";
import Image from "next/image";

const BASE = "/people";

interface Person {
  name: string;
  title: string;
  bio: string;
  photo: string;
  color: string;
  initials: string;
  email?: string | null;
  linkedin?: string | null;
  org?: string | null;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const leadership: Person[] = [
  {
    name: "Nathan Gorsch",
    title: "Executive Director / Principal",
    bio: "Nathan leads Mervil Catalyst's vision of reimagining high school as a professional environment where students grow into capable, self-directed adults. His background spans education leadership and innovation-focused learning design. Nathan built Mervil Catalyst from the ground up inside the Catalyst Campus ecosystem, creating a school culture where ambition is the norm.",
    email: "nathan.gorsch@d11.org",
    photo: `${BASE}/nathan.jpg`,
    color: "#00D4FF",
    initials: "NG",
    linkedin: null,
  },
  {
    name: "Bridget O'Connor",
    title: "Dean of Students",
    bio: "Bridget ensures every student at Mervil Catalyst is seen, supported, and set up for success. She builds the community culture that makes Mervil Catalyst feel less like a school and more like a professional home base. Bridget is the connective tissue between students, families, and staff.",
    email: null,
    photo: `${BASE}/bridget.jpg`,
    color: "#A78BFA",
    initials: "BO",
    linkedin: null,
  },
  {
    name: "Milithza McNeil",
    title: "School Counselor",
    bio: "Milithza guides students through academic planning, career exploration, and personal development — helping them connect their interests to real pathways into tech, business, or beyond. She is a champion for every student's unique journey.",
    email: null,
    photo: `${BASE}/milithza.jpg`,
    color: "#34D399",
    initials: "MM",
    linkedin: null,
  },
  {
    name: "Hannah Wirtjes",
    title: "Academic Support Specialist",
    bio: "Hannah provides individualized academic support that meets students where they are and helps them reach where they want to go. Her work ensures no student falls through the cracks, whether they're pushing ahead or finding their footing.",
    email: null,
    photo: `${BASE}/hannah.jpg`,
    color: "#F59E0B",
    initials: "HW",
    linkedin: null,
  },
  {
    name: "Stacey Chavarria",
    title: "Admin Assistant & Registrar",
    bio: "Stacey keeps Mervil Catalyst running smoothly — managing enrollment records, supporting families through the admissions process, and ensuring every student's academic record is accurate and up to date. She's often the first friendly face new families meet.",
    photo: `${BASE}/stacey.jpg`,
    color: "#C0C0D0",
    initials: "SC",
    linkedin: null,
  },
  {
    name: "Andrea Mullins",
    title: "Admin Assistant & Bookkeeper",
    bio: "Andrea manages the financial operations and day-to-day administrative needs of the school. Her work keeps the school's resources aligned with its mission and ensures operational continuity so the rest of the team can focus on students.",
    photo: `${BASE}/andrea.jpg`,
    color: "#C0C0D0",
    initials: "AM",
    linkedin: null,
  },
];

const faculty: Person[] = [
  {
    name: "Liyah Patrick",
    title: "English & Humanities",
    bio: "Liyah brings real-world communication and storytelling into the classroom. At Mervil Catalyst, English isn't just grammar — it's how you pitch an idea, write a proposal, or make your mark. She helps students find their voice and use it.",
    photo: `${BASE}/liyah.jpg`,
    color: "#00D4FF",
    initials: "LP",
    linkedin: "https://www.linkedin.com/in/liyah-patrick3000",
  },
  {
    name: "Darren Kelley",
    title: "Mathematics",
    bio: "Darren connects math to real-world problems in technology and business, making abstract concepts concrete through project-based learning. His students leave understanding not just how to solve equations, but why math is the language of every industry.",
    photo: `${BASE}/darren.jpg`,
    color: "#A78BFA",
    initials: "DK",
    linkedin: null,
  },
  {
    name: "Caleb Ulliman",
    title: "Science",
    bio: "Caleb teaches science through inquiry and experimentation, connecting curriculum to the aerospace and technology sectors right outside Mervil Catalyst's doors. His lab approach builds the critical-thinking skills that define every great engineer.",
    photo: `${BASE}/caleb.jpg`,
    color: "#34D399",
    initials: "CU",
    linkedin: "https://www.linkedin.com/in/caleb-james-ulliman-987b652ab",
  },
  {
    name: "Matt Stewart",
    title: "Social Studies",
    bio: "Matt frames history and civics through the lens of entrepreneurship and societal change — teaching students that understanding the past is how you design the future. His discussions challenge students to think critically about systems and power.",
    photo: `${BASE}/matt.jpg`,
    color: "#F59E0B",
    initials: "MS",
    linkedin: null,
  },
  {
    name: "Aly Johnson",
    title: "Business & Marketing",
    bio: "Aly teaches business strategy, marketing, and entrepreneurship with real startup energy. Students in her class don't just study companies — they build pitch decks, run campaigns, and learn what it actually takes to take an idea to market.",
    photo: `${BASE}/aly.jpg`,
    color: "#FB923C",
    initials: "AJ",
    linkedin: "https://www.linkedin.com/in/alyssasjohnson",
  },
  {
    name: "Jerard Carney",
    title: "Computer Science",
    bio: "Jerard is a software and embedded systems engineer who teaches CS from the perspective of a working professional. Students learn real programming languages, work on live projects, and get exposure to the full spectrum of modern software development.",
    photo: `${BASE}/jerard.jpg`,
    color: "#00D4FF",
    initials: "JC",
    linkedin: "https://www.linkedin.com/in/jerardcarney",
  },
];

const board: Person[] = [
  {
    name: "Vance Brown",
    title: "Founder & Board President",
    org: "Founder of Mervil Catalyst",
    bio: "Vance is one of Colorado Springs' most influential figures at the intersection of technology, entrepreneurship, and education. He previously served as CEO of the National Cybersecurity Center and Director of Exponential Impact (XI) before founding Mervil Catalyst — building a school designed to feed directly into the ecosystems he helped create.",
    photo: `${BASE}/vance.jpg`,
    color: "#00D4FF",
    initials: "VB",
    linkedin: "https://www.linkedin.com/in/vance-brown/",
  },
  {
    name: "Michael Gaal",
    title: "Board Member",
    org: "Superintendent, D11",
    bio: "As Superintendent of Colorado Springs School District 11, Michael directly oversees Mervil Catalyst as a D11 Innovation Zone school. His support gives Mervil Catalyst the full infrastructure of a public school while preserving the flexibility to operate as a next-generation learning environment.",
    photo: `${BASE}/michael.jpg`,
    color: "#C0C0D0",
    initials: "MG",
    linkedin: null,
  },
  {
    name: "Greg Oslan",
    title: "Board Member",
    org: "CEO, National Cybersecurity Center",
    bio: "Greg leads the NCC, the anchor co-location partner for Mervil Catalyst. Under his leadership the NCC secured a $1M NSF Innovation Engines grant and has expanded its national footprint. His board role creates a direct, structural bridge between Mervil Catalyst students and active cybersecurity professionals.",
    photo: `${BASE}/greg.jpg`,
    color: "#00D4FF",
    initials: "GO",
    linkedin: "https://www.linkedin.com/in/greg-oslan-245123/",
  },
  {
    name: "Erin Miller",
    title: "Board Member",
    org: "Executive Director, Space ISAC",
    bio: "Erin leads Space ISAC, the global information sharing and analysis center for space-based threat intelligence. Her presence on the Mervil Catalyst board connects students directly to the aerospace defense sector and opens a pipeline into space security careers.",
    photo: `${BASE}/erin.jpg`,
    color: "#34D399",
    initials: "EM",
    linkedin: "https://www.linkedin.com/in/erinmarlenemiller/",
  },
  {
    name: "Lance Bolton",
    title: "Board Member",
    org: "President, Pikes Peak State College",
    bio: "As President of Pikes Peak State College, Lance's partnership enables Mervil Catalyst students to access dual enrollment across PPSC's catalog of over 200 credit programs — at no cost to students. His involvement makes college credit a default part of the Mervil Catalyst experience, not an exception.",
    photo: `${BASE}/lance.jpg`,
    color: "#A78BFA",
    initials: "LB",
    linkedin: "https://www.linkedin.com/in/lance-bolton-b4619842/",
  },
  {
    name: "Johnna Reeder Kleymeyer",
    title: "Board Member",
    org: "CEO, Colorado Springs Chamber & EDC",
    bio: "Johnna leads the Colorado Springs Chamber & EDC, the region's primary economic development organization. Her board role ensures CSST is directly connected to the hiring priorities of the Colorado Springs business community and the talent pipeline that shapes the regional economy.",
    photo: `${BASE}/johnna.jpg`,
    color: "#F59E0B",
    initials: "JK",
    linkedin: "https://www.linkedin.com/in/johnna-reeder-kleymeyer-7056984/",
  },
  {
    name: "Dawn Conley",
    title: "Board Member",
    org: "Sr. Executive Director, Catalyst Campus",
    bio: "Dawn oversees Catalyst Campus — the innovation hub where Mervil Catalyst is physically located. Her deep knowledge of the campus ecosystem, its tenants, and its mission makes her essential to Mervil Catalyst's co-location strategy and the daily lived experience of being surrounded by active startups and tech companies.",
    photo: `${BASE}/dawn.jpg`,
    color: "#FB923C",
    initials: "DC",
    linkedin: "https://www.linkedin.com/in/dawnconley/",
  },
  {
    name: "Col. Judson Dressler (Ret.)",
    title: "Board Member",
    org: "Dept. Head, Comp. & Cyber Sciences, USAFA",
    bio: "Judson heads the Department of Computer and Cyber Sciences at the US Air Force Academy, bringing federal military perspective to Mervil Catalyst's cybersecurity and aerospace programs. His board role bridges the school to USAFA partnerships and provides insight into the defense-sector talent pipeline.",
    photo: `${BASE}/judson.jpg`,
    color: "#C0C0D0",
    initials: "JD",
    linkedin: "https://www.linkedin.com/in/judson-dressler-phd-27245993/",
  },
  {
    name: "Jennifer Sobanet",
    title: "Board Member",
    org: "Education & Innovation Leader",
    bio: "Jennifer brings a depth of experience in education leadership, higher education, and workforce innovation. Her perspective ensures CSST's programs remain aligned with where education is headed — not just where it has been.",
    photo: `${BASE}/jennifer.jpg`,
    color: "#C0C0D0",
    initials: "JS",
    linkedin: null,
  },
];

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function PersonModal({ person, onClose }: { person: Person; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 w-full max-w-md rounded-2xl border bg-[#0D0D18] overflow-hidden"
          style={{ borderColor: `${person.color}25` }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${person.color}, transparent)` }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg border flex items-center justify-center text-[#C0C0D0]/50 hover:text-white hover:border-[#C0C0D0]/30 transition-all"
            style={{ borderColor: `${person.color}20` }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-end gap-5 px-7 pt-7 pb-5 border-b" style={{ borderColor: `${person.color}12` }}>
            <div
              className="relative rounded-xl overflow-hidden flex-shrink-0 border-2"
              style={{ width: 96, height: 96, borderColor: `${person.color}30` }}
            >
              <Image src={person.photo} alt={person.name} width={96} height={96}
                className="w-full h-full object-cover object-top" unoptimized />
            </div>
            <div className="pb-1">
              <h3 className="font-display text-lg font-bold text-white leading-tight">{person.name}</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: person.color }}>{person.title}</p>
              {person.org && (
                <p className="text-[11px] text-[#C0C0D0]/45 mt-0.5">{person.org}</p>
              )}
              {person.email && (
                <a href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1 text-[10px] text-[#C0C0D0]/45 hover:text-[#C0C0D0] mt-1 transition-colors">
                  <Mail className="w-3 h-3" /> {person.email}
                </a>
              )}
            </div>
          </div>

          <div className="px-7 py-5">
            <p className="text-sm text-[#C0C0D0]/70 leading-relaxed">{person.bio}</p>
          </div>

          {person.linkedin && (
            <div className="px-7 pb-6">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:opacity-90"
                style={{ background: `${person.color}18`, borderColor: `${person.color}30`, color: person.color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View LinkedIn Profile
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SQUARE PHOTO CARD (Leadership / Faculty) ─────────────────────────────────
function SquarePhotoCard({ person, onClick }: { person: Person; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative rounded-xl overflow-hidden border bg-[#0A0A0F] text-left w-full cursor-pointer focus:outline-none transition-all duration-300"
      style={{ borderColor: `${person.color}15` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${person.color}35`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${person.color}15`)}
    >
      {/* 1:1 square photo */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <Image
          src={person.photo} alt={person.name} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent opacity-60" />
        {/* hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: `${person.color}12` }}>
          <div className="w-9 h-9 rounded-full border flex items-center justify-center bg-[#0A0A0F]/80"
            style={{ borderColor: `${person.color}60` }}>
            <ExternalLink className="w-4 h-4" style={{ color: person.color }} />
          </div>
        </div>
        {person.linkedin && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "#0A0A0F", border: `1px solid ${person.color}40` }}>
            <ExternalLink className="w-3 h-3" style={{ color: person.color }} />
          </div>
        )}
      </div>
      <div className="px-3 py-3">
        <p className="text-xs font-semibold text-white leading-tight">{person.name}</p>
        <p className="text-[10px] mt-0.5" style={{ color: `${person.color}80` }}>{person.title}</p>
      </div>
    </motion.button>
  );
}

// ─── PORTRAIT CARD (Board — 3:4 ratio, slightly smaller) ─────────────────────
function PortraitCard({ person, onClick }: { person: Person; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative rounded-xl overflow-hidden border bg-[#0A0A0F] text-left w-full cursor-pointer focus:outline-none transition-all duration-300"
      style={{ borderColor: `${person.color}15` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${person.color}30`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${person.color}15`)}
    >
      {/* 3:4 portrait ratio */}
      <div className="relative w-full" style={{ paddingBottom: "133%" }}>
        <Image
          src={person.photo} alt={person.name} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: `${person.color}10` }}>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center bg-[#0A0A0F]/80"
            style={{ borderColor: `${person.color}50` }}>
            <ExternalLink className="w-3.5 h-3.5" style={{ color: person.color }} />
          </div>
        </div>
        {person.linkedin && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "#0A0A0F", border: `1px solid ${person.color}40` }}>
            <ExternalLink className="w-2.5 h-2.5" style={{ color: person.color }} />
          </div>
        )}
      </div>
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[11px] font-semibold text-white leading-tight">{person.name}</p>
        {person.org && (
          <p className="text-[10px] text-[#C0C0D0]/40 mt-0.5 leading-snug">{person.org}</p>
        )}
      </div>
    </motion.button>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [modalPerson, setModalPerson] = useState<Person | null>(null);

  return (
    <section id="team" ref={ref} className="relative py-28 bg-[#080810] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      {modalPerson && <PersonModal person={modalPerson} onClose={() => setModalPerson(null)} />}

      <div className="max-w-7xl mx-auto px-6">

        {/* ── LEADERSHIP + ADMIN ─────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#00D4FF] text-xs font-medium tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#00D4FF]" />The People Behind It
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
            Leadership &amp; Team
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-[#C0C0D0]/60 max-w-2xl mb-2">
            At Mervil Catalyst, teachers are mentors and coaches — not lecturers. Our staff guide curiosity, not dictate a path.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            className="text-xs text-[#C0C0D0]/35 mb-10">Tap any card to learn more.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {leadership.map((person, i) => (
              <motion.div key={person.name}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}>
                <SquarePhotoCard person={person} onClick={() => setModalPerson(person)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FACULTY ───────────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#00D4FF] text-xs font-medium tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#00D4FF]" />In The Classroom
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
            Faculty
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-[#C0C0D0]/60 max-w-2xl mb-2">
            Industry professionals and educators who bring real-world context into every subject.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="text-xs text-[#C0C0D0]/35 mb-10">Tap any card to learn more. LinkedIn badge = verified profile.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {faculty.map((f, i) => (
              <motion.div key={f.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}>
                <SquarePhotoCard person={f} onClick={() => setModalPerson(f)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOARD ─────────────────────────────────────────────────────── */}
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-[#00D4FF] text-xs font-medium tracking-[0.25em] uppercase">
            <span className="w-8 h-px bg-[#00D4FF]" />Governance
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
            Board of Directors
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base text-[#C0C0D0]/60 max-w-2xl mb-2">
            Governed by the CEOs and leaders of its own ecosystem — the same organizations students work alongside every day.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="text-xs text-[#C0C0D0]/35 mb-10">Tap any card for background and LinkedIn.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {board.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.07 }}>
                <PortraitCard person={member} onClick={() => setModalPerson(member)} />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="mt-8 p-4 rounded-xl border border-[#00D4FF]/8 bg-[#0D0D18] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-[#C0C0D0]/40">
              Board meetings are virtual &amp; open to the public. Next meeting:{" "}
              <span className="text-[#00D4FF]/70">May 6, 2026 at 1:00 PM</span>
            </p>
            <a href="mailto:nathan.gorsch@d11.org?subject=Mervil Catalyst Board Meeting"
              className="text-xs text-[#00D4FF] font-medium hover:underline flex-shrink-0">
              Request the link →
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
