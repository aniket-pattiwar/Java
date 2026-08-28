import React, { useState } from 'react';
import { Sparkles, PenTool, Code2, HelpCircle, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import type { TeachingNote } from '../../types/course';
import { useTeachingMode } from '../../context/TeachingModeContext';

interface TeachingTipProps {
  note: TeachingNote;
  conceptTitle?: string;
}

export const TeachingTip: React.FC<TeachingTipProps> = ({ note }) => {
  const { teachingMode, showAnswersByDefault } = useTeachingMode();
  const [showAnswer, setShowAnswer] = useState<boolean>(showAnswersByDefault);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  if (!teachingMode) return null;

  return (
    <div className="bg-amber-50/70 border border-amber-300/80 rounded-xl overflow-hidden shadow-xs space-y-0 transition-all">
      {/* Teacher Bar Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-amber-100/90 px-4 py-2.5 flex items-center justify-between cursor-pointer hover:bg-amber-200/80 transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500 text-white">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-xs text-amber-950 uppercase tracking-wide">
            Teaching Mode · 2-Minute Instructor Refresher
          </span>
        </div>
        <div className="flex items-center gap-2 text-amber-900 text-xs font-semibold">
          <span>{isExpanded ? 'Collapse Tips' : 'Expand Tips'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-4 text-xs text-slate-800 animate-in fade-in duration-150">
          {/* 1. Quick 2-Minute Pitch */}
          <div className="space-y-1.5">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>2-Minute Teaching Pitch:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 leading-relaxed font-medium">
              {note.explain2Min.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>

          {/* 2. Whiteboard Drawing Guide */}
          <div className="bg-white/80 border border-amber-200 p-3 rounded-lg space-y-1">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5 text-amber-600" />
              <span>Whiteboard Drawing Guide:</span>
            </div>
            <p className="text-slate-700 pl-5">{note.drawTips}</p>
          </div>

          {/* 3. Code Highlight Callout */}
          <div className="bg-white/80 border border-amber-200 p-3 rounded-lg space-y-1">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Key Code Highlight:</span>
            </div>
            <p className="text-slate-700 pl-5">{note.codeHighlight}</p>
          </div>

          {/* 4. Classroom Question Prompt */}
          <div className="bg-blue-50/80 border border-blue-200 p-3.5 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-bold text-blue-950 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Classroom Discussion Question:</span>
              </div>
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                {showAnswer ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>{showAnswer ? 'Hide Answer' : 'Reveal Answer'}</span>
              </button>
            </div>

            <p className="text-slate-800 font-semibold italic pl-5">
              "{note.studentQuestion}"
            </p>

            {showAnswer && (
              <div className="mt-2 pl-5 pt-2 border-t border-blue-200/70 text-slate-700 text-xs animate-in fade-in duration-150">
                <span className="font-bold text-emerald-800">Suggested Answer: </span>
                <span>{note.studentAnswer}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
