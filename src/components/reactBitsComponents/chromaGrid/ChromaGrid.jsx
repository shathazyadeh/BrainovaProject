import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';
import gradImg1 from "./../../../assets/images/home/gradCam/gradcam1.webp";
import gradImg2 from "./../../../assets/images/home/gradCam/gradcam2.webp";
import gradImg3 from "./../../../assets/images/home/gradCam/gradcam3.webp";
import gradImg4 from "./../../../assets/images/home/gradCam/gradcam4.webp";
import gradImg5 from "./../../../assets/images/home/gradCam/gradcam5.webp";
import gradImg6 from "./../../../assets/images/home/gradCam/gradcam6.webp";

const CARD_W = 320 + 12;
const COPIES = 5;

export const ChromaGrid = ({
  items,
  className = '',
  radius = 180,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const scrollX = useRef(0);
  const velRef = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startTx = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef(null);

  const demo = [
    { image: gradImg1, borderColor: '#4F46E5', gradient: 'linear-gradient(145deg, #4F46E5, #000)' },
    { image: gradImg2, borderColor: '#10B981', gradient: 'linear-gradient(210deg, #10B981, #000)' },
    { image: gradImg3, borderColor: '#F59E0B', gradient: 'linear-gradient(165deg, #F59E0B, #000)' },
    { image: gradImg4, borderColor: '#EF4444', gradient: 'linear-gradient(195deg, #EF4444, #000)' },
    { image: gradImg5, borderColor: '#8B5CF6', gradient: 'linear-gradient(225deg, #8B5CF6, #000)' },
    { image: gradImg6, borderColor: '#06B6D4', gradient: 'linear-gradient(135deg, #06B6D4, #000)' },
  ];

  const baseData = items?.length ? items : demo;
  const data = Array.from({ length: COPIES }, () => baseData).flat();

  const SET_LEN = baseData.length * CARD_W;

  const applyTranslate = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${-scrollX.current}px)`;
    }
  };

  const clampScroll = () => {
    if (scrollX.current < SET_LEN * 0.5) scrollX.current += SET_LEN;
    if (scrollX.current > SET_LEN * 3.5) scrollX.current -= SET_LEN;
  };

  const momentum = () => {
    if (Math.abs(velRef.current) < 0.3) { velRef.current = 0; return; }
    velRef.current *= 0.96;
    scrollX.current -= velRef.current;
    clampScroll();
    applyTranslate();
    rafId.current = requestAnimationFrame(momentum);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // chroma spotlight setup
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);

    scrollX.current = SET_LEN;
    applyTranslate();

    const onDown = e => {
      cancelAnimationFrame(rafId.current);
      isDragging.current = true;
      startX.current = e.clientX;
      startTx.current = scrollX.current;
      velRef.current = 0;
      lastX.current = e.clientX;
      el.setPointerCapture(e.pointerId);
    };

    const onMove = e => {
      if (!isDragging.current) return;
      velRef.current = lastX.current - e.clientX;
      lastX.current = e.clientX;
      scrollX.current = startTx.current + (startX.current - e.clientX);
      clampScroll();
      applyTranslate();
    };

    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      rafId.current = requestAnimationFrame(momentum);
    };

    const onWheel = e => {
      e.preventDefault();
      cancelAnimationFrame(rafId.current);
      scrollX.current += e.deltaX || e.deltaY * 0.7;
      clampScroll();
      applyTranslate();
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafId.current);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x, y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  const handleCardClick = url => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--r': `${radius}px` }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div ref={trackRef} className="chroma-track">
        {data.map((c, i) => (
          <article
            key={i}
            className="chroma-card"
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            style={{
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient,
              cursor: c.url ? 'pointer' : 'default'
            }}
          >
            <div className="chroma-img-wrapper">
              <img src={c.image} alt={c.title} loading="lazy" />
            </div>
          </article>
        ))}
      </div>
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;