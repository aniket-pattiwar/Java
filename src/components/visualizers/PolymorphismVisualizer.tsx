import React, { useState } from 'react';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';


export const PolymorphismVisualizer: React.FC = () => {
  const [refType, setRefType] = useState<'Animal' | 'Dog' | 'Cat'>('Animal');
  const [actualObj, setActualObj] = useState<'Animal' | 'Dog' | 'Cat'>('Dog');
  const [method, setMethod] = useState<'sound()' | 'fetch()' | 'purr()'>('sound()');

  // Check compile-time validity
  const isCompileValid = (): { valid: boolean; reason: string } => {
    // Check if reference type possesses this method
    if (refType === 'Animal') {
      if (method === 'sound()') return { valid: true, reason: 'Method sound() is declared in class Animal.' };
      return { valid: false, reason: `Cannot find symbol: method ${method} does not exist in class Animal.` };
    }
    if (refType === 'Dog') {
      if (method === 'sound()' || method === 'fetch()') return { valid: true, reason: `Method ${method} is declared in class Dog / Animal.` };
      return { valid: false, reason: `Cannot find symbol: method ${method} does not exist in class Dog.` };
    }
    if (refType === 'Cat') {
      if (method === 'sound()' || method === 'purr()') return { valid: true, reason: `Method ${method} is declared in class Cat / Animal.` };
      return { valid: false, reason: `Cannot find symbol: method ${method} does not exist in class Cat.` };
    }
    return { valid: true, reason: 'Valid' };
  };

  // Check runtime execution dispatch
  const getRuntimeExecution = (): { output: string; executedBy: string } => {
    if (method === 'sound()') {
      if (actualObj === 'Dog') return { output: 'Dog barks: Woof Woof!', executedBy: 'Dog.sound()' };
      if (actualObj === 'Cat') return { output: 'Cat meows: Meow Meow!', executedBy: 'Cat.sound()' };
      return { output: 'Animal makes a generic sound', executedBy: 'Animal.sound()' };
    }
    if (method === 'fetch()') {
      return { output: 'Dog fetches the ball!', executedBy: 'Dog.fetch()' };
    }
    if (method === 'purr()') {
      return { output: 'Cat purrs happily!', executedBy: 'Cat.purr()' };
    }
    return { output: 'Executed', executedBy: 'Unknown' };
  };

  // Check assignment compatibility (Upcasting vs Illegal assignment)
  const isAssignmentLegal = (ref: string, obj: string): boolean => {
    if (ref === obj) return true;
    if (ref === 'Animal' && (obj === 'Dog' || obj === 'Cat')) return true; // Legal Upcast
    return false; // Dog d = new Cat(); or Cat c = new Animal(); -> ILLEGAL
  };

  const assignmentOk = isAssignmentLegal(refType, actualObj);
  const compileCheck = isCompileValid();
  const runtimeExec = getRuntimeExecution();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Interactive Lookup Engine
          </span>
          <h3 className="text-lg font-bold text-slate-800">Dynamic Method Dispatch Resolver</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Select a Reference Type, Runtime Object, and Method to observe Compile-Time legality vs Runtime Dynamic Dispatch.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Reference Type Picker */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            1. Reference Type (Compile-Time)
          </label>
          <div className="flex gap-1.5">
            {(['Animal', 'Dog', 'Cat'] as const).map(type => (
              <button
                key={type}
                onClick={() => setRefType(type)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded border transition-colors ${
                  refType === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Controls what methods compiler allows.
          </span>
        </div>

        {/* Runtime Object Picker */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            2. Actual Heap Object (Runtime)
          </label>
          <div className="flex gap-1.5">
            {(['Animal', 'Dog', 'Cat'] as const).map(obj => (
              <button
                key={obj}
                onClick={() => setActualObj(obj)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded border transition-colors ${
                  actualObj === obj
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {obj}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Controls what code executes at runtime.
          </span>
        </div>

        {/* Method Picker */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            3. Method to Invoke
          </label>
          <div className="flex gap-1.5">
            {(['sound()', 'fetch()', 'purr()'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex-1 py-1.5 text-xs font-mono font-semibold rounded border transition-colors ${
                  method === m
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 block">
            Method called on the reference.
          </span>
        </div>
      </div>

      {/* Live Code Preview */}
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold bg-slate-800 px-2 py-0.5 rounded">CODE:</span>
          <span className="text-blue-300 font-semibold">{refType}</span>{' '}
          <span className="text-white">a =</span>{' '}
          <span className="text-emerald-300 font-semibold">new {actualObj}();</span>{' '}
          <span className="text-purple-300">a.{method};</span>
        </div>
      </div>

      {/* Two-Phase Evaluation Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phase 1: Compile Time Check */}
        <div className={`p-4 rounded-xl border ${
          !assignmentOk || !compileCheck.valid
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-blue-50/50 border-blue-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
              Phase 1: Compile-Time Check (Reference: {refType})
            </span>
            {assignmentOk && compileCheck.valid ? (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> COMPILES OK
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                <XCircle className="w-3.5 h-3.5" /> COMPILE ERROR
              </span>
            )}
          </div>

          <div className="text-xs space-y-1.5">
            {!assignmentOk ? (
              <p className="font-mono text-rose-700 font-medium">
                Type mismatch error: Cannot convert from {actualObj} to {refType} (Illegal reference assignment).
              </p>
            ) : !compileCheck.valid ? (
              <p className="font-mono text-rose-700 font-medium">
                {compileCheck.reason}
              </p>
            ) : (
              <p className="text-slate-600">
                Compiler verifies that reference type <span className="font-bold font-mono">{refType}</span> contains <span className="font-bold font-mono">{method}</span>. Verification succeeded!
              </p>
            )}
          </div>
        </div>

        {/* Phase 2: Runtime Dispatch */}
        <div className={`p-4 rounded-xl border ${
          !assignmentOk || !compileCheck.valid
            ? 'bg-slate-50 border-slate-200 opacity-60'
            : 'bg-emerald-50/50 border-emerald-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
              Phase 2: Runtime Dispatch (Heap Object: {actualObj})
            </span>
            {assignmentOk && compileCheck.valid ? (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                <Zap className="w-3.5 h-3.5" /> DYNAMIC DISPATCH
              </span>
            ) : (
              <span className="text-[11px] font-bold text-slate-400 bg-slate-200 px-2 py-0.5 rounded">
                NOT REACHED
              </span>
            )}
          </div>

          <div className="text-xs space-y-1.5">
            {assignmentOk && compileCheck.valid ? (
              <>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-500">Method executed:</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">{runtimeExec.executedBy}</span>
                </div>
                <div className="bg-white border border-emerald-200 p-2 rounded font-mono text-slate-900 font-bold">
                  Output: "{runtimeExec.output}"
                </div>
              </>
            ) : (
              <p className="text-slate-400 italic">
                Program failed compilation in Phase 1 and cannot run.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
