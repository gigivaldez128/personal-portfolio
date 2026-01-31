"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
  moveX2: number;
  moveY2: number;
}

const BubblesBackground = () => {
  const bubblesRef = useRef<Bubble[]>([]);

  useEffect(() => {
    // Generate random bubbles with random movement directions
    const bubbleCount = 15;
    bubblesRef.current = Array.from({ length: bubbleCount }, (_, i) => {
      const angle = Math.random() * Math.PI * 2; // Random direction in radians
      const distance = Math.random() * 100 + 50; // Random distance
      const angle2 = Math.random() * Math.PI * 2;
      const distance2 = Math.random() * 100 + 50;
      
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 100 + 50, // 50-150px
        duration: Math.random() * 20 + 15, // 15-35 seconds
        delay: Math.random() * 5,
        moveX: Math.cos(angle) * distance,
        moveY: Math.sin(angle) * distance,
        moveX2: Math.cos(angle2) * distance2,
        moveY2: Math.sin(angle2) * distance2,
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubblesRef.current.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full opacity-20 blur-xl"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            background: `radial-gradient(circle, rgba(203, 172, 249, 0.3) 0%, rgba(203, 172, 249, 0.1) 50%, transparent 100%)`,
          }}
          animate={{
            x: [0, bubble.moveX, bubble.moveX2, 0],
            y: [0, bubble.moveY, bubble.moveY2, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.2, 0.3, 0.15, 0.2],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Additional smaller bubbles with random directions */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 30 + 20; // 20-50px
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        const angle2 = Math.random() * Math.PI * 2;
        const distance2 = Math.random() * 80 + 40;
        const angle3 = Math.random() * Math.PI * 2;
        const distance3 = Math.random() * 80 + 40;
        
        return (
          <motion.div
            key={`small-${i}`}
            className="absolute rounded-full opacity-10 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(203, 172, 249, 0.4) 0%, transparent 70%)`,
            }}
            animate={{
              x: [
                0,
                Math.cos(angle) * distance,
                Math.cos(angle2) * distance2,
                Math.cos(angle3) * distance3,
                0
              ],
              y: [
                0,
                Math.sin(angle) * distance,
                Math.sin(angle2) * distance2,
                Math.sin(angle3) * distance3,
                0
              ],
              opacity: [0.1, 0.2, 0.15, 0.25, 0.1],
              scale: [1, 1.3, 0.9, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Fast moving small bubbles */}
      {Array.from({ length: 10 }).map((_, i) => {
        const size = Math.random() * 15 + 10; // 10-25px
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 100;
        
        return (
          <motion.div
            key={`fast-${i}`}
            className="absolute rounded-full opacity-15 blur-md"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: `radial-gradient(circle, rgba(203, 172, 249, 0.5) 0%, transparent 60%)`,
            }}
            animate={{
              x: [0, Math.cos(angle) * distance, Math.cos(angle + Math.PI) * distance, 0],
              y: [0, Math.sin(angle) * distance, Math.sin(angle + Math.PI) * distance, 0],
              opacity: [0.15, 0.25, 0.1, 0.15],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default BubblesBackground;
