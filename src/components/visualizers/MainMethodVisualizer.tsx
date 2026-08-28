import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Box, Code } from 'lucide-react';

interface KeywordPart {
  id: string;
  keyword: string;
  role: string;
  reason: string;
  analogy: string;
  icon: React.ElementType;
  badgeColor: string;
}

const parts: KeywordPart[] = [
  {
    id: 'public',
    keyword: 'public',
    role: 'Access Modifier',
    reason: 'Must be accessible to the JVM from outside the class package to start program execution.',
    analogy: 'The front door of a building that must remain unlocked for visitors.',
    icon: Shield,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    id: 'static',
    keyword: 'static',
    role: 'Class-Level Scope',
    reason: 'Allows JVM to call main() without creating an object/instance of the class first.',
    analogy: 'A public bulletin board that anyone can read without entering a private apartment.',
    icon: Cpu,
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  {
    id: 'void',
    keyword: 'void',
    role: 'Return Type',
    reason: 'main() does not return any value to the caller. When main() completes, program ends.',
    analogy: 'A task completed with no physical receipt required.',
    icon: Box,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    id: 'main',
    keyword: 'main',
    role: 'Method Identifier',
    reason: 'The exact signature name configured in the JVM specification as the default entry point.',
    analogy: 'The exact "START" button on an engine.',
    icon: Terminal,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    id: 'args',
    keyword: 'String[] args',
    role: 'Command-Line Arguments',
    reason: 'An array of strings passed to the program from terminal/command line at launch time.',
    analogy: 'Cargo suitcases loaded onto a plane before takeoff.',
    icon: Code,
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
  },
];

export const MainMethodVisualizer: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<KeywordPart>(parts[0]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      {/* Title & Prompt */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-600" />
            <span>Interactive `public static void main` Keyword Inspector</span>
          </h4>
          <p className="text-xs text-slate-500">Click each keyword below to understand why JVM mandates it.</p>
        </div>
        <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
          JVM Entry Point
        </span>
      </div>

      {/* Code Signature Buttons */}
      <div className="bg-slate-950 p-4 rounded-xl flex flex-wrap items-center gap-2 font-mono text-sm shadow-inner justify-center sm:justify-start">
        {parts.map(part => {
          const isSelected = selectedPart.id === part.id;
          return (
            <button
              key={part.id}
              onClick={() => setSelectedPart(part)}
              className={`px-3 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400 scale-105'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{part.keyword}</span>
            </button>
          );
        })}
        <span className="text-slate-400 text-sm font-mono">{'{ ... }'}</span>
      </div>

      {/* Active Inspector Details */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-in fade-in duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedPart.badgeColor}`}>
              {selectedPart.role}
            </span>
            <span className="text-base font-bold font-mono text-slate-900">{selectedPart.keyword}</span>
          </div>
          <selectedPart.icon className="w-5 h-5 text-slate-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-blue-700">
              Why JVM Requires It:
            </span>
            <p className="text-slate-600 leading-relaxed">{selectedPart.reason}</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-amber-700">
              Mental Model Analogy:
            </span>
            <p className="text-slate-600 leading-relaxed">💡 {selectedPart.analogy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
