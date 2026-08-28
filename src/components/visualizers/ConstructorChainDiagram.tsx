import React, { useState } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';


export const ConstructorChainDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: 1,
      title: '1. Call new Student()',
      desc: 'Invokes 0-argument constructor Student().',
      highlightBox: 'child-0',
    },
    {
      num: 2,
      title: '2. Sibling Delegation: this(18)',
      desc: 'Student() immediately delegates to Student(int age) via this(18).',
      highlightBox: 'child-1',
    },
    {
      num: 3,
      title: '3. Parent Delegation: super()',
      desc: 'Student(int age) calls super() to delegate to Person constructor.',
      highlightBox: 'parent',
    },
    {
      num: 4,
      title: '4. Root Delegation: Object()',
      desc: 'Person calls super() to Object (cosmic superclass). Object initializes first!',
      highlightBox: 'object',
    },
    {
      num: 5,
      title: '5. Top-Down Execution Return',
      desc: 'Execution returns downwards: Object -> Person -> Student(int) -> Student(). Object fully initialized!',
      highlightBox: 'complete',
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="font-bold text-sm text-slate-800">Constructor Chaining Execution Lifecycle</h4>
          <p className="text-xs text-slate-500">Step through delegation (Bottom-Up) and execution (Top-Down).</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveStep(prev => (prev + 1) % steps.length)}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Step: {activeStep + 1}/{steps.length}
          </button>
          <button
            onClick={() => setActiveStep(0)}
            className="p-1 text-slate-500 hover:text-slate-800 rounded"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Hierarchy Stack */}
      <div className="max-w-md mx-auto space-y-2 font-mono text-xs text-center">
        {/* Object Box */}
        <div className={`p-3 rounded-lg border transition-all ${
          activeStep === 3 || activeStep === 4 ? 'bg-purple-100 border-purple-400 font-bold text-purple-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div>java.lang.Object() [Root Superclass]</div>
          <span className="text-[10px] text-slate-500 font-sans">Initializes foundational memory</span>
        </div>

        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Person Box */}
        <div className={`p-3 rounded-lg border transition-all ${
          activeStep === 2 || activeStep === 4 ? 'bg-blue-100 border-blue-400 font-bold text-blue-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div>Person() [Parent Constructor - super()]</div>
          <span className="text-[10px] text-slate-500 font-sans">Initializes inherited person fields</span>
        </div>

        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Student Parameterized Box */}
        <div className={`p-3 rounded-lg border transition-all ${
          activeStep === 1 || activeStep === 4 ? 'bg-emerald-100 border-emerald-400 font-bold text-emerald-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div>Student(int age) [Target Constructor]</div>
          <span className="text-[10px] text-slate-500 font-sans">Sets age and custom student state</span>
        </div>

        <div className="flex justify-center text-slate-400">
          <ArrowDown className="w-4 h-4" />
        </div>

        {/* Student 0-arg Box */}
        <div className={`p-3 rounded-lg border transition-all ${
          activeStep === 0 || activeStep === 4 ? 'bg-amber-100 border-amber-400 font-bold text-amber-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <div>Student() [0-arg Invocation - this(18)]</div>
          <span className="text-[10px] text-slate-500 font-sans">Entry point of new Student()</span>
        </div>
      </div>

      {/* Step Explanation Callout */}
      <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs space-y-1">
        <div className="font-bold text-slate-900">{steps[activeStep].title}</div>
        <div className="text-slate-600">{steps[activeStep].desc}</div>
      </div>
    </div>
  );
};
