import React, { useState } from 'react';
import { Target, Lightbulb, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import type { MiniChallenge } from '../../types/course';

import { CodePlayground } from './CodePlayground';
import { useProgress } from '../../context/ProgressContext';
import confetti from 'canvas-confetti';

interface ChallengeCardProps {
  challenge: MiniChallenge;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const { completedChallenges, toggleChallengeCompleted } = useProgress();
  const isDone = completedChallenges.includes(challenge.id);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);

  const handleToggleDone = () => {
    toggleChallengeCompleted(challenge.id);
    if (!isDone) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
        });
      } catch {
        // Safe
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm space-y-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30 px-2 py-0.5 rounded">
                Module {challenge.moduleNumber} Challenge
              </span>
              <span className="text-[11px] font-medium text-amber-300 bg-amber-900/40 border border-amber-500/30 px-2 py-0.5 rounded">
                {challenge.difficulty}
              </span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">{challenge.title}</h3>
          </div>
        </div>

        <button
          onClick={handleToggleDone}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
            isDone
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isDone ? 'Completed ✓' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Problem Statement */}
      <div className="p-5 space-y-4 text-xs">
        <div className="space-y-1.5">
          <h4 className="font-bold text-slate-900 text-sm">Problem Objective:</h4>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            {challenge.problem}
          </p>
        </div>

        {/* Expected Output Snippet */}
        <div className="space-y-1.5">
          <span className="font-bold text-slate-800 uppercase tracking-wide text-[11px] block">
            Expected Console Output:
          </span>
          <pre className="bg-slate-900 text-emerald-300 p-3 rounded-lg font-mono text-xs overflow-x-auto border border-slate-800">
            {challenge.expectedOutput}
          </pre>
        </div>

        {/* Interactive Workspace */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">Your Code Sandbox:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>{showHints ? 'Hide Hints' : 'View Hints'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
              >
                {showSolution ? <EyeOff className="w-3.5 h-3.5 text-purple-600" /> : <Eye className="w-3.5 h-3.5 text-purple-600" />}
                <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
              </button>
            </div>
          </div>

          {/* Hints Panel */}
          {showHints && (
            <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-lg space-y-1.5 animate-in fade-in duration-150">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Helpful Implementation Hints:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium pl-1">
                {challenge.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Solution Panel */}
          {showSolution && (
            <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-xl space-y-2 animate-in fade-in duration-150">
              <div className="font-bold text-purple-950 flex items-center justify-between">
                <span>Verified Clean Reference Solution:</span>
                <span className="text-[10px] text-purple-700 font-mono">Module {challenge.moduleNumber} Solution</span>
              </div>
              <pre className="bg-slate-950 text-emerald-300 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                {challenge.solutionCode}
              </pre>
              <p className="text-slate-600 text-xs">{challenge.explanation}</p>
            </div>
          )}

          {/* Interactive Playground */}
          <CodePlayground
            initialCode={challenge.starterCode}
            expectedOutput={challenge.expectedOutput}
            title={`${challenge.title} · Playground`}
          />
        </div>
      </div>
    </div>
  );
};
