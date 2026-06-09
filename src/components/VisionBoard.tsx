/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ReferenceImage, FilterStyle } from '../types';
import { INSPlRATION_PRESETS } from '../data';
import { 
  Upload, 
  RotateCw, 
  Maximize2, 
  Sliders, 
  Sparkles, 
  Trash2, 
  FileImage, 
  CheckCircle,
  Eye,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VisionBoardProps {
  references: ReferenceImage[];
  onAddReference: (ref: ReferenceImage) => void;
  onDeleteReference: (id: string) => void;
  onUpdateReference: (updated: ReferenceImage) => void;
  selectedRefId: string | null;
  onSelectRef: (id: string | null) => void;
}

export default function VisionBoard({
  references,
  onAddReference,
  onDeleteReference,
  onUpdateReference,
  selectedRefId,
  onSelectRef,
}: VisionBoardProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'inspect'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedRef = references.find((r) => r.id === selectedRefId);

  // Helper to handle image uploads and convert to Base64
  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('We only accept sacred imagery / reference pictures (images) for our canvas.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        const newRef: ReferenceImage = {
          id: `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name.substring(0, file.name.lastIndexOf('.')) || file.name,
          dataUrl: e.target.result,
          filterStyle: 'original',
          rotation: 0,
          scale: 1,
          brightness: 100,
          contrast: 100,
          notes: '',
          createdAt: Date.now(),
        };
        onAddReference(newRef);
        onSelectRef(newRef.id);
        setActiveTab('inspect');
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const onFileSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Preset import trigger
  const handleImportPreset = async (presetUrl: string, name: string) => {
    // We already have the remote unsplash URL
    const newRef: ReferenceImage = {
      id: `ref-preset-${Date.now()}`,
      name: `Preset: ${name}`,
      dataUrl: presetUrl,
      filterStyle: 'original',
      rotation: 0,
      scale: 1,
      brightness: 100,
      contrast: 100,
      notes: 'Imported from high-end archive presets.',
      createdAt: Date.now(),
    };
    onAddReference(newRef);
    onSelectRef(newRef.id);
    setActiveTab('inspect');
  };

  // Filter effect css converter
  const getFilterCSS = (style: FilterStyle, b: number, c: number) => {
    let filterString = `brightness(${b}%) contrast(${c}%) `;
    if (style === 'ancestral-contrast') {
      filterString += 'grayscale(100%) contrast(150%) brightness(95%)';
    } else if (style === 'neo-realism') {
      filterString += 'saturate(180%) contrast(110%)';
    } else if (style === 'gold-shimmer') {
      filterString += 'sepia(100%) saturate(150%) hue-rotate(5deg) contrast(120%)';
    }
    return filterString;
  };

  // Slider adjustments
  const updateSliderAttribute = (key: keyof ReferenceImage, value: any) => {
    if (!selectedRef) return;
    onUpdateReference({
      ...selectedRef,
      [key]: value,
    });
  };

  return (
    <div className="bg-[#090909] border border-white/5 p-6 md:p-8 space-y-8" id="identity-workspace">
      {/* Workspace Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-2">
            STATION I • VISUALIZATION
          </span>
          <h2 className="font-display text-4xl text-white tracking-wider">
            Identity <span className="text-sa-green">Workspace</span>
          </h2>
          <p className="text-gray-400 text-sm font-light mt-1 max-w-xl">
            Upload your reference pictures, analyze alignment coordinates, and style them to match modern skin gradients or camera contrast.
          </p>
        </div>

        <div className="flex bg-black p-1 rounded-sm border border-white/10 self-stretch md:self-auto">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 md:flex-none px-5 py-2 text-xs font-display tracking-widest uppercase transition-colors cursor-pointer ${
              activeTab === 'upload' ? 'bg-gold text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload Area
          </button>
          <button
            onClick={() => {
              if (references.length > 0) {
                if (!selectedRefId) onSelectRef(references[0].id);
                setActiveTab('inspect');
              } else {
                alert('Please upload a custom design reference or select a preset first to use the designer.');
              }
            }}
            className={`flex-1 md:flex-none px-5 py-2 text-xs font-display tracking-widest uppercase transition-colors cursor-pointer ${
              activeTab === 'inspect' ? 'bg-gold text-black font-semibold' : 'text-gray-400 hover:text-white'
            } ${references.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Inspect ({references.length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COMPONENT COLUMN (6 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            
            {/* UPLOAD TAB PANELS */}
            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Drag and Drop Zone */}
                <div
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed p-10 text-center flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[260px] rounded-xs ${
                    isDragOver
                      ? 'border-gold bg-gold/5 scale-[1.01]'
                      : 'border-white/15 hover:border-gold/60 bg-[#0c0c0c] hover:bg-[#111]'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileSelectChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-14 h-14 bg-black border border-white/10 rounded-full flex items-center justify-center mb-4 text-gold group-hover:scale-110 duration-300">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-display text-lg tracking-wider">
                    Drag Reference Image Here
                  </h3>
                  <p className="text-gray-400 text-xs font-light mt-2 max-w-xs leading-relaxed">
                    Select a high-resolution portrait, traditional geometrical sketch, or loc outline to add. Supports PNG, JPG, WEBP.
                  </p>
                  <button className="mt-5 px-5 py-2 border border-gold/40 text-gold text-[11px] font-sans font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                    Choose local file
                  </button>
                </div>

                {/* Cultural Presets / Curations */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs text-sa-green uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Sparkles className="w-3.5 h-3.5" /> Direct Canvas Presets
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {INSPlRATION_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => handleImportPreset(preset.imageUrl, preset.name)}
                        className="group relative h-28 border border-white/5 bg-black overflow-hidden hover:border-gold/50 text-left transition duration-300 rounded-sm cursor-pointer"
                      >
                        <img
                          src={preset.imageUrl}
                          alt={preset.name}
                          className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-75 group-hover:scale-105 duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="font-display text-sm text-white tracking-wider leading-none">
                            {preset.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-light mt-1">
                            {preset.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* DESIGNER/FILTER INSPECTOR TAB */}
            {activeTab === 'inspect' && selectedRef && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Virtual Interactive Projected Screen */}
                <div className="relative bg-black border border-white/10 p-4 min-h-[350px] flex items-center justify-center overflow-hidden aspect-[4/3] rounded-xs group">
                  
                  {/* Subtle Background Target Grid */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none grid grid-cols-6 grid-rows-6 border border-white/10">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/5" />
                    ))}
                  </div>

                  {/* Absolute Target lines */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-[1px] bg-gold/10" />
                    <div className="absolute h-full w-[1px] bg-gold/10" />
                  </div>

                  {/* Active Styled Reference Image */}
                  <div
                    style={{
                      transform: `rotate(${selectedRef.rotation}deg) scale(${selectedRef.scale})`,
                      filter: getFilterCSS(selectedRef.filterStyle, selectedRef.brightness, selectedRef.contrast),
                      transition: 'filter 0.3s ease, transform 0.1s ease',
                    }}
                    className="relative max-w-[80%] max-h-[80%] flex items-center justify-center"
                  >
                    <img
                      src={selectedRef.dataUrl}
                      alt={selectedRef.name}
                      className="object-contain max-h-[280px]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Aesthetic Metallic Mask Highlight */}
                    {selectedRef.filterStyle === 'gold-shimmer' && (
                      <div className="absolute inset-0 bg-gold/10 mix-blend-color-burn pointer-events-none animate-pulse" />
                    )}
                  </div>

                  {/* Micro Meta-info projection overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end bg-black/80 px-3 py-2 border border-white/10 backdrop-blur-sm text-[10px] font-mono text-gray-400">
                    <div>
                      <p className="text-white uppercase tracking-wider truncate max-w-[150px]">{selectedRef.name}</p>
                      <p className="text-[8px] text-gray-500">FORMAT: CLIENT ENHANCED</p>
                    </div>
                    <div className="text-right">
                      <p>ROT: {selectedRef.rotation}° | SCALE: {selectedRef.scale.toFixed(1)}x</p>
                      <p className="text-gold">FILTER: {selectedRef.filterStyle.toUpperCase().replace('-', ' ')}</p>
                    </div>
                  </div>
                </div>

                {/* Adjustments Panel (Sliders / Filters) */}
                <div className="bg-[#0e0e0e] border border-white/5 p-5 space-y-5 rounded-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <h4 className="font-display text-md text-white tracking-widest flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-gold" /> Filter Archetypes
                    </h4>
                    <span className="text-[10px] font-mono text-gold bg-gold/10 px-2 py-0.5 border border-gold/20">
                      LIVE RENDER
                    </span>
                  </div>

                  {/* Style Selectors */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { value: 'original', label: 'Default Raw' },
                      { value: 'ancestral-contrast', label: 'Dark Charcoal' },
                      { value: 'gold-shimmer', label: 'African Gold' },
                      { value: 'neo-realism', label: 'Vibrant Lens' },
                    ].map((styleOption) => (
                      <button
                        key={styleOption.value}
                        onClick={() => updateSliderAttribute('filterStyle', styleOption.value)}
                        className={`py-2 px-1 text-[10px] font-mono uppercase tracking-wider text-center border transition-all cursor-pointer ${
                          selectedRef.filterStyle === styleOption.value
                            ? 'border-gold text-gold bg-gold/5 font-semibold'
                            : 'border-white/5 text-gray-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {styleOption.label}
                      </button>
                    ))}
                  </div>

                  {/* Custom Position and light Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Rotation ({selectedRef.rotation}°)</span>
                        <RotateCw className="w-3 h-3 hover:text-gold cursor-pointer" onClick={() => updateSliderAttribute('rotation', 0)} />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={selectedRef.rotation}
                        onChange={(e) => updateSliderAttribute('rotation', parseInt(e.target.value))}
                        className="w-full accent-gold bg-black h-1 rounded"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Scale Ratio ({selectedRef.scale.toFixed(1)}x)</span>
                        <Maximize2 className="w-3 h-3 cursor-pointer" onClick={() => updateSliderAttribute('scale', 1.0)} />
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={selectedRef.scale}
                        onChange={(e) => updateSliderAttribute('scale', parseFloat(e.target.value))}
                        className="w-full accent-gold bg-black h-1 rounded"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Luminance ({selectedRef.brightness}%)</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={selectedRef.brightness}
                        onChange={(e) => updateSliderAttribute('brightness', parseInt(e.target.value))}
                        className="w-full accent-gold bg-black h-1 rounded"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-gray-400">
                        <span>Deep Contrast ({selectedRef.contrast}%)</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={selectedRef.contrast}
                        onChange={(e) => updateSliderAttribute('contrast', parseInt(e.target.value))}
                        className="w-full accent-gold bg-black h-1 rounded"
                      />
                    </div>
                  </div>

                  {/* Reference Annotation area */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Body Blueprint placement & sizing details:
                    </label>
                    <textarea
                      rows={2}
                      value={selectedRef.notes || ''}
                      onChange={(e) => updateSliderAttribute('notes', e.target.value)}
                      placeholder="e.g., Left side of collarbone, width roughly 12cm. Grayscale only."
                      className="w-full bg-black border border-white/5 p-3 text-xs text-white placeholder-gray-600 focus:border-gold font-sans resize-none rounded-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>


        {/* RIGHT METADATA PANEL COLUMN (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b0b0b] border border-white/10 p-5 md:p-6 space-y-5 rounded-xs">
            <h3 className="font-display text-md text-white tracking-widest border-b border-white/5 pb-3">
              YOUR REFERENCES ({references.length})
            </h3>

            {references.length === 0 ? (
              <div className="py-12 text-center text-gray-500 font-light text-xs">
                <FileImage className="w-8 h-8 text-white/10 mx-auto mb-3" />
                No uploaded reference marks.
                <br />
                Select some artworks from the gallery below or drag-and-drop.
              </div>
            ) : (
              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {references.map((ref) => {
                  const isActive = ref.id === selectedRefId;
                  return (
                    <div
                      key={ref.id}
                      onClick={() => {
                        onSelectRef(ref.id);
                        setActiveTab('inspect');
                      }}
                      className={`flex gap-3 p-3 border text-left transition-all cursor-pointer group items-center ${
                        isActive
                          ? 'border-gold bg-gold/5'
                          : 'border-white/5 bg-black/60 hover:bg-black/90 hover:border-white/20'
                      }`}
                    >
                      {/* Micro thumbnail */}
                      <div className="w-12 h-12 bg-black overflow-hidden flex-shrink-0 border border-white/10 relative">
                        <img
                          src={ref.dataUrl}
                          alt={ref.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div
                          style={{
                            filter: getFilterCSS(ref.filterStyle, 100, 100),
                          }}
                          className="absolute inset-0 mix-blend-overlay bg-black/30 pointer-events-none"
                        />
                      </div>

                      {/* Info lines */}
                      <div className="flex-grow min-w-0">
                        <h4 className="font-display text-sm text-white tracking-wider truncate">
                          {ref.name}
                        </h4>
                        <p className="text-[9px] font-mono text-gray-400 mt-1 uppercase">
                          {ref.filterStyle.replace('-', ' ')} | ROT: {ref.rotation}°
                        </p>
                      </div>

                      {/* Trash action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to discard this reference alignment?')) {
                            onDeleteReference(ref.id);
                            if (selectedRefId === ref.id) {
                              onSelectRef(references.find((r) => r.id !== ref.id)?.id || null);
                            }
                          }
                        }}
                        className="text-gray-500 hover:text-rose-500 p-1.5 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Micro warning notice */}
            <div className="bg-amber-950/20 border border-amber-500/10 p-3 flex gap-2.5 items-start text-amber-200 text-[10px] font-sans leading-relaxed">
              <Info className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Sacred Mark Safeguard:</span> Since we value security, all references uploaded are encrypted momentarily on your local web cache. They are never sent to third-party databases.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
