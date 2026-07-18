import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAFAFA",
          fontWeight: "bold",
          letterSpacing: "-0.05em",
        }}
      >
        NIL
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
