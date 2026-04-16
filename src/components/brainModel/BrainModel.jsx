import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

const HOTSPOTS = [
  { id: 1, label: "Frontal Lobe",     info: "المسؤول عن التخطيط واتخاذ القرارات والشخصية والحركة الإرادية.", position: new THREE.Vector3(   0.54,  2.45,  3.91 ) },
  { id: 2, label: "Temporal Lobe",    info: "يعالج الصوت واللغة والذاكرة والتعرف على الوجوه.", position: new THREE.Vector3(  -3.33,  -0.18,  -0.15)  },
  { id: 3, label: "Occipital Lobe",   info: "المركز الرئيسي لمعالجة المعلومات البصرية.", position: new THREE.Vector3( -0.50,  0.36,-4.52) },
  { id: 4, label: "Parietal Lobe",    info: "يدمج المعلومات الحسية ويتحكم في الإدراك المكاني.", position: new THREE.Vector3( 0.27,  3.74,  -1.35) },
  { id: 5, label: "Pre-Frontal Lobe", info: "يتحكم في السلوك المعقد والتفكير النقدي وضبط النفس.", position: new THREE.Vector3(  0.40, 0.15, 4.37) },
];

export default function BrainModel() {
  const mountRef    = useRef(null);
  const rendererRef = useRef(null);
  const hotspotsRef = useRef(HOTSPOTS);
  const controlsRef = useRef(null);
  const cameraRef   = useRef(null);
  const brainRef    = useRef(null);
const [labelsVisible, setLabelsVisible] = useState(true);
  const [activeLabel, setActiveLabel] = useState(null);
  const [dots,        setDots]        = useState([]);

  const setActiveLabelRef = useRef(setActiveLabel);
  setActiveLabelRef.current = setActiveLabel;

  const moveCameraTo = (position) => {
    const camera   = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const direction = position.clone().normalize();
    const distance  = camera.position.length();
    const targetPos = direction.multiplyScalar(distance);

    const startPos    = camera.position.clone();
    const startTarget = controls.target.clone();
    const endTarget   = new THREE.Vector3(0, 0, 0);
    const duration    = 600;
    const startTime   = performance.now();

    const animateCamera = (now) => {
      const t      = Math.min((now - startTime) / duration, 1);
      const eased  = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      camera.position.lerpVectors(startPos, targetPos, eased);
      controls.target.lerpVectors(startTarget, endTarget, eased);
      controls.update();

      if (t < 1) requestAnimationFrame(animateCamera);
    };

    requestAnimationFrame(animateCamera);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container || rendererRef.current) return;

    const width  = container.clientWidth;
const height = window.innerHeight * 0.65; // 65% للدماغ
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(2, 0.5, 0.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping         = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.45;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

// ✅ حل مشكلة انزياح المودل عند تصغير الشاشة
const handleResize = () => {
  if (!container) return;

  const newWidth = container.clientWidth;
  const newHeight = window.innerHeight * 0.65;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
};

window.addEventListener("resize", handleResize);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 2;
    controlsRef.current = controls;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();

      const loader = new GLTFLoader();
loader.load("/brain/scene.gltf", (gltf) => {
  const brainModel = gltf.scene;

  // ✅ تكبير الدماغ
  brainModel.scale.set(7, 7, 7);

 
  brainRef.current = brainModel;
 scene.add(brainModel);
  // ✅ حساب الحجم والمركز
  const box = new THREE.Box3().setFromObject(brainModel);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  // ✅ توسيط
  brainModel.position.sub(center);

  // ✅ ضبط الكاميرا
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

camera.position.set(cameraZ * 1.3, 0, 0); // 👈 عرض جانبي
  controls.target.set(0, 0, 0);
  controls.update();
  
});
    const onClickTemp = (event) => {
       setLabelsVisible(false);  // ✅ أضف هاد السطر
      if (!brainRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((event.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((event.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(brainRef.current, true);
      if (intersects.length > 0) {
        const p = intersects[0].point;
        console.log(
          `%c{ x: ${p.x.toFixed(2)}, y: ${p.y.toFixed(2)}, z: ${p.z.toFixed(2)} }`,
          "color: #00bcd4; font-size: 14px; font-weight: bold;"
        );
      }
    };
    renderer.domElement.addEventListener("click", onClickTemp);

    const onPointerMove = (e) => {
      if (e.buttons > 0) {
        setLabelsVisible(false);  // ✅ أضف هاد السطر
        setActiveLabelRef.current(null);
      }
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    const toScreenPos = (pos3D, cam, rect) => {
      const vec = pos3D.clone().project(cam);
      return {
        x: ( vec.x * 0.5 + 0.5) * rect.width,
        y: (-vec.y * 0.5 + 0.5) * rect.height,
      };
    };

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);

      const rect    = renderer.domElement.getBoundingClientRect();
      const updated = hotspotsRef.current.map((h) => {
        const screenPos = toScreenPos(h.position, camera, rect);

        const dir = h.position.clone().sub(camera.position).normalize();
        raycaster.set(camera.position, dir);

        const distToHotspot = camera.position.distanceTo(h.position);
        const intersects = brainRef.current
          ? raycaster.intersectObject(brainRef.current, true)
          : [];

        const occluded = intersects.some(
          (hit) => hit.distance < distToHotspot - 0.05
        );

        return {
          ...h,
          screen:  screenPos,
          visible: !occluded,
        };
      });
      setDots(updated);
    };
    animate();

    return () => {
  cancelAnimationFrame(animId);

  renderer.domElement.removeEventListener("click", onClickTemp);
  renderer.domElement.removeEventListener("pointermove", onPointerMove);

  window.removeEventListener("resize", handleResize); // ✅ هون بالزبط

  if (container.contains(renderer.domElement)) {
    container.removeChild(renderer.domElement);
  }

  renderer.dispose();
  rendererRef.current = null;
};
  }, []);
  

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      onClick={() => setActiveLabel(null)}
    >
      <div ref={mountRef} />
{/* SVG layer for leader lines + labels */}
<svg
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 5,
    opacity: labelsVisible ? 1 : 0,        // ✅ هاد
    transition: "opacity 0.3s ease",       // ✅ transition ناعم
  }}
>
  {dots.map((dot) => {
    const x = dot.screen?.x ?? 0;
    const y = dot.screen?.y ?? 0;
     const canvasWidth = rendererRef.current?.domElement?.clientWidth || 0;
    const isRight = x < canvasWidth / 2; // label goes left or right
    const lx = isRight ? x - 70 : x + 70; // label anchor X
    const ly = y - 30;                      // label anchor Y

    return (
      <g key={dot.id} opacity={dot.visible ? 1 : 1}>
        {/* leader line */}
        <polyline
          points={`${x},${y - 14} ${x},${ly} ${lx},${ly}`}
          fill="none"
          stroke="white"
          strokeWidth="1.2"
        />
        {/* dot at line start */}
        <circle cx={x} cy={y - 14} r="2.5" fill="white" />
        {/* label pill */}
    {/* label pill — رقم + اسم مع بعض */}
<rect
  x={isRight ? lx - 140 : lx}
  y={ly - 18}
  width="150"
  height="35"
  rx="10"
  fill="rgba(255, 255, 255, 0.9)"
/>

{/* دائرة الرقم جوا الـ pill */}
<circle
  cx={isRight ? lx - 122 : lx + 18}
  cy={ly}
  r="13"
  fill={dot.id==1?"#479EB9":
    dot.id==2?"#409748":
    dot.id==3?"#96241F":
    dot.id==4?"#CECF5A":
    dot.id==5?"#479EB9":""
  }
/>
<text
  x={isRight ? lx - 122 : lx + 18}
  y={ly}
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize="12"
  fontWeight="700"
  fill="white"
>
  {dot.id}
</text>

{/* الاسم بعد الدائرة */}
<text
  x={isRight ? lx - 104 : lx + 36}
  y={ly}
  textAnchor="start"
  dominantBaseline="middle"
  fontSize="12"
  fontWeight="600"
  fill="#080808"
  fontFamily="var(--primary-font)"
>
  {dot.label}
</text>
      </g>
    );
  })}
</svg>
      {dots.map((dot) => (
        <div
          key={dot.id}
          onClick={(e) => {
            e.stopPropagation();
            setActiveLabel(activeLabel?.id === dot.id ? null : dot);
            moveCameraTo(dot.position);
          }}
          style={{
            position:       "absolute",
            left:           dot.screen?.x,
            top:            dot.screen?.y,
            transform:      "translate(-50%, -50%)",
            width:          28,
            height:         28,
            borderRadius:   "50%",
            background:     activeLabel?.id === dot.id ? "rgba(249, 246, 246, 0.85)" : "#1a1a2e",
            border:         "2px solid #ffffff",
            color:          activeLabel?.id === dot.id ? "#000000" : "#ffffff",
            fontSize:       15,
            fontWeight:     "bold",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            cursor:         "pointer",
            zIndex:         10,
            userSelect:     "none",
            opacity:        dot.visible ? 1 : 0.15,
            transition:     "opacity 0.2s ease",
          }}
        >
          {dot.id}
        </div>
      ))}

      {activeLabel && (() => {
        const liveDot = dots.find(d => d.id === activeLabel.id);
        return (
          <div
            style={{
              position:      "absolute",
              left:          (liveDot?.screen?.x ?? activeLabel.screen?.x) + 20,
              top:           (liveDot?.screen?.y ?? activeLabel.screen?.y) - 20,
              background:    "rgba(249, 246, 246, 0.85)",
              color:         "#000",
              padding:       "8px 14px",
              borderRadius:  8,
              fontSize:      17,
              fontWeight:    "500",
              fontFamily:    "var(--primary-font)",
              zIndex:        20,
              pointerEvents: "none",
              whiteSpace:    "nowrap",
              border:        "1px solid rgba(255,255,255,0.2)",
            }}
          >
            {activeLabel.label}
          </div>
        );
      })()}

      {/* ✅ Info Panel تحت المجسم */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          minHeight:    90,
          background:   "rgba(255, 0, 0, 0.05)",
          border:       "1px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          margin:       "12px 0",
          padding:      "20px 24px",
          color:        "white",
          transition:   "all 0.3s ease",
        }}
      >
        {activeLabel ? (
          <>
            <div style={{
              fontSize:     18,
              fontWeight:   "bold",
              marginBottom: 10,
              fontFamily:   "var(--primary-font)",
              color:        "rgba(249, 246, 246, 0.95)",
            }}>
              {activeLabel.id}. {activeLabel.label}
            </div>
            <div style={{
              fontSize:   14,
              lineHeight:  1.8,
              fontFamily: "var(--primary-font)",
              color:      "rgba(255,255,255,0.75)",
            }}>
              {activeLabel.info}
            </div>
          </>
        ) : (
          <div style={{
            color:      "rgba(255,255,255,0.3)",
            fontSize:   14,
            fontFamily: "var(--primary-font)",
            textAlign:  "center",
            paddingTop: 10,
          }}>
            اكبس على أي رقم لعرض المعلومات
          </div>
        )}
      </div>

    </div>
  );
}