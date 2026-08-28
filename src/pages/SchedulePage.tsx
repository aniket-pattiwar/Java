import React, { useState } from 'react';
import { Calendar, CheckCircle2, ArrowRight, Laptop } from 'lucide-react';

import { courseSchedule } from '../data/schedule';

interface SchedulePageProps {
  setCurrentView: (view: string) => void;
  setSelectedModuleId: (id: number) => void;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({
  setCurrentView,
  setSelectedModuleId,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const activeDay = courseSchedule.find(d => d.day === selectedDay) || courseSchedule[0];

  const handleStartDay = (modId: number) => {
    setSelectedModuleId(modId);
    setCurrentView('module');
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
          <Calendar className="w-4 h-4" />
          <span>Teaching Timetable & Syllabus Allocation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          5-Day Teaching Plan (20 Hours Total)
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Structured 4 hours/day plan covering Modules 1 through 7 with dedicated conceptual whiteboard breakdowns and IntelliJ lab exercises.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {courseSchedule.map(day => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(day.day)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              selectedDay === day.day
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs">DAY {day.day}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                selectedDay === day.day ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {day.hours}h
              </span>
            </div>
            <div className="text-xs font-semibold mt-1 truncate">
              {day.title.split('—')[1]}
            </div>
            <span className="text-[10px] opacity-80 block mt-0.5">
              Mod {day.modulesCovered.join(', ')}
            </span>
          </button>
        ))}
      </div>

      {/* Active Day Detail Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-0.5 rounded-full">
                DAY {activeDay.day} · {activeDay.hours} Hours
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Covers: Modules {activeDay.modulesCovered.join(' & ')}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{activeDay.title}</h2>
            <p className="text-xs text-slate-600">{activeDay.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            {activeDay.modulesCovered.map(modId => (
              <button
                key={modId}
                onClick={() => handleStartDay(modId)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Teach Module {modId}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* Visual Topic Flow Pipeline for the Day */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
            Day {activeDay.day} Visual Flow Sequence:
          </h3>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
              {activeDay.flow.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs font-semibold text-slate-800">
                    {step}
                  </span>
                  {idx < activeDay.flow.length - 1 && (
                    <span className="text-blue-500 font-bold">↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* 4-Hour Breakdown Schedule Table */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wider">
            Hour-by-Hour Breakdown (4 Hours)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeDay.hourlyAgenda.map((agenda, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-blue-700 font-mono">
                    {agenda.hour}
                  </span>
                  <span className="text-[11px] font-bold text-slate-800">
                    {agenda.topic}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Core Concepts Taught:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {agenda.concepts.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="bg-white border border-slate-200 text-[11px] font-medium text-slate-700 px-2 py-0.5 rounded"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-200 p-2.5 rounded-lg space-y-0.5">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1">
                    <Laptop className="w-3 h-3 text-purple-600" />
                    <span>IntelliJ Practical Exercise:</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">{agenda.practical}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Outcomes Checklist */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 space-y-2">
          <h3 className="font-bold text-xs text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Day {activeDay.day} Learning Outcomes:</span>
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-xs text-emerald-900 font-medium">
            {activeDay.goals.map((g, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg border border-emerald-100">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
