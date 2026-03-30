import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
export default function AnimatedLine() {
  const pathRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "bounce",
     scrollTrigger: {
  trigger: document.body, // أو pathRef.current إذا تريد ربطه بالمسار
  start: "top top",       // هنا تصحيح كتابة start
  end: "bottom bottom",
  scrub: -90,              // أو قيمة أصغر للتجاوب أسرع
},
    });
  }, []);
  return (
    <svg
      width="100%"
      height="2000px"
      viewBox="0 0 1200 800"
      style={{
        position: "absolute", top: "-400px",//ببلش من الصفحة فووق من الراس
        right: 200,
        zIndex: 20,
        pointerEvents: "none",
         overflow: "visible" 
      }} >
      <defs>
        <linearGradient
          id="blueGradient"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ff0000" />
          <stop offset="50%" stopColor="#ff6600" />
          <stop offset="100%" stopColor="#ffff00" />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d="M -99 -171 C 500 100 483 104 500 200 C 500 420 285 394 253 280 C 220 115 350 120 505 203 C 620 260 756 266 791 411 C 817 540 937 345 844 588 C 1098 586 893 511 894 591 C 830 944 1380 620 1406 973"
        fill="none"
        stroke="url(#blueGradient)"
        strokeWidth="30"

        strokeLinecap="round"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(246, 81, 59, 0.6))", }} />
    </svg>
  );
}