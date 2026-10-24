"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "../data/housingData";

interface FaqAccordionProps {
  items: FaqItem[];
  defaultOpenIndex?: number;
}

export default function FaqAccordion({ items, defaultOpenIndex = 0 }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id}
            className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-red-200 bg-white shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className={`text-sm md:text-base font-semibold ${isOpen ? "text-red-700" : "text-slate-900"}`}>
                {item.question}
              </span>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isOpen ? "bg-red-50 text-red-600 rotate-180" : "bg-slate-100 text-slate-500"
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
