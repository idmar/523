import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function VictoriaHarbourScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── WebGL Support Pre-flight Check ───
    let renderer: THREE.WebGLRenderer;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglFailed(true);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    // ─── Scene & Camera Setup ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#030712', 0.022);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    // Position camera with a cinematic high-angle view over Victoria Harbour
    camera.position.set(0, 7.5, 26);
    camera.lookAt(0, 4, -2);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0x0c1e3d, 1.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00d4ff, 2.2);
    dirLight.position.set(15, 25, 10);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x00f0ff, 3, 35);
    blueLight.position.set(4, 10, 0);
    scene.add(blueLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 30);
    amberLight.position.set(-5, 4, 3);
    scene.add(amberLight);

    // ─── Materials ───
    const buildingGlassMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });

    const neonCyanLineMat = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
      linewidth: 1,
    });

    const neonBlueLineMat = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    });

    const xBraceMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95,
      linewidth: 1.5,
    });

    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    // ─── 1. Bank of China Tower (中銀大廈) ───
    // Iconic stepped triangular prismatic structure designed by I. M. Pei
    const bocGroup = new THREE.Group();
    bocGroup.position.set(4.2, 0, -3.5);

    const bocWidth = 2.4;
    const bocHeights = [6.0, 9.5, 13.0, 16.5];
    const bocSlices = [
      { x: -bocWidth / 4, z: -bocWidth / 4, h: bocHeights[0] },
      { x: bocWidth / 4, z: -bocWidth / 4, h: bocHeights[1] },
      { x: -bocWidth / 4, z: bocWidth / 4, h: bocHeights[2] },
      { x: bocWidth / 4, z: bocWidth / 4, h: bocHeights[3] },
    ];

    bocSlices.forEach(slice => {
      const prismGeom = new THREE.BoxGeometry(
        bocWidth / 2,
        slice.h,
        bocWidth / 2
      );
      const mesh = new THREE.Mesh(prismGeom, buildingGlassMat);
      mesh.position.set(slice.x, slice.h / 2, slice.z);
      bocGroup.add(mesh);

      // Neon edge lines
      const edges = new THREE.EdgesGeometry(prismGeom);
      const line = new THREE.LineSegments(edges, neonCyanLineMat);
      line.position.copy(mesh.position);
      bocGroup.add(line);

      // Sloped top prism capping
      const capH = 1.0;
      const capGeom = new THREE.ConeGeometry(bocWidth / 2.8, capH, 4);
      capGeom.rotateY(Math.PI / 4);
      const capMesh = new THREE.Mesh(capGeom, buildingGlassMat);
      capMesh.position.set(slice.x, slice.h + capH / 2, slice.z);
      bocGroup.add(capMesh);

      const capEdges = new THREE.EdgesGeometry(capGeom);
      const capLine = new THREE.LineSegments(capEdges, neonCyanLineMat);
      capLine.position.copy(capMesh.position);
      bocGroup.add(capLine);
    });

    // Iconic Bank of China X-Bracing Trusses
    const xPoints: THREE.Vector3[] = [];
    const segmentsCount = 7;
    for (let i = 0; i < segmentsCount; i++) {
      const y1 = i * 2.2;
      const y2 = (i + 1) * 2.2;
      const hw = bocWidth / 2;

      // Front facade X
      xPoints.push(new THREE.Vector3(-hw, y1, hw), new THREE.Vector3(hw, y2, hw));
      xPoints.push(new THREE.Vector3(hw, y1, hw), new THREE.Vector3(-hw, y2, hw));

      // Right facade X
      xPoints.push(new THREE.Vector3(hw, y1, -hw), new THREE.Vector3(hw, y2, hw));
      xPoints.push(new THREE.Vector3(hw, y1, hw), new THREE.Vector3(hw, y2, -hw));

      // Left facade X
      xPoints.push(new THREE.Vector3(-hw, y1, -hw), new THREE.Vector3(-hw, y2, hw));
      xPoints.push(new THREE.Vector3(-hw, y1, hw), new THREE.Vector3(-hw, y2, -hw));
    }
    const xGeom = new THREE.BufferGeometry().setFromPoints(xPoints);
    const xLines = new THREE.LineSegments(xGeom, xBraceMat);
    bocGroup.add(xLines);

    // Dual Antennas / Spires on top of BOC
    const spireMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const spireGeom1 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.3, 17.5, 0.3),
      new THREE.Vector3(0.3, 21.0, 0.3),
    ]);
    const spireGeom2 = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0.8, 17.0, 0.8),
      new THREE.Vector3(0.8, 20.2, 0.8),
    ]);
    bocGroup.add(new THREE.Line(spireGeom1, spireMat));
    bocGroup.add(new THREE.Line(spireGeom2, spireMat));

    // Blinking antenna beacons
    const beaconGeom = new THREE.SphereGeometry(0.12, 8, 8);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff3b30 });
    const beacon1 = new THREE.Mesh(beaconGeom, beaconMat);
    beacon1.position.set(0.3, 21.0, 0.3);
    const beacon2 = new THREE.Mesh(beaconGeom, beaconMat);
    beacon2.position.set(0.8, 20.2, 0.8);
    bocGroup.add(beacon1);
    bocGroup.add(beacon2);

    cityGroup.add(bocGroup);

    // ─── 2. Hong Kong Convention & Exhibition Centre (香港會展中心) ───
    // Iconic sweeping curved aerodynamic winged roof jutting into the harbour water
    const hkcecGroup = new THREE.Group();
    hkcecGroup.position.set(-4.5, 0, 1.8);

    // Curved winged roof - 3 overlapping tiered aerodynamic shells
    const shellLayers = 3;

    for (let layer = 0; layer < shellLayers; layer++) {
      const width = 6.2 - layer * 0.8;
      const length = 5.2 - layer * 0.6;
      const height = 1.4 + layer * 0.75;
      const yOffset = 1.2 + layer * 0.65;

      // Parametric swept wing shape
      const shape = new THREE.Shape();
      shape.moveTo(-width / 2, 0);
      shape.quadraticCurveTo(0, height, width / 2, 0);
      shape.quadraticCurveTo(width / 3, -height * 0.5, 0, -height * 0.7);
      shape.quadraticCurveTo(-width / 3, -height * 0.5, -width / 2, 0);

      const extrudeSettings = {
        steps: 12,
        depth: length,
        bevelEnabled: true,
        bevelThickness: 0.15,
        bevelSize: 0.1,
        bevelSegments: 4,
      };

      const roofGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      roofGeom.rotateX(Math.PI / 2.3);
      roofGeom.center();

      const roofMesh = new THREE.Mesh(
        roofGeom,
        new THREE.MeshStandardMaterial({
          color: 0x072242,
          roughness: 0.2,
          metalness: 0.8,
          transparent: true,
          opacity: 0.9,
        })
      );
      roofMesh.position.set(0, yOffset, 0);
      hkcecGroup.add(roofMesh);

      // Glowing roof perimeter edge lines
      const roofEdges = new THREE.EdgesGeometry(roofGeom);
      const edgeLine = new THREE.LineSegments(
        roofEdges,
        new THREE.LineBasicMaterial({
          color: layer === 0 ? 0x00ffff : 0x38bdf8,
          transparent: true,
          opacity: 0.85,
        })
      );
      edgeLine.position.copy(roofMesh.position);
      hkcecGroup.add(edgeLine);
    }

    // HKCEC Curved Glass Wall Base
    const baseRadius = 3.2;
    const baseGeom = new THREE.CylinderGeometry(
      baseRadius,
      baseRadius * 1.05,
      1.5,
      24,
      1,
      true,
      0,
      Math.PI
    );
    baseGeom.rotateY(-Math.PI / 2);
    const baseMesh = new THREE.Mesh(
      baseGeom,
      new THREE.MeshStandardMaterial({
        color: 0x061830,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.75,
      })
    );
    baseMesh.position.set(0, 0.75, 0.6);
    hkcecGroup.add(baseMesh);

    // Base glowing frame & warm interior light glow
    const baseEdges = new THREE.EdgesGeometry(baseGeom);
    const baseLine = new THREE.LineSegments(baseEdges, neonCyanLineMat);
    baseLine.position.copy(baseMesh.position);
    hkcecGroup.add(baseLine);

    // Waterfront Reclamation Pier Platform
    const pierGeom = new THREE.BoxGeometry(7.2, 0.4, 6.8);
    const pierMesh = new THREE.Mesh(
      pierGeom,
      new THREE.MeshStandardMaterial({
        color: 0x040e1f,
        roughness: 0.3,
        metalness: 0.7,
      })
    );
    pierMesh.position.set(0, 0.2, 0.5);
    hkcecGroup.add(pierMesh);

    const pierEdges = new THREE.EdgesGeometry(pierGeom);
    const pierLine = new THREE.LineSegments(pierEdges, neonBlueLineMat);
    pierLine.position.copy(pierMesh.position);
    hkcecGroup.add(pierLine);

    cityGroup.add(hkcecGroup);

    // ─── 3. Victoria Harbour Supporting Skyline ───
    // IFC Style Tower (Left background)
    const ifcGroup = new THREE.Group();
    ifcGroup.position.set(-8.5, 0, -4.5);
    const ifcHeight = 15.0;
    const ifcGeom = new THREE.BoxGeometry(2.2, ifcHeight, 2.2);
    const ifcMesh = new THREE.Mesh(ifcGeom, buildingGlassMat);
    ifcMesh.position.y = ifcHeight / 2;
    ifcGroup.add(ifcMesh);
    const ifcLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(ifcGeom),
      neonBlueLineMat
    );
    ifcLine.position.copy(ifcMesh.position);
    ifcGroup.add(ifcLine);
    // IFC Crown
    const ifcCrownGeom = new THREE.CylinderGeometry(0.7, 1.1, 1.8, 8);
    const ifcCrown = new THREE.Mesh(ifcCrownGeom, buildingGlassMat);
    ifcCrown.position.y = ifcHeight + 0.9;
    ifcGroup.add(ifcCrown);
    const ifcCrownLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(ifcCrownGeom),
      neonCyanLineMat
    );
    ifcCrownLine.position.copy(ifcCrown.position);
    ifcGroup.add(ifcCrownLine);
    cityGroup.add(ifcGroup);

    // Central Plaza Style Tower (Right background with pyramid top)
    const cpGroup = new THREE.Group();
    cpGroup.position.set(8.5, 0, -4.0);
    const cpHeight = 13.5;
    const cpGeom = new THREE.CylinderGeometry(1.2, 1.3, cpHeight, 3);
    const cpMesh = new THREE.Mesh(cpGeom, buildingGlassMat);
    cpMesh.position.y = cpHeight / 2;
    cpGroup.add(cpMesh);
    const cpLine = new THREE.LineSegments(
      new THREE.EdgesGeometry(cpGeom),
      neonCyanLineMat
    );
    cpLine.position.copy(cpMesh.position);
    cpGroup.add(cpLine);
    // Pyramid tip
    const pyrGeom = new THREE.ConeGeometry(1.2, 2.2, 3);
    const pyrMesh = new THREE.Mesh(pyrGeom, buildingGlassMat);
    pyrMesh.position.y = cpHeight + 1.1;
    cpGroup.add(pyrMesh);
    // Mast
    const cpMast = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, cpHeight + 2.2, 0),
        new THREE.Vector3(0, cpHeight + 4.8, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0xf59e0b })
    );
    cpGroup.add(cpMast);
    cityGroup.add(cpGroup);

    // Dense background skyscrapers cluster
    const bgBuildingsData = [
      { x: -12.0, z: -7.0, w: 1.8, d: 1.8, h: 9.0 },
      { x: -6.2, z: -6.5, w: 1.5, d: 1.5, h: 10.5 },
      { x: -2.0, z: -5.0, w: 1.6, d: 1.8, h: 11.5 },
      { x: 0.8, z: -6.0, w: 2.0, d: 1.6, h: 12.0 },
      { x: 6.2, z: -5.5, w: 1.7, d: 1.7, h: 10.0 },
      { x: 11.0, z: -6.5, w: 2.2, d: 2.0, h: 8.5 },
      { x: -14.5, z: -9.0, w: 2.2, d: 2.0, h: 7.5 },
      { x: 13.5, z: -8.5, w: 2.0, d: 1.8, h: 7.0 },
    ];

    bgBuildingsData.forEach(b => {
      const bGeom = new THREE.BoxGeometry(b.w, b.h, b.d);
      const bMesh = new THREE.Mesh(bGeom, buildingGlassMat);
      bMesh.position.set(b.x, b.h / 2, b.z);
      cityGroup.add(bMesh);

      const bLine = new THREE.LineSegments(
        new THREE.EdgesGeometry(bGeom),
        neonBlueLineMat
      );
      bLine.position.copy(bMesh.position);
      cityGroup.add(bLine);
    });

    // ─── 4. Victoria Harbour Cyber Waves (維港數碼海洋) ───
    const oceanWidth = 70;
    const oceanDepth = 55;
    const oceanSegX = 75;
    const oceanSegZ = 65;

    const oceanGeom = new THREE.PlaneGeometry(
      oceanWidth,
      oceanDepth,
      oceanSegX,
      oceanSegZ
    );
    oceanGeom.rotateX(-Math.PI / 2);
    oceanGeom.translate(0, 0, 5);

    // Cyber water shader material
    const oceanMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMousePos: { value: new THREE.Vector2(0, 0) },
        uDeepColor: { value: new THREE.Color(0x020713) },
        uPeakColor: { value: new THREE.Color(0x00d4ff) },
        uReflectColor: { value: new THREE.Color(0x2563eb) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMousePos;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vWorldPos;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Rolling ocean harmonic wave
          float wave1 = sin(pos.x * 0.25 + uTime * 1.3) * cos(pos.z * 0.2 + uTime * 0.9) * 0.45;
          float wave2 = sin(pos.x * 0.45 - uTime * 1.1 + pos.z * 0.15) * 0.22;
          float wave3 = cos(pos.z * 0.6 + uTime * 1.6) * 0.12;

          // Mouse ripple influence
          float mouseDist = length(pos.xz - uMousePos);
          float mouseRipple = sin(mouseDist * 1.5 - uTime * 3.5) * exp(-mouseDist * 0.2) * 0.5;

          float elevation = wave1 + wave2 + wave3 + mouseRipple;
          pos.y += elevation;
          vElevation = elevation;
          vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uDeepColor;
        uniform vec3 uPeakColor;
        uniform vec3 uReflectColor;
        varying vec2 vUv;
        varying float vElevation;
        varying vec3 vWorldPos;

        void main() {
          // Cyber wave color gradient
          float mixStrength = smoothstep(-0.4, 0.5, vElevation);
          vec3 color = mix(uDeepColor, uReflectColor, mixStrength);

          // Crest highlights (electric cyan ripple lines)
          float crest = smoothstep(0.2, 0.45, vElevation);
          color = mix(color, uPeakColor, crest * 0.85);

          // Grid lines across the cyber water
          vec2 grid = abs(fract(vUv * 60.0 - 0.5) - 0.5) / fwidth(vUv * 60.0);
          float line = 1.0 - min(min(grid.x, grid.y), 1.0);
          color += uPeakColor * line * 0.25;

          // Distance fading into deep darkness
          float dist = length(vWorldPos.xz);
          float alpha = smoothstep(38.0, 10.0, dist) * 0.88;

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const oceanMesh = new THREE.Mesh(oceanGeom, oceanMat);
    scene.add(oceanMesh);

    // ─── 5. "A Symphony of Lights" (幻彩詠香江) Searchlight Beams ───
    const beamOrigins = [
      { pos: new THREE.Vector3(4.5, 17.5, -3.5), color: 0x00ffff, angleOffset: 0 },
      { pos: new THREE.Vector3(-8.5, 16.0, -4.5), color: 0x38bdf8, angleOffset: 1.8 },
      { pos: new THREE.Vector3(8.5, 15.5, -4.0), color: 0xa855f7, angleOffset: 3.2 },
      { pos: new THREE.Vector3(-4.5, 4.0, 1.8), color: 0x22c55e, angleOffset: 4.5 },
    ];

    const searchlights: {
      line: THREE.Line;
      origin: THREE.Vector3;
      angleOffset: number;
    }[] = [];

    beamOrigins.forEach(b => {
      const beamGeom = new THREE.BufferGeometry().setFromPoints([
        b.pos,
        new THREE.Vector3(b.pos.x + 5, b.pos.y + 25, b.pos.z - 10),
      ]);
      const beamMat = new THREE.LineBasicMaterial({
        color: b.color,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending,
      });
      const beamLine = new THREE.Line(beamGeom, beamMat);
      scene.add(beamLine);
      searchlights.push({
        line: beamLine,
        origin: b.pos,
        angleOffset: b.angleOffset,
      });
    });

    // ─── 6. AIGC Floating Data Stream Particles ───
    const particleCount = 1200;
    const pPositions = new Float32Array(particleCount * 3);
    const pVelocities = new Float32Array(particleCount * 3);
    const pAlphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 36;
      pPositions[i * 3 + 1] = Math.random() * 20;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 24 - 2;

      pVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      pVelocities[i * 3 + 1] = 0.03 + Math.random() * 0.05;
      pVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      pAlphas[i] = Math.random();
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      'position',
      new THREE.BufferAttribute(pPositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // ─── Interaction & Parallax ───
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Project onto water plane for ripples
      oceanMat.uniforms.uMousePos.value.set(
        mouse.targetX * 16,
        -mouse.targetY * 12 + 2
      );
    };

    window.addEventListener('pointermove', handlePointerMove);

    // ─── Animation Loop with Viewport Visibility Optimization ───
    const clock = new THREE.Clock();
    let isVisible = true;
    let isRunning = false;

    const animate = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }
      frameRef.current = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      // Gentle camera sway
      camera.position.x = mouse.x * 3.5 + Math.sin(elapsedTime * 0.25) * 0.5;
      camera.position.y = 7.5 + mouse.y * 1.8 + Math.cos(elapsedTime * 0.3) * 0.3;
      camera.lookAt(0, 4.0, -1.5);

      // Update cyber ocean waves
      oceanMat.uniforms.uTime.value = elapsedTime;

      // Pulse antenna beacon
      const beaconBlink = (Math.sin(elapsedTime * 4.0) + 1) * 0.5;
      beacon1.scale.setScalar(0.8 + beaconBlink * 0.5);
      beacon2.scale.setScalar(0.8 + (1 - beaconBlink) * 0.5);

      // Animate searchlights (幻彩詠香江)
      searchlights.forEach(sl => {
        const angle = elapsedTime * 0.8 + sl.angleOffset;
        const targetX = sl.origin.x + Math.sin(angle) * 12.0;
        const targetY = sl.origin.y + 26.0 + Math.cos(angle * 0.7) * 4.0;
        const targetZ = sl.origin.z - 12.0 + Math.cos(angle) * 8.0;

        const positions = sl.line.geometry.attributes.position.array as Float32Array;
        positions[3] = targetX;
        positions[4] = targetY;
        positions[5] = targetZ;
        sl.line.geometry.attributes.position.needsUpdate = true;
      });

      // Animate rising AIGC digital particles
      const posArray = particleGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += pVelocities[i * 3 + 1];
        posArray[i * 3] += pVelocities[i * 3] + Math.sin(elapsedTime + i) * 0.005;

        // Reset if too high
        if (posArray[i * 3 + 1] > 22.0) {
          posArray[i * 3 + 1] = 0.5;
          posArray[i * 3] = (Math.random() - 0.5) * 36;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 24 - 2;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // Subtle city breathing float
      cityGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.06;

      renderer.render(scene, camera);
    };

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    const startAnimation = () => {
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
        return;
      }
      if (!isRunning && isVisible) {
        isRunning = true;
        clock.start();
        animate();
      }
    };

    const stopAnimation = () => {
      if (isRunning) {
        cancelAnimationFrame(frameRef.current);
        isRunning = false;
        clock.stop();
      }
    };

    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopAnimation();
        renderer.render(scene, camera);
      } else if (isVisible) {
        startAnimation();
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // IntersectionObserver to pause off-screen
    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          isVisible = true;
          startAnimation();
        } else {
          isVisible = false;
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        isVisible = false;
        stopAnimation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Initial start
    startAnimation();

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopAnimation();
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      // Cleanup GPU resources
      renderer.dispose();
      oceanGeom.dispose();
      oceanMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {/* Cyber grid fallback */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            transform: 'perspective(600px) rotateX(65deg) translateY(120px)',
            transformOrigin: 'bottom center',
          }}
        />
        {/* Ambient celestial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 212, 255, 0.18) 0%, rgba(30, 58, 138, 0.12) 35%, rgba(192, 86, 33, 0.08) 60%, #030712 85%)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
