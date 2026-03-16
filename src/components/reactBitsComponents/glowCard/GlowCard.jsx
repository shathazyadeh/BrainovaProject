import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./GlowCard.css";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "255, 40, 40";

const createParticle = (x, y, color) => {
  const el = document.createElement("div");
  el.className = "glow-particle";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  el.style.background = `rgba(${color},0.28)`;

  el.style.boxShadow = `
    0 0 8px rgba(${color},0.25),
    0 0 25px rgba(${color},0.15),
    0 0 50px rgba(${color},0.08)
  `;

  return el;
};

function GlowCard({
  children,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableParticles = true,
  glowIntensity = "strong" // strong | soft | none
}) {
  const cardRef = useRef(null);

  const glowStyles = {
    strong: `
      0 4px 25px rgba(120, 0, 0, 0.4),
      0 0 40px rgba(255, 0, 0, 0.35),
      0 0 80px rgba(255, 0, 0, 0.15)
    `,
    soft: `
      0 2px 10px rgba(120, 0, 0, 0.2),
      0 0 15px rgba(255, 0, 0, 0.12)
    `,
    none: "none"
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let particles = [];

    const handleMouseEnter = () => {
      if (!enableParticles) return;

      const { width, height } = card.getBoundingClientRect();

      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle(
          Math.random() * width,
          Math.random() * height,
          glowColor
        );

        card.appendChild(particle);
        particles.push(particle);

        gsap.fromTo(
          particle,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4 }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      }
    };

    const handleMouseLeave = () => {
      particles.forEach((p) => {
        gsap.to(p, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          onComplete: () => p.remove()
        });
      });

      particles = [];

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.3
      });
    };

    const handleMouseMove = (e) => {
      if (!enableTilt) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.1
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [particleCount, glowColor, enableTilt, enableParticles]);

  return (
    <div
      ref={cardRef}
      className="glow-card"
      style={{ "--glow-shadow": glowStyles[glowIntensity] }}
    >
      {children}
    </div>
  );
}

export default GlowCard;