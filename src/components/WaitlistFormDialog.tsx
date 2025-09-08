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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface WaitlistFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const WaitlistFormDialog = ({ open, onOpenChange }: WaitlistFormDialogProps) => {
  const { toast } = useToast()
  const [showThankYou, setShowThankYou] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    reference: "",
    referralSource: "",
    referralSourceOther: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Check if Supabase is properly configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Supabase is not properly configured. Please contact support.",
        })
        return
      }
      
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            full_name: formData.fullName,
            company: formData.company,
            email: formData.email,
            reference: formData.reference,
            referral_source: formData.referralSource,
            referral_source_other: formData.referralSourceOther,
            user_agent: navigator.userAgent,
            ip_address: null, // Will be handled by Supabase RLS if needed
          }
        ])

      if (error) {
        console.error('Error saving to Supabase:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        
        // Handle specific error cases
        if (error.code === '23505' && error.message.includes('email')) {
          toast({
            variant: "destructive",
            title: "Email Already Registered",
            description: "This email address is already registered. Please use a different email or check if you've already joined the waitlist.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Submission Error",
            description: error.message || 'Unknown error occurred',
          })
        }
        } else {
          console.log('Form submitted successfully!')
          // Show thank you message instead of toast
          setShowThankYou(true)
          // Reset form data
          setFormData({ fullName: "", email: "", company: "", reference: "", referralSource: "", referralSourceOther: "" })
        }
    } catch (error) {
      console.error('Unexpected error:', error)
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "There was an unexpected error. Please try again.",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, referralSource: value }))
  }

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, referralSourceOther: e.target.value }))
  }

  const handleOkayClick = () => {
    setShowThankYou(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-3xl border-[0.5px] border-white/5">
        {showThankYou ? (
          // Thank You Message
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Helium AI!
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 text-center">
              <p className="text-gray-700 leading-relaxed">
                Thank you for joining the Helium AI waitlist and for your patience while we build something extraordinary. Your enthusiasm means the world to us.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We are working hard to ensure that your first experience with Helium is smooth, powerful, and unforgettable. Your invite code will be landing in your inbox very soon, and you will be among the first to explore how Helium can transform your workflows and supercharge productivity.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Stay tuned. The future of AI for business is closer than ever, and you are part of it.
              </p>
            </div>
            
            <Button 
              onClick={handleOkayClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Okay
            </Button>
          </div>
        ) : (
          // Form Content
          <>
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
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
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
          
          <div className="space-y-2">
            <Label htmlFor="referralSource" className="text-sm font-medium text-gray-700">
              References
            </Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Select how you found us" />
              </SelectTrigger>
              <SelectContent className="bg-white/80 backdrop-blur-3xl border-gray-200">
                <SelectItem value="google-search">Google/Search Engine</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {formData.referralSource === "other" && (
              <Input
                name="referralSourceOther"
                type="text"
                placeholder="Please specify..."
                value={formData.referralSourceOther}
                onChange={handleOtherInputChange}
                className="bg-white/80 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Join Waitlist
          </Button>
        </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default WaitlistFormDialog
