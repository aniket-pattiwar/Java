import React from 'react';


export const CompilationFlowDiagram: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="border-b border-slate-100 pb-2">
        <h4 className="font-bold text-sm text-slate-800">Java Compilation & Execution Lifecycle</h4>
        <p className="text-xs text-slate-500">How human-readable Java code becomes OS native machine code.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Step 1 */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-2">
          <div className="w-8 h-8 mx-auto bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-xs">
            1
          </div>
          <div className="font-bold text-xs text-slate-800">Source Code</div>
          <div className="font-mono text-[11px] bg-white border border-slate-200 py-1 px-2 rounded text-blue-700 font-bold">
            Main.java
          </div>
          <p className="text-[11px] text-slate-500">Human-readable Java source instructions.</p>
        </div>

        {/* Step 2 */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-lg p-3 text-center space-y-2">
          <div className="w-8 h-8 mx-auto bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-xs">
            2
          </div>
          <div className="font-bold text-xs text-amber-900">javac Compiler</div>
          <div className="font-mono text-[11px] bg-white border border-amber-200 py-1 px-2 rounded text-amber-800 font-bold">
            javac Main.java
          </div>
          <p className="text-[11px] text-slate-500">Checks syntax, types & creates universal bytecode.</p>
        </div>

        {/* Step 3 */}
        <div className="bg-purple-50/50 border border-purple-200 rounded-lg p-3 text-center space-y-2">
          <div className="w-8 h-8 mx-auto bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold text-xs">
            3
          </div>
          <div className="font-bold text-xs text-purple-900">Bytecode (.class)</div>
          <div className="font-mono text-[11px] bg-white border border-purple-200 py-1 px-2 rounded text-purple-800 font-bold">
            Main.class
          </div>
          <p className="text-[11px] text-slate-500">Architecture-neutral bytecode (WORA magic!).</p>
        </div>

        {/* Step 4 */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-3 text-center space-y-2">
          <div className="w-8 h-8 mx-auto bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-xs">
            4
          </div>
          <div className="font-bold text-xs text-emerald-900">JVM Execution</div>
          <div className="font-mono text-[11px] bg-white border border-emerald-200 py-1 px-2 rounded text-emerald-800 font-bold">
            java Main
          </div>
          <p className="text-[11px] text-slate-500">JIT Compiler & Interpreter generate CPU machine code.</p>
        </div>
      </div>
    </div>
  );
};
