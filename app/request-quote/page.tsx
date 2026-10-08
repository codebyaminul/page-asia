'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Wrench,
  Zap,
  Info,
} from 'lucide-react';

const INQUIRY_TYPES = [
  'Garage Equipment',
  'EV Parts',
  'Workshop Solution',
  'Service',
  'General Inquiry',
] as const;

function RequestQuoteContent() {
  const searchParams = useSearchParams();

  const initialProduct = searchParams.get('product') || '';
  const initialType = searchParams.get('type') || 'Garage Equipment';
  const initialVehicle = searchParams.get('vehicle') || '';

  const [formData, setFormData] = React.useState({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    inquiryType: initialType,
    productName: initialProduct,
    vehicleType: initialVehicle,
    quantity: '1',
    message: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Sync if query params change
  React.useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({
        ...prev,
        productName: initialProduct,
        inquiryType: initialType,
        vehicleType: initialVehicle,
      }));
    }
  }, [initialProduct, initialType, initialVehicle]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Contact name is required';
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

  const isEV = formData.inquiryType === 'EV Parts';

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
                <span className="text-white font-semibold">Request Quote</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-page-charcoal border border-page-darkgray text-page-lightgray text-xs font-mono">
                <FileText className="h-3.5 w-3.5 text-page-red" />
                <span>Formal B2B Pricing & Specifications Desk</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Request a Formal Quotation
              </h1>

              <p className="text-lg md:text-xl text-page-midgray max-w-2xl mx-auto leading-relaxed">
                Receive commercial pricing, wholesale lot tiers, equipment freight estimates, and installation schedules directly from PAGE International engineering specialists.
              </p>
            </div>
          </Container>
        </section>

        {/* 3. Form Section */}
        <SectionWrapper variant="light" noPadding className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg border border-page-lightgray p-8 md:p-12 shadow-xs space-y-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Inquiry Type Selector */}
                  <div className="space-y-2.5">
                    <Label className="text-sm font-bold text-page-nearblack">
                      1. Select Inquiry Classification
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const isSelected = formData.inquiryType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, inquiryType: type })}
                            className={`py-2.5 px-3 text-xs font-mono rounded border transition-all text-center ${
                              isSelected
                                ? type === 'EV Parts'
                                  ? 'bg-ev-teal text-white border-ev-teal font-bold shadow-xs'
                                  : 'bg-page-nearblack text-white border-page-nearblack font-bold shadow-xs'
                                : 'bg-page-offwhite text-page-charcoal border-page-lightgray hover:border-page-midgray'
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Contact Details */}
                  <div className="pt-4 border-t border-page-lightgray space-y-4">
                    <span className="text-sm font-bold text-page-nearblack block">
                      2. Contact & Organization Information
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rfq-fullname">
                          Contact Name <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="rfq-fullname"
                          placeholder="e.g. Tariqul Islam"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`mt-1.5 ${errors.fullName ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.fullName && (
                          <p className="text-[11px] text-page-red mt-1">{errors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="rfq-company">Workshop / Organization</Label>
                        <Input
                          id="rfq-company"
                          placeholder="e.g. Premier Auto Hub Ltd."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rfq-phone">
                          Phone Number <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="rfq-phone"
                          placeholder="e.g. +880 1712-345678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`mt-1.5 ${errors.phone ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-page-red mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="rfq-email">
                          Corporate Email <span className="text-page-red">*</span>
                        </Label>
                        <Input
                          id="rfq-email"
                          type="email"
                          placeholder="e.g. service@premierauto.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`mt-1.5 ${errors.email ? 'border-page-red ring-1 ring-page-red' : ''}`}
                        />
                        {errors.email && (
                          <p className="text-[11px] text-page-red mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Equipment & Quantity Specifications */}
                  <div className="pt-4 border-t border-page-lightgray space-y-4">
                    <span className="text-sm font-bold text-page-nearblack block">
                      3. Equipment, Product & Vehicle Scope
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Label htmlFor="rfq-product">Product / Equipment Model</Label>
                        <Input
                          id="rfq-product"
                          placeholder="e.g. Two-Post Car Lift 4T or 60V 1500W BLDC Motor"
                          value={formData.productName}
                          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>

                      <div>
                        <Label htmlFor="rfq-quantity">Unit Quantity</Label>
                        <Input
                          id="rfq-quantity"
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>

                    {/* Vehicle Type Field */}
                    <div>
                      <Label htmlFor="rfq-vehicle">Vehicle Platform Application (Optional)</Label>
                      <Input
                        id="rfq-vehicle"
                        placeholder="e.g. 2-Wheeler (E-Scooter), 3-Wheeler (E-Rickshaw), Passenger Car, or N/A"
                        value={formData.vehicleType}
                        onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="rfq-notes">Facility Specifications & Project Notes</Label>
                      <textarea
                        id="rfq-notes"
                        rows={3}
                        placeholder="Specify site floor dimensions, ceiling clearance, single/three-phase power availability, or preferred delivery timeframe..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="mt-1.5 flex w-full rounded-md border border-page-lightgray bg-white px-3 py-2 text-sm text-page-nearblack placeholder:text-page-midgray/70 focus-visible:outline-none focus-visible:border-page-red focus-visible:ring-1 focus-visible:ring-page-red transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-4 border-t border-page-lightgray space-y-3">
                    <div className="flex items-center gap-2 text-xs text-page-midgray">
                      <ShieldCheck className="h-4 w-4 text-page-red" />
                      <span>Formal B2B quotation dispatched with technical documentation and lead times</span>
                    </div>

                    <Button
                      type="submit"
                      variant={isEV ? 'ev' : 'primary'}
                      size="lg"
                      className="w-full font-bold uppercase tracking-wider text-xs gap-2 h-12"
                    >
                      <span>Submit Quotation Request</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>

                    <p className="text-[11px] font-mono text-page-midgray text-center">
                      Prototype demonstration · No real backend submission is processed
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
                      Quotation Request Received
                    </h3>
                    <p className="text-sm text-page-midgray leading-relaxed">
                      Thank you. Your request has been submitted successfully. Our team will contact you shortly.
                    </p>
                    {formData.productName && (
                      <p className="text-xs text-page-midgray/80 pt-1 font-mono">
                        Referenced scope: <span className="text-page-nearblack font-semibold">{formData.productName}</span> ({formData.quantity} unit{parseInt(formData.quantity) > 1 ? 's' : ''})
                      </p>
                    )}
                  </div>

                  <div className="p-5 bg-page-offwhite rounded-md border border-page-lightgray text-left text-xs max-w-md mx-auto space-y-2.5 font-technical">
                    <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                      <span className="text-page-midgray">Contact Person:</span>
                      <span className="text-page-nearblack font-semibold">{formData.fullName}</span>
                    </div>
                    {formData.companyName && (
                      <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                        <span className="text-page-midgray">Organization:</span>
                        <span className="text-page-nearblack font-semibold">{formData.companyName}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                      <span className="text-page-midgray">Inquiry Type:</span>
                      <span className="text-page-nearblack font-semibold">{formData.inquiryType}</span>
                    </div>
                    {formData.vehicleType && (
                      <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                        <span className="text-page-midgray">Vehicle Platform:</span>
                        <span className="text-page-nearblack font-semibold">{formData.vehicleType}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                      <span className="text-page-midgray">Direct Phone:</span>
                      <span className="text-page-nearblack font-semibold">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                      <span className="text-page-midgray">Email Notice:</span>
                      <span className="text-page-nearblack font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-page-midgray">Status:</span>
                      <span className="text-emerald-700 font-bold">LOGGED IN DEMO SYSTEM</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/" className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="font-mono text-xs w-full sm:w-auto">
                        Back to Home
                      </Button>
                    </Link>
                    <Link href="/garage-equipment" className="w-full sm:w-auto">
                      <Button variant="primary" size="sm" className="font-mono text-xs w-full sm:w-auto">
                        Continue Browsing
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          fullName: '',
                          companyName: '',
                          phone: '',
                          email: '',
                          inquiryType: 'Garage Equipment',
                          productName: '',
                          vehicleType: '',
                          quantity: '1',
                          message: '',
                        });
                      }}
                      className="font-mono text-xs w-full sm:w-auto text-page-midgray hover:text-page-nearblack"
                    >
                      New Inquiry
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-page-offwhite flex items-center justify-center font-mono text-xs text-page-midgray">Loading Quotation Desk...</div>}>
      <RequestQuoteContent />
    </React.Suspense>
  );
}
