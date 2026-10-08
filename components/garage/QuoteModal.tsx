'use client';

import * as React from 'react';
import { Product, QuoteFormData } from '@/types';
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
}

export function QuoteModal({ open, onOpenChange, product }: QuoteModalProps) {
  const isEV = product?.division === 'ev-parts';


  const [formData, setFormData] = React.useState<QuoteFormData>({

    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    productName: '',
    productSku: '',
    vehicleType: '',
    quantity: '1',
    message: '',
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Sync product when changed
  React.useEffect(() => {
    if (product) {
      const defaultVehicle = product.vehicleCompatibility?.includes('both')
        ? '2-Wheeler & 3-Wheeler (Universal)'
        : product.vehicleCompatibility?.includes('2-wheeler')
        ? '2-Wheeler EV'
        : product.vehicleCompatibility?.includes('3-wheeler')
        ? '3-Wheeler EV'
        : '';

      setFormData((prev) => ({
        ...prev,
        productName: product.name,
        productSku: product.sku,
        vehicleType: defaultVehicle,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        productName: prev.productName || 'General Product Inquiry',
        productSku: prev.productSku || 'GENERAL',
        vehicleType: prev.vehicleType || '',
      }));
    }
  }, [product]);

  // Reset state on open/close
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setIsSubmitted(false);
        setErrors({});
      }, 300);
    }
  }, [open]);


  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Contact name is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={isEV ? 'ev' : 'red'}>
                  {isEV ? 'EV Powertrain & Component Quotation' : 'Commercial Equipment Quotation'}
                </Badge>
                {product && (
                  <Badge variant="brand" className="text-[11px]">
                    SKU: {product.sku}
                  </Badge>
                )}
              </div>
              <DialogTitle>Request a Formal Equipment Quote</DialogTitle>
              <DialogDescription>
                {isEV
                  ? 'Submit your EV component requirements. A PAGE International technical sales engineer will provide B2B pricing, wholesale lot tiers, and lead-time schedules.'
                  : 'Submit your workshop requirements. A PAGE International technical sales engineer will provide official pricing, freight specifications, and lead-time schedules.'}
              </DialogDescription>
            </DialogHeader>

            {/* Selected Product Information Box */}
            {product && (
              <div className="mb-6 p-3.5 bg-page-offwhite rounded-md border border-page-lightgray flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-page-midgray block">
                    {isEV ? 'Selected EV Component:' : 'Selected Equipment:'}
                  </span>
                  <div className="font-bold text-sm text-page-nearblack">
                    {product.name}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-page-midgray font-technical">
                    <span>Brand: <strong className="text-page-nearblack">{product.brand}</strong></span>
                    <span>·</span>
                    <span>Status: <strong className="text-page-nearblack">{product.availability || 'In Stock'}</strong></span>
                    {formData.vehicleType && (
                      <>
                        <span>·</span>
                        <span className="text-ev-teal font-semibold">{formData.vehicleType}</span>
                      </>
                    )}
                  </div>
                </div>
                <Wrench className={`h-5 w-5 shrink-0 mt-1 ${isEV ? 'text-ev-teal' : 'text-page-red'}`} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rfq-fullname">
                    Contact Name <span className="text-page-red">*</span>
                  </Label>
                  <Input
                    id="rfq-fullname"
                    placeholder="e.g. Tariqul Islam"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`mt-1.5 ${errors.email ? 'border-page-red ring-1 ring-page-red' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-page-red mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="rfq-product">{isEV ? 'Inquired EV Component' : 'Inquired Equipment'}</Label>
                  <Input
                    id="rfq-product"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    className="mt-1.5 bg-page-offwhite"
                  />
                </div>

                <div>
                  <Label htmlFor="rfq-qty">Unit Quantity</Label>
                  <Input
                    id="rfq-qty"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>
              </div>

              {/* Vehicle Type (especially for EV parts or workshop conversions) */}
              <div>
                <Label htmlFor="rfq-vehicle">Vehicle Type Application</Label>
                <Input
                  id="rfq-vehicle"
                  placeholder="e.g. 2-Wheeler (E-Scooter) or 3-Wheeler (E-Rickshaw)"
                  value={formData.vehicleType || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, vehicleType: e.target.value })
                  }
                  className="mt-1.5"
                />
              </div>


              <div>
                <Label htmlFor="rfq-message">Project Notes & Workshop Location</Label>
                <textarea
                  id="rfq-message"
                  rows={3}
                  placeholder="Specify floor space dimensions, single-phase or three-phase power availability, or preferred installation timeframe..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-1.5 flex w-full rounded-md border border-page-lightgray bg-white px-3 py-2 text-sm text-page-nearblack placeholder:text-page-midgray/70 focus-visible:outline-none focus-visible:border-page-red focus-visible:ring-1 focus-visible:ring-page-red transition-colors"
                />
              </div>

              <div className="pt-4 border-t border-page-lightgray flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-page-midgray">
                  <ShieldCheck className="h-4 w-4 text-page-red" />
                  <span>Authorized distributor direct quote with warranty support</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto font-bold uppercase tracking-wider text-xs gap-1.5"
                  >
                    <span>Submit Request</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-page-red/10 border border-page-red/20 mx-auto flex items-center justify-center text-page-red">
              <CheckCircle2 className="h-10 w-10 text-page-red" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-page-nearblack tracking-tight">
                Request Received
              </h3>
              <p className="text-sm text-page-midgray leading-relaxed">
                Thank you, <strong className="text-page-nearblack">{formData.fullName}</strong>. Your quotation request for <strong className="text-page-nearblack">{formData.productName}</strong> ({formData.quantity} unit{parseInt(formData.quantity) > 1 ? 's' : ''}) has been logged in our prototype system.
              </p>
              <p className="text-sm font-semibold text-page-red pt-1">
                Our team will contact you shortly.
              </p>
            </div>

            <div className="p-4 bg-page-offwhite rounded-md border border-page-lightgray text-left text-xs max-w-md mx-auto space-y-2 font-technical">
              <div className="flex justify-between border-b border-page-lightgray/80 pb-1.5">
                <span className="text-page-midgray">Organization:</span>
                <span className="text-page-nearblack font-semibold">{formData.companyName || 'Not specified'}</span>
              </div>
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
                <span className="text-page-red font-bold">QUEUED FOR TECHNICAL REVIEW</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center gap-3">
              <Button
                variant="primary"
                onClick={() => onOpenChange(false)}
                className="font-bold uppercase tracking-wider text-xs px-6"
              >
                Close & Continue Browsing
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
