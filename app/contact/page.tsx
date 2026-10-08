'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
  Info,
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    inquiryType: 'Garage Equipment',
    message: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      errs.email = 'Corporate email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-page-offwhite">
      {/* 1. Global Navigation */}
      <Navbar />

      <main className="flex-1 pb-20">
        {/* 2. Hero Section */}
        <section className="bg-page-nearblack text-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-page-darkgray relative overflow-hidden">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs font-mono text-page-midgray mb-2">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-white font-semibold">Contact</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <Mail className="h-3.5 w-3.5 text-page-red" />
                <span>Direct Commercial Inquiry Desk</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Contact PAGE International
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                Connect with our technical sales engineers for machinery quotations, electric vehicle parts batch inquiries, turnkey workshop setup, or field service.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Main Contact Split Layout */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT: Contact Information & Technical Desks (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-label text-page-red font-mono font-semibold tracking-wider block">
                  Communication Channels
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-page-nearblack">
                  Corporate Inquiries & Regional Desks
                </h2>
                <p className="text-sm text-page-midgray leading-relaxed">
                  Our technical advisors are available to assess floor plans, power configurations, and component delivery schedules.
                </p>
              </div>

              {/* Prototype Contact Notice */}
              <div className="p-4 rounded-md bg-white border border-page-lightgray flex items-start gap-2.5 text-xs text-page-midgray">
                <Info className="h-4 w-4 text-page-red shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Desk:</strong> The contact details below are demo placeholders for this website prototype demonstration.
                </span>
              </div>

              {/* Contact Channels Cards */}
              <div className="space-y-4 font-technical">
                <div className="p-5 rounded-lg bg-white border border-page-lightgray space-y-2">
                  <div className="flex items-center gap-2.5 text-page-nearblack font-bold text-sm">
                    <Phone className="h-4 w-4 text-page-red" />
                    <span>Technical Support & Sales Hotline</span>
                  </div>
                  <p className="text-xs text-page-charcoal font-mono pl-6">
                    +880 1700-000000 / +880 2-9880000 (Sample Desk)
                  </p>
                  <p className="text-[11px] text-page-midgray pl-6">
                    Saturday – Thursday: 9:00 AM – 6:00 PM
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-page-lightgray space-y-2">
                  <div className="flex items-center gap-2.5 text-page-nearblack font-bold text-sm">
                    <Mail className="h-4 w-4 text-page-red" />
                    <span>Direct Inquiries</span>
                  </div>
                  <p className="text-xs text-page-charcoal font-mono pl-6">
                    info@page-asia.com · sales@page-asia.com
                  </p>
                  <p className="text-[11px] text-page-midgray pl-6">
                    Quotations dispatched within 24 working hours
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-white border border-page-lightgray space-y-2">
                  <div className="flex items-center gap-2.5 text-page-nearblack font-bold text-sm">
                    <MapPin className="h-4 w-4 text-page-red" />
                    <span>Commercial Headquarters & Demonstration Bay</span>
                  </div>
                  <p className="text-xs text-page-charcoal pl-6">
                    PAGE International Ltd. · Dhaka, Bangladesh (Sample Office)
                  </p>
                </div>
              </div>

              {/* SLA Guarantee Box */}
              <div className="p-5 rounded-lg bg-page-nearblack text-white space-y-2 text-xs font-technical">
                <div className="flex items-center gap-2 font-bold text-page-lightgray">
                  <ShieldCheck className="h-4 w-4 text-page-red" />
                  <span>B2B Commercial Turnaround Commitment</span>
                </div>
                <p className="text-page-midgray leading-relaxed">
                  All formal quotation inquiries receive detailed engineering breakdowns, freight estimations, and manufacturer specification sheets.
                </p>
              </div>
            </div>

            {/* RIGHT: Interactive Inquiry Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-lg border border-page-lightgray p-8 md:p-10 shadow-xs">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-page-nearblack tracking-tight">
                        Send a Direct Commercial Inquiry
                      </h3>
                      <p className="text-xs text-page-midgray">
                        Specify your project scope, equipment requirement, or technical question below.
                      </p>
                    </div>

                    {/* Inquiry Type Radio / Pill Selection */}
                    <div className="space-y-2">
                      <Label>Inquiry Focus Area</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          'Garage Equipment',
                          'EV Parts & Systems',
                          'Workshop Solution',
                          'Technical Service',
                          'General Inquiry',
                        ].map((type) => {
                          const isSelected = formData.inquiryType === type;
                          return (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, inquiryType: type })}
                              className={`py-2 px-3 text-xs font-mono rounded border transition-all text-center ${
                                isSelected
                                  ? 'bg-page-nearblack text-white border-page-nearblack font-bold shadow-xs'
                                  : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                              }`}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contact Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-name">
                          Contact Name <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="contact-name"
                          placeholder="e.g. Mahfuzur Rahman"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`mt-1.5 ${errors.fullName ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-page-red mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contact-company">Workshop / Organization</Label>
                        <Input
                          id="contact-company"
                          placeholder="e.g. Delta Motors Ltd."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    {/* Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-phone">
                          Phone Number <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="contact-phone"
                          placeholder="e.g. +880 1711-223344"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`mt-1.5 ${errors.phone ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-page-red mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="contact-email">
                          Corporate Email <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="contact-email"
                          type="email"
                          placeholder="e.g. contact@deltamotors.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`mt-1.5 ${errors.email ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-page-red mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <Label htmlFor="contact-message">Requirements & Project Details</Label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Please describe your requirements (e.g. machinery models, EV voltages/quantities, facility square footage, or preferred timeline)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1.5 flex w-full rounded-md border border-page-lightgray bg-white px-3 py-2 text-sm text-page-nearblack placeholder:text-page-midgray/70 focus-visible:outline-none focus-visible:border-page-red focus-visible:ring-1 focus-visible:ring-page-red transition-colors"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full font-bold uppercase tracking-wider text-xs gap-2 h-12"
                      >
                        <span>Submit Commercial Inquiry</span>
                        <Send className="h-4 w-4" />
                      </Button>
                      <p className="text-[11px] font-mono text-page-midgray text-center mt-2">
                        Prototype form demonstration · No backend transmission performed
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 mx-auto flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>

                    <div className="space-y-2 max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-page-nearblack tracking-tight">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-page-midgray leading-relaxed">
                        Thank you, <strong className="text-page-nearblack">{formData.fullName}</strong>. Your inquiry regarding <strong className="text-page-nearblack">{formData.inquiryType}</strong> has been logged in our demonstration system.
                      </p>
                      <p className="text-sm font-semibold text-page-red pt-1">
                        Our technical team will contact you shortly.
                      </p>
                    </div>

                    <div className="p-4 bg-page-offwhite rounded-md border border-page-lightgray text-left text-xs max-w-md mx-auto space-y-2 font-technical">
                      <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                        <span className="text-page-midgray">Organization:</span>
                        <span className="text-page-nearblack font-semibold">{formData.companyName || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                        <span className="text-page-midgray">Inquiry Focus:</span>
                        <span className="text-page-nearblack font-semibold">{formData.inquiryType}</span>
                      </div>
                      <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                        <span className="text-page-midgray">Email Notice:</span>
                        <span className="text-page-nearblack font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-page-midgray">Status:</span>
                        <span className="text-emerald-700 font-bold">QUEUED FOR TECHNICAL REVIEW</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="font-mono text-xs w-full sm:w-auto">
                          Back to Home
                        </Button>
                      </Link>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({
                            fullName: '',
                            companyName: '',
                            phone: '',
                            email: '',
                            inquiryType: 'Garage Equipment',
                            message: '',
                          });
                        }}
                        className="font-mono text-xs w-full sm:w-auto"
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
