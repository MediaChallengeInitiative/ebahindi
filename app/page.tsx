import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIMediaLab from "@/components/AIMediaLab";
import Speaking from "@/components/Speaking";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <AIMediaLab />
        <Speaking />
        <Work />
        <Skills />
      </main>
      <Contact />
    </>
  );
}
