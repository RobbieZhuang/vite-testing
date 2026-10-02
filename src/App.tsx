import { useState, type CSSProperties, type PointerEvent } from "react"

export default function App() {
  const [hovering, setHovering] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setCursor({ x: event.clientX - rect.left, y: event.clientY - rect.top })
  }

  // The hover layer is the same dot grid scaled up, revealed only within a soft
  // circle that follows the cursor — so dots appear to bloom under the pointer.
  const mask = `radial-gradient(circle at ${cursor.x}px ${cursor.y}px, #000 72px, transparent 120px)`

  const container: CSSProperties = {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#f8fbff",
  }
  const dots: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 1.2px, transparent 1.4px)",
    backgroundPosition: "center",
    backgroundSize: "18px 18px",
  }
  const dotsHover: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(circle at center, rgba(157, 200, 255, 0.52) 2.16px, transparent 2.36px)",
    backgroundPosition: "center",
    backgroundSize: "18px 18px",
    opacity: hovering ? 1 : 0,
    maskImage: mask,
    WebkitMaskImage: mask,
  }

  return (
    <div
      style={container}
      onPointerEnter={() => setHovering(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setHovering(false)}
    >
      <div style={dots} />
      <div style={dotsHover} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: "repeat(1, auto)",
          gap: "48px",
        }}
      >
        {Array.from({ length: 1 }, (_, i) => i).map((i) => (
          <div
            key={i}
            style={{
              fontSize: "120px",
              lineHeight: 1,
              userSelect: "none",
              filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
              transform: i % 2 === 1 ? "scaleX(-1)" : undefined,
            }}
            role="img"
            aria-label="orange"
          >
            🍊
          </div>
        ))}
      </div>
    </div>
  )
}
