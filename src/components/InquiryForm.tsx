/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ServiceType, ReferenceImage, BookingRitual, CurrencyType } from '../types';
import { Mail, Calendar, User, FileText, Send, Sparkles, CheckCircle2, Link } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryFormProps {
  uploadedReferences: ReferenceImage[];
  estimatedPrice: number;
  currentCurrency: CurrencyType;
  onAddInquiry: (inquiry: BookingRitual) => void;
}

export default function InquiryForm({
  uploadedReferences,
  estimatedPrice,
  currentCurrency,
  onAddInquiry,
}: InquiryFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>('Tattoo Inquiry');
  const [preferredArtist, setPreferredArtist] = useState<'The Needle (Elder Brother)' | 'The Lens (Younger Brother)' | 'Any Brother'>('Any Brother');
  const [preferredDate, setPreferredDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRefIds, setSelectedRefIds] = useState<string[]>([]);
  
  // Submit complete notification
  const [showSuccess, setShowSuccess] = useState(false);
  const [recentInquiryId, setRecentInquiryId] = useState('');

  // Auto-fill selected references if there is any uploaded
  React.useEffect(() => {
    if (uploadedReferences.length > 0 && selectedRefIds.length === 0) {
      // Auto-select the first one
      setSelectedRefIds([uploadedReferences[0].id]);
    }
  }, [uploadedReferences]);

  const handleToggleRefSelection = (id: string) => {
    if (selectedRefIds.includes(id)) {
      setSelectedRefIds(selectedRefIds.filter((item) => item !== id));
    } else {
      setSelectedRefIds([...selectedRefIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !preferredDate) {
      alert('Please fill out Name, Email, and Preferred date to consult the brothers.');
      return;
    }

    // Capture files checked by client
    const attachedRefs = uploadedReferences.filter((ref) => selectedRefIds.includes(ref.id));

    const newInquiry: BookingRitual = {
      id: `ritual-${Date.now()}`,
      fullName,
      email,
      serviceType,
      description: description || 'No conceptual description added.',
      preferredArtist,
      preferredDate,
      currency: currentCurrency,
      estimatedPrice,
      referenceImages: attachedRefs,
      status: 'In Council',
      createdAt: Date.now(),
    };

    onAddInquiry(newInquiry);
    setRecentInquiryId(newInquiry.id);
    
    // Clear form states
    setFullName('');
    setEmail('');
    setDescription('');
    setSelectedRefIds([]);
    
    // Trigger gorgeous visual success alert
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="bg-[#0b0b0b] border border-white/5 p-6 md:p-8 space-y-6 relative" id="booking-portal">
      {/* Absolute success visual modal banner */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 bg-black/95 z-40 flex flex-col items-center justify-center text-center p-6 border border-gold"
          >
            <div className="w-16 h-16 bg-gold/10 border border-gold/40 text-gold rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl text-white tracking-widest uppercase">
              Ritual Initiated
            </h3>
            <p className="text-gray-400 text-xs font-light max-w-sm mt-3 leading-relaxed">
              Your session blueprint is now being reviewed by the brothers. The council will sync your cosmic vision and send an encrypted callback inside 48 hours.
            </p>
            <div className="mt-5 text-[10px] font-mono text-gold bg-gold/5 px-3 py-1 border border-gold/10">
              LEDGER ID: {recentInquiryId}
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 px-4 py-2 bg-gold/15 hover:bg-gold text-gold hover:text-black font-display tracking-widest text-xs uppercase border border-gold/30 transition-all cursor-pointer"
            >
              Consult general area
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-b border-white/5 pb-4">
        <span className="text-sa-green font-bold text-xs uppercase tracking-widest block mb-2">
          STATION III • THE COUNCIL CALLING
        </span>
        <h2 className="font-display text-3xl text-white tracking-wider">
          Initiate <span className="text-gold">Ritual</span>
        </h2>
        <p className="text-gray-400 text-xs font-light mt-1">
          Synchronize your name, select preferred dates, and link your custom adjusted references to begin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Core Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 animate-fadeIn">
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Full Name / Identity:
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Khari Ndlovu"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-black border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-gold outline-none rounded-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Secure Email Address:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                placeholder="khari@legacy.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-gold outline-none rounded-none"
              />
            </div>
          </div>
        </div>

        {/* Categories Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Interest Focus:
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as ServiceType)}
              className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-gold outline-none rounded-none cursor-pointer"
            >
              <option value="Tattoo Inquiry">Tattoo Inquiry</option>
              <option value="Photography Booking">Photography Booking</option>
              <option value="Piercing">Piercing</option>
              <option value="Hair Artistry">Hair Artistry</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Preferred Artisan Brother:
            </label>
            <select
              value={preferredArtist}
              onChange={(e) => setPreferredArtist(e.target.value as any)}
              className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-gold outline-none rounded-none cursor-pointer"
            >
              <option value="Any Brother">Either Brother (Council choice)</option>
              <option value="The Needle (Elder Brother)">The Needle (Elder - Ink focus)</option>
              <option value="The Lens (Younger Brother)">The Lens (Younger - Lens focus)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Sacred Date Request:
            </label>
            <div className="relative">
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                required
                className="w-full bg-black border border-white/10 p-3 text-xs text-white focus:border-gold outline-none rounded-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            Aesthetic Vision Detail:
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
            <textarea
              rows={3}
              placeholder="Describe the historical or personal depth of this session. What are we materializing?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-white/10 pl-10 pr-4 py-3 text-sm text-white focus:border-gold outline-none rounded-none resize-none"
            />
          </div>
        </div>

        {/* Attach references section (Crucial for User uploads!) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-mono text-sa-green uppercase tracking-widest font-bold flex items-center gap-1.5">
              <Link className="w-3.5 h-3.5" /> Attach Uploaded References ({selectedRefIds.length})
            </h4>
            <span className="text-[9px] text-gray-500">
              Only references uploaded above can be linked
            </span>
          </div>

          {uploadedReferences.length === 0 ? (
            <div className="p-4 border border-dashed border-white/5 bg-black/20 text-center text-xs text-gray-500 rounded-sm">
              No references uploaded yet. You can submit without a linked reference, or upload on the workspace above first!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {uploadedReferences.map((ref) => {
                const isSelected = selectedRefIds.includes(ref.id);
                return (
                  <div
                    key={ref.id}
                    onClick={() => handleToggleRefSelection(ref.id)}
                    className={`flex items-center gap-2.5 p-2 border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-gold bg-gold/5'
                        : 'border-white/5 bg-black/40 hover:bg-black/70'
                    }`}
                  >
                    <div className="w-8 h-8 bg-black overflow-hidden relative flex-shrink-0">
                      <img src={ref.dataUrl} alt={ref.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-[10.5px] truncate text-gray-300 flex-grow">{ref.name}</span>
                    <div className={`w-3.5 h-3.5 border flex items-center justify-center shrink-0 ${isSelected ? 'border-gold text-gold':'border-gray-600'}`}>
                      {isSelected && <div className="w-1.5 h-1.5 bg-gold" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Contribution summary and submission */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center p-4 bg-black border border-white/10 gap-4 mt-2">
          <div>
            <span className="text-[10px] font-mono text-gray-500 uppercase">Valuation Estimate Linked:</span>
            <span className="font-display text-xl text-gold block">
              {currentCurrency === 'ZAR' ? 'R' : '$'}{estimatedPrice.toLocaleString()}
            </span>
          </div>
          
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gold hover:bg-white text-black font-semibold font-display tracking-widest text-xs uppercase cursor-pointer rounded-xs transition-colors shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Launch Ritual Inquiry
          </button>
        </div>

      </form>
    </div>
  );
}
