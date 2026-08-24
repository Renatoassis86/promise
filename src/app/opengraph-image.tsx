import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const imgPath = join(process.cwd(), "public", "assets", "hero-quemsomos.jpg");
  const imgBase64 = readFileSync(imgPath).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#090d1c",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${imgBase64}`}
          width={1200}
          height={630}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(9,13,28,.55) 0%, rgba(9,13,28,.72) 55%, rgba(9,13,28,.9) 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 90px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#9DB0F0",
              marginBottom: 22,
              display: "flex",
            }}
          >
            Internacionalização Educacional
          </div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.2,
              display: "flex",
            }}
          >
            Promise English
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#DCE0EE",
              marginTop: 20,
              maxWidth: 880,
              display: "flex",
            }}
          >
            Um ecossistema confessional dedicado a transformar escolas, desenvolver educadores e preparar estudantes para impactar o mundo.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
