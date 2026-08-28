import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';


interface IntelliJModalProps {
  isOpen: boolean;
  onClose: () => void;
  codeToCopy: string;
  title?: string;
  onOpenIntelliJGuide?: () => void;
}

export const IntelliJModal: React.FC<IntelliJModalProps> = ({
  isOpen,
  onClose,
  codeToCopy,
  title = 'Run in IntelliJ IDEA',
  onOpenIntelliJGuide,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-mono font-bold text-xs">
              IJ
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">{title}</h3>
              <p className="text-[11px] text-slate-400">Classroom Hands-on Execution Steps</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-3 rounded-xl">
            <div className="text-xs text-blue-900">
              <span className="font-bold block">Ready-to-Paste Code:</span>
              <span className="text-[11px] text-blue-700">Copies complete, compilation-ready Java code.</span>
            </div>
            <button
              onClick={handleCopy}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* 6-Step Guide */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              6-Step IntelliJ IDEA Execution Guide:
            </h4>
            <ol className="space-y-2 font-medium text-slate-700">
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>Open <strong>IntelliJ IDEA</strong> (Community or Ultimate).</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>Create a new Java Project (JDK 17 LTS).</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>In <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">src/</code>, create a new Java Class named <strong>Main.java</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  4
                </span>
                <span>Paste the copied code directly into the editor (<kbd className="bg-slate-200 px-1 rounded text-[10px]">Ctrl+V</kbd> / <kbd className="bg-slate-200 px-1 rounded text-[10px]">Cmd+V</kbd>).</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  5
                </span>
                <span>Click the green <strong>▶ Run</strong> button next to <code className="font-mono text-[11px]">main</code> or press <kbd className="bg-slate-200 px-1 rounded text-[10px]">Shift+F10</kbd>.</span>
              </li>
              <li className="flex items-start gap-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold">
                <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  6
                </span>
                <span>Compare your IntelliJ terminal console output with the expected output on this screen.</span>
              </li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-3 flex items-center justify-between gap-2">
          {onOpenIntelliJGuide ? (
            <button
              onClick={() => {
                onClose();
                onOpenIntelliJGuide();
              }}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Need IntelliJ Setup Guide (PDF)?</span>
            </button>
          ) : <div />}
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Got it, Close
          </button>
        </div>
      </div>
    </div>
  );
};
