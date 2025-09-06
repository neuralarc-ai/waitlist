"use client"

import React from "react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Zod validation schema
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required").min(2, "Full name must be at least 2 characters"),
  company: z.string().min(1, "Company is required").min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  reference: z.string().min(1, "Please select how you heard about us"),
  referralSource: z.string().min(1, "Please select a reference option"),
  referralSourceOther: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const MainCard = () => {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  })

  const referralSourceValue = watch("referralSource")

  const onSubmit = async (data: FormData) => {
    try {
      console.log('Form data being submitted:', data)
      
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            full_name: data.fullName,
            company: data.company,
            email: data.email,
            reference: data.reference,
            referral_source: data.referralSource,
            referral_source_other: data.referralSourceOther,
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
        toast({
          variant: "success",
          title: "Welcome to the Waitlist!",
          description: "Thank you for joining the waitlist. We'll notify you when Helium is ready.",
        })
        // Reset form after successful submission
        window.location.reload()
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
  return (
    <div className="relative w-full max-w-2xl mx-auto pointer-events-none">
      {/* Main Card with Background Image */}
      <div 
        className="relative rounded-3xl shadow-2xl pointer-events-none overflow-hidden p-8 pb-0 pt-12"
        style={{
          backgroundImage: 'url(/assets/waitlist.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Helium Logo and Text Header */}
        <div className="flex items-center justify-center w-full mb-8">
          <div className="invert">
            <Image
              src="/assets/logo-light.svg"
              alt="Helium Logo"
              width={40}
              height={40}
              className="mr-3"
            />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-fustat)' }}>
            Helium
          </h1>
        </div>
        
        {/* White Card at Bottom */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Title */}
          <h2 className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'var(--font-fustat)' }}>
            Join the waitlist
          </h2>
          
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
              Full Name
            </label>
            <div className="relative">
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                placeholder={errors.fullName?.message || "Enter your full name"}
                className={`w-full px-6 py-6 bg-black/5 rounded-full text-black placeholder-black/50 pointer-events-auto ${
                  errors.fullName ? 'placeholder-red-500 border border-red-500' : ''
                }`}
              />
            </div>
          </div>
          
          {/* Company and Email Fields - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="company" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
                Company
              </label>
              <div className="relative">
                <input
                  {...register("company")}
                  type="text"
                  id="company"
                  placeholder={errors.company?.message || "Enter your company"}
                  className={`w-full px-6 py-6 bg-black/5 rounded-full text-black placeholder-black/50 pointer-events-auto ${
                    errors.company ? 'placeholder-red-500 border border-red-500' : ''
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
                Email
              </label>
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder={errors.email?.message || "Enter your email"}
                  className={`w-full px-6 py-6 bg-black/5 rounded-full text-black placeholder-black/50 pointer-events-auto ${
                    errors.email ? 'placeholder-red-500 border border-red-500' : ''
                  }`}
                />
              </div>
            </div>
          </div>
          
          {/* Reference Dropdown */}
          <div className="space-y-2">
            <label htmlFor="reference" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
              How did you hear about us?
            </label>
            <Select onValueChange={(value) => setValue("reference", value)}>
              <SelectTrigger className={`w-full px-6 py-8 bg-black/5 rounded-full text-black pointer-events-auto shadow-none ${
                errors.reference ? 'border border-red-500' : ''
              }`}>
                <SelectValue placeholder={errors.reference?.message || "Select an option"} />
              </SelectTrigger>
              <SelectContent className="bg-white/80 backdrop-blur-3xl border-gray-200 rounded-2xl">
                <SelectItem value="Ideas2Impact" className="text-black hover:bg-gray-100 rounded-xl py-2">Ideas2Impact</SelectItem>
                <SelectItem value="Other" className="text-black hover:bg-gray-100 rounded-xl py-2">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* References Dropdown */}
          <div className="space-y-2">
            <label htmlFor="referralSource" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
              References
            </label>
            <Select onValueChange={(value) => setValue("referralSource", value)}>
              <SelectTrigger className={`w-full px-6 py-8 bg-black/5 rounded-full text-black pointer-events-auto shadow-none ${
                errors.referralSource ? 'border border-red-500' : ''
              }`}>
                <SelectValue placeholder={errors.referralSource?.message || "Select how you found us"} />
              </SelectTrigger>
              <SelectContent className="bg-white/80 backdrop-blur-3xl border-gray-200 rounded-2xl">
                <SelectItem value="google-search" className="text-black hover:bg-gray-100 rounded-xl py-2">Google/Search Engine</SelectItem>
                <SelectItem value="social-media" className="text-black hover:bg-gray-100 rounded-xl py-2">Social Media</SelectItem>
                <SelectItem value="event" className="text-black hover:bg-gray-100 rounded-xl py-2">Event</SelectItem>
                <SelectItem value="community" className="text-black hover:bg-gray-100 rounded-xl py-2">Community</SelectItem>
                <SelectItem value="newsletter" className="text-black hover:bg-gray-100 rounded-xl py-2">Newsletter</SelectItem>
                <SelectItem value="work-recommendation" className="text-black hover:bg-gray-100 rounded-xl py-2">Work Recommendation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/80 cursor-pointer font-semibold py-8 px-6 rounded-full transition-all duration-300 pointer-events-auto"
            style={{ fontFamily: 'var(--font-fustat)' }}
          >
            Let&apos;s Get Started
          </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MainCard
