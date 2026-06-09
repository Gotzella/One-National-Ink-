/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookingRitual } from '../types';
import { FileText, Eye, Trash2, Calendar, Shield, Sparkles, User, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SacredLedgerProps {
  inquiries: BookingRitual[];
  onDeleteInquiry: (id: string) => void;
}

export default function SacredLedger({ inquiries, onDeleteInquiry }: SacredLedgerProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<BookingRitual | null>(null);

  const getStatusColor = (status: BookingRitual['status']) => {
    switch (status) {
      case 'In Council':
        return { text: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-950/20' };
      case 'Mark Approved':
        return { text: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-950/20' };
      case 'Ritual Synced':
        return { text: 'text-purple-400', border: 'border-purple-500/20', bg: 'bg-purple-950/20' };
      case 'Awaiting Callback':
        return { text: 'text-cyan-400', border: 'border-cyan-500/20', bg: 'bg-cyan-950/20' };
    }
  };

  return (
    <div className="bg-[#090909] border border-white/5 p-6 md:p-8 space-y-6" id="ledger-dashboard">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-5 gap-4">
        <div>
          <span className="text-sa-green font-bold text-xs uppercase tracking-widest block mb-2">
            STATION IV • MY SACRED LEDGER
          </span>
          <h2 className="font-display text-3xl text-white tracking-wider">
            Your Session <span className="text-gold">Records</span>
          </h2>
          <p className="text-gray-400 text-xs font-light mt-1">
            Browse and manage your ongoing studio inquiries, check council reviews, and inspect your attached skin/lens designs.
          </p>
        </div>

        <span className="text-[10px] font-mono text-gray-400 bg-black px-3 py-1.5 border border-white/10">
          LOCAL CODES: {inquiries.length} REGISTERED
        </span>
      </div>

      {inquiries.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-white/5 bg-black/30 rounded-sm">
          <FileText className="w-10 h-10 text-white/10 mx-auto mb-4" />
          <h3 className="font-display text-lg text-gray-450 tracking-wider">No Active Inquiries Scheduled</h3>
          <p className="text-gray-500 text-xs font-light max-w-sm mx-auto mt-2 leading-relaxed">
            Fill out the inquiry form above with your visual design modifications, and they will populate instantly in this safe offline dashboard.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-[10px] font-mono uppercase tracking-widest">
                <th className="py-4 px-3">Session Protocol</th>
                <th className="py-4 px-3">Identity</th>
                <th className="py-4 px-3">Request Discipline</th>
                <th className="py-4 px-3">Execution Date</th>
                <th className="py-4 px-3">Estimation</th>
                <th className="py-4 px-3">Council Status</th>
                <th className="py-4 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inquiries.map((inq) => {
                const statusMeta = getStatusColor(inq.status);
                return (
                  <tr key={inq.id} className="text-xs hover:bg-black/60 transition-colors">
                    {/* ID & Reference marker */}
                    <td className="py-4 px-3">
                      <div className="font-mono text-white tracking-wider font-semibold">
                        {inq.id.substring(inq.id.length - 8)}
                      </div>
                      <div className="text-[9px] text-gray-500 mt-1 uppercase flex gap-1.5 items-center">
                        <span>REFS: {inq.referenceImages.length} attached</span>
                      </div>
                    </td>

                    {/* Full Name & Email */}
                    <td className="py-4 px-3">
                      <div className="text-white font-medium">{inq.fullName}</div>
                      <div className="text-gray-500 text-[10px] mt-0.5">{inq.email}</div>
                    </td>

                    {/* Discipline Type */}
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-[10px] text-gray-300 font-display uppercase tracking-widest rounded-none">
                        {inq.serviceType}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-3 font-mono text-gray-450">
                      {inq.preferredDate}
                    </td>

                    {/* Estimation */}
                    <td className="py-4 px-3 font-mono font-semibold text-gold">
                      {inq.currency === 'ZAR' ? 'R' : '$'}{inq.estimatedPrice.toLocaleString()}
                    </td>

                    {/* Council Review status */}
                    <td className="py-4 px-3">
                      <span className={`px-2 py-0.5 text-[9px] font-mono border rounded-xs ${statusMeta.text} ${statusMeta.border} ${statusMeta.bg}`}>
                        {inq.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1 px-2.5 bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-white text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Discard this inquiry from the ledger permanently?')) {
                              onDeleteInquiry(inq.id);
                            }
                          }}
                          className="p-1.5 bg-[#120707] border border-red-900/45 text-rose-500 hover:bg-rose-950/20 transition-all cursor-pointer"
                          title="Cancel Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Details drawer/inspector on click */}
      <AnimatePresence>
        {selectedInquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0b0b0b] border border-gold/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative rounded-xs text-left"
            >
              <button
                onClick={() => setSelectedInquiry(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white p-2 border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title group */}
              <div className="border-b border-white/5 pb-4">
                <span className="text-gold font-mono text-[9px] uppercase tracking-widest block mb-1">
                  OFFICIAL COUNCIL LOG • {selectedInquiry.id}
                </span>
                <h3 className="font-display text-2xl text-white tracking-widest uppercase">
                  Ritual Details
                </h3>
              </div>

              {/* Detail fields block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-black/40 p-3 border border-white/5">
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">CLIENT IDENTITY</span>
                  <p className="text-white font-semibold flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-gold" /> {selectedInquiry.fullName}</p>
                  <p className="text-gray-400 text-[10px]">{selectedInquiry.email}</p>
                </div>

                <div className="space-y-1 bg-black/40 p-3 border border-white/5">
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">DISCIPLINE REQUEST</span>
                  <p className="text-white font-semibold uppercase font-display tracking-widest">{selectedInquiry.serviceType}</p>
                  <p className="text-gold text-[10px]">Valuation: {selectedInquiry.currency === 'ZAR' ? 'R' : '$'}{selectedInquiry.estimatedPrice.toLocaleString()}</p>
                </div>

                <div className="space-y-1 bg-black/40 p-3 border border-white/5">
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">PREFERRED ARTISAN</span>
                  <p className="text-white font-semibold">{selectedInquiry.preferredArtist}</p>
                </div>

                <div className="space-y-1 bg-black/40 p-3 border border-white/5">
                  <span className="text-gray-500 text-[10px] uppercase font-mono block">SACRED TARGET DATE</span>
                  <p className="text-white font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-sa-green" /> {selectedInquiry.preferredDate}</p>
                </div>
              </div>

              {/* Concept notes text block */}
              <div className="space-y-2">
                <span className="text-gray-500 text-[10px] uppercase font-mono block">CONCEPT NOTES</span>
                <p className="bg-black/80 border border-white/5 p-4 text-xs font-light text-gray-300 leading-relaxed italic rounded-sm">
                  "{selectedInquiry.description}"
                </p>
              </div>

              {/* Linked uploaded references (Very custom visual presentation!) */}
              <div className="space-y-3">
                <span className="text-gray-400 text-[10px] uppercase font-mono tracking-widest block">
                  LINKED CUSTOMIZED REFERENCE ARTWORK ({selectedInquiry.referenceImages.length})
                </span>

                {selectedInquiry.referenceImages.length === 0 ? (
                  <p className="text-xs text-gray-600 italic">No reference marks linked to this inquiry.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedInquiry.referenceImages.map((ref) => (
                      <div key={ref.id} className="bg-black border border-white/10 p-3 space-y-2 rounded-xs">
                        <div className="relative aspect-video bg-neutral-955 overflow-hidden flex items-center justify-center border border-white/5 h-28">
                          <img
                            src={ref.dataUrl}
                            alt={ref.name}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 border border-gold/15 text-[8px] text-gold font-mono rounded-xs">
                            {ref.filterStyle.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <span className="text-[11px] font-semibold text-white tracking-wide block truncate">{ref.name}</span>
                          <span className="text-[9px] text-gray-500 uppercase font-mono block">ROT: {ref.rotation}° | SCALE: {ref.scale}x</span>
                          {ref.notes && (
                            <p className="text-[10px] text-gray-400 font-light mt-1.5 border-t border-white/5 pt-1.5 italic">
                              Note: {ref.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer status guide */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-black/50 p-4 border border-white/5 text-xs text-gray-400 gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sa-green flex-shrink-0" />
                  <span>Verified locally cached inquiry receipt.</span>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2 bg-gold text-black font-semibold font-display tracking-widest text-xs uppercase cursor-pointer transition-transform duration-200 active:scale-95"
                >
                  Return to Ledger
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
