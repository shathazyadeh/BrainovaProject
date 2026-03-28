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
      ease: "none",
     scrollTrigger: {
  trigger: document.body, // أو pathRef.current إذا تريد ربطه بالمسار
  start: "top top",       // هنا تصحيح كتابة start
end: "+=1000",
  scrub: 6,              // أو قيمة أصغر للتجاوب أسرع
},
    });
  }, []);
  return (
    <svg
      width="100%"
      height="2000px"
      viewBox="0 0 1200 2000"
      style={{
        position: "absolute", top: "0px",
        left: -300,
        zIndex: 20,
        pointerEvents: "none",
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
        d=" M 150 0 
                           C 400 150, 700 50, 950 250 
                           C 1200 450, 1100 750, 850 900 
                           C 600 1050, 350 1150, 650 1350
                            C 950 1550, 1000 1750, 600 2000 "
        fill="none"
        stroke="url(#blueGradient)"
        strokeWidth="40"

        strokeLinecap="round"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(59,130,246,0.6))", }} />
    </svg>
  );
}