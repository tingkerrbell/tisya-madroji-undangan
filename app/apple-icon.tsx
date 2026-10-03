import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8F4EE",
          color: "#B97876",
          fontSize: 78,
          fontWeight: 700,
        }}
      >
        T&amp;M
      </div>
    ),
    { ...size },
  );
}