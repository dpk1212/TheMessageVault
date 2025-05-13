import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StepProcess } from "./components/StepProcess";
import { InspirationStories } from "./components/InspirationStories";
import { PotentialImpact } from "./components/PotentialImpact";
import { Pricing } from "./components/Pricing";
import { TrustSection } from "./components/TrustSection";
import { FAQ } from "./components/FAQ";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StepProcess />
        <InspirationStories />
        <PotentialImpact />
        <Pricing />
        <TrustSection />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
} 