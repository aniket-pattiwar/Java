import React from 'react';
import { FileText, Printer } from 'lucide-react';


export const ReferencePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Instructor 1-Page Cheat Sheet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Java Quick Reference & Whiteboard Aid
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Fast, projector-friendly cheat sheet for classroom review. Keep this open during live teaching sessions.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors no-print"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Grid of 8 Fast-Scan Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Section 1: Java Basics & Primitives */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">1. Java Basics & 8 Primitives</h3>
            <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">Mod 1 & 2</span>
          </div>

          <div className="space-y-2 font-mono text-[11px]">
            <div className="grid grid-cols-2 gap-1.5">
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">byte:</span> 1B (-128..127)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">short:</span> 2B (-32k..32k)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">int:</span> 4B (default int)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">long:</span> 8B (use L suffix)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">float:</span> 4B (use f suffix)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">double:</span> 8B (default real)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">char:</span> 2B (Unicode UTF-16)
              </div>
              <div className="p-1.5 bg-slate-50 rounded border border-slate-200">
                <span className="text-slate-500">boolean:</span> true / false
              </div>
            </div>
            <p className="font-sans text-slate-600 text-[11px] pt-1">
              • Operators: <code className="bg-slate-100 px-1 rounded">&&</code>, <code className="bg-slate-100 px-1 rounded">||</code> (short-circuit), <code className="bg-slate-100 px-1 rounded">?:</code> (ternary).<br />
              • Constants: <code className="bg-slate-100 px-1 rounded">final double PI = 3.14159;</code>
            </p>
          </div>
        </div>

        {/* Section 2: OOP Pillars & Class vs Object */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">2. OOP Foundations & 4 Pillars</h3>
            <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">Mod 3</span>
          </div>

          <div className="space-y-2 text-slate-700 leading-relaxed">
            <div><strong>Class:</strong> Blueprint / template (zero heap memory).</div>
            <div><strong>Object:</strong> Living instance created with <code className="font-mono bg-slate-100 px-1 rounded">new</code> in Heap.</div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <strong className="text-blue-700 block">1. Encapsulation:</strong>
                Data hiding via private fields + public getters/setters.
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <strong className="text-purple-700 block">2. Abstraction:</strong>
                Hide complexity via abstract classes & interfaces.
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <strong className="text-emerald-700 block">3. Inheritance:</strong>
                Code reuse via <code className="font-mono text-[10px]">extends</code> (IS-A relationship).
              </div>
              <div className="bg-slate-50 p-2 rounded border border-slate-200">
                <strong className="text-amber-700 block">4. Polymorphism:</strong>
                Many forms (Overloading & Overriding).
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Constructors & Memory Mechanics */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">3. Constructors & Memory Rules</h3>
            <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">Mod 4</span>
          </div>

          <div className="space-y-2 text-slate-700">
            <div>• <strong>Stack:</strong> Method frames, primitive locals, reference pointers (@0x100).</div>
            <div>• <strong>Heap:</strong> All objects created with <code className="font-mono bg-slate-100 px-1 rounded">new</code> + instance variables.</div>
            <div>• <strong>Reference Sharing:</strong> <code className="font-mono bg-slate-100 px-1 rounded">s2 = s1;</code> copies the memory address. Both point to 1 object!</div>
            <div>• <strong>Pass-by-Value:</strong> Java ALWAYS passes copies of values (primitives copy data; objects copy reference address).</div>
            <div className="bg-amber-50 border border-amber-200 p-2 rounded text-amber-900 text-[11px]">
              <strong>Rule:</strong> Constructors have NO return type and match the exact class name.
            </div>
          </div>
        </div>

        {/* Section 4: Polymorphism & Casting */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">4. Polymorphism & Casting</h3>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Mod 5</span>
          </div>

          <div className="space-y-2 text-slate-700">
            <div>
              • <strong>Overloading (Compile-time):</strong> Same name, different params in same class.
            </div>
            <div>
              • <strong>Overriding (Runtime / Dynamic Dispatch):</strong> Subclass provides specific implementation of parent method (<code className="font-mono bg-slate-100 px-1 rounded">@Override</code>).
            </div>
            <div>
              • <strong>Upcasting:</strong> <code className="font-mono bg-slate-100 px-1 rounded">Animal a = new Dog();</code> (Safe, implicit).
            </div>
            <div>
              • <strong>Downcasting:</strong> <code className="font-mono bg-slate-100 px-1 rounded">Dog d = (Dog) a;</code> (Explicit, check <code className="font-mono bg-slate-100 px-1 rounded">instanceof</code> first to prevent <code className="text-rose-600 font-mono">ClassCastException</code>).
            </div>
          </div>
        </div>

        {/* Section 5: Abstraction & Object Class */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">5. Abstraction, Interfaces & Object</h3>
            <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">Mod 6</span>
          </div>

          <div className="space-y-2 text-slate-700">
            <div>• <strong>Abstract Class:</strong> 0-100% abstract, cannot instantiate, can have constructors.</div>
            <div>• <strong>Interface:</strong> 100% contract, supports multiple implementation (<code className="font-mono bg-slate-100 px-1 rounded">implements A, B</code>).</div>
            <div>• <strong>Object Class Methods:</strong>
              <ul className="list-disc list-inside pl-2 text-[11px] space-y-0.5 pt-1">
                <li><code className="font-mono">toString()</code>: Formats human-readable string representation.</li>
                <li><code className="font-mono">equals()</code>: Checks logical value equality instead of memory ==.</li>
                <li><code className="font-mono">hashCode()</code>: If <code className="font-mono">a.equals(b)</code> is true, <code className="font-mono">a.hashCode() == b.hashCode()</code> must be true.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 6: Access Modifiers & Packages */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-sm text-slate-900">6. Access Modifiers & Chaining</h3>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">Mod 7</span>
          </div>

          <div className="space-y-2 text-slate-700">
            <table className="w-full text-[10px] text-left border-collapse border border-slate-200">
              <thead className="bg-slate-100 text-slate-700 font-bold">
                <tr>
                  <th className="p-1 border border-slate-200">Modifier</th>
                  <th className="p-1 border border-slate-200 text-center">Class</th>
                  <th className="p-1 border border-slate-200 text-center">Package</th>
                  <th className="p-1 border border-slate-200 text-center">Subclass (Diff Pkg)</th>
                  <th className="p-1 border border-slate-200 text-center">World</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-1 border border-slate-200 font-mono">private</td><td className="text-center">✓</td><td className="text-center">✗</td><td className="text-center">✗</td><td className="text-center">✗</td></tr>
                <tr><td className="p-1 border border-slate-200 font-mono">default</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✗</td><td className="text-center">✗</td></tr>
                <tr><td className="p-1 border border-slate-200 font-mono">protected</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center font-bold text-purple-700">✓*</td><td className="text-center">✗</td></tr>
                <tr><td className="p-1 border border-slate-200 font-mono">public</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✓</td><td className="text-center">✓</td></tr>
              </tbody>
            </table>
            <div className="text-[11px] text-slate-600 pt-1">
              • <code className="font-mono font-bold">this()</code>: Calls sibling constructor in same class.<br />
              • <code className="font-mono font-bold">super()</code>: Calls parent constructor. Both MUST be 1st statement!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
