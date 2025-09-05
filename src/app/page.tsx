"use client";

import React from "react";
import MainCard from "@/components/MainCard";

export default function Home() {

  return (
    <div className="min-h-screen bg-[#161616] relative overflow-hidden">

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center p-4 space-y-8">        
        
        {/* Join Waitlist Text
        <div className="text-center mb-8">
          <h2 className="text-xl italic text-white" style={{ fontFamily: 'var(--font-libre-baskerville)' }}>
            Join the waitlist to get early access of Helium
          </h2>
        </div> */}
        
        {/* Form Card */}
        <MainCard />
      </div>
    </div>
  );
}
