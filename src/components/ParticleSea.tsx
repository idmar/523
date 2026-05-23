import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uMouseDirection;
  uniform vec2 uResolution;

  attribute float aSize;
  attribute float aRandom;

  varying float vRnd;
  varying float vMouseDist;

  void main() {
    vec3 pos = position;
    float maxRadius = min(uResolution.x, uResolution.y) * 0.4;

    float r = length(pos.xy);
    float angle = atan(pos.y, pos.x);

    // Time-based wave
    float t = uTime;
    float wave = 4.0 * sin(0.2 * t - 1.4 + angle)
               + 2.4 * cos(0.1 * t + angle)
               + 1.0 * sin(0.4 * t - 0.4 - angle);

    // Apply wave to radius
    r = r + wave * (0.02 + 0.03 * aRandom);

    // Mouse interaction
    vec2 mousePos = uMouse - uResolution * 0.5;
    float mouseDist = distance(pos.xy, mousePos);
    float mouseInfluence = smoothstep(250.0, 0.0, mouseDist);

    vec2 mouseForce = normalize(pos.xy - mousePos + vec2(0.001)) * mouseInfluence * 60.0;
    mouseForce += uMouseDirection * mouseInfluence * 30.0;

    float ripple = sin(mouseDist * 0.04 - t * 3.0) * mouseInfluence * 12.0;
    pos.xy += normalize(mousePos - pos.xy + vec2(0.001)) * ripple * 0.3;
    pos.xy += mouseForce;

    // Reconstruct
    pos.x = r * cos(angle);
    pos.y = r * sin(angle);
    pos.z = 0.0;

    // Size: larger near center, influenced by random and mouse
    float centerFade = 1.0 - smoothstep(0.0, maxRadius, r);
    float ptSize = aSize * centerFade * (1.5 + mouseInfluence);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = ptSize;

    vRnd = aRandom;
    vMouseDist = mouseInfluence;
  }
`;

const fragmentShader = `
  varying float vRnd;
  varying float vMouseDist;

  void main() {
    // Distance from center of point sprite (0-1)
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);

    // Soft circular particle
    float alpha = smoothstep(0.5, 0.1, dist);
    alpha *= 0.25 + 0.4 * vRnd;
    alpha += vMouseDist * 0.25;

    // Blue color with subtle random brightness
    float brightness = 0.4 + 0.6 * vRnd;
    vec3 color = vec3(0.15, 0.35, 0.9) * brightness;

    // Brighter near mouse
    color += vec3(0.1, 0.2, 0.5) * vMouseDist;

    gl_FragColor = vec4(color, alpha);
  }
`;

export default function ParticleSea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80000 : 350000;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      -1000,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Generate particles
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount);

    const maxRadius = Math.min(window.innerWidth, window.innerHeight) * 0.42;

    for (let i = 0; i < particleCount; i++) {
      const r = maxRadius * Math.sqrt(Math.random());
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = r * Math.cos(angle);
      positions[i * 3 + 1] = r * Math.sin(angle);
      positions[i * 3 + 2] = 0;

      sizes[i] = 1.5 + Math.random() * 3.0;
      randoms[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseDirection: { value: new THREE.Vector2(0, 0) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      transparent: true,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse
    const mouseTarget = new THREE.Vector2(0, 0);
    const mouseCurrent = new THREE.Vector2(0, 0);
    const mouseDir = new THREE.Vector2(0, 0);
    let lastMouseX = 0;
    let lastMouseY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = -(e.clientY - window.innerHeight / 2);

      mouseDir.set(cx - lastMouseX, cy - lastMouseY);
      lastMouseX = cx;
      lastMouseY = cy;
      mouseTarget.set(cx, cy);
    };

    window.addEventListener('pointermove', onPointerMove);

    // Animate
    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      // Smooth mouse follow
      mouseCurrent.lerp(mouseTarget, 0.08);
      material.uniforms.uMouse.value.copy(mouseCurrent);
      material.uniforms.uMouseDirection.value.lerp(mouseDir, 0.05);
      mouseDir.multiplyScalar(0.9);

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
}
