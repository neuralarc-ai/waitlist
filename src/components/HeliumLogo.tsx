"use client"

import React from "react"
import Image from "next/image"

const HeliumLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className} `}>
      <div className="flex items-center">
        {/* Logo SVG inverted */}
        <div className="invert">
          <Image
            src="/assets/logo-light.svg"
            alt="Helium Logo"
            width={40}
            height={40}
            className="mr-3"
          />
        </div>
        
        {/* Text */}
        <h1 className="text-5xl font-medium text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
          Helium
        </h1>
      </div>
    </div>
  )
}

export default HeliumLogo
