'use client';

import React, { useEffect, useRef } from 'react';

interface Firework {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FireworksBackgroundProps {
  className?: string;
  fireworkSpeed?: { min: number; max: number };
  fireworkSize?: { min: number; max: number };
  particleSpeed?: { min: number; max: number };
  particleSize?: { min: number; max: number };
}

export const FireworksBackground: React.FC<FireworksBackgroundProps> = ({
  className = '',
  fireworkSpeed = { min: 8, max: 16 },
  fireworkSize = { min: 4, max: 10 },
  particleSpeed = { min: 4, max: 14 },
  particleSize = { min: 2, max: 10 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(undefined);
  const fireworksRef = useRef<Firework[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  const colors = [
    '#96FF45', '#455BFF', '#FFFF45', '#74EEf4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
  ];

  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  const createFirework = (x: number, y: number) => {
    const firework: Firework = {
      x,
      y,
      vx: randomBetween(-2, 2),
      vy: randomBetween(-fireworkSpeed.max, -fireworkSpeed.min),
      life: 0,
      maxLife: randomBetween(60, 100),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: randomBetween(fireworkSize.min, fireworkSize.max),
    };
    fireworksRef.current.push(firework);
  };

  const createParticles = (x: number, y: number, color: string) => {
    const particleCount = randomBetween(50, 100);
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const speed = randomBetween(particleSpeed.min, particleSpeed.max);
      const particle: Particle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: randomBetween(30, 60),
        color,
        size: randomBetween(particleSize.min, particleSize.max),
      };
      particlesRef.current.push(particle);
    }
  };

  const updateFireworks = () => {
    fireworksRef.current = fireworksRef.current.filter(firework => {
      firework.x += firework.vx;
      firework.y += firework.vy;
      firework.vy += 0.1; // gravity
      firework.life++;

      if (firework.life >= firework.maxLife) {
        createParticles(firework.x, firework.y, firework.color);
        return false;
      }
      return true;
    });
  };

  const updateParticles = () => {
    particlesRef.current = particlesRef.current.filter(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += 0.05; // gravity
      particle.life++;

      return particle.life < particle.maxLife;
    });
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with slight fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw fireworks
    fireworksRef.current.forEach(firework => {
      const alpha = 1 - (firework.life / firework.maxLife);
      ctx.fillStyle = firework.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw particles
    particlesRef.current.forEach(particle => {
      const alpha = 1 - (particle.life / particle.maxLife);
      ctx.fillStyle = particle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const animate = () => {
    updateFireworks();
    updateParticles();
    draw();
    animationRef.current = requestAnimationFrame(animate);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createFirework(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation
    animate();

    // Create initial fireworks
    const interval = setInterval(() => {
      const x = randomBetween(0, canvas.width);
      const y = randomBetween(canvas.height * 0.5, canvas.height);
      createFirework(x, y);
    }, 2000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(interval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      onClick={handleClick}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}
    />
  );
};
