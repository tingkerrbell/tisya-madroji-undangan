import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F2D9D6",
          color: "#B97876",
          fontSize: 28,
          fontWeight: 700,
          borderRadius: "50%",
        }}
      >
        T&amp;M
      </div>
    ),
    { ...size },
  );
}