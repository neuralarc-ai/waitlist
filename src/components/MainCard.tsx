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

// Zod validation schema
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  company: z.string().min(1, "Company is required").min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  reference: z.string().min(1, "Please select how you heard about us"),
})

type FormData = z.infer<typeof formSchema>

const MainCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('helium-waitlist')
        .insert([
          {
            first_name: data.firstName,
            last_name: data.lastName,
            company: data.company,
            email: data.email,
            reference: data.reference,
            created_at: new Date().toISOString(),
            user_agent: navigator.userAgent,
            ip_address: null, // Will be handled by Supabase RLS if needed
          }
        ])

      if (error) {
        console.error('Error saving to Supabase:', error)
        alert('There was an error submitting the form. Please try again.')
      } else {
        console.log('Form submitted successfully!')
        alert('Thank you for joining the waitlist!')
        // Reset form after successful submission
        window.location.reload()
      }
    } catch (error) {
      console.error('Unexpected error:', error)
      alert('There was an unexpected error. Please try again.')
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
          
          {/* Name Fields - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
                First Name
              </label>
              <div className="relative">
                <input
                  {...register("firstName")}
                  type="text"
                  id="firstName"
                  placeholder={errors.firstName?.message || "Enter your first name"}
                  className={`w-full px-6 py-6 bg-black/5 rounded-full text-black placeholder-black/50 pointer-events-auto ${
                    errors.firstName ? 'placeholder-red-500 border border-red-500' : ''
                  }`}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-base font-semibold text-black" style={{ fontFamily: 'var(--font-fustat)' }}>
                Last Name
              </label>
              <div className="relative">
                <input
                  {...register("lastName")}
                  type="text"
                  id="lastName"
                  placeholder={errors.lastName?.message || "Enter your last name"}
                  className={`w-full px-6 py-6 bg-black/5 rounded-full text-black placeholder-black/50 pointer-events-auto ${
                    errors.lastName ? 'placeholder-red-500 border border-red-500' : ''
                  }`}
                />
              </div>
            </div>
          </div>
          
          {/* Company and Website Fields - Side by Side */}
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
                <SelectItem value="social-media" className="text-black hover:bg-gray-100 rounded-xl py-2">Ideas2Impacts</SelectItem>
                <SelectItem value="other" className="text-black hover:bg-gray-100 rounded-xl py-2">Other</SelectItem>
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
