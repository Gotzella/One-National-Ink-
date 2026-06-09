/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data';
import { PortfolioItem } from '../types';
import { Camera, Eye, Plus, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortfolioViewerProps {
  onImportToWorkspace: (imageUrl: string, title: string) => void;
}

export default function PortfolioViewer({ onImportToWorkspace }: PortfolioViewerProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ink' | 'lens' | 'crown'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredItems = PORTFOLIO_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="space-y-8" id="portfolio-section">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-sa-green font-bold text-xs uppercase tracking-widest block mb-2">
            The Family Archive
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white tracking-wider">
            Curated <span className="text-gold">Fusion Works</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mt-2 font-light">
            Each artifact is an intersection of ancestral memory and street energy, captured or inked in our regional sanctuaries.
          </p>
        </div>

        {/* Custom Segmented Control tabs */}
        <div className="flex flex-wrap gap-2 bg-black/40 p-1 rounded-sm border border-white/5 self-start">
          {(['all', 'ink', 'lens', 'crown'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase transition-all duration-300 rounded-xs cursor-pointer ${
                activeCategory === category
                  ? 'bg-gold text-black font-semibold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {category === 'all' ? 'All Artifacts' : category}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={item.id}
              className="group relative bg-[#0c0c0c] border border-white/5 overflow-hidden rounded-xs"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image Frame */}
              <div className="relative aspect-square overflow-hidden bg-black">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity duration-300 pointer-events-none" />

                {/* Regional tag */}
                <span className="absolute top-4 left-4 bg-black/80 text-gold font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 border border-gold/20 backdrop-blur-sm">
                  {item.location}
                </span>

                {/* Custom category badge */}
                <span className="absolute top-4 right-4 bg-emerald-950/85 text-emerald-300 font-sans text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border border-emerald-500/10 rounded-full backdrop-blur-sm">
                  {item.category === 'ink' ? 'Ink' : item.category === 'lens' ? 'Lens' : 'Crown'}
                </span>

                {/* Import/Visual Overlay Actions */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/75 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-xs">
                  <p className="text-xs text-center text-gray-300 max-w-[80%] px-4 font-light italic">
                    "{item.description}"
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => onImportToWorkspace(item.imageUrl, item.title)}
                      className="flex items-center gap-1.5 bg-gold hover:bg-white text-black font-semibold font-display tracking-wider text-xs px-4 py-2 rounded-xs transform transition duration-200 active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Vision Board
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 border-t border-white/5 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-xl text-white tracking-wider group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-light mt-1 line-clamp-1">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
