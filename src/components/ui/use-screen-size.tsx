"use client";

import { useEffect, useState, useMemo } from "react";

// Define the possible screen sizes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SCREEN_SIZES = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

// Create a union type
export type ScreenSize = (typeof SCREEN_SIZES)[number];

// Type-safe size order mapping
const sizeOrder: Record<ScreenSize, number> = {
  xs: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  "2xl": 5,
} as const;

class ComparableScreenSize {
  constructor(private value: ScreenSize) {}

  toString(): ScreenSize {
    return this.value;
  }

  valueOf(): number {
    return sizeOrder[this.value];
  }

  equals(other: ScreenSize): boolean {
    return this.value === other;
  }

  lessThan(other: ScreenSize): boolean {
    return this.valueOf() < sizeOrder[other];
  }

  greaterThan(other: ScreenSize): boolean {
    return this.valueOf() > sizeOrder[other];
  }

  lessThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() <= sizeOrder[other];
  }

  greaterThanOrEqual(other: ScreenSize): boolean {
    return this.valueOf() >= sizeOrder[other];
  }
}

const useScreenSize = (): ComparableScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("xs");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1536) {
        setScreenSize("2xl");
      } else if (width >= 1280) {
        setScreenSize("xl");
      } else if (width >= 1024) {
        setScreenSize("lg");
      } else if (width >= 768) {
        setScreenSize("md");
      } else if (width >= 640) {
        setScreenSize("sm");
      } else {
        setScreenSize("xs");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Memoize the instance to prevent unnecessary re-renders
  return useMemo(() => new ComparableScreenSize(screenSize), [screenSize]);
};

export { useScreenSize };