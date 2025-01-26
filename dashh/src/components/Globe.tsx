import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create the interior sphere
    const interiorGeometry = new THREE.SphereGeometry(5, 32, 32);
    const interiorMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff, transparent: true, opacity: 0.6 });
    const interiorSphere = new THREE.Mesh(interiorGeometry, interiorMaterial);
    scene.add(interiorSphere);

    // Create the outline sphere
    const outlineGeometry = new THREE.SphereGeometry(5.1, 32, 32); // Slightly larger for the outline
    const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0, wireframe: true });
    const outlineSphere = new THREE.Mesh(outlineGeometry, outlineMaterial);
    scene.add(outlineSphere);

    const light = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      interiorSphere.rotation.y += 0.01;
      outlineSphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Globe;