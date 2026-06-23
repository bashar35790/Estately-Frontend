"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Form, TextField, Button, Input, FieldError } from "@heroui/react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

export default function GlassLoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  // Re-creating the visibility toggle action from your reference image concept
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Form Submission handler (adapted from your provided concept)
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Extract and validate form fields
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        setSubmitError("Please fill in all fields.");
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe: true,
      });

      if (error) {
        setSubmitError(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        router.push("/");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // FULL-PAGE CONTAINER with Landscape Background
    <div
      className="relative flex min-h-screen w-full items-center justify-center p-4"
      style={{
        // Replace with your actual background image path
        backgroundImage: `url('https://images.unsplash.com/photo-1602941525421-8f8b81d3edbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Background Overlay - Adds depth and ensures readability */}
      <div className="absolute inset-0 z-0 bg-black/10" />

      {/* GLASSMORPHISM LOGIN FORM / CARD */}
      <Form
        onSubmit={onSubmit}
        className="
          relative
          z-10
          flex
          w-full
          max-w-120
          flex-col
          gap-7
          rounded-[32px]
          border
          border-white/20
          bg-white/10
          p-10
          shadow-2xl
          backdrop-blur-[15px]
          sm:w-[90%]
        "
      >

        {/* Header Text Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Login
          </h1>
          <p className="text-base font-normal text-white/90">
            Welcome back please login to your account
          </p>
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="flex flex-col gap-5">

          {/* Email Input Field (styled to look like "User Name" in image) */}
          <TextField
            isRequired
            name="email"
            type="email"
            // Reusing your concept validation
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <div className="relative">
              <Input
                placeholder="Email Address"
                aria-label="Email Address"
                className="
                  glass-input
                  w-full
                  rounded-[15px]
                  border
                  border-white/30
                  bg-transparent
                  px-5
                  py-4
                  text-lg
                  font-medium
                  text-white
                  placeholder:text-white/60
                  focus:border-white/60
                  focus:outline-none
                  focus:ring-1
                  focus:ring-white/30
                "
              />
              <Mail className="absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/60" />
            </div>
            <FieldError className="mt-1.5 px-2 text-sm text-rose-300" />
          </TextField>

          {/* Password Input Field with Toggle */}
          <TextField
            isRequired
            name="password"
            type={isVisible ? "text" : "password"}
            minLength={8}
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Need one uppercase letter";
              if (!/[0-9]/.test(value)) return "Need one number";
              return null;
            }}
          >
            <div className="relative">
              <Input
                placeholder="Password"
                aria-label="Password"
                className="
                  glass-input
                  w-full
                  rounded-[15px]
                  border
                  border-white/30
                  bg-transparent
                  px-5
                  py-4
                  text-lg
                  font-medium
                  text-white
                  placeholder:text-white/60
                  focus:border-white/60
                  focus:outline-none
                  focus:ring-1
                  focus:ring-white/30
                "
              />
              {/* Password visibility toggle button inside the field */}
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white focus:outline-none"
              >
                {isVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <FieldError className="mt-1.5 px-2 text-sm text-rose-300" />
          </TextField>
        </div>

        {/* --- FORM ACTIONS --- */}
        <div className="flex flex-col gap-6">
          {submitError && (
            <div className="rounded-3xl border border-rose-400/50 bg-rose-500/10 px-4 py-3 text-sm text-rose-300 backdrop-blur-sm">
              {submitError}
            </div>
          )}

          {/* Main Login Submit Button (using the design gradient) */}
          <Button
            type="submit"
            isDisabled={isSubmitting}
            className="
              w-full
              rounded-[15px]
              bg-linear-to-r from-primary to-primary/80
              py-5
              text-xl
              font-semibold
              text-black
              shadow-lg
              transition-opacity
              hover:opacity-90
              disabled:opacity-50
            "
            size="lg"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {/* Footer Navigation Link */}
          <div className="text-center text-base text-white/90">
            Dont have an account?{" "}
            <Link href="/auth/signup" className="font-semibold text-white hover:underline">
              Signup
            </Link>
          </div>
        </div>

      </Form>
    </div>
  );
}
