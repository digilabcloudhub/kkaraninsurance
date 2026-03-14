"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { services, industries } from "@/app/data";

const sliderImages = [
  "/hero-team.png",
  "/financial_plan.jpg",
  "/general_insurance.jpg",
  "/industry.jpg"
];

export default function Home() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedService(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedService]);

  // Auto-slide hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-800">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
            </div>
          </div>
          <nav className="flex items-center justify-between border-t border-zinc-200 py-4">
            <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 rounded">
              <Image
                src="/kakran-logo.png"
                alt="Kakran Insurance - With You Forever"
                width={620}
                height={210}
                className="h-20 w-auto object-contain sm:h-24"
                priority
              />
            </Link>
            <ul className="flex flex-wrap items-center gap-6">
              <li>
                <Link href="/#about" className="text-sm font-medium text-zinc-700 hover:text-[var(--primary)] transition-colors">
                  About Us
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-[var(--primary)] transition-colors"
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  Expertise
                  <span className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
                {servicesOpen && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <ul className="min-w-[200px] rounded-lg border border-zinc-200 bg-white py-2 shadow-lg">
                      {services.map((service) => (
                        <li key={service.id}>
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-[var(--primary)]"
                            onClick={() => {
                              setServicesOpen(false);
                              setSelectedService(service);
                            }}
                          >
                            {service.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link href="/#contact" className="text-sm font-medium text-zinc-700 hover:text-[var(--primary)] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-32 md:py-48 lg:py-64 bg-slate-900">
          {sliderImages.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Kakran Insurance sliding image ${index + 1}`}
              fill
              priority={index === 0}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div
            className="absolute inset-0 bg-slate-900/60"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-4xl">
              <p className="mb-4 text-xl font-bold text-blue-400 tracking-wide">
                Kakran IMF
              </p>
              <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white md:text-6xl leading-tight">
                &ldquo;From Risk Identification to Protection &ndash;
                <span className="text-blue-400"> Insurance-Led</span> Industrial Risk Management.&rdquo;
              </h1>
              <Link
                href="#about"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-base font-medium text-white hover:bg-[var(--primary-dark)] transition-colors"
              >
                Learn more
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Slider Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 z-10">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? "w-8 bg-blue-400" : "w-3 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                  Who we are
                </p>
                <h2 className="mb-6 text-3xl font-bold text-zinc-900">
                  About Kakran Insurance Marketing Pvt. Ltd.
                </h2>
                <p className="text-zinc-600 leading-relaxed">
                  Kakran Insurance Marketing Pvt. Ltd. is an IRDAI-registered Insurance Marketing Firm (IMF) committed to delivering structured, transparent and compliant insurance distribution and service support across retail and corporate segments. Our approach is built on strong governance, process discipline and responsible client engagement, operating strictly within the regulatory framework. Client information is handled with strict confidentiality and used only for authorised service and support in line with regulatory and data‑protection requirements.
                </p>
                <p className="mt-4 text-zinc-600 leading-relaxed">
                  Founded in 2017 by Director & Principal Officer Mr. Dharam Vir Singh, a financial-services professional with over 20 years of experience, Kakran IMF brings deep expertise in risk‑management advisory, insurance planning and strategic client solutions for corporates, SMEs and individuals. Supported by dedicated Operations and Claims Support teams, and a strategic tie‑up with Insurance Samadhan for complex or disputed claims, we provide end‑to‑end support from risk assessment and policy structuring through to servicing and claims assistance.
                </p>
              </div>
              <div className="relative mx-auto h-72 w-full max-w-lg overflow-hidden rounded-2xl lg:h-[350px]">
                <Image
                  src="/about_us.png"
                  alt="About Kakran Insurance"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
            
            {/* Vision & Mission */}
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-zinc-900">Vision & Mission</h3>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6">
                  <h4 className="mb-3 font-semibold text-[var(--primary)]">Client-Centric Advisory Mission</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    “To provide transparent, need-based insurance advisory that aligns real-world industrial risks with suitable protection solutions, ensuring resilience, continuity, and long-term security for clients.”
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6">
                  <h4 className="mb-3 font-semibold text-[var(--primary)]">Risk-transfer & Continuity Vision</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    “To become a trusted partner for industries in achieving operational continuity, risk security, and long-term resilience through insurance-led risk management advisory.”
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6">
                  <h4 className="mb-3 font-semibold text-[var(--primary)]">Integrity & Transparency</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    My guidance is driven by the client’s risk profile, business priorities, and real-world requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Philosophy */}
            <div className="mt-12 border-t border-zinc-100 pt-12">
              <h3 className="mb-6 text-2xl font-bold text-zinc-900">Core Philosophy</h3>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6">
                  <h4 className="mb-3 font-semibold text-[var(--primary)]">Risk Reduction Through Insurance</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Industrial risk cannot be eliminated completely — but it can be reduced, transferred, and financially protected.
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-6">
                  <h4 className="mb-3 font-semibold text-[var(--primary)]">My Advisory Framework Focuses On</h4>
                  <ul className="mb-4 list-disc pl-4 text-sm text-zinc-600 leading-relaxed space-y-1">
                    <li>Understanding real-world risk exposure</li>
                    <li>Mapping exposures to suitable insurance instruments</li>
                    <li>Reducing vulnerability to losses</li>
                    <li>Supporting continuity and resilience for plant operations</li>
                  </ul>
                  <p className="text-sm text-zinc-600 leading-relaxed font-medium">
                    This ensures risk is handled through a balanced approach of prevention + protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Our Clients */}
            <div className="mt-12 border-t border-zinc-100 pt-12">
              <h3 className="mb-6 text-2xl font-bold text-zinc-900">Our Clients</h3>
              <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-8">
                <p className="text-zinc-600 leading-relaxed mb-4">
                  We serve a diverse range of individuals and organizations, providing tailored financial and risk management solutions aligned with their goals, risk profiles, and long-term objectives. Our client relationships are built on transparency, integrity, and consistent performance.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  Our commitment to understanding each client&apos;s unique needs ensures that we offer the most effective strategies and products. Whether it&apos;s personal insurance, corporate risk management, or investment opportunities, we pride ourselves on delivering excellence and fostering trust. By staying abreast of industry trends and regulatory changes, we ensure our clients are always equipped with the best possible advice and solutions.
                </p>
                <p className="text-zinc-600 leading-relaxed">
                  Together, we navigate the complexities of the financial world, securing a prosperous future for all involved. We serve a diverse client base with a strong commitment to trust, compliance, and confidentiality, ensuring every solution is delivered responsibly and in the best interest of the client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="border-t border-zinc-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-3xl font-bold text-zinc-900">
              Find the right insurance for your business
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  id={service.id}
                  onClick={() => setSelectedService(service)}
                  className="group flex flex-col items-start text-left scroll-mt-24 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[var(--primary)]/30 transition-all"
                >
                  <h3 className="mb-3 text-lg font-semibold text-zinc-900 group-hover:text-[var(--primary)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-4 whitespace-pre-line">
                    {service.description}
                  </p>
                  <span className="mt-4 text-sm font-medium text-[var(--primary)] group-hover:underline">
                    Read more &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section id="quote" className="border-t border-zinc-200 bg-[var(--primary)] py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Get a Quote
            </h2>
            <p className="mb-6 text-blue-100">
              Fill in a few details and we'll get back to you for retail or corporate enquiries.
            </p>
            <Link
              href="#contact"
              className="inline-flex rounded-full bg-white px-8 py-3 text-base font-medium text-[var(--primary)] hover:bg-blue-50 transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </section>

        {/* Industry Section */}
        <section id="industry" className="border-t border-zinc-200 bg-zinc-50/50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Sectors we serve
            </p>
            <h2 className="mb-10 text-3xl font-bold text-zinc-900">
              Industry we serve
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {industries.map((name) => (
                <div
                  key={name}
                  className="flex h-24 items-center justify-center rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm transition-all hover:border-[var(--primary)] hover:shadow-md hover:-translate-y-1"
                >
                  <span className="font-medium text-zinc-900">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="border-t border-zinc-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
                FAQ
              </p>
              <h2 className="mb-4 text-3xl font-bold text-zinc-900">
                Frequently asked questions
              </h2>
              <p className="text-zinc-600">
                Find quick answers to common questions about Kakran Insurance services, onboarding and claims support.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Who does Kakran Insurance work with?
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  We work with corporates, SMEs, industrial clients and individuals who need structured, compliant insurance and risk‑management support. Engagements range from single‑policy placements to long‑term advisory relationships.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  How do you help with claims?
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  Our in‑house Claims Support Team assists from claim intimation to final settlement, coordinating documentation and follow‑ups with insurers. For complex or disputed cases, we leverage our strategic tie‑up with Insurance Samadhan to strengthen claim resolution.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  What types of insurance solutions do you offer?
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  We provide corporate and industrial risk solutions, general insurance, life insurance, group employee benefits, and investment & estate‑planning–linked protection, depending on the client's risk profile and objectives.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  How can a new client get started?
                </h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                  You can reach out through the contact form below or email us with brief details of your requirement. Our team will schedule a discussion to understand your operations, review existing covers and suggest appropriate insurance options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="border-t border-zinc-200 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold text-zinc-900">
                Contact Us
              </h2>
              <p className="mb-10 text-lg text-zinc-600 leading-relaxed">
                We welcome inquiries from individuals and organizations seeking reliable financial and risk management guidance.
                Communications are handled with strict confidentiality and in accordance with applicable regulatory and compliance standards.
              </p>
              <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-zinc-50 p-8">
                  <h3 className="text-xl font-semibold text-zinc-900">Phone</h3>
                  <div className="flex flex-col items-start gap-3 text-zinc-600">
                    <a href="tel:+919810244118" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 9810244118
                    </a>
                    <a href="tel:+919266516004" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 9266516004
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-zinc-50 p-8">
                  <h3 className="text-xl font-semibold text-zinc-900">Email</h3>
                  <div className="flex flex-col items-start gap-3 text-zinc-600">
                    <a href="mailto:Sales.kakranimf@gmail.com" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Sales.kakranimf@gmail.com
                    </a>
                    <a href="mailto:Kakranimf@gmail.com" className="flex items-center gap-2 hover:text-[var(--primary)] transition-colors">
                      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Kakranimf@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Service Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedService(null)}
            aria-hidden="true"
          />
          <div 
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-zinc-900/5 transition-all max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {selectedService.image && (
              <div className="relative h-64 w-full shrink-0 sm:h-80 md:h-[450px] bg-zinc-100">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="mb-4 text-2xl font-bold text-zinc-900">
                {selectedService.title}
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed whitespace-pre-line">
                {selectedService.description}
              </p>
            </div>
            <div className="border-t border-zinc-100 bg-zinc-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setSelectedService(null)}
                className="rounded-lg bg-zinc-200 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-300 transition-colors"
              >
                Close
              </button>
            </div>
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-zinc-200 bg-zinc-900 py-8 text-zinc-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
            <a
              href="https://www.linkedin.com/company/kakran-insurance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              aria-label="LinkedIn"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/kakraninsurance"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
              aria-label="Facebook"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
          </div>
          <p className="mt-6 text-center text-sm">
            © {new Date().getFullYear()} Kakran Insurance. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}