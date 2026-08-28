import React, { useState } from 'react';


interface PrimitiveType {
  name: string;
  category: 'Integer' | 'Floating Point' | 'Character' | 'Boolean';
  bytes: number;
  bits: number;
  range: string;
  defaultVal: string;
  example: string;
}

const primitives: PrimitiveType[] = [
  { name: 'byte', category: 'Integer', bytes: 1, bits: 8, range: '-128 to 127', defaultVal: '0', example: 'byte b = 100;' },
  { name: 'short', category: 'Integer', bytes: 2, bits: 16, range: '-32,768 to 32,767', defaultVal: '0', example: 'short s = 5000;' },
  { name: 'int', category: 'Integer', bytes: 4, bits: 32, range: '-2,147,483,648 to 2,147,483,647', defaultVal: '0', example: 'int count = 42;' },
  { name: 'long', category: 'Integer', bytes: 8, bits: 64, range: '-9.22 × 10^18 to 9.22 × 10^18', defaultVal: '0L', example: 'long pop = 8000000000L;' },
  { name: 'float', category: 'Floating Point', bytes: 4, bits: 32, range: '6-7 decimal digits (IEEE 754)', defaultVal: '0.0f', example: 'float pi = 3.14f;' },
  { name: 'double', category: 'Floating Point', bytes: 8, bits: 64, range: '15-16 decimal digits (IEEE 754)', defaultVal: '0.0d', example: 'double rate = 99.99;' },
  { name: 'char', category: 'Character', bytes: 2, bits: 16, range: '0 to 65,535 (Unicode UTF-16)', defaultVal: '\'\\u0000\'', example: 'char grade = \'A\';' },
  { name: 'boolean', category: 'Boolean', bytes: 1, bits: 1, range: 'true or false', defaultVal: 'false', example: 'boolean active = true;' },
];

export const DataTypesVisualizer: React.FC = () => {
  const [selected, setSelected] = useState<PrimitiveType>(primitives[2]); // int by default

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-sm text-slate-800">The 8 Primitive Data Types Grid</h4>
          <p className="text-xs text-slate-500">Fixed memory sizes and default initializations across all JVM platforms.</p>
        </div>
        <span className="text-xs font-mono bg-blue-50 text-blue-700 px-2 py-1 rounded font-bold border border-blue-200">
          Selected: {selected.name} ({selected.bytes} {selected.bytes === 1 ? 'byte' : 'bytes'})
        </span>
      </div>

      {/* Grid of 8 Primitives */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {primitives.map(p => (
          <button
            key={p.name}
            onClick={() => setSelected(p)}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              selected.name === p.name
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-200'
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-slate-900">{p.name}</span>
              <span className="text-[10px] text-slate-500 font-medium">{p.bytes}B</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">{p.category}</div>
          </button>
        ))}
      </div>

      {/* Detail Inspector Box */}
      <div className="bg-slate-900 text-white p-4 rounded-xl space-y-3 font-mono text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">CATEGORY</span>
            <span className="font-bold text-white">{selected.category}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">MEMORY FOOTPRINT</span>
            <span className="font-bold text-amber-400">{selected.bytes * 8} bits ({selected.bytes} byte)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">DEFAULT VALUE</span>
            <span className="font-bold text-emerald-400">{selected.defaultVal}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">EXAMPLE LITERAL</span>
            <span className="font-bold text-blue-300">{selected.example}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">Value Range:</span>
          <span className="text-amber-300 font-bold">{selected.range}</span>
        </div>
      </div>
    </div>
  );
};
