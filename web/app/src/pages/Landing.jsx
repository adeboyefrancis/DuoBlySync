import React from "react";
import AIChatWidget from "@/components/landing/AIChatWidget";
import LandingNav from "@/components/landing/LandingNav";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import JourneySection from "@/components/landing/JourneySection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <div id="hero">
        <HeroSection />
      </div>
      <StatsSection />
      <div id="journey">
        <JourneySection />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <CTASection />

      <AIChatWidget />

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 DuoBlySync · Built with ❤️ for DEI &amp; Neurodivergent
          communities
        </p>
      </footer>
    </div>
  );
}
