import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type SpotlightEffect = {
  width: number;
  height: number;
  fade: number;
  speed: number;
  initialPosition: { x: number; y: number };
  initialVelocity: { vx: number; vy: number };
  revealPercentage?: number; // New property for controlling reveal percentage (0-100)
};

type SpotlightProps = {
  effects?: SpotlightEffect[];
};

const Spotlight: React.FC<SpotlightProps> = ({
  effects = [
    {
      width: 200,
      height: 200,
      fade: 80,
      speed: 1,
      initialPosition: { x: 100, y: 100 },
      initialVelocity: { vx: 2, vy: 1.5 },
      revealPercentage: 100, // Default to 100% reveal
    },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const states = useRef(
    effects.map((effect, index) => ({
      position: { ...effect.initialPosition },
      velocity: { ...effect.initialVelocity },
      width: effect.width,
      height: effect.height,
      fade: effect.fade,
      speed: effect.speed,
      circleId: `circle-${index}`,
      filterId: `blur-${index}`,
      revealPercentage: effect.revealPercentage ?? 100, // Default to 100 if not provided
    }))
  );

  useGSAP(
    () => {
      // Animation loop using GSAP ticker
      const tickerCallback = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        states.current.forEach((state) => {
          const radiusX = state.width / 2;  // Horizontal radius
          const radiusY = state.height / 2; // Vertical radius

          // Update position
          state.position.x += state.velocity.vx * state.speed;
          state.position.y += state.velocity.vy * state.speed;

          // Bounce off edges with clamping based on individual dimensions
          if (state.position.x - radiusX <= 0) {
            state.velocity.vx = Math.abs(state.velocity.vx); // Reverse direction
            state.position.x = radiusX; // Clamp to left edge
          } else if (state.position.x + radiusX >= screenWidth) {
            state.velocity.vx = -Math.abs(state.velocity.vx); // Reverse direction
            state.position.x = screenWidth - radiusX; // Clamp to right edge
          }
          if (state.position.y - radiusY <= 0) {
            state.velocity.vy = Math.abs(state.velocity.vy); // Reverse direction
            state.position.y = radiusY; // Clamp to top edge
          } else if (state.position.y + radiusY >= screenHeight) {
            state.velocity.vy = -Math.abs(state.velocity.vy); // Reverse direction
            state.position.y = screenHeight - radiusY; // Clamp to bottom edge
          }

          // Animate SVG ellipse position
          gsap.set(`#${state.circleId}`, {
            cx: state.position.x,
            cy: state.position.y,
          });
        });
      };
      gsap.ticker.add(tickerCallback);

      // Handle window resize to update boundaries
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        states.current.forEach((state) => {
          const radiusX = state.width / 2;
          const radiusY = state.height / 2;
          state.position.x = Math.max(radiusX, Math.min(screenWidth - radiusX, state.position.x));
          state.position.y = Math.max(radiusY, Math.min(screenHeight - radiusY, state.position.y));
        });
      };
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => {
        gsap.ticker.remove(tickerCallback);
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 pointer-events-none"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        WebkitMaskImage: `url(#spotlight-mask)`,
        maskImage: `url(#spotlight-mask)`,
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0, opacity: 0 }} // Hidden SVG, used only for mask
      >
        <defs>
          {states.current.map((state, index) => (
            <filter key={index} id={state.filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation={state.fade / 4} />
            </filter>
          ))}
          <mask id="spotlight-mask">
            {/* White background for the mask (opaque, hides content by default) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black ellipses for spotlights (transparent, reveals content) with adjustable opacity */}
            {states.current.map((state, index) => (
              <ellipse
                key={index}
                id={state.circleId}
                cx={state.position.x}
                cy={state.position.y}
                rx={state.width / 2}  // Horizontal radius
                ry={state.height / 2} // Vertical radius
                fill="black"
                fillOpacity={1 - state.revealPercentage / 100} // Adjust opacity based on reveal percentage
                filter={`url(#${state.filterId})`}
              />
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default Spotlight;