"use client";
import Header from "@/components/ui/Header";
import GooeyFilter from "./gooey-filter";
import PixelTrail from "./pixel-trial";
import { useScreenSize } from "./use-screen-size";
import Footer from "./Footer";
export default function Hero() {
  const screenSize = useScreenSize();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative w-full flex flex-col items-center justify-center gap-8 bg-pink-100 text-center text-pretty">
        <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

        <div
          className="absolute inset-0 z-0"
          style={{ filter: "url(#gooey-filter-pixel-trail)" }}
        >
          <PixelTrail
            pixelSize={screenSize.lessThan("md") ? 24 : 32}
            fadeDuration={0}
            delay={500}
            pixelClassName="bg-white"
          />
        </div>

        <p className="text-sky-700 text-7xl z-50 gap-y-2 font-bold">
          Confess, Express, Explore!!!
        </p>
      </div>
      <Footer />
    </div>
  );
}
