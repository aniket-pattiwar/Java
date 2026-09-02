import React from 'react';
import { RotateCcw } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export const Footer: React.FC = () => {
  const { resetProgress } = useProgress();


  return (
    <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-base">☕</span>
          <span className="font-bold text-slate-800">
            Mastering Programming using Java
          </span>
     
        </div>
        <div className="text-slate-400">© 2026 C-DAC Patna. All Rights Reserved.</div>    
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
          Modules 1-7
          </span>

          <button
            onClick={() => {
              if (window.confirm('Reset all progress checkmarks and quiz answers?')) {
                resetProgress();
              }
            }}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
