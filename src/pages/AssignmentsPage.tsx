import React, { useState } from 'react';
import {
  Download,
  Printer,
  CheckCircle2,
  Clock,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  Terminal,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { assignmentsData } from '../data/assignmentsData';
import type { PracticalQuestion } from '../data/assignmentsData';

interface AssignmentsPageProps {
  setCurrentView?: (view: string) => void;
}

export const AssignmentsPage: React.FC<AssignmentsPageProps> = () => {
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<number>(1);
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Local storage checklist for student completion
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('java_assignment_checklist_v3');
    return saved ? JSON.parse(saved) : {};
  });

  const currentAssignment =
    assignmentsData.find(a => a.id === selectedAssignmentId) || assignmentsData[0];

  const toggleHint = (questionId: string) => {
    setOpenHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const toggleTaskComplete = (taskId: string) => {
    const updated = { ...completedTasks, [taskId]: !completedTasks[taskId] };
    setCompletedTasks(updated);
    localStorage.setItem('java_assignment_checklist_v3', JSON.stringify(updated));
  };

  const handlePrint = () => {
    window.print();
  };

  const getDifficultyBadge = (level: PracticalQuestion['level']) => {
    switch (level) {
      case 'Easy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Medium':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const completedCount = currentAssignment.questions.filter(q => completedTasks[q.id]).length;
  const completionPercentage = Math.round((completedCount / currentAssignment.questions.length) * 100);

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-150">
      {/* Page Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>100% Practical Coding Assessment · 2 Challenges Per Assignment (Easy & Medium)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Java Practical Laboratory Assignments
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Hands-on programming evaluations designed to build and verify production-level Java skills.
            Each assignment contains exactly 2 coding challenges: <strong>Easy</strong> and <strong>Medium</strong>.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 no-print">
          <a
            href={currentAssignment.pdfUrl}
            download={currentAssignment.pdfFileName}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Assignment {currentAssignment.id} (PDF)</span>
          </a>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Assignment Navigation Selector Tabs */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-3">
        {assignmentsData.map(assignment => {
          const isSelected = assignment.id === selectedAssignmentId;
          return (
            <button
              key={assignment.id}
              onClick={() => setSelectedAssignmentId(assignment.id)}
              className={`text-left p-4 sm:p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  Assignment {assignment.id}
                </span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {assignment.daysCovered}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                  {assignment.title.split(':')[1] || assignment.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {assignment.subtitle}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-blue-700">
                  Modules: {assignment.modulesCovered.join(', ')}
                </span>
                <span className="font-bold text-slate-700">2 Coding Tasks</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Assignment Overview Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Assigned Modules: {currentAssignment.modulesCovered.join(' & ')} ({currentAssignment.daysCovered})
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full font-semibold">
              2 Questions (Easy & Medium)
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {currentAssignment.estimatedTime}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            {currentAssignment.title}
          </h2>
          <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
            {currentAssignment.summary}
          </p>
        </div>

        {/* Learning Objectives Grid */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3">
          <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Core Practical Skills Evaluated</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-200">
            {currentAssignment.learningObjectives.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress & PDF Download Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-3">
            <div className="text-xs">
              <span className="text-slate-400">Implementation Checklist: </span>
              <span className="font-bold text-white">
                {completedCount} of 2 Questions Solved ({completionPercentage}%)
              </span>
            </div>
            <div className="w-32 bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 no-print">
            <span>Official Document:</span>
            <a
              href={currentAssignment.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline flex items-center gap-1"
            >
              <span>{currentAssignment.pdfFileName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* The 2 Practical Questions (Easy, Medium) */}
      <div className="space-y-8">
        {currentAssignment.questions.map((q, idx) => {
          const isChecked = !!completedTasks[q.id];
          const isHintOpen = !!openHints[q.id];

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-xs transition-all space-y-6 ${
                isChecked
                  ? 'border-emerald-300 ring-2 ring-emerald-500/10'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Header Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${getDifficultyBadge(
                      q.level
                    )}`}
                  >
                    Question {idx + 1} · {q.level} Level
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {q.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg border border-slate-200">
                    Practical Challenge
                  </span>
                  <button
                    onClick={() => toggleTaskComplete(q.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isChecked
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    title="Toggle completion status"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isChecked ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>

              {/* Problem Statement */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Problem Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {q.description}
                </p>
              </div>

              {/* Technical Requirements Checklist */}
              <div className="space-y-2 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-blue-600" />
                  <span>Technical Requirements & Implementation Specifications</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-700 pl-4 list-disc marker:text-blue-500">
                  {q.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="leading-relaxed">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Starter Code Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1 font-mono">
                    <Terminal className="w-4 h-4 text-indigo-600" />
                    Java Starter Code Template:
                  </span>
                  <button
                    onClick={() => handleCopyCode(q.id, q.starterCode)}
                    className="no-print text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors font-bold cursor-pointer"
                  >
                    {copiedCodeId === q.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Code Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-slate-950 text-slate-200 p-4 sm:p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                  <pre>{q.starterCode}</pre>
                </div>
              </div>

              {/* Sample Interaction / Output */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Sample Console Interaction & Output Format</span>
                </div>
                <pre className="font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-white/70 p-3 rounded-xl border border-amber-100">
                  {q.sampleIO}
                </pre>
              </div>

              {/* Evaluation Criteria */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Evaluation Criteria:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  {q.evaluationCriteria.map((criterion, rIdx) => (
                    <div
                      key={rIdx}
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      <span className="text-slate-700 font-medium">{criterion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expandable Hint & Solution Outline */}
              <div className="no-print border-t border-slate-100 pt-4">
                <button
                  onClick={() => toggleHint(q.id)}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>{isHintOpen ? 'Hide Guidance & Hint' : 'Show Guidance & Solution Outline'}</span>
                  {isHintOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isHintOpen && (
                  <div className="mt-3 bg-blue-50/60 border border-blue-200 rounded-2xl p-4 sm:p-5 space-y-3 text-xs animate-in fade-in duration-150">
                    {q.hint && (
                      <div>
                        <span className="font-bold text-blue-900">💡 Implementation Tip: </span>
                        <span className="text-blue-800 leading-relaxed">{q.hint}</span>
                      </div>
                    )}
                    {q.solutionOutline && (
                      <div className="pt-2 border-t border-blue-200/60">
                        <div className="font-bold text-slate-900 mb-1">
                          Algorithmic Steps & Solution Outline:
                        </div>
                        <pre className="font-mono text-slate-800 whitespace-pre-wrap text-[11px] leading-relaxed bg-white/80 p-3 rounded-xl border border-blue-100">
                          {q.solutionOutline}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="font-extrabold text-slate-900 text-base">
            Finished Coding Assignment {currentAssignment.id}?
          </h4>
          <p className="text-xs text-slate-500">
            Download the official printable PDF or print directly for classroom laboratory submission.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={currentAssignment.pdfUrl}
            download={currentAssignment.pdfFileName}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download {currentAssignment.pdfFileName}</span>
          </a>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Current Assignment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
