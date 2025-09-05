"use client";

import React from "react";
import DarkVeil from "@/components/DarkVeil";
import HeliumLogo from "@/components/HeliumLogo";
import MainCard from "@/components/MainCard";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#161616] relative overflow-hidden">
      {/* DarkVeil Background */}
      <div className="absolute inset-0 z-10">
        <DarkVeil
          hueShift={10}
          noiseIntensity={0.08}
          scanlineIntensity={0}
          speed={1}
          scanlineFrequency={2.0}
          warpAmount={0.1}
          resolutionScale={1}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        {/* Helium Logo */}
        <div className="text-center mb-16">
          <HeliumLogo />
        </div>
        
        {/* Join Waitlist Text */}
        <div className="text-center mb-8">
          <h2 className="text-xl italic text-white" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
            Join the waitlist to get early access of Helium
          </h2>
        </div>
        
        {/* Form Card */}
        <MainCard />
      </div>
    </div>
  );
}
