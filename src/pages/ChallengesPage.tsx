import React, { useState } from 'react';
import { Target, CheckCircle2, Trophy } from 'lucide-react';

import { allChallenges } from '../data';
import { ChallengeCard } from '../components/common/ChallengeCard';
import { useProgress } from '../context/ProgressContext';

export const ChallengesPage: React.FC = () => {
  const { completedChallenges } = useProgress();
  const [selectedModule, setSelectedModule] = useState<number | 'all'>('all');

  const filteredChallenges = selectedModule === 'all'
    ? allChallenges
    : allChallenges.filter(c => c.moduleNumber === selectedModule);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Hands-on Lab Coding Challenges</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            7 Module Mini Challenges
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Practical classroom exercises for students to reinforce concepts in IntelliJ IDEA or the online sandbox.
          </p>
        </div>

        {/* Challenge Score Card */}
        <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-600">COMPLETED CHALLENGES</div>
            <div className="text-xl font-extrabold text-slate-900">
              {completedChallenges.length} / {allChallenges.length}
            </div>
          </div>
        </div>
      </div>

      {/* Module Filter Tabs */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedModule('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedModule === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All 7 Challenges
        </button>

        {allChallenges.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedModule(c.moduleNumber)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedModule === c.moduleNumber
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Mod {c.moduleNumber}</span>
            {completedChallenges.includes(c.id) && (
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            )}
          </button>
        ))}
      </div>

      {/* Challenges Stream */}
      <div className="space-y-8">
        {filteredChallenges.map(ch => (
          <ChallengeCard key={ch.id} challenge={ch} />
        ))}
      </div>
    </div>
  );
};
