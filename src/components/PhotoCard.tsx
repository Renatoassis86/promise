import Image from "next/image";

interface PhotoCardProps {
  src: string;
  alt: string;
  height: number;
  accent?: string;
  imagePosition?: string;
}

export default function PhotoCard({ src, alt, height, accent = "var(--red)", imagePosition = "50% 12%" }: PhotoCardProps) {
  return (
    <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          top: -12,
          left: -12,
          width: "100%",
          height: "100%",
          border: `2px solid ${accent}`,
          borderRadius: 20,
          opacity: 0.5,
        }}
      />
      <Image
        src={src}
        alt={alt}
        width={Math.round(height * 0.78)}
        height={height}
        style={{ position: "relative", zIndex: 1, height, width: "auto", objectFit: "cover", objectPosition: imagePosition, borderRadius: 16 }}
      />
    </div>
  );
}
