/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BookingRitual, ReferenceImage, CurrencyType } from './types';
import PortfolioViewer from './components/PortfolioViewer';
import VisionBoard from './components/VisionBoard';
import RatesCalculator from './components/RatesCalculator';
import InquiryForm from './components/InquiryForm';
import SacredLedger from './components/SacredLedger';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Sparkles, 
  User, 
  HelpCircle, 
  VolumeX, 
  Volume2, 
  Instagram, 
  Linkedin, 
  Facebook, 
  MapPin, 
  Scissors, 
  Camera, 
  Feather 
} from 'lucide-react';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyType>('ZAR');
  const [estimatedPrice, setEstimatedPrice] = useState<number>(3500); // defaults to half sleeve
  const [references, setReferences] = useState<ReferenceImage[]>([]);
  const [selectedRefId, setSelectedRefId] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<BookingRitual[]>([]);
  
  // Custom interactive scroll indicator
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize and load from local storage
  useEffect(() => {
    try {
      const cachedInquiries = localStorage.getItem('one_national_inquiries');
      if (cachedInquiries) {
        setInquiries(JSON.parse(cachedInquiries));
      }
      
      const cachedReferences = localStorage.getItem('one_national_references');
      if (cachedReferences) {
        const parsed = JSON.parse(cachedReferences);
        setReferences(parsed);
        if (parsed.length > 0) {
          setSelectedRefId(parsed[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
  }, []);

  // Update progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist inquiries
  const handleAddInquiry = (newInq: BookingRitual) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('one_national_inquiries', JSON.stringify(updated));
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('one_national_inquiries', JSON.stringify(updated));
  };

  // Persist referencing pictures
  const handleAddReference = (newRef: ReferenceImage) => {
    const updated = [newRef, ...references];
    setReferences(updated);
    localStorage.setItem('one_national_references', JSON.stringify(updated));
  };

  const handleDeleteReference = (id: string) => {
    const updated = references.filter((item) => item.id !== id);
    setReferences(updated);
    localStorage.setItem('one_national_references', JSON.stringify(updated));
  };

  const handleUpdateReference = (updatedRef: ReferenceImage) => {
    const updated = references.map((item) => item.id === updatedRef.id ? updatedRef : item);
    setReferences(updated);
    localStorage.setItem('one_national_references', JSON.stringify(updated));
  };

  // Import dynamic image directly from Portfolio layout
  const handleImportFromPortfolio = (imageUrl: string, title: string) => {
    const newRef: ReferenceImage = {
      id: `ref-imported-${Date.now()}`,
      name: `Studio: ${title}`,
      dataUrl: imageUrl,
      filterStyle: 'original',
      rotation: 0,
      scale: 1,
      brightness: 100,
      contrast: 100,
      notes: 'Imported from direct studio archive collection.',
      createdAt: Date.now(),
    };
    handleAddReference(newRef);
    setSelectedRefId(newRef.id);
    
    // Smooth scroll down to workspace section
    const element = document.getElementById('identity-workspace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-gold selection:text-black antialiased overflow-x-hidden">
      
      {/* Absolute Browser Grain Layout */}
      <div className="grainy-noise" />

      {/* Dynamic Scroll Progress indicator */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[3px] bg-gold z-[2000] transition-all duration-100" 
      />

      {/* Styled Micro Announcement bar */}
      <div className="bg-black text-[10px] font-mono text-center py-2 border-b border-white/5 uppercase tracking-widest text-gold/80 flex items-center justify-center gap-4">
        <span>● KURUMAN • HARARE • BULAWAYO • REEF</span>
        <span className="hidden sm:inline text-gray-500">|</span>
        <span className="hidden sm:inline">COUNCIL STATUS: ONLINE & PREPPING REFERENCE INKS</span>
      </div>

      {/* Sticky Premium Blurry Navigation */}
      <nav className="sticky top-0 w-full bg-[#050505]/85 backdrop-blur-xl border-b border-white/5 py-4 z-[1000] transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-2.5 hover:opacity-90 duration-200">
            <span className="font-display text-2xl tracking-widest text-[#FFD700]">
              ONE NATIONAL
            </span>
            <span className="text-gray-650 font-light text-xs font-mono tracking-widest hidden md:inline border-l border-white/10 pl-2.5">
              INK & LENS
            </span>
          </a>

          <div className="hidden md:flex gap-8 items-center">
            <a href="#about-section" className="text-xs font-display text-gray-400 hover:text-[#FFD700] tracking-widest uppercase transition-colors">The Story</a>
            <a href="#portfolio-section" className="text-xs font-display text-gray-400 hover:text-[#FFD700] tracking-widest uppercase transition-colors">Fusion Portfolio</a>
            <a href="#identity-workspace" className="text-xs font-display text-[#FFD700] hover:text-white tracking-widest uppercase transition-all bg-gold/5 px-2.5 py-1 border border-gold/15 rounded-sm">Designer Workspace</a>
            <a href="#pricing-calculator" className="text-xs font-display text-gray-400 hover:text-[#FFD700] tracking-widest uppercase transition-colors">Rates</a>
            <a href="#booking-portal" className="text-xs font-display text-gray-400 hover:text-[#FFD700] tracking-widest uppercase transition-colors">Booking</a>
            <a href="#ledger-dashboard" className="text-xs font-display text-gray-450 hover:text-white tracking-widest uppercase transition-colors">My Ledger ({inquiries.length})</a>
          </div>

          <a 
            href="#identity-workspace" 
            className="md:hidden px-3.5 py-1.5 bg-gold text-black font-display font-semibold tracking-wider text-[10px] uppercase rounded-xs"
          >
            Upload Ref
          </a>
        </div>
      </nav>

      {/* IMMERSIVE HEADER SECTION */}
      <header className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.95) 90%), url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2000&auto=format&fit=crop')" }}>
        
        {/* Subtle Visual overlay tint */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        
        <div className="max-w-4xl mx-auto px-6 text-center z-10 relative space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="space-y-4"
          >
            <span className="text-[#007749] font-bold text-xs uppercase tracking-widest block font-sans">
              ★ PREMIUM INTEGRATIVE FUSION STUDIO
            </span>
            
            <h1 className="font-metal text-6xl md:text-8xl lg:text-9xl text-[#FFD700] leading-none drop-shadow-[0_0_35px_rgba(255,215,0,0.15)] filter saturate-[1.2]">
              ONE NATIONAL INK
            </h1>
            
            <p className="font-display font-light text-white text-lg md:text-2xl tracking-[12px] uppercase">
              Fine Art • Culture • Lens
            </p>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed"
          >
            A high-end sanctuary integrating ancient Great Zimbabwe heritage alignment, 
            ritualistic black-ink artistry, organic hairstyle twists, and raw urban street-photography.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a 
              href="#identity-workspace" 
              className="px-8 py-3.5 bg-gold border border-gold hover:bg-white text-black font-semibold font-display tracking-widest text-xs uppercase rounded-xs transition-colors duration-200"
            >
              Upload Reference File
            </a>
            <a 
              href="#portfolio-section" 
              className="px-8 py-3.5 bg-transparent border border-white/20 hover:border-gold hover:text-gold text-white font-display tracking-widest text-xs uppercase rounded-xs transition-colors duration-200"
            >
              Explore Sanctuary Works
            </a>
          </motion.div>
        </div>

        {/* Ambient scrolling arrow indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">DOWNWARD STORY</span>
          <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
        </div>
      </header>

      {/* CORE WRAPPER */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 space-y-24">

        {/* THE BROTHERS LINEAGE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="about-section">
          
          {/* Custom graphic card frame (5 columns) */}
          <div className="lg:col-span-5 relative group" data-aos="fade-right">
            <div className="absolute inset-0 border border-gold/40 translate-x-3 translate-y-3 z-0" />
            
            <div className="relative bg-[#0b0b0b] border border-white/10 overflow-hidden rounded-xs z-10 aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
                alt="Sanctuary Inner Frame"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 font-mono text-[9px] text-gray-400">
                <span className="text-white text-xs font-semibold block mb-1">Kuruman Sanctuary Office</span>
                SQUARE MATRIX • SOUTH AFRICA
              </div>
            </div>
          </div>

          {/* Core storytelling text content (7 columns) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-sa-green font-bold text-xs uppercase tracking-widest block">
              Kuruman to the Reef • Ancestral Legacy
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white tracking-widest leading-none">
              Two Brothers.<br /><span className="text-gold">One Sacred Legacy.</span>
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              We merge the architectural lines of Great Zimbabwe with the gritty, electric soul of contemporary Southern African pavement culture. 
              Our sanctuaries offer safe, exclusive chambers where the raw permanent markings of the needles cross paths with cinematic lens capture.
            </p>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Whether you seeks a bespoke afro-geometrical sleeve, premium dreadlock crown treatment, or high-fashion studio portraits, we honor your session as a custom ceremony of identity.
            </p>

            {/* Profile of the Brothers Column group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <span className="font-display text-lg text-white font-medium tracking-wider block flex items-center gap-1.5">
                  <Feather className="w-4 h-4 text-gold shrink-0" /> Elder Brother
                </span>
                <span className="text-[10px] font-mono text-gold bg-gold/15 px-2 py-0.5 border border-gold/10 inline-block uppercase">
                  "The Needle" (Ink & Piercing Lead)
                </span>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Specializes in blackwork, traditional chevron lining, and tribal alignments derived from historic artifacts.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-display text-lg text-white font-medium tracking-wider block flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-gold shrink-0" /> Younger Brother
                </span>
                <span className="text-[10px] font-mono text-gold bg-gold/15 px-2 py-0.5 border border-gold/10 inline-block uppercase">
                  "The Lens" (Culture & Crowns Lead)
                </span>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Directs street photography campaigns, editorial portfolios, and organic loc twining craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CULTURAL DISCIPLINE OVERVIEW CARDS */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-sa-green font-bold text-xs uppercase tracking-widest block">
              OUR CHOSEN DISCIPLINES
            </span>
            <h2 className="font-display text-4xl text-white tracking-wider">
              The <span className="text-gold">Fusion Areas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* CARD 1 */}
            <div className="bg-[#0b0b0b] border border-white/5 hover:border-gold p-8 transition-all duration-300 group rounded-xs flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-black border border-white/15 rounded-full flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                  <Feather className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wider group-hover:text-gold transition-colors">
                    The Ink
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mt-2.5">
                    Traditional Afro-realism, minimal geometric chevrons, and deep black patterns. We do not copy; we craft custom stories on skin as an emblem of lineage.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#007749] tracking-widest uppercase block mt-6">
                ELDER BROTHER • TATTOOING
              </span>
            </div>

            {/* CARD 2 */}
            <div className="bg-[#0b0b0b] border border-white/5 hover:border-gold p-8 transition-all duration-300 group rounded-xs flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-black border border-white/15 rounded-full flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                  <Camera className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wider group-hover:text-gold transition-colors">
                    The Lens
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mt-2.5">
                    Authentic urban street photography and professional high-fashion portraits, capturing raw cultural stories with dark, dramatic shadows and editorial grittiness.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#007749] tracking-widest uppercase block mt-6">
                YOUNGER BROTHER • PHOTOGRAPHY
              </span>
            </div>

            {/* CARD 3 */}
            <div className="bg-[#0b0b0b] border border-white/5 hover:border-gold p-8 transition-all duration-300 group rounded-xs flex flex-col justify-between">
              <div className="space-y-5">
                <div className="w-12 h-12 bg-black border border-white/15 rounded-full flex items-center justify-center text-gold group-hover:scale-105 transition-transform duration-300">
                  <Scissors className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-white tracking-wider group-hover:text-gold transition-colors">
                    The Crown
                  </h3>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mt-2.5">
                    Sacred dreadlock twining and structural loc shaping. Includes therapeutic washing ceremonies, organic root styling, and copper bind repairs.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#007749] tracking-widest uppercase block mt-6">
                JOINT TEAM • LOCK MAINTENANCE
              </span>
            </div>

          </div>
        </section>

        {/* 1. PORTFOLIO GRID VIEWER */}
        <PortfolioViewer onImportToWorkspace={handleImportFromPortfolio} />

        {/* 2. IDENTITY WORKSPACE (VISION BOARD IMAGE UPLOADER) */}
        <VisionBoard
          references={references}
          onAddReference={handleAddReference}
          onDeleteReference={handleDeleteReference}
          onUpdateReference={handleUpdateReference}
          selectedRefId={selectedRefId}
          onSelectRef={setSelectedRefId}
        />

        {/* 3. TRANSPARENT PRICING ESTIMATION GRID & INQUIRY FORM COLUMN GROUP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          <RatesCalculator
            selectedCurrency={currency}
            onCurrencyChange={setCurrency}
            onApplyEstimatedPrice={setEstimatedPrice}
          />

          <InquiryForm
            uploadedReferences={references}
            estimatedPrice={estimatedPrice}
            currentCurrency={currency}
            onAddInquiry={handleAddInquiry}
          />
        </div>

        {/* 4. PERSISTENT INQUIRY SACRED LEDGER */}
        <SacredLedger
          inquiries={inquiries}
          onDeleteInquiry={handleDeleteInquiry}
        />

      </main>

      {/* DETAILED ROOT METRICS BANNER MAP */}
      <section className="bg-black py-16 border-t border-b border-white/5 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <span className="text-[#FFD700] hover:text-white duration-300 font-display font-bold text-sm tracking-[5px] uppercase block">
            ONE NATIONAL FUSION STUDIO
          </span>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-widest max-w-xl mx-auto">
            KURUMAN • HARARE • BULAWAYO • THE REEF
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-6 text-xs text-gray-400 font-light">
            <div className="p-3 border border-white/5 bg-[#090909]/50">
              <span className="block font-semibold text-white">Harare Office</span>
              Chitungwiza block
            </div>
            <div className="p-3 border border-white/5 bg-[#090909]/50">
              <span className="block font-semibold text-white">Bulawayo Office</span>
              Leland High precinct
            </div>
            <div className="p-3 border border-white/5 bg-[#090909]/50">
              <span className="block font-semibold text-white">The Reef (JHB)</span>
              Maboneng street grid
            </div>
            <div className="p-3 border border-white/5 bg-[#090909]/50">
              <span className="block font-semibold text-white">Kuruman Office</span>
              Kalahari junction Rd
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black/90 py-16 border-t border-white/5 text-center px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex justify-center gap-6 text-[#FFD700]">
            <a href="#" className="hover:text-white transition-colors duration-200"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors duration-200"><Linkedin className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors duration-200"><Facebook className="w-4 h-4" /></a>
          </div>

          <p className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
            &copy; 2026 ONE NATIONAL LTD. CUSTOM CONCEPT CRAFTED FOR THE SOUTHERN AFRICAN CULTURE.
          </p>
        </div>
      </footer>

      {/* FLOATING INSTANT WHATSAPP BOT BUTTON (User reference) */}
      <a 
        href="https://wa.me/27637002742" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 duration-200 z-[1100] group"
        title="Connect on WhatsApp"
      >
        <svg 
          className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M12.003 2c-5.524 0-10.002 4.478-10.002 10.002 0 1.763.456 3.42 1.251 4.872l-1.328 4.853 4.97-1.305c1.406.764 2.996 1.191 4.686 1.191 5.524 0 10.003-4.477 10.003-10.002C22.005 6.478 17.527 2 12.003 2zm4.587 14.224c-.191.536-.967 1.011-1.485 1.1-.383.067-.881.121-2.427-.518-1.977-.821-3.238-2.825-3.337-2.956-.098-.131-.803-.935-.803-1.78s.443-1.253.602-1.41c.159-.158.347-.197.464-.197.116 0 .233.001.332.005.105.004.246-.04.385.293.144.343.493 1.2.536 1.288.043.088.072.19.014.305-.058.114-.087.185-.174.286-.087.101-.184.226-.264.303-.09.087-.184.182-.079.362.105.18 4.67 1.616 5.109 1.488.109-.131.423-.493.536-.782.113-.289.227-.246.381-.131.154.116 1.054.498 1.2.571.144.073.23.109.263.159.034.051.034.306-.157.842z" />
        </svg>
      </a>

    </div>
  );
}
