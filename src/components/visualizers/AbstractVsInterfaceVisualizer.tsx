import React, { useState } from 'react';
import { Layers, Check, X, Shield, Code2 } from 'lucide-react';

interface FeatureComparison {
  feature: string;
  abstractClass: string;
  abstractClassAllowed: boolean;
  interfaceType: string;
  interfaceAllowed: boolean;
  explanation: string;
}

const comparisons: FeatureComparison[] = [
  {
    feature: 'Multiple Inheritance',
    abstractClass: 'No (Single class inheritance only: extends A)',
    abstractClassAllowed: false,
    interfaceType: 'Yes (implements InterfaceA, InterfaceB, InterfaceC)',
    interfaceAllowed: true,
    explanation: 'A Java class can only extend ONE class, but can implement ANY number of interfaces.',
  },
  {
    feature: 'Instance State / Fields',
    abstractClass: 'Yes (Can have private, protected, non-final instance fields)',
    abstractClassAllowed: true,
    interfaceType: 'No (Only public static final constants)',
    interfaceAllowed: false,
    explanation: 'Abstract classes can maintain instance state; interfaces only declare behavior contracts and constants.',
  },
  {
    feature: 'Constructors',
    abstractClass: 'Yes (Called via super() in subclasses)',
    abstractClassAllowed: true,
    interfaceType: 'No (Cannot have constructors)',
    interfaceAllowed: false,
    explanation: 'Abstract classes have constructors to initialize fields; interfaces have no instance state to initialize.',
  },
  {
    feature: 'Method Implementations',
    abstractClass: 'Abstract methods + Concrete regular methods',
    abstractClassAllowed: true,
    interfaceType: 'Abstract methods + default methods + static methods',
    interfaceAllowed: true,
    explanation: 'Both can provide default concrete logic (since Java 8 default methods).',
  },
  {
    feature: 'Design Purpose',
    abstractClass: 'Strong "IS-A" identity & shared code hierarchy (e.g. Dog IS-A Animal)',
    abstractClassAllowed: true,
    interfaceType: 'Peripheral "CAN-DO" capability / contract (e.g. Flyable, Printable)',
    interfaceAllowed: true,
    explanation: 'Use abstract classes when classes share common state/code; use interfaces for polymorphic capabilities.',
  },
];

export const AbstractVsInterfaceVisualizer: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<number>(0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Abstract Class vs Interface Comparison Matrix</span>
          </h4>
          <p className="text-xs text-slate-500">Interactive decision matrix: choose features to inspect differences.</p>
        </div>
        <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
          OOP Abstraction
        </span>
      </div>

      {/* Feature Selector Tabs */}
      <div className="flex flex-wrap gap-1.5">
        {comparisons.map((item, idx) => (
          <button
            key={item.feature}
            onClick={() => setSelectedFeature(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFeature === idx
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {item.feature}
          </button>
        ))}
      </div>

      {/* Active Feature Comparison Split Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Abstract Class Card */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-700" />
              abstract class
            </span>
            {comparisons[selectedFeature].abstractClassAllowed ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3" /> Supported
              </span>
            ) : (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                <X className="w-3 h-3" /> Not Allowed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-800 font-medium">{comparisons[selectedFeature].abstractClass}</p>
        </div>

        {/* Interface Card */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-700" />
              interface
            </span>
            {comparisons[selectedFeature].interfaceAllowed ? (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3" /> Supported
              </span>
            ) : (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                <X className="w-3 h-3" /> Not Allowed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-800 font-medium">{comparisons[selectedFeature].interfaceType}</p>
        </div>
      </div>

      {/* Decision Summary */}
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 font-medium flex items-start gap-2">
        <span className="text-blue-600 shrink-0">💡</span>
        <span><strong>Key Takeaway:</strong> {comparisons[selectedFeature].explanation}</span>
      </div>
    </div>
  );
};
