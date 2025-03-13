"use client";

import React, { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { useDimensions } from "./use-debounced-dimension";

interface PixelTrailProps {
  pixelSize?: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  // Create a ref that matches the expected type for useDimensions
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use type assertion to safely pass the ref to useDimensions
  const dimensions = useDimensions(containerRef as React.RefObject<HTMLElement>);
  
  const [trailId] = useState(() => uuidv4());
  const pixelRefs = useRef<Map<string, () => void>>(new Map());

  // Register a pixel's animation function
  const registerPixel = useCallback((key: string, animateFunc: () => void) => {
    pixelRefs.current.set(key, animateFunc);
  }, []);

  // Unregister a pixel's animation function
  const unregisterPixel = useCallback((key: string) => {
    pixelRefs.current.delete(key);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelKey = `${x}-${y}`;
      const animatePixel = pixelRefs.current.get(pixelKey);
      
      if (animatePixel) {
        animatePixel();
      }
    },
    [pixelSize]
  );

  const columns = useMemo(
    () => (dimensions.width ? Math.ceil(dimensions.width / pixelSize) : 0),
    [dimensions.width, pixelSize]
  );
  
  const rows = useMemo(
    () => (dimensions.height ? Math.ceil(dimensions.height / pixelSize) : 0),
    [dimensions.height, pixelSize]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-auto",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {columns > 0 &&
        rows > 0 &&
        Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <PixelDot
                key={`${colIndex}-${rowIndex}`}
                id={`${trailId}-pixel-${colIndex}-${rowIndex}`}
                pixelKey={`${colIndex}-${rowIndex}`}
                size={pixelSize}
                fadeDuration={fadeDuration}
                delay={delay}
                className={pixelClassName}
                registerPixel={registerPixel}
                unregisterPixel={unregisterPixel}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

interface PixelDotProps {
  id: string;
  pixelKey: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
  registerPixel: (key: string, animateFunc: () => void) => void;
  unregisterPixel: (key: string) => void;
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, pixelKey, size, fadeDuration, delay, className, registerPixel, unregisterPixel }) => {
    const controls = useAnimationControls();
    
    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      });
    }, [controls, fadeDuration, delay]);

    // Register and unregister the animation function
    useEffect(() => {
      registerPixel(pixelKey, animatePixel);
      
      return () => {
        unregisterPixel(pixelKey);
      };
    }, [pixelKey, animatePixel, registerPixel, unregisterPixel]);

    return (
      <motion.div
        id={id}
        className={cn("pointer-events-none", className)}
        style={{
          width: size,
          height: size,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
      />
    );
  }
);

PixelDot.displayName = "PixelDot";
export default PixelTrail;