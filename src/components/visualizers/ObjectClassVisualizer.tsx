import React, { useState } from 'react';
import { Code2, Equal, Hash, CheckCircle2 } from 'lucide-react';

export const ObjectClassVisualizer: React.FC = () => {
  const [isOverridden, setIsOverridden] = useState<boolean>(true);


  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Object Class Contracts
            </span>
            <h3 className="text-lg font-bold text-slate-800">toString(), equals() & hashCode()</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Toggle override status to observe how overriding core Object methods transforms output and equality.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => setIsOverridden(false)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              !isOverridden ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Default Object Behavior
          </button>
          <button
            onClick={() => setIsOverridden(true)}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              isOverridden ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Custom Overridden Methods
          </button>
        </div>
      </div>

      {/* 3 Core Contract Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. toString() Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <Code2 className="w-4 h-4 text-blue-600" />
              <span>1. toString()</span>
            </div>
            <span className="text-[10px] text-slate-500">System.out.println(s1)</span>
          </div>

          <div className="space-y-2">
            <div className="text-xs text-slate-600">
              {isOverridden ? 'Clean, descriptive JSON-like text' : 'Ugly default: ClassName@HexHash'}
            </div>
            <div className={`p-2.5 rounded-lg font-mono text-xs border ${
              isOverridden ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              {isOverridden
                ? 'Student{id=101, name=\'Rahul\', age=20}'
                : 'Student@5e2de80c'}
            </div>
          </div>
        </div>

        {/* 2. equals() Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <Equal className="w-4 h-4 text-purple-600" />
              <span>2. equals() vs ==</span>
            </div>
            <span className="text-[10px] text-slate-500">Logical Equality</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between">
              <span className="text-slate-600">s1 == s2 (Memory):</span>
              <span className="text-rose-600 font-bold">false</span>
            </div>
            <div className={`p-2 rounded border flex justify-between ${
              isOverridden ? 'bg-emerald-50 border-emerald-300' : 'bg-white border-slate-200'
            }`}>
              <span className="text-slate-700 font-sans">s1.equals(s2):</span>
              <span className={isOverridden ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                {isOverridden ? 'true (Value match)' : 'false (Checks ==)'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. hashCode() Card */}
        <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
              <Hash className="w-4 h-4 text-amber-600" />
              <span>3. hashCode() Contract</span>
            </div>
            <span className="text-[10px] text-slate-500">HashMap/HashSet</span>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between">
              <span className="text-slate-600">s1.hashCode():</span>
              <span className="text-blue-700 font-bold">{isOverridden ? '101' : '1579975692'}</span>
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 flex justify-between">
              <span className="text-slate-600">s2.hashCode():</span>
              <span className="text-blue-700 font-bold">{isOverridden ? '101' : '982736411'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Rule Callout */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3.5 text-xs text-slate-700 space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-indigo-950">
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>The Golden hashCode & equals Contract:</span>
        </div>
        <p className="pl-5 text-slate-600 leading-relaxed">
          If <code className="bg-white px-1 py-0.5 rounded text-indigo-900 font-bold font-mono">s1.equals(s2) == true</code>, then <code className="bg-white px-1 py-0.5 rounded text-indigo-900 font-bold font-mono">s1.hashCode() == s2.hashCode()</code> <span className="font-bold">MUST</span> also evaluate to true. Always override hashCode whenever you override equals!
        </p>
      </div>
    </div>
  );
};
