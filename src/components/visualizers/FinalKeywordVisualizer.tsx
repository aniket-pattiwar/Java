import React, { useState } from 'react';
import { Lock } from 'lucide-react';


export const FinalKeywordVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'variable' | 'method' | 'class'>('variable');

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-sm text-slate-800">The final Keyword in 3 Scopes</h4>
          <p className="text-xs text-slate-500">Variables (Constants) · Methods (No Overriding) · Classes (No Inheritance)</p>
        </div>

        <div className="flex gap-1.5">
          {(['variable', 'method', 'class'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs font-semibold rounded border uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              final {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
        {activeTab === 'variable' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>final Variable = Immutable Constant</span>
            </div>
            <p className="text-slate-600">Once initialized, its value cannot be reassigned or mutated.</p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px]">
              <span className="text-purple-400">final</span> <span className="text-blue-300">double</span> PI = <span className="text-emerald-300">3.14159</span>;<br />
              <span className="text-rose-400">// PI = 3.14; // COMPILE ERROR: Cannot assign a value to final variable PI</span>
            </div>
          </div>
        )}

        {activeTab === 'method' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>final Method = Cannot Be Overridden</span>
            </div>
            <p className="text-slate-600">Prevents child classes from altering critical security algorithms or calculations.</p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px]">
              <span className="text-blue-300">class</span> Parent &#123;<br />
              &nbsp;&nbsp;<span className="text-purple-400">final</span> <span className="text-blue-300">void</span> securityCheck() &#123; ... &#125;<br />
              &#125;<br /><br />
              <span className="text-blue-300">class</span> Child <span className="text-blue-300">extends</span> Parent &#123;<br />
              &nbsp;&nbsp;<span className="text-rose-400">// void securityCheck() &#123; &#125; // COMPILE ERROR: Cannot override final method!</span><br />
              &#125;
            </div>
          </div>
        )}

        {activeTab === 'class' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>final Class = Cannot Be Inherited / Subclassed</span>
            </div>
            <p className="text-slate-600">Completely closes the class from inheritance. Example: java.lang.String is final.</p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px]">
              <span className="text-purple-400">final</span> <span className="text-blue-300">class</span> SecurityVault &#123; ... &#125;<br /><br />
              <span className="text-rose-400">// class HackerVault extends SecurityVault &#123;&#125; // COMPILE ERROR: Cannot inherit from final class!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
