"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { studio } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".contact-reveal"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const purposeLabels: Record<string, string> = {
      wedding: "Booking — Wedding / Event Photography",
      newborn: "Booking — Newborn Session",
      maternity: "Booking — Maternity / Portrait",
      portrait: "Booking — Portrait / Family Shoot",
    };

    const lines = [
      "New inquiry from the Passion Photography website",
      "--------------------------------",
      `Name: ${formData.name}`,
      formData.email && `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      formData.purpose &&
        `Purpose: ${purposeLabels[formData.purpose] ?? formData.purpose}`,
      formData.message && `Message: ${formData.message}`,
    ].filter(Boolean) as string[];

    window.open(
      `https://wa.me/${studio.phoneRaw}?text=${encodeURIComponent(
        lines.join("\n")
      )}`,
      "_blank",
      "noopener,noreferrer"
    );

    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        purpose: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-dark-bg">
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16"
      >
        <div className="space-y-8">
          <div>
            <span className="contact-reveal text-gold text-sm font-semibold uppercase tracking-[0.3em]">
              Get In Touch
            </span>
            <h2 className="contact-reveal text-4xl md:text-5xl font-bold text-warm-white mt-4">
              Let&apos;s Create
              <br />
              Your Story
            </h2>
            <p className="contact-reveal text-muted-text text-lg mt-4">
              Whether you&apos;re planning your dream wedding or your newborn&apos;s
              first session — we&apos;re here to help you take the next step.
            </p>
          </div>

          <div className="space-y-5">
            <a
              href={`tel:${studio.phoneRaw}`}
              className="contact-reveal flex items-center gap-4 group"
            >
              <div className="metal-chip w-12 h-12 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-warm-white font-medium">Phone</p>
                <p className="text-muted-text">{studio.phone}</p>
              </div>
            </a>

            <div className="contact-reveal flex items-center gap-4 group">
              <div className="metal-chip w-12 h-12 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-warm-white font-medium">Studio</p>
                <p className="text-muted-text">
                  Shop Number 8, 1st Floor, TJ Shopping Mall, Mine SBI Circle,
                  Gandhi Nagar, Kurnool 518001
                </p>
              </div>
            </div>

            <div className="contact-reveal flex items-center gap-4 group">
              <div className="metal-chip w-12 h-12 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-warm-white font-medium">Hours</p>
                <p className="text-muted-text">
                  {studio.hours} · Serving {studio.areasServed}
                </p>
              </div>
            </div>
          </div>

          <div className="contact-reveal pt-6 border-t border-gold/10 space-y-4">
            <p className="text-warm-white font-medium text-sm">
              Book Instantly
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${studio.phoneRaw}?text=${encodeURIComponent(
                  "Hi Passion Photography, I'd like to inquire about booking."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba5a] transition-all hover:scale-105 active:scale-95"
              >
                WhatsApp Booking
              </a>
              <a
                href={`tel:${studio.phoneRaw}`}
                className="px-5 py-2.5 rounded-full border border-gold/20 text-gold text-sm hover:bg-gold/10 transition-all hover:scale-105 active:scale-95"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>

        <div className="contact-reveal p-8 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent">
          <h3 className="text-xl font-bold text-warm-white mb-6">
            Send Us a Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted-text mb-2">
                What would you like to book? *
              </label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gold/20 text-warm-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              >
                <option value="">Select your purpose</option>
                <option value="wedding">
                  📸 Booking — Wedding / Event Photography
                </option>
                <option value="newborn">
                  👶 Booking — Newborn Session
                </option>
                <option value="maternity">
                  🤰 Booking — Maternity / Baby
                </option>
                <option value="portrait">
                  📸 Booking — Portrait / Family Shoot
                </option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-muted-text mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gold/20 text-warm-white placeholder-warm-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-text mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gold/20 text-warm-white placeholder-warm-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-text mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gold/20 text-warm-white placeholder-warm-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            <div>
              <label className="block text-sm text-muted-text mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-gold/20 text-warm-white placeholder-warm-white/30 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all resize-none"
                placeholder="Tell us about your event or what you'd like to learn..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                submitted
                  ? "bg-green-600 text-white cursor-default"
                  : "btn-silver hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {submitted ? "✓ Opening WhatsApp…" : "Send via WhatsApp"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}