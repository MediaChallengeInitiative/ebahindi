import Header from "@/components/Header";
import Rail from "@/components/Rail";
import ProfileCard from "@/components/ProfileCard";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AIMediaLab from "@/components/AIMediaLab";
import Speaking from "@/components/Speaking";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

/**
 * Ovro's shell: a sticky identity column on the left, everything else scrolling
 * on the right. Below lg the two collapse into one ordinary stack.
 */
export default function Page() {
  return (
    <>
      <Header />

      <div className="shell grid gap-8 pb-20 lg:grid-cols-[auto_360px_minmax(0,1fr)] lg:gap-10 lg:pt-[100px]">
        {/* Rail — desktop only; the mobile equivalent is the header menu. */}
        <div className="hidden lg:block">
          <div className="sticky top-[100px]">
            <Rail />
          </div>
        </div>

        {/* Identity card — sticky on desktop, inline on mobile (order-2). */}
        <div className="order-2 lg:order-none">
          <div className="lg:sticky lg:top-[100px]">
            <ProfileCard />
          </div>
        </div>

        <main id="main" className="order-1 min-w-0 lg:order-none">
          <Hero />
          <About />
          <AIMediaLab />
          <Speaking />
          <Work />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  );
}
