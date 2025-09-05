"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WaitlistFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WaitlistFormDialog = ({ open, onOpenChange }: WaitlistFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reference: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Waitlist form submitted:", formData)
    // Reset form and close dialog
    setFormData({ name: "", email: "", company: "", reference: "" })
    onOpenChange(false)
    // You could add a success toast here
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-3xl border-[0.5px] border-white/5">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Be the first to experience the future of AI orchestration
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium text-gray-700">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Enter your company name"
              value={formData.company}
              onChange={handleInputChange}
              required
              className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reference" className="text-sm font-medium text-gray-700">
              How did you hear about us?
            </Label>
            <Input
              id="reference"
              name="reference"
              type="text"
              placeholder="Social media, friend, search, etc."
              value={formData.reference}
              onChange={handleInputChange}
              className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Join Waitlist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default WaitlistFormDialog
