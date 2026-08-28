import React, { useState } from 'react';
import { Info } from 'lucide-react';


interface RelationType {
  id: string;
  name: string;
  strength: 'Weak' | 'Medium (HAS-A)' | 'Strongest (PART-OF)';
  umlSymbol: string;
  analogy: string;
  leftEntity: string;
  rightEntity: string;
  lifecycleExplanation: string;
  javaCodeSnippet: string;
  color: string;
}

const relations: RelationType[] = [
  {
    id: 'association',
    name: 'Association',
    strength: 'Weak',
    umlSymbol: '────────────►',
    analogy: 'Teacher & Student (Peer Collaboration)',
    leftEntity: 'Teacher',
    rightEntity: 'Student',
    lifecycleExplanation: 'Independent lifecycles. A Teacher can exist without a Student, and a Student can exist without a Teacher.',
    javaCodeSnippet: `// Association: "Uses a" / Independent
class Teacher {
    void teach(Student s) {
        System.out.println("Teaching " + s.name);
    }
}`,
    color: 'border-blue-300 bg-blue-50/40 text-blue-900',
  },
  {
    id: 'aggregation',
    name: 'Aggregation',
    strength: 'Medium (HAS-A)',
    umlSymbol: '◇───────────►',
    analogy: 'Department & Teacher (Loose Containment)',
    leftEntity: 'Department',
    rightEntity: 'Teacher',
    lifecycleExplanation: 'Department "HAS-A" Teacher. If the Department closes down, the Teacher object survives and can join another department.',
    javaCodeSnippet: `// Aggregation: "Has-a" / Independent Lifecycle
class Department {
    Teacher teacher; // Passed in from outside

    Department(Teacher t) {
        this.teacher = t; // Teacher lives outside Department
    }
}`,
    color: 'border-amber-300 bg-amber-50/40 text-amber-900',
  },
  {
    id: 'composition',
    name: 'Composition',
    strength: 'Strongest (PART-OF)',
    umlSymbol: '◆───────────►',
    analogy: 'House & Room (Bound Lifecycle)',
    leftEntity: 'House',
    rightEntity: 'Room',
    lifecycleExplanation: 'Room is strictly "PART-OF" House. If the House is demolished, all its Rooms are destroyed with it.',
    javaCodeSnippet: `// Composition: "Part-of" / Bound Lifecycle
class House {
    private Room livingRoom; // Strictly owned

    House() {
        this.livingRoom = new Room("Living Room"); // Created inside!
    }
}`,
    color: 'border-purple-300 bg-purple-50/40 text-purple-900',
  },
];

export const RelationshipVisualizer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('composition');
  const active = relations.find(r => r.id === selectedId) || relations[2];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            OOP Relationship Spectrum
          </span>
          <h3 className="text-lg font-bold text-slate-800">Association vs Aggregation vs Composition</h3>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Explore the strength of object coupling and lifecycle dependency.
        </p>
      </div>

      {/* Relationship Strength Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {relations.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedId(r.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedId === r.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs">{r.name}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                selectedId === r.id ? 'bg-slate-800 text-amber-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {r.umlSymbol.split('─')[0]}
              </span>
            </div>
            <span className="text-[11px] block mt-1 opacity-80">{r.strength}</span>
          </button>
        ))}
      </div>

      {/* Visual UML Relationship Diagram */}
      <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>UML Class Relationship Diagram</span>
          <span className="font-mono text-amber-400 font-bold">{active.strength}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 py-4">
          {/* Left Entity Box */}
          <div className="bg-slate-800 border-2 border-blue-400 px-5 py-3 rounded-lg text-center min-w-[130px]">
            <span className="text-xs text-slate-400 block font-mono">Entity A</span>
            <span className="font-bold text-sm text-white">{active.leftEntity}</span>
          </div>

          {/* Relationship Connection */}
          <div className="flex flex-col items-center px-2">
            <span className="text-[11px] text-amber-300 font-bold font-mono tracking-wider">
              {active.name.toUpperCase()}
            </span>
            <div className="font-mono text-base font-bold text-amber-400 py-1">
              {active.umlSymbol}
            </div>
            <span className="text-[10px] text-slate-400">
              {active.id === 'composition' ? 'Owns Lifecycle' : active.id === 'aggregation' ? 'Has-a' : 'Uses-a'}
            </span>
          </div>

          {/* Right Entity Box */}
          <div className="bg-slate-800 border-2 border-emerald-400 px-5 py-3 rounded-lg text-center min-w-[130px]">
            <span className="text-xs text-slate-400 block font-mono">Entity B</span>
            <span className="font-bold text-sm text-white">{active.rightEntity}</span>
          </div>
        </div>
      </div>

      {/* Lifecycle Breakdown & Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className={`p-4 rounded-lg border ${active.color} space-y-2`}>
          <div className="font-bold flex items-center gap-1.5 text-slate-800">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Lifecycle Dependency:</span>
          </div>
          <p className="text-slate-700 leading-relaxed">{active.lifecycleExplanation}</p>
          <div className="pt-2 text-[11px] font-semibold text-slate-600">
            Analogy: <span className="italic">{active.analogy}</span>
          </div>
        </div>

        <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto">
          <div className="text-slate-400 pb-1 border-b border-slate-800 mb-2 font-sans font-semibold">
            Java Implementation Pattern:
          </div>
          <pre className="text-emerald-300">{active.javaCodeSnippet}</pre>
        </div>
      </div>
    </div>
  );
};
