import Image from "next/image";

interface ImageBreakProps {
  src: string;
  alt: string;
  height?: number;
  caption?: string;
  /** 0–1 overlay darkness, defaults to 0.25 */
  overlay?: number;
  /** which end the gradient bleeds from — blends into adjacent sections */
  bleed?: "top" | "bottom" | "both" | "none";
}

export default function ImageBreak({
  src,
  alt,
  height = 380,
  caption,
  overlay = 0.25,
  bleed = "both",
}: ImageBreakProps) {
  const topFade   = bleed === "top"  || bleed === "both";
  const bottomFade = bleed === "bottom" || bleed === "both";

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes="100vw"
        unoptimized
      />

      {/* Uniform dark overlay for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(0,0,0,${overlay})` }}
      />

      {/* Top bleed into background colour */}
      {topFade && (
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, var(--bg-primary), transparent)" }}
        />
      )}

      {/* Bottom bleed into background colour */}
      {bottomFade && (
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--bg-primary), transparent)" }}
        />
      )}

      {/* Placeholder caption */}
      {caption && (
        <p className="absolute bottom-3 right-4 text-[10px] text-white/35 font-medium tracking-wide pointer-events-none">
          {caption}
        </p>
      )}
    </div>
  );
}
