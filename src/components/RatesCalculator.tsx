/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CurrencyType, ServiceType } from '../types';
import { EXCHANGE_RATE_ZAR_TO_USD } from '../data';
import { Coins, DollarSign, Calculator, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface RatesCalculatorProps {
  selectedCurrency: CurrencyType;
  onCurrencyChange: (currency: CurrencyType) => void;
  onApplyEstimatedPrice: (priceZar: number) => void;
}

export default function RatesCalculator({
  selectedCurrency,
  onCurrencyChange,
  onApplyEstimatedPrice,
}: RatesCalculatorProps) {
  const [baseService, setBaseService] = useState<string>('tattoo-sleeve');
  const [additionMapping, setAdditionMapping] = useState(false);
  const [additionExtended, setAdditionExtended] = useState(false);
  const [additionMaterial, setAdditionMaterial] = useState(false);

  // Constants defined in ZAR
  const SERVICE_PRICES_ZAR: Record<string, { label: string; price: number; type: ServiceType }> = {
    'tattoo-small': { label: 'Small Custom Tattoo (Minimum)', price: 750, type: 'Tattoo Inquiry' },
    'tattoo-sleeve': { label: 'Half Sleeve Blueprint Session', price: 3500, type: 'Tattoo Inquiry' },
    'tattoo-full': { label: 'Full Back Ancestral Masterpiece', price: 7500, type: 'Tattoo Inquiry' },
    'piercing-standard': { label: 'Standard Facial/Earlobe Piercing', price: 350, type: 'Piercing' },
    'photo-session': { label: 'Studio Editorial Photoshoot (1Hr)', price: 1500, type: 'Photography Booking' },
    'photo-street': { label: 'Street Documentarian Location Run (2Hr)', price: 2800, type: 'Photography Booking' },
    'crown-retwist': { label: 'Dreadlock Retwist & Sacred Styling', price: 550, type: 'Hair Artistry' },
    'crown-lock': { label: 'Instant Interlocking & Sculpting (Full)', price: 1800, type: 'Hair Artistry' },
  };

  const ADDITION_PRICES_ZAR = {
    mapping: 250, // Placement mapping support
    extended: 500, // Extra focus session duration
    material: 300, // Pre-processed gold tint or graded prints
  };

  // Compute calculated values
  const getCalculatedZar = () => {
    let total = SERVICE_PRICES_ZAR[baseService]?.price || 0;
    if (additionMapping) total += ADDITION_PRICES_ZAR.mapping;
    if (additionExtended) total += ADDITION_PRICES_ZAR.extended;
    if (additionMaterial) total += ADDITION_PRICES_ZAR.material;
    return total;
  };

  const totalZar = getCalculatedZar();
  const totalUsd = Math.round((totalZar / EXCHANGE_RATE_ZAR_TO_USD) * 10) / 10;

  // Sync computed estimation to parent state when components update
  useEffect(() => {
    onApplyEstimatedPrice(totalZar);
  }, [totalZar, baseService, additionMapping, additionExtended, additionMaterial]);

  // Currency toggler helper
  const formatPrice = (zarVal: number) => {
    if (selectedCurrency === 'ZAR') {
      return `R${zarVal.toLocaleString()}`;
    } else {
      const usdVal = Math.round((zarVal / EXCHANGE_RATE_ZAR_TO_USD) * 10) / 10;
      return `$${usdVal.toLocaleString()}`;
    }
  };

  return (
    <div className="bg-[#080808] border border-white/5 p-6 md:p-8 space-y-6" id="pricing-calculator">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-5 gap-4">
        <div>
          <span className="text-sa-green font-bold text-xs uppercase tracking-widest block mb-2">
            STATION II • TRANSPARENT EXCHANGE
          </span>
          <h2 className="font-display text-3xl text-white tracking-wider">
            Rate <span className="text-gold">Estimator</span>
          </h2>
          <p className="text-gray-400 text-xs font-light mt-1">
            Build your personalized ritual package. Rates calculated dynamically between South Africa (ZAR) and Zimbabwe (USD).
          </p>
        </div>

        {/* Currency selectors */}
        <div className="flex gap-1.5 p-1 bg-black border border-white/10 rounded-sm">
          <button
            onClick={() => onCurrencyChange('ZAR')}
            className={`px-3 py-1.5 text-[10px] font-display tracking-wider uppercase transition-colors cursor-pointer ${
              selectedCurrency === 'ZAR' ? 'bg-gold text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            South Africa (ZAR)
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`px-3 py-1.5 text-[10px] font-display tracking-wider uppercase transition-colors cursor-pointer ${
              selectedCurrency === 'USD' ? 'bg-gold text-black font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Zimbabwe (USD)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Dropdown selects & switches (7 columns) */}
        <div className="md:col-span-7 space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest">
              Select Discipline Base Session:
            </label>
            <select
              value={baseService}
              onChange={(e) => setBaseService(e.target.value)}
              className="w-full bg-black border border-white/10 p-3.5 text-sm text-white focus:border-gold focus:ring-1 focus:ring-gold outline-none rounded-none cursor-pointer"
            >
              <optgroup label="Tattoo Artistry" className="bg-black text-white">
                <option value="tattoo-small">Small Technical Ink (Min) - R750 / ~$41</option>
                <option value="tattoo-sleeve">Half Sleeve Blueprint - R3,500 / ~$189</option>
                <option value="tattoo-full">Full Back Ancestral Masterwork - R7,500 / ~$405</option>
              </optgroup>
              <optgroup label="Cinematic Photography" className="bg-black text-white">
                <option value="photo-session">Studio Editorial Shoot (1Hr) - R1,500 / ~$81</option>
                <option value="photo-street">Street Documentary Run (2Hr) - R2,800 / ~$151</option>
              </optgroup>
              <optgroup label="Body Adornment & Crowns" className="bg-black text-white">
                <option value="crown-retwist">Dreadlocks Retwist & Style - R550 / ~$30</option>
                <option value="crown-lock">Instant Interlocking Sculpt (Full) - R1,800 / ~$97</option>
                <option value="piercing-standard">Standard Piercing Session - R350 / ~$19</option>
              </optgroup>
            </select>
          </div>

          <div className="space-y-4 pt-1">
            <h4 className="text-[11px] font-mono text-sa-green uppercase tracking-widest font-bold">
              Custom Ritual Enhancements
            </h4>

            <div className="space-y-2.5">
              {/* Option 1 */}
              <div 
                onClick={() => setAdditionMapping(!additionMapping)}
                className={`flex justify-between items-center p-3 border cursor-pointer transition-colors ${
                  additionMapping ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/40 hover:bg-black/60'
                }`}
              >
                <div className="flex gap-3 items-center pr-2">
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center ${additionMapping ? 'border-gold text-gold':'border-gray-600'}`}>
                    {additionMapping && <div className="w-1.5 h-1.5 bg-gold" />}
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold block">Ndebele/Tribal Placement Blueprinting</span>
                    <span className="text-[10px] text-gray-400 font-light block">Symmetrical location mapping prior to operation</span>
                  </div>
                </div>
                <span className="text-gold font-mono text-xs font-bold shrink-0">{formatPrice(ADDITION_PRICES_ZAR.mapping)}</span>
              </div>

              {/* Option 2 */}
              <div 
                onClick={() => setAdditionExtended(!additionExtended)}
                className={`flex justify-between items-center p-3 border cursor-pointer transition-colors ${
                  additionExtended ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/40 hover:bg-black/60'
                }`}
              >
                <div className="flex gap-3 items-center pr-2">
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center ${additionExtended ? 'border-gold text-gold':'border-gray-600'}`}>
                    {additionExtended && <div className="w-1.5 h-1.5 bg-gold" />}
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold block">The Hermit Hour (Extended Focus)</span>
                    <span className="text-[10px] text-gray-400 font-light block">+1 Hour extra session speed or specialized retouching focus</span>
                  </div>
                </div>
                <span className="text-gold font-mono text-xs font-bold shrink-0">{formatPrice(ADDITION_PRICES_ZAR.extended)}</span>
              </div>

              {/* Option 3 */}
              <div 
                onClick={() => setAdditionMaterial(!additionMaterial)}
                className={`flex justify-between items-center p-3 border cursor-pointer transition-colors ${
                  additionMaterial ? 'border-gold bg-gold/5' : 'border-white/5 bg-black/40 hover:bg-black/60'
                }`}
              >
                <div className="flex gap-3 items-center pr-2">
                  <div className={`w-3.5 h-3.5 border flex items-center justify-center ${additionMaterial ? 'border-gold text-gold':'border-gray-600'}`}>
                    {additionMaterial && <div className="w-1.5 h-1.5 bg-gold" />}
                  </div>
                  <div>
                    <span className="text-white text-xs font-semibold block">Sacred Gold Film or High-End Matte Print</span>
                    <span className="text-[10px] text-gray-400 font-light block">For portrait sessions - premium physical graded poster printout</span>
                  </div>
                </div>
                <span className="text-gold font-mono text-xs font-bold shrink-0">{formatPrice(ADDITION_PRICES_ZAR.material)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Display (5 columns) */}
        <div className="md:col-span-5">
          <div className="bg-[#0f0f0f] border border-white/10 p-6 flex flex-col justify-between h-full space-y-6 relative rounded-xs">
            {/* Fine decoration corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30" />

            <div className="space-y-4">
              <span className="text-[9px] font-mono text-gold bg-gold/10 px-2 py-1 border border-gold/20 inline-block uppercase tracking-wider">
                Active Valuation
              </span>

              <div className="space-y-1">
                <span className="text-gray-400 text-xs font-light block">Estimated Contribution Value</span>
                <div className="font-display text-4xl md:text-5xl text-white tracking-wider flex items-baseline gap-1 animate-pulse">
                  {selectedCurrency === 'ZAR' ? (
                    <>
                      <span className="text-gold">R</span>
                      {totalZar.toLocaleString()}
                    </>
                  ) : (
                    <>
                      <span className="text-gold">$</span>
                      {totalUsd.toLocaleString()}
                    </>
                  )}
                </div>
              </div>

              {/* Tiny ledger items list */}
              <div className="border-t border-b border-white/5 py-4 space-y-1.5 text-xs font-light text-gray-300">
                <div className="flex justify-between">
                  <span className="truncate max-w-[170px]">{SERVICE_PRICES_ZAR[baseService]?.label}</span>
                  <span className="font-mono text-gray-400">{formatPrice(SERVICE_PRICES_ZAR[baseService]?.price)}</span>
                </div>
                {additionMapping && (
                  <div className="flex justify-between text-gold/80">
                    <span>+ Placement Blueprinting</span>
                    <span className="font-mono">{formatPrice(ADDITION_PRICES_ZAR.mapping)}</span>
                  </div>
                )}
                {additionExtended && (
                  <div className="flex justify-between text-gold/80">
                    <span>+ Extended Focus</span>
                    <span className="font-mono">{formatPrice(ADDITION_PRICES_ZAR.extended)}</span>
                  </div>
                )}
                {additionMaterial && (
                  <div className="flex justify-between text-gold/80">
                    <span>+ Graded Print/Gold Tint</span>
                    <span className="font-mono">{formatPrice(ADDITION_PRICES_ZAR.material)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Shield and Currency helper */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2.5 text-[10px] text-gray-400 leading-normal">
                <ShieldCheck className="w-5 h-5 text-sa-green flex-shrink-0" />
                <p>
                  No hidden margins. Rate includes organic ink or premium photography lenses, session counseling, and local care guidance.
                </p>
              </div>

              <div className="text-[10px] font-mono text-gray-500 text-right pt-1">
                EXCHANGE RATIO: 1 USD ~ {EXCHANGE_RATE_ZAR_TO_USD} ZAR
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
