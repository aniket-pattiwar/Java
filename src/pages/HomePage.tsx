import React from 'react';
import {
  ArrowRight,
  Calendar,
  FileText,
  Clock,
  Download,
  Award,
} from 'lucide-react';
import { allModules } from '../data';

interface HomePageProps {
  setCurrentView: (view: string) => void;
  setSelectedModuleId: (id: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentView, setSelectedModuleId }) => {


  const handleStartDay1 = () => {
    setSelectedModuleId(1);
    setCurrentView('module');
  };

  const handleOpenModule = (id: number) => {
    setSelectedModuleId(id);
    setCurrentView('module');
  };

  const dayFlows = [
    {
      day: 1,
      title: 'DAY 1 — Java Fundamentals & Flow',
      modules: 'Modules 1 & 2',
      topics: 'JDK/JRE/JVM · Bytecode · main() · Primitives · Operators · if/switch · Loops',
      hours: '4 Hours',
      color: 'border-blue-300 bg-blue-50/40 text-blue-900',
    },
    {
      day: 2,
      title: 'DAY 2 — OOP Foundations',
      modules: 'Module 3',
      topics: 'Real World Modeling · Class vs Object · State & Behavior · 4 Pillars · Encapsulation',
      hours: '4 Hours',
      color: 'border-indigo-300 bg-indigo-50/40 text-indigo-900',
    },
    {
      day: 3,
      title: 'DAY 3 — Constructors & Memory Mechanics',
      modules: 'Module 4',
      topics: 'Constructors · Stack vs Heap Visualizer · Reference Sharing · Pass-by-Value',
      hours: '4 Hours',
      color: 'border-purple-300 bg-purple-50/40 text-purple-900',
    },
    {
      day: 4,
      title: 'DAY 4 — Inheritance & Polymorphism',
      modules: 'Module 5',
      topics: 'Inheritance Trees · Dynamic Dispatch · Overloading/Overriding · Casting · UML Relations',
      hours: '4 Hours',
      color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900',
    },
    {
      day: 5,
      title: 'DAY 5 — Abstraction, Interfaces & Packages',
      modules: 'Modules 6 & 7',
      topics: 'Abstract Classes · Interfaces · Object Class · final · Access Matrix · Chaining',
      hours: '4 Hours',
      color: 'border-amber-300 bg-amber-50/40 text-amber-900',
    },
  ];

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-150">
      {/* Hero Classroom Banner */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
        <div className="space-y-3">
          {/* <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Short-Term Training 2026 · Modules 1–7
            </span>
            <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>20 Hours · 4 Hrs/Day · 5 Days</span>
            </span>
          </div> */}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Mastering Programming using Java
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
            Your interactive visual whiteboard and classroom teaching companion. Built for clean concept breakdown, dynamic memory simulations, IntelliJ exercises, and progressive student learning.
          </p>
        </div>

        {/* Course Highlights Pill Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 pt-1">
          {/* <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span> 20 Hours Total
          </span> */}
          {/* <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 5-Day Delivery
          </span> */}
          <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-600"></span> Core Java + OOP Focus
          </span>
          <span className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span> IntelliJ IDEA Companion
          </span>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleStartDay1}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            <span>Start Day 1</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentView('install-guide')}
            className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-blue-200 cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600" />
            <span>Install Java 17 (PDF)</span>
          </button>

          <button
            onClick={() => setCurrentView('intellij-guide')}
            className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-indigo-200 cursor-pointer"
          >
            <div className="w-4 h-4 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px]">
              IJ
            </div>
            <span>IntelliJ Guide (PDF)</span>
          </button>

          {/* <button
            onClick={() => setCurrentView('schedule')}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors border border-slate-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>5-Day Plan</span>
          </button> */}

          <button
            onClick={() => setCurrentView('reference')}
            className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors border border-slate-200 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Quick Reference</span>
          </button>

          <button
            onClick={() => setCurrentView('assignments')}
            className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors border border-amber-300 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Assignments (3 PDFs)</span>
          </button>
        </div>
      </section>

      {/* 5-Day Visual Flow Pipeline */}
      {/* <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">5-Day Teaching Pipeline</h2>
            <p className="text-xs text-slate-500">Logical progression from architecture to advanced OOP patterns.</p>
          </div>
          <button
            onClick={() => setCurrentView('schedule')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Full Schedule & Agenda</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {dayFlows.map(d => (
            <div
              key={d.day}
              onClick={() => {
                setSelectedModuleId(d.day === 1 ? 1 : d.day === 2 ? 3 : d.day === 3 ? 4 : d.day === 4 ? 5 : 6);
                setCurrentView('module');
              }}
              className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all space-y-2.5 ${d.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded shadow-2xs">
                  DAY {d.day}
                </span>
                <span className="text-[10px] font-semibold opacity-75">{d.hours}</span>
              </div>
              <h3 className="font-bold text-xs leading-snug">{d.title.split('—')[1]}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">{d.topics}</p>
              <div className="text-[10px] font-bold text-blue-700 flex items-center gap-1 pt-1">
                <span>View Day {d.day}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* All 7 Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Syllabus Modules (1 through 7)</h2>
            <p className="text-xs text-slate-500">Comprehensive coverage of all topics with zero placeholders.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allModules.map(m => (
            <div
              key={m.id}
              onClick={() => handleOpenModule(m.id)}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-100">
                  Module {m.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">Day {m.day} · {m.estimatedHours}h</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                {m.title.split(':')[1]}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {m.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{m.concepts.length} Key Concepts</span>
                <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course Assignments & PDF Download Showcase */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Official Academic Course Assessments</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              3 Practical Assignments (Covering All 7 Modules)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              Hands-on lab challenges with problem statements, technical requirements, starter code, and sample outputs. Available as official printable PDFs.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('assignments')}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Open Assignments Hub</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Assignment 1 Card */}
          <div className="bg-slate-50/70 border border-slate-200 hover:border-blue-400 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                  ASSIGNMENT 1
                </span>
                <span className="text-[11px] font-bold text-slate-700">2 Coding Tasks</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Java Foundations & Flow Control (Practical)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modules 1 & 2 · [Easy] Metric Converter & [Medium] Smart Cash Register.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
              <a
                href="/assignments/Assignment-1-Java-Foundations.pdf"
                download="Assignment-1-Java-Foundations.pdf"
                className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => setCurrentView('assignments')}
                className="text-slate-700 hover:text-slate-900 font-semibold"
              >
                View Online →
              </button>
            </div>
          </div>

          {/* Assignment 2 Card */}
          <div className="bg-slate-50/70 border border-slate-200 hover:border-indigo-400 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                  ASSIGNMENT 2
                </span>
                <span className="text-[11px] font-bold text-slate-700">2 Coding Tasks</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                OOP Foundations & Memory (Practical)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modules 3 & 4 · [Easy] Encapsulated Bank Account & [Medium] Connected Vehicle Telemetry.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
              <a
                href="/assignments/Assignment-2-OOP-and-Memory.pdf"
                download="Assignment-2-OOP-and-Memory.pdf"
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => setCurrentView('assignments')}
                className="text-slate-700 hover:text-slate-900 font-semibold"
              >
                View Online →
              </button>
            </div>
          </div>

          {/* Assignment 3 Card */}
          <div className="bg-slate-50/70 border border-slate-200 hover:border-amber-400 p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200">
                  ASSIGNMENT 3
                </span>
                <span className="text-[11px] font-bold text-slate-700">2 Coding Tasks</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Inheritance, Polymorphism & Abstraction (Practical)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modules 5, 6 & 7 · [Easy] Shape Dynamic Dispatch & [Medium] Employee Payroll Interfaces.
              </p>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
              <a
                href="/assignments/Assignment-3-Inheritance-and-Abstraction.pdf"
                download="Assignment-3-Inheritance-and-Abstraction.pdf"
                className="text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => setCurrentView('assignments')}
                className="text-slate-700 hover:text-slate-900 font-semibold"
              >
                View Online →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Flow Feature Matrix */}
      {/* <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Classroom Teaching Flow</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Designed for Live 4-Hour Teaching Sessions
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Move seamlessly from visual explanation to tiny Java code, output verification, classroom questions, and hands-on IntelliJ execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-white text-sm">2-Min Pitch & Whiteboard</h3>
            <p className="text-slate-300">Scannable summaries and sketch guides for immediate instructor reference.</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-white text-sm">Interactive Visualizers</h3>
            <p className="text-slate-300">Stack vs Heap memory simulation, Access matrix, and Polymorphism dispatch.</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-white text-sm">Code Playground & Quizzes</h3>
            <p className="text-slate-300">Test code directly with verified output and check student comprehension instantly.</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl space-y-1.5">
            <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="font-bold text-white text-sm">IntelliJ 6-Step Guide</h3>
            <p className="text-slate-300">1-click code copying and projector-ready steps for student hands-on coding.</p>
          </div>
        </div>
      </section> */}
    </div>
  );
};
