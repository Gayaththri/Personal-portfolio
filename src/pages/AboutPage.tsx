import { useEffect } from "react";
import { AboutIntro } from "../components/AboutIntro";
import { Contact } from "../components/Contact";
import { FunFacts } from "../components/FunFacts";
import { siteConfig } from "../config";

export function AboutPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = `About · ${siteConfig.name}`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main className="about-page">
      <AboutIntro />
      <FunFacts />
      <Contact />
      <style>{`
        .about-page {
          background: var(--bg);
        }
      `}</style>
    </main>
  );
}
