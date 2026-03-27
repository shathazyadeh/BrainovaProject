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
    trigger: document.body, // بدل path
    start: "top top ",
    end: "bottom bottom",
    scrub: 1, // ناعم أكثر
  },
});
  }, []);

  return (
 <svg
  width="100%"
  height="2000px"
  viewBox="0 0 1200 2000"
  style={{
    position: "fixed",
    top: "80px", // 👈 تحت النافبار (عدّل حسب ارتفاعه)
    left: 50,
    zIndex: 0, // 👈 مهم
    pointerEvents: "none",
  }}
>
     <defs>
  <linearGradient id="blueGradient" gradientUnits="userSpaceOnUse">
    <stop offset="0%" stopColor="#ff0000" />   {/* أحمر فاتح */}
    <stop offset="50%" stopColor="#ff6600" />  {/* برتقالي */}
    <stop offset="100%" stopColor="#ffff00" /> {/* أصفر فاتح */}
  </linearGradient>
</defs>
      <path
        ref={pathRef}
  d="
M 50 0
C 300 150, 600 50, 900 300
S 1100 700, 700 900
S 300 1200, 800 1400
S 1000 1700, 500 2000
"
        fill="none"
        stroke="url(#blueGradient)"
        strokeWidth="40"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(59,130,246,0.6))", }}
      />
    </svg>
  );
}