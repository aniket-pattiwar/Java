import React from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import type { QuizQuestion } from '../../types/course';

import { useProgress } from '../../context/ProgressContext';
import confetti from 'canvas-confetti';

interface QuizCardProps {
  questions: QuizQuestion[];
  conceptTitle: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ questions, conceptTitle }) => {
  const { completedQuizzes, setQuizAnswer } = useProgress();

  const handleSelectOption = (questionId: string, optionIndex: number, isCorrect: boolean) => {
    setQuizAnswer(questionId, optionIndex);
    if (isCorrect) {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.85 },
        });
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="p-1 rounded bg-blue-100 text-blue-700">
          <HelpCircle className="w-4 h-4" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-800">Quick Concept Check · {conceptTitle}</h4>
          <p className="text-xs text-slate-500">Test understanding with immediate feedback and explanation.</p>
        </div>
      </div>

      <div className="space-y-5">
        {questions.map((q, qIndex) => {
          const selectedIndex = completedQuizzes[q.id];
          const isAnswered = selectedIndex !== undefined;
          const isCorrect = isAnswered && selectedIndex === q.correctAnswerIndex;

          return (
            <div key={q.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-start gap-2">
                <span className="font-bold text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded shrink-0">
                  Q{qIndex + 1}
                </span>
                <span className="font-semibold text-xs text-slate-900 leading-relaxed">
                  {q.question}
                </span>
              </div>

              {q.codeSnippet && (
                <pre className="bg-slate-900 text-slate-100 p-2.5 rounded font-mono text-xs overflow-x-auto">
                  {q.codeSnippet}
                </pre>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((option, optIdx) => {
                  const isThisSelected = selectedIndex === optIdx;
                  const isThisCorrect = optIdx === q.correctAnswerIndex;

                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (isAnswered) {
                    if (isThisCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-400';
                    } else if (isThisSelected) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                    } else {
                      btnStyle = 'bg-white/50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx, isThisCorrect)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-start gap-2 ${btnStyle}`}
                    >
                      <span className="font-mono font-bold text-[11px] text-slate-400">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswered && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {isAnswered && (
                <div
                  className={`p-3 rounded-lg text-xs leading-relaxed animate-in fade-in duration-200 ${
                    isCorrect
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border border-amber-200 text-amber-900'
                  }`}
                >
                  <span className="font-bold">
                    {isCorrect ? '✓ Correct! ' : 'Explanation: '}
                  </span>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
