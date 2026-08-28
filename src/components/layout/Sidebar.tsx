import React from 'react';
import { Layers, CheckCircle2, Circle, ChevronRight, Target } from 'lucide-react';
import { allModules } from '../../data';
import { useProgress } from '../../context/ProgressContext';

interface SidebarProps {
  selectedModuleId: number;
  setSelectedModuleId: (id: number) => void;
  setSelectedConceptId?: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedModuleId,
  setSelectedModuleId,
  setSelectedConceptId,
}) => {
  const { isConceptCompleted } = useProgress();
  const currentModule = allModules.find(m => m.id === selectedModuleId) || allModules[0];

  const handleScrollToConcept = (conceptId: string) => {
    if (setSelectedConceptId) {
      setSelectedConceptId(conceptId);
    }
    const elem = document.getElementById(conceptId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside className="w-full lg:w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-5 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
      {/* Module Selector Header */}
      <div className="space-y-1 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-blue-600" />
          <span>Module Navigation</span>
        </div>
        <h4 className="font-bold text-sm text-slate-900">
          Module {currentModule.id}: {currentModule.title.split(':')[1]}
        </h4>
        <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold inline-block">
          Day {currentModule.day} · {currentModule.estimatedHours} Hours
        </span>
      </div>

      {/* Module Switcher Pills */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Switch Module
        </span>
        <div className="grid grid-cols-4 gap-1">
          {allModules.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModuleId(m.id)}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedModuleId === m.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              M{m.id}
            </button>
          ))}
        </div>
      </div>

      {/* Topics / Concepts List in Current Module */}
      <div className="space-y-1.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Key Concepts ({currentModule.concepts.length})
        </span>

        <div className="space-y-1">
          {currentModule.concepts.map(c => {
            const isDone = isConceptCompleted(c.id);
            return (
              <button
                key={c.id}
                onClick={() => handleScrollToConcept(c.id)}
                className="w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start gap-2 hover:bg-slate-50 group border border-transparent hover:border-slate-200"
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 shrink-0 mt-0.5" />
                )}
                <span className="font-medium text-slate-700 group-hover:text-slate-900 leading-snug">
                  {c.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mini Challenge Direct Jump */}
      <div className="pt-2 border-t border-slate-100">
        <a
          href="#module-challenge"
          className="flex items-center justify-between p-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-bold transition-colors"
        >
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-purple-600" />
            <span>Mini Challenge {currentModule.id}</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-purple-600" />
        </a>
      </div>
    </aside>
  );
};
