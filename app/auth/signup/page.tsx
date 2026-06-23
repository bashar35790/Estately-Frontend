"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Mail, Eye, EyeOff, ImageIcon, Loader2, Search, Users, Check } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-toastify";

// Types 

interface ImgBBResponse {
  data: {
    id: string;
    url: string;
    display_url: string;
  };
  success: boolean;
  status: number;
}

type Role = "tenant" | "owner";

interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
}

// Helpers 

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  return { score: score as PasswordStrength["score"], label: labels[score] };
}

const strengthColors: Record<number, string> = {
  0: "bg-white/10",
  1: "bg-red-400",
  2: "bg-orange-400",
  3: "bg-yellow-400",
  4: "bg-[#A3CF16]",
};

const strengthTextColors: Record<number, string> = {
  0: "text-transparent",
  1: "text-red-400",
  2: "text-orange-400",
  3: "text-yellow-400",
  4: "text-[#A3CF16]",
};

function validateEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

//  Sub-components 

interface FieldWrapperProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FieldWrapper({ label, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="px-1 text-[11px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </label>
      {children}
      {error && (
        <p className="px-1 text-xs text-rose-400">{error}</p>
      )}
    </div>
  );
}

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

function GlassInput({ icon, rightElement, className, ...props }: GlassInputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        className={[
          "w-full rounded-[14px] border border-white/15 bg-white/[0.07]",
          "px-4 py-3.5 text-[15px] text-white placeholder:text-white/30",
          "outline-none transition-all duration-200",
          "focus:border-white/40 focus:bg-white/[0.11]",
          rightElement ? "pr-12" : icon ? "pr-12" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {icon && !rightElement && (
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/35">
          {icon}
        </span>
      )}
      {rightElement && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightElement}
        </span>
      )}
    </div>
  );
}

//  Main Component 

export default function SignupForm() {
  const router = useRouter();

  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("tenant");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Photo state
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Partial<Record<
    "name" | "email" | "password" | "confirmPassword" | "photo" | "form",
    string
  >>>({});

  const strength = getPasswordStrength(password);

  //  Validation 

  const validate = useCallback(() => {
    const next: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) next.name = "Enter your full name";
    if (!validateEmail(email)) next.email = "Enter a valid email address";
    if (!photoUrl) next.photo = "A profile photo is required";
    if (password.length < 8) next.password = "Must be at least 8 characters";
    if (password !== confirmPassword) next.confirmPassword = "Passwords don't match";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, photoUrl, password, confirmPassword]);

  //  Photo upload

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    setPhotoPreview(URL.createObjectURL(file));
    setIsUploading(true);
    setErrors((prev) => ({ ...prev, photo: undefined }));

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const result: ImgBBResponse = await res.json();

      if (result.success && result.data?.url) {
        setPhotoUrl(result.data.url);
      } else {
        setPhotoPreview("");
        setErrors((prev) => ({ ...prev, photo: "Upload failed — please try again." }));
      }
    } catch {
      setPhotoPreview("");
      setErrors((prev) => ({ ...prev, photo: "Network error during upload." }));
    } finally {
      setIsUploading(false);
    }
  };

  //  Submit

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, form: undefined }));

    try {
      const { data, error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoUrl,
        userRole: role,
        plan: "free",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);

      if (error) {
        setErrors((prev) => ({ ...prev, form: error.message ?? "Signup failed." }));
        return;
      }

      if (data) {
        toast.success("Account created! Check your email to verify.");
        router.push("/auth/login");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Live field validation after first submit attempt

  const clearError = (key: keyof typeof errors) => {
    if (submitted) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Render 

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center p-4 py-12"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="
          relative z-10 w-full max-w-[460px]
          rounded-[28px] border border-white/[0.18]
          bg-white/[0.09] p-8 sm:p-10
          shadow-[0_8px_48px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.15)]
          backdrop-blur-[22px]
        "
      >
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[2rem] font-bold tracking-tight text-white leading-none mb-1.5">
            Create account
          </h1>
          <p className="text-[13.5px] text-white/55 font-normal">
            Join to manage your job search or recruitment
          </p>
        </div>

        <div className="flex flex-col gap-4">

          {/* Full Name */}
          <FieldWrapper label="Full name" error={errors.name}>
            <GlassInput
              type="text"
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value); clearError("name"); }}
              placeholder="Jane Smith"
              autoComplete="name"
              icon={<User size={16} />}
            />
          </FieldWrapper>

          {/* Email */}
          <FieldWrapper label="Email address" error={errors.email}>
            <GlassInput
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
              placeholder="jane@example.com"
              autoComplete="email"
              icon={<Mail size={16} />}
            />
          </FieldWrapper>

          {/* Photo Upload */}
          <FieldWrapper label="Profile photo" error={errors.photo}>
            <label
              className={[
                "flex cursor-pointer items-center justify-between",
                "rounded-[14px] border px-4 py-3.5",
                "transition-all duration-200",
                photoUrl
                  ? "border-[#A3CF16]/50 bg-[#A3CF16]/[0.08]"
                  : "border-dashed border-white/20 bg-white/[0.07] hover:border-white/35 hover:bg-white/[0.10]",
              ].join(" ")}
            >
              <span
                className={[
                  "text-[15px] font-normal truncate max-w-[300px]",
                  photoUrl ? "text-[#A3CF16]" : "text-white/35",
                ].join(" ")}
              >
                {isUploading
                  ? "Uploading…"
                  : photoUrl
                    ? "✓ Photo uploaded"
                    : "Choose a photo"}
              </span>

              {isUploading ? (
                <Loader2 size={17} className="shrink-0 animate-spin text-white/50" />
              ) : photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Preview"
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0 rounded-full border-[1.5px] border-[#A3CF16]/70 object-cover"
                />
              ) : (
                <ImageIcon size={17} className="shrink-0 text-white/35" />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={isUploading}
                className="hidden"
                aria-label="Upload profile photo"
              />
            </label>
          </FieldWrapper>

          {/* Password */}
          <FieldWrapper label="Password" error={errors.password}>
            <GlassInput
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
              placeholder="Minimum 8 characters"
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-white/40 transition-colors hover:text-white/80"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />

            {/* Strength meter */}
            {password && (
              <div className="mt-1 flex flex-col gap-1 px-0.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={[
                        "h-[3px] flex-1 rounded-full transition-all duration-300",
                        i <= strength.score ? strengthColors[strength.score] : "bg-white/10",
                      ].join(" ")}
                    />
                  ))}
                </div>
                {strength.label && (
                  <p className={`text-[11px] font-medium ${strengthTextColors[strength.score]}`}>
                    {strength.label}
                  </p>
                )}
              </div>
            )}
          </FieldWrapper>

          {/* Confirm Password */}
          <FieldWrapper label="Confirm password" error={errors.confirmPassword}>
            <GlassInput
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
              placeholder="Repeat your password"
              autoComplete="new-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="text-white/40 transition-colors hover:text-white/80"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />
          </FieldWrapper>

          {/* Role Toggle */}
          <FieldWrapper label="I am a">
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { value: "tenant", label: "Tenant", Icon: Search },
                  { value: "owner", label: "Owner", Icon: Users },
                ] as { value: Role; label: string; Icon: React.ElementType }[]
              ).map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRole(value)}
                  className={[
                    "flex items-center justify-center gap-2 rounded-[12px] border",
                    "py-3 text-[13.5px] font-medium transition-all duration-200",
                    role === value
                      ? "border-[#A3CF16]/55 bg-[#A3CF16]/[0.12] text-[#A3CF16]"
                      : "border-white/15 bg-white/[0.07] text-white/50 hover:border-white/30 hover:text-white/75",
                  ].join(" ")}
                >
                  <Icon
                    size={15}
                    className={role === value ? "text-[#A3CF16]" : "text-white/40"}
                  />
                  {label}
                  {role === value && <Check size={13} className="text-[#A3CF16]" />}
                </button>
              ))}
            </div>
          </FieldWrapper>
        </div>

        {/* Form-level error */}
        {errors.form && (
          <div className="mt-5 rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-[13px] text-rose-300">
            {errors.form}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isUploading || isSubmitting}
          className="
            mt-6 w-full rounded-[14px] py-3.5
            bg-linear-to-r from-[#A3CF16] to-[#7aad00]
            text-[15px] font-semibold text-[#1a2200]
            shadow-[0_2px_20px_rgba(163,207,22,0.3)]
            transition-all duration-200
            hover:opacity-90 active:scale-[0.99]
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-[13px] text-white/50">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-white hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
