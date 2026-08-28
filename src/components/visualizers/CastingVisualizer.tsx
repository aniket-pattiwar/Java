import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ShieldAlert, ShieldCheck } from 'lucide-react';


export const CastingVisualizer: React.FC = () => {
  const [castDirection, setCastDirection] = useState<'up' | 'down-safe' | 'down-unsafe'>('up');

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-sm text-slate-800">Java Reference Casting Inspector</h4>
          <p className="text-xs text-slate-500">Upcasting (Generalization) vs Downcasting (Specialization).</p>
        </div>

        <div className="flex gap-1.5">
          <button
            onClick={() => setCastDirection('up')}
            className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
              castDirection === 'up'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            Upcasting (Safe)
          </button>
          <button
            onClick={() => setCastDirection('down-safe')}
            className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
              castDirection === 'down-safe'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            Safe Downcast (instanceof)
          </button>
          <button
            onClick={() => setCastDirection('down-unsafe')}
            className={`px-3 py-1 text-xs font-semibold rounded border transition-colors ${
              castDirection === 'down-unsafe'
                ? 'bg-rose-600 text-white border-rose-600'
                : 'bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            Unsafe Downcast (Crash)
          </button>
        </div>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="bg-slate-900 text-white p-5 rounded-xl text-center space-y-3 font-mono text-xs">
          <div className="p-2.5 bg-slate-800 border-2 border-blue-400 rounded-lg font-bold">
            Animal (Parent Class)
          </div>

          <div className="flex items-center justify-center gap-4 text-xs font-sans">
            {castDirection === 'up' ? (
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <ArrowUp className="w-5 h-5 animate-bounce" />
                <span>UPCAST (Implicit & Safe)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-400 font-bold">
                <ArrowDown className="w-5 h-5 animate-bounce" />
                <span>DOWNCAST ((Dog) animalRef)</span>
              </div>
            )}
          </div>

          <div className="p-2.5 bg-slate-800 border-2 border-emerald-400 rounded-lg font-bold">
            Dog (Subclass)
          </div>
        </div>

        {/* Code & Safety Analysis */}
        <div className="space-y-3 text-xs">
          {castDirection === 'up' && (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Upcasting: 100% Implicit & Type-Safe</span>
              </div>
              <pre className="font-mono bg-white p-2 rounded border border-emerald-200 text-emerald-950 font-bold">
                Animal a = new Dog(); // No cast needed!
              </pre>
              <p className="text-slate-600">
                A Dog IS-A Animal. Java automatically widens the reference without explicit casting.
              </p>
            </div>
          )}

          {castDirection === 'down-safe' && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-blue-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Guarded Downcast with instanceof</span>
              </div>
              <pre className="font-mono bg-white p-2 rounded border border-blue-200 text-blue-950 font-bold">
{`if (a instanceof Dog) {
    Dog d = (Dog) a; // Guaranteed Safe!
    d.fetch();
}`}
              </pre>
              <p className="text-slate-600">
                Verifying the actual heap instance before downcasting prevents unexpected crashes.
              </p>
            </div>
          )}

          {castDirection === 'down-unsafe' && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Unsafe Downcast: ClassCastException!</span>
              </div>
              <pre className="font-mono bg-white p-2 rounded border border-rose-200 text-rose-950 font-bold">
{`Animal a = new Cat(); // Actually a Cat!
Dog d = (Dog) a; // CRASH at runtime!`}
              </pre>
              <p className="text-rose-700 font-medium">
                Compiles fine, but JVM throws <code className="bg-rose-100 px-1 py-0.5 rounded">java.lang.ClassCastException: Cat cannot be cast to Dog</code>!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
