import { useEffect } from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";
import { siteConfig } from "../config";

export function HomePage() {
  useEffect(() => {
    document.title = siteConfig.name;
  }, []);

  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
}
