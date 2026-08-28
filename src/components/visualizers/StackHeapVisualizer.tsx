import React, { useState } from 'react';
import { RotateCcw, ArrowRight, Layers, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';


interface Step {
  label: string;
  code: string;
  explanation: string;
  stack: { name: string; type: string; pointsTo: string | null; primitiveVal?: string }[];
  heap: { id: string; className: string; fields: Record<string, string>; activeRefs: string[]; isOrphan?: boolean }[];
  highlight: string;
}

const steps: Step[] = [
  {
    label: 'Step 1: Declare & Instantiate s1',
    code: 'Student s1 = new Student("Rahul", 20);',
    explanation: 'A new Student object is created in the Heap at address @0x3A21. The reference variable s1 is created in the main() Stack frame, storing pointer @0x3A21.',
    stack: [
      { name: 's1', type: 'Student', pointsTo: 'obj-1' },
    ],
    heap: [
      { id: 'obj-1', className: 'Student (@0x3A21)', fields: { name: '"Rahul"', age: '20' }, activeRefs: ['s1'] },
    ],
    highlight: 's1 points to Heap Object @0x3A21',
  },
  {
    label: 'Step 2: Reference Assignment (s2 = s1)',
    code: 'Student s2 = s1;',
    explanation: 'No new object is created in the Heap! Variable s2 in the Stack receives a copy of the pointer value (@0x3A21). Both s1 and s2 now point to the EXACT same Heap object.',
    stack: [
      { name: 's1', type: 'Student', pointsTo: 'obj-1' },
      { name: 's2', type: 'Student', pointsTo: 'obj-1' },
    ],
    heap: [
      { id: 'obj-1', className: 'Student (@0x3A21)', fields: { name: '"Rahul"', age: '20' }, activeRefs: ['s1', 's2'] },
    ],
    highlight: 'Two Stack pointers reference ONE shared Heap instance!',
  },
  {
    label: 'Step 3: Mutate State via s2',
    code: 's2.age = 22;',
    explanation: 'Mutating age via s2 directly modifies the shared Heap instance. Because s1 points to this same instance, s1.age is now also 22!',
    stack: [
      { name: 's1', type: 'Student', pointsTo: 'obj-1' },
      { name: 's2', type: 'Student', pointsTo: 'obj-1' },
    ],
    heap: [
      { id: 'obj-1', className: 'Student (@0x3A21)', fields: { name: '"Rahul"', age: '22' }, activeRefs: ['s1', 's2'] },
    ],
    highlight: 'Both s1.age and s2.age read 22',
  },
  {
    label: 'Step 4: Reassign s2 to New Object',
    code: 's2 = new Student("Priya", 24);',
    explanation: 'A second object is allocated in the Heap at address @0x8B14. The Stack variable s2 is repointed to @0x8B14. Variable s1 remains pointing to @0x3A21.',
    stack: [
      { name: 's1', type: 'Student', pointsTo: 'obj-1' },
      { name: 's2', type: 'Student', pointsTo: 'obj-2' },
    ],
    heap: [
      { id: 'obj-1', className: 'Student (@0x3A21)', fields: { name: '"Rahul"', age: '22' }, activeRefs: ['s1'] },
      { id: 'obj-2', className: 'Student (@0x8B14)', fields: { name: '"Priya"', age: '24' }, activeRefs: ['s2'] },
    ],
    highlight: 's1 and s2 now point to independent Heap objects',
  },
  {
    label: 'Step 5: Dereference s1 (Garbage Collection Preview)',
    code: 's1 = null;',
    explanation: 's1 now holds null (points to nowhere). Object @0x3A21 has 0 active references remaining in Stack and becomes eligible for automatic Garbage Collection (GC)!',
    stack: [
      { name: 's1', type: 'Student', pointsTo: null },
      { name: 's2', type: 'Student', pointsTo: 'obj-2' },
    ],
    heap: [
      { id: 'obj-1', className: 'Student (@0x3A21)', fields: { name: '"Rahul"', age: '22' }, activeRefs: [], isOrphan: true },
      { id: 'obj-2', className: 'Student (@0x8B14)', fields: { name: '"Priya"', age: '24' }, activeRefs: ['s2'] },
    ],
    highlight: 'Object @0x3A21 is an unreachable orphan (GC candidate)',
  },
];

export const StackHeapVisualizer: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = steps[currentStepIndex];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Interactive Simulation
            </span>
            <h3 className="text-lg font-bold text-slate-800">Stack vs Heap Memory Visualizer</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Step through code execution to observe Stack pointer addresses and Heap object allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStepIndex === steps.length - 1}
            className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
          >
            Next Step <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentStepIndex(0)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset to Step 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Indicator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStepIndex(idx)}
            className={`px-2 py-1.5 rounded-lg text-left text-xs font-medium transition-all ${
              idx === currentStepIndex
                ? 'bg-blue-50 border-2 border-blue-500 text-blue-900 font-semibold shadow-xs'
                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="block text-[10px] text-slate-600 font-bold uppercase">Step {idx + 1}</span>
            <span className="truncate block font-mono text-[11px] mt-0.5">{s.code.split('=')[0]}</span>
          </button>
        ))}
      </div>

      {/* Current Code Banner */}
      <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold text-xs bg-slate-800 px-2 py-1 rounded">
            EXECUTING:
          </span>
          <span className="text-emerald-300 font-semibold">{currentStep.code}</span>
        </div>
        <span className="text-xs text-slate-400">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      {/* Memory Dual Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* STACK PANE */}
        <div className="border border-indigo-200 rounded-xl p-4 bg-indigo-50/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <h4 className="font-bold text-sm text-indigo-950 uppercase tracking-wide">
                Stack Memory (Method Frames)
              </h4>
            </div>
            <span className="text-[11px] text-indigo-700 font-medium bg-indigo-100 px-2 py-0.5 rounded">
              LIFO · Fast
            </span>
          </div>

          <div className="bg-white border border-indigo-100 rounded-lg p-3 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-100">
              Frame: main()
            </div>

            {currentStep.stack.map(item => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-md font-mono text-xs"
              >
                <div>
                  <span className="text-purple-600 font-semibold">{item.type}</span>{' '}
                  <span className="text-slate-900 font-bold">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">=</span>
                  {item.pointsTo ? (
                    <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <span>ref</span>
                      <ArrowRight className="w-3 h-3 text-blue-600" />
                      <span>{item.pointsTo === 'obj-1' ? '@0x3A21' : '@0x8B14'}</span>
                    </span>
                  ) : (
                    <span className="bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded text-[11px]">
                      null (empty)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HEAP PANE */}
        <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-sm text-emerald-950 uppercase tracking-wide">
                Heap Memory (Object Allocations)
              </h4>
            </div>
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-100 px-2 py-0.5 rounded">
              Dynamic · Shared
            </span>
          </div>

          <div className="space-y-3">
            {currentStep.heap.map(obj => (
              <div
                key={obj.id}
                className={`p-3 rounded-lg border transition-all ${
                  obj.isOrphan
                    ? 'bg-rose-50/80 border-dashed border-rose-300'
                    : 'bg-white border-emerald-300 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-100">
                  <div className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{obj.className}</span>
                  </div>
                  {obj.isOrphan ? (
                    <span className="flex items-center gap-1 text-[10px] text-rose-700 bg-rose-100 font-bold px-2 py-0.5 rounded">
                      <ShieldAlert className="w-3 h-3" /> 0 References (GC Eligible)
                    </span>
                  ) : (
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                      Referenced by: {obj.activeRefs.join(', ')}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(obj.fields).map(([field, val]) => (
                    <div key={field} className="bg-slate-50 p-1.5 rounded border border-slate-200">
                      <span className="text-slate-500">{field}:</span>{' '}
                      <span className="text-blue-700 font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation & Insight Callout */}
      <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-lg text-xs space-y-1 text-slate-700">
        <div className="flex items-center gap-2 font-bold text-blue-950">
          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Why this matters:</span>
        </div>
        <p className="pl-6 text-slate-600">{currentStep.explanation}</p>
      </div>
    </div>
  );
};
