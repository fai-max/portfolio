"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { Navbar } from "@/components/ui/Navbar";
import { Cursor } from "@/components/ui/Cursor";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Creative } from "@/components/sections/Creative";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { registerGsapPlugins } from "@/lib/gsap-config";

function printConsoleMessage() {
  if (typeof window === "undefined") return;
  console.log(
    "%c Hey there, fellow developer! 👋",
    "color: #4488ff; font-size: 16px; font-weight: bold;"
  );
  console.log(
    "%c Looking at the source? I respect that.",
    "color: #888; font-size: 12px;"
  );
  console.log(
    "%c Built with Next.js, Three.js, GSAP, and Claude AI.",
    "color: #888; font-size: 12px;"
  );
  console.log(
    "%c Want to work together? → contact@mdfahim.in",
    "color: #e87f36; font-size: 12px;"
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  useEffect(() => {
    registerGsapPlugins();
    printConsoleMessage();
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Cursor />
      <Navbar />

      <main className="relative">
        <Hero loaded={loaded} />
        <MarqueeStrip />
        <About />
        <MarqueeStrip />
        <Experience />
        <MarqueeStrip />
        <Projects />
        <MarqueeStrip />
        <Skills />
        <Creative />
        <MarqueeStrip />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
