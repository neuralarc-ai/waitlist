"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MainCardProps {}

const MainCard = ({}: MainCardProps) => {
  return (
    <div className="relative w-full max-w-md mx-auto pointer-events-none">
      {/* Card with subtle white border, backdrop blur, and bg-white/5 */}
      <div className="bg-black/10 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl pointer-events-none">
        {/* Form Content */}
        <form className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pointer-events-auto"
            />
          </div>
          
          {/* Name Input */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pointer-events-auto"
            />
          </div>

          {/* Company Input */}
          <div className="space-y-2">
            <label htmlFor="company" className="block text-sm font-medium text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
              Company
            </label>
            <input
              type="text"
              id="company"
              placeholder="Enter your company name"
              className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pointer-events-auto"
            />
          </div>

          {/* Reference Dropdown */}
          <div className="space-y-2">
            <label htmlFor="reference" className="block text-sm font-medium text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
              How did you hear about us?
            </label>
            <Select>
              <SelectTrigger className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent pointer-events-auto h-12">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="social-media" className="text-white hover:bg-gray-700">Social Media</SelectItem>
                <SelectItem value="search-engine" className="text-white hover:bg-gray-700">Search Engine</SelectItem>
                <SelectItem value="referral" className="text-white hover:bg-gray-700">Referral</SelectItem>
                <SelectItem value="news-article" className="text-white hover:bg-gray-700">News Article</SelectItem>
                <SelectItem value="podcast" className="text-white hover:bg-gray-700">Podcast</SelectItem>
                <SelectItem value="conference" className="text-white hover:bg-gray-700">Conference/Event</SelectItem>
                <SelectItem value="other" className="text-white hover:bg-gray-700">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Join Waitlist Button */}
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-white/90 font-medium py-3 px-6 rounded-full transition-all duration-300 pointer-events-auto"
            style={{ fontFamily: 'var(--font-fustat)' }}
          >
            Join Waitlist
          </Button>
        </form>
      </div>
    </div>
  )
}

export default MainCard
