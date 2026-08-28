import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { allModules } from '../data';
import { Sidebar } from '../components/layout/Sidebar';
import { ConceptCard } from '../components/common/ConceptCard';
import { ChallengeCard } from '../components/common/ChallengeCard';

interface ModulePageProps {
  moduleId: number;
  setSelectedModuleId: (id: number) => void;
  setCurrentView: (view: string) => void;
}

export const ModulePage: React.FC<ModulePageProps> = ({
  moduleId,
  setSelectedModuleId,
  setCurrentView,
}) => {
  const currentModule = allModules.find(m => m.id === moduleId) || allModules[0];


  const prevModule = allModules.find(m => m.id === currentModule.id - 1);
  const nextModule = allModules.find(m => m.id === currentModule.id + 1);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-150">
      {/* Module Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Day {currentModule.day} · {currentModule.estimatedHours} Hours
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {currentModule.concepts.length} Concepts
            </span>
          </div>

          <div className="flex items-center gap-2">
            {prevModule && (
              <button
                onClick={() => setSelectedModuleId(prevModule.id)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev (M{prevModule.id})</span>
              </button>
            )}
            {nextModule && (
              <button
                onClick={() => setSelectedModuleId(nextModule.id)}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
              >
                <span>Next (M{nextModule.id})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {currentModule.title}
        </h1>

        <p className="text-sm text-slate-600 max-w-4xl leading-relaxed">
          {currentModule.description}
        </p>

        {/* Topics Checklist Pills */}
        <div className="pt-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Syllabus Coverage in this Module:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {currentModule.topicsCovered.map((topic, idx) => (
              <span
                key={idx}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-1 rounded-md"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <Sidebar selectedModuleId={currentModule.id} setSelectedModuleId={setSelectedModuleId} />

        {/* Right Main Concepts Stream */}
        <div className="flex-1 w-full space-y-8">
          {/* Concepts List */}
          {currentModule.concepts.map(concept => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}

          {/* Module Mini Challenge */}
          <div id="module-challenge" className="pt-4">
            <ChallengeCard challenge={currentModule.miniChallenge} />
          </div>

          {/* Module Footer Pagination */}
          <div className="flex items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl">
            {prevModule ? (
              <button
                onClick={() => { setSelectedModuleId(prevModule.id); window.scrollTo(0, 0); }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2 border border-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous: Module {prevModule.id}</span>
              </button>
            ) : <div />}

            {nextModule ? (
              <button
                onClick={() => { setSelectedModuleId(nextModule.id); window.scrollTo(0, 0); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Proceed to Module {nextModule.id}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => { setCurrentView('reference'); window.scrollTo(0, 0); }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2 transition-colors shadow-xs"
              >
                <span>Complete Course · View Cheat Sheet</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
