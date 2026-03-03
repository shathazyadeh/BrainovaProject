import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./StarsBackground.css";

const STAR_COUNT = 40;
const STAR_COLOR = "255, 40, 40";

function StarsBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const stars = [];

    const { width, height } = container.getBoundingClientRect();

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");
      star.className = "star";

      star.style.left = `${Math.random() * width}px`;
      star.style.top = `${Math.random() * height}px`;

      star.style.background = `rgba(${STAR_COLOR}, 0.8)`;
      star.style.boxShadow = `
        0 0 6px rgba(${STAR_COLOR},0.8),
        0 0 20px rgba(${STAR_COLOR},0.5),
        0 0 40px rgba(${STAR_COLOR},0.3)
      `;

      container.appendChild(star);
      stars.push(star);

      gsap.to(star, {
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);

  return <div ref={containerRef} className="stars-container" />;
}

export default StarsBackground;