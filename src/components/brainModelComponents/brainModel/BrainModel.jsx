import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import BrainCard from "../brainCard/BrainCard";
import { BsFillBadge3dFill } from "react-icons/bs";
import style from "./BrainModel.module.css";

const HOTSPOTS = [
  {
    id: 1,
    key: "Frontal",
    label: "Frontal Lobe",
    position: new THREE.Vector3(0.54, 2.45, 3.91),
  },
  {
    id: 2,
    key: "Temporal",
    label: "Temporal Lobe",
    position: new THREE.Vector3(-3.33, -0.18, -0.15),
  },
  {
    id: 3,
    key: "Occipital",
    label: "Occipital Lobe",
    position: new THREE.Vector3(-0.5, 0.36, -4.52),
  },
  {
    id: 4,
    key: "Parietal",
    label: "Parietal Lobe",
    position: new THREE.Vector3(0.27, 3.74, -1.35),
  },
  {
    id: 5,
    key: "PreFrontal",
    label: "Pre-Frontal Cortex",
    position: new THREE.Vector3(0.4, 0.15, 4.37),
  },
  {
    id: 6,
    key: "PituitaryGland",
    label: "Pituitary Gland",
    position: new THREE.Vector3(-0.03, -1.43, 1.31),
  },
];

export default function BrainModel() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const hotspotsRef = useRef(HOTSPOTS);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const brainRef = useRef(null);
  const [labelsVisible, setLabelsVisible] = useState(true);
  const [activeLabel, setActiveLabel] = useState(null);
  const [dots, setDots] = useState([]);

  const setActiveLabelRef = useRef(setActiveLabel);
  setActiveLabelRef.current = setActiveLabel;

  const isMobile = useMediaQuery("(max-width: 1474px)");
  const isSmall = useMediaQuery("(max-width:900px)");
  const isVerySmall = useMediaQuery("(max-width:749px)");

  const moveCameraTo = (position) => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    const target = new THREE.Vector3(0, 0, 0);

    const startOffset = camera.position.clone().sub(target);
    const startSpherical = new THREE.Spherical().setFromVector3(startOffset);

    const endDir = position
      .clone()
      .normalize()
      .multiplyScalar(startOffset.length());
    const endSpherical = new THREE.Spherical().setFromVector3(endDir);

    const startTime = performance.now();
    const duration = 700;

    const animateCamera = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const current = new THREE.Spherical(
        THREE.MathUtils.lerp(startSpherical.radius, endSpherical.radius, eased),
        THREE.MathUtils.lerp(startSpherical.phi, endSpherical.phi, eased),
        THREE.MathUtils.lerp(startSpherical.theta, endSpherical.theta, eased),
      );

      const newPos = new THREE.Vector3().setFromSpherical(current);

      camera.position.copy(target.clone().add(newPos));
      controls.target.copy(target);
      controls.update();

      if (t < 1) requestAnimationFrame(animateCamera);
    };

    requestAnimationFrame(animateCamera);
  };
  useEffect(() => {
    const container = mountRef.current;
    if (!container || rendererRef.current) return;

    const width = container.clientWidth;
    const getCanvasHeight = () => {
      const w = window.innerWidth;
      if (w < 600) return window.innerHeight * 0.45;
      if (w < 900) return window.innerHeight * 0.55;
      if (w < 1200) return window.innerHeight * 0.7;
      return window.innerHeight * 0.92;
    };

    const height = getCanvasHeight();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000");

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(2, 0.5, 0.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.45;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const handleResize = () => {
      if (!container) return;

      const newWidth = container.clientWidth;
      const newHeight = getCanvasHeight();

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      if (brainRef.current) {
        const rect = renderer.domElement.getBoundingClientRect();
        setDots((prev) =>
          prev.map((h) => {
            const vec = h.position.clone().project(camera);
            return {
              ...h,
              screen: {
                x: (vec.x * 0.5 + 0.5) * rect.width,
                y: (-vec.y * 0.5 + 0.5) * rect.height,
              },
            };
          }),
        );
      }
    };

    window.addEventListener("resize", handleResize);
    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 2;
    controls.enableZoom = false;
    controlsRef.current = controls;

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const loader = new GLTFLoader();
    loader.load("/brain/scene.gltf", (gltf) => {
      const brainModel = gltf.scene;

      const w = window.innerWidth;
      const brainScale = w < 600 ? 4.5 : w < 900 ? 5.5 : w < 1200 ? 6.2 : 7;
      brainModel.scale.set(brainScale, brainScale, brainScale);

      brainRef.current = brainModel;
      scene.add(brainModel);
      const box = new THREE.Box3().setFromObject(brainModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      brainModel.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

      camera.position.set(cameraZ * 1.3, 0, 0);
      controls.target.set(0, 0, 0);
      controls.update();
    });
    const onClickTemp = (event) => {
      setLabelsVisible(false);
      if (!brainRef.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(brainRef.current, true);
      if (intersects.length > 0) {
        const p = intersects[0].point;
      }
    };
    renderer.domElement.addEventListener("click", onClickTemp);

    const onPointerMove = (e) => {
      if (e.buttons > 0) {
        setLabelsVisible(false);
        setActiveLabelRef.current(null);
      }
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    const toScreenPos = (pos3D, cam, rect) => {
      const vec = pos3D.clone().project(cam);
      return {
        x: (vec.x * 0.5 + 0.5) * rect.width,
        y: (-vec.y * 0.5 + 0.5) * rect.height,
      };
    };

    let animId;
    let lastUpdate = 0;
    const animate = (time = 0) => {
      animId = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);

      const rect = renderer.domElement.getBoundingClientRect();

      const updated = hotspotsRef.current.map((h) => {
        const screenPos = toScreenPos(h.position, camera, rect);

        const dir = h.position.clone().sub(camera.position).normalize();
        raycaster.set(camera.position, dir);

        const distToHotspot = camera.position.distanceTo(h.position);
        const intersects = brainRef.current
          ? raycaster.intersectObject(brainRef.current, true)
          : [];

        const occluded = intersects.some(
          (hit) => hit.distance < distToHotspot - 0.05,
        );

        return {
          ...h,
          screen: screenPos,
          visible: !occluded,
        };
      });

      if (time - lastUpdate > 100) {
        setDots(updated);
        lastUpdate = time;
      }
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);

      renderer.domElement.removeEventListener("click", onClickTemp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);

      window.removeEventListener("resize", handleResize);

      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  return (
    <Box
      sx={{
        bgcolor: isMobile ? "transparent" : "#000",
        borderRadius: "30px",
        marginX: "30px",
      }}
    >
      <Grid container>
        <Grid item size={{ xs: 12, md: isMobile ? 12 : 8 }}>
          <Box
            style={{
              position: "relative",
              borderRadius: "30px",
              overflow: "hidden",
            }}
            onClick={() => setActiveLabel(null)}
          >
            <Box
              ref={mountRef}
              sx={{
                cursor: "grab",
                margin: "auto",
                justifyContent: "center",
                "& canvas": {
                  // ← استهدف الـ canvas مباشرة
                  display: "block",
                  margin: "0 auto",
                  borderRadius: "30px",
                },
              }}
            />
            {!isVerySmall && (
              <svg
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 5,
                  opacity: labelsVisible ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                {dots.map((dot) => {
                  const x = dot.screen?.x ?? 0;
                  const y = dot.screen?.y ?? 0;
                  const canvasWidth =
                    rendererRef.current?.domElement?.clientWidth || 0;
                  const isRight = x < canvasWidth / 2;
                  const lx = isRight ? x - 70 : x + 70;
                  const ly = y - 30;

                  return (
                    <g key={dot.id}>
                      <polyline
                        points={`${x},${isSmall ? y - 8 : y - 14} ${x},${ly} ${lx},${ly}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx={x}
                        cy={isSmall ? y - 6 : y - 14}
                        r="2.5"
                        fill="white"
                      />

                      <rect
                        x={isRight ? lx - 140 : lx}
                        y={ly - 18}
                        width={dot.id == 5 ? "180" : "150"}
                        height={isSmall ? "20" : "35"}
                        rx="10"
                        fill="rgba(255,255,255,0.9)"
                      />
                      {/* دائرة الرقم جوا الـ pill */}
                      <circle
                        cx={isRight ? lx - 122 : lx + 18}
                        cy={isSmall ? ly - 7 : ly}
                        r={isSmall ? "8" : "13"}
                        fill={
                          dot.id == 1
                            ? "#479EB9"
                            : dot.id == 2
                              ? "#409748"
                              : dot.id == 3
                                ? "#96241F"
                                : dot.id == 4
                                  ? "#CECF5A"
                                  : dot.id == 5
                                    ? "#479EB9"
                                    : dot.id == 6
                                      ? "#6E2C1E"
                                      : ""
                        }
                      />

                      <text
                        x={isRight ? lx - 122 : lx + 18}
                        y={isSmall ? ly - 7 : ly}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize={isSmall ? "10" : "12"}
                        fontWeight="700"
                        fill="white"
                      >
                        {dot.id}
                      </text>
                      {/* الاسم بعد الدائرة */}
                      <text
                        x={
                          isRight
                            ? lx - (isSmall ? 110 : 104)
                            : lx + (isSmall ? 30 : 36)
                        }
                        y={isSmall ? ly - 7 : ly}
                        textAnchor="start"
                        dominantBaseline="middle"
                        fontSize={isSmall ? "10" : "14"}
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
            )}

            {dots.map((dot) => (
              <Box
                key={dot.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLabel(activeLabel?.id === dot.id ? null : dot);
                  setLabelsVisible(false);
                  moveCameraTo(dot.position);
                }}
                style={{
                  position: "absolute",
                  left: dot.screen?.x,
                  top: dot.screen?.y,
                  transform: "translate(-50%, -50%)",
                  width: isSmall ? 18 : 28,
                  height: isSmall ? 18 : 28,
                  borderRadius: "50%",
                  background:
                    activeLabel?.id === dot.id
                      ? "rgba(249, 246, 246, 0.85)"
                      : "#1a1a2e",
                  border: "2px solid #ffffff",
                  color: activeLabel?.id === dot.id ? "#000000" : "#ffffff",
                  fontSize: isSmall ? 12 : 15,
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 10,
                  userSelect: "none",
                  opacity: dot.visible ? 1 : 0.15,
                  transition: "opacity 0.2s ease",
                }}
              >
                {dot.id}
              </Box>
            ))}
            {activeLabel &&
              (() => {
                const liveDot = dots.find((d) => d.id === activeLabel.id);
                return (
                  <Box
                    style={{
                      position: "absolute",
                      left: (liveDot?.screen?.x ?? activeLabel.screen?.x) + 20,
                      top: (liveDot?.screen?.y ?? activeLabel.screen?.y) - 20,
                      background: "rgba(249, 246, 246, 0.85)",
                      color: "#000",
                      padding: isSmall ? "3px 6px" : "8px 14px",
                      borderRadius: 8,
                      fontSize: isSmall ? 8 : 17,
                      fontWeight: "500",
                      fontFamily: "var(--primary-font)",
                      zIndex: 20,
                      pointerEvents: "none",
                      whiteSpace: "nowrap",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {activeLabel.label}
                  </Box>
                );
              })()}

            <Typography
              className={style.label}
              sx={{
                color: "#fff",
                position: "absolute",
                bottom: { xs: "10px", md: "20px" },
                left: { xs: "60px", sm: "80px", md: "30px" },
                transform: { xs: "translateX(-50%)", md: "none" },
                fontFamily: "var(--primary-font)",
                fontSize: { xs: "10px", sm: "14px", md: "17px" },
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <BsFillBadge3dFill style={{ fontSize: "inherit" }} /> Brain Model
            </Typography>
          </Box>
        </Grid>
        <Grid item size={{ xs: 12, md: isMobile ? 12 : 4 }}>
          <Box
            className="model_card"
            sx={{
              marginTop: isMobile ? "20px" : "80px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <BrainCard activeLabel={activeLabel} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}