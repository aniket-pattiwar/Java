import React, { useState } from 'react';
import { Check, X, Shield, AlertCircle } from 'lucide-react';


interface ModifierInfo {
  name: string;
  keyword: string;
  sameClass: boolean;
  samePackage: boolean;
  subclassDiffPkg: boolean;
  otherPackage: boolean;
  badgeColor: string;
  description: string;
  protectedNote?: string;
}

const modifiers: ModifierInfo[] = [
  {
    name: 'private',
    keyword: 'private',
    sameClass: true,
    samePackage: false,
    subclassDiffPkg: false,
    otherPackage: false,
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Strictly restricted within the enclosing class curly braces {}. Hidden from all outside classes.',
  },
  {
    name: 'default (package-private)',
    keyword: '(no keyword)',
    sameClass: true,
    samePackage: true,
    subclassDiffPkg: false,
    otherPackage: false,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Visible to any class within the exact SAME package. Inaccessible to any class in other packages.',
  },
  {
    name: 'protected',
    keyword: 'protected',
    sameClass: true,
    samePackage: true,
    subclassDiffPkg: true,
    otherPackage: false,
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Visible in the SAME package PLUS child subclasses in OTHER packages (via inheritance extends only!).',
    protectedNote: 'Outside the package, protected members can ONLY be accessed via inheritance (super / this in a subclass), never via direct object instantiation (new Employee().salary).',
  },
  {
    name: 'public',
    keyword: 'public',
    sameClass: true,
    samePackage: true,
    subclassDiffPkg: true,
    otherPackage: true,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Completely open and accessible from any class across all packages in the entire project/JVM.',
  },
];

export const AccessMatrixVisualizer: React.FC = () => {
  const [selectedModifier, setSelectedModifier] = useState<string>('protected');
  const activeMod = modifiers.find(m => m.name.startsWith(selectedModifier)) || modifiers[2];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Interactive Reference
            </span>
            <h3 className="text-lg font-bold text-slate-800">Java Access Modifiers Matrix</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Click any modifier to inspect boundary permissions and package inheritance rules.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {['private', 'default', 'protected', 'public'].map(mod => (
            <button
              key={mod}
              onClick={() => setSelectedModifier(mod)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
                selectedModifier === mod
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <th className="p-3">Access Modifier</th>
              <th className="p-3 text-center">Same Class</th>
              <th className="p-3 text-center">Same Package</th>
              <th className="p-3 text-center bg-purple-50/50">Subclass (Diff Pkg)</th>
              <th className="p-3 text-center">Other Package</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {modifiers.map(m => {
              const isSelected = m.name.startsWith(selectedModifier);
              return (
                <tr
                  key={m.name}
                  onClick={() => setSelectedModifier(m.name.split(' ')[0])}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${m.badgeColor}`}>
                        {m.name}
                      </span>
                    </div>
                  </td>

                  {/* Same Class */}
                  <td className="p-3 text-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  </td>

                  {/* Same Package */}
                  <td className="p-3 text-center">
                    {m.samePackage ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Subclass Diff Pkg */}
                  <td className="p-3 text-center bg-purple-50/40">
                    {m.subclassDiffPkg ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700" title="Accessible via inheritance only!">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>

                  {/* Other Package */}
                  <td className="p-3 text-center">
                    {m.otherPackage ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 text-rose-700">
                        <X className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Modifier Detail Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <h4 className="font-bold text-slate-800 text-sm">
              Scope Details: <span className="font-mono text-blue-600">{activeMod.name}</span>
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-500">Keyword: {activeMod.keyword}</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">{activeMod.description}</p>

        {activeMod.protectedNote && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 p-2.5 rounded text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Crucial Classroom Nuance: </span>
              {activeMod.protectedNote}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
