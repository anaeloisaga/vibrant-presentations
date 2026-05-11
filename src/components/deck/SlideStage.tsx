import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders children inside a fixed 1920x1080 stage that scales to fit
 * its container while preserving aspect ratio.
 */
export function SlideStage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--deck-bg)",
      }}
    >
      <div
        className="absolute"
        style={{
          width: 1920,
          height: 1080,
          left: "50%",
          top: "50%",
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
