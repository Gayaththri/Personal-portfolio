import { useEffect } from "react";
import { AboutIntro } from "../components/AboutIntro";
import { FunFacts } from "../components/FunFacts";
import { siteConfig } from "../config";

export function AboutPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = siteConfig.name;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main>
      <AboutIntro />
      <FunFacts />
    </main>
  );
}
