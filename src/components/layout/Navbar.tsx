import React, { useState } from 'react';
import {
  // Sparkles,
  Calendar,
  Layers,
  Terminal,
  FileText,
  ChevronDown,
  Menu,
  X,
  Target,
  Download,
} from 'lucide-react';
import { useTeachingMode } from '../../context/TeachingModeContext';
import { useProgress } from '../../context/ProgressContext';
import { allModules } from '../../data';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedModuleId: number;
  setSelectedModuleId: (id: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  selectedModuleId,
  setSelectedModuleId,
}) => {
  const { teachingMode, toggleTeachingMode } = useTeachingMode();
  const { progressPercentage } = useProgress();
  const [isModuleMenuOpen, setIsModuleMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const handleSelectModule = (id: number) => {
    setSelectedModuleId(id);
    setCurrentView('module');
    setIsModuleMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          {/* Brand Logo & Title */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm group-hover:bg-blue-700 transition-colors shrink-0">
              <span className="text-lg sm:text-xl">☕</span>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight group-hover:text-blue-600 transition-colors">
                  Mastering Java
                </span>
                <span className="bg-amber-100 text-amber-900 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-200">
                  STT 2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Modules 1–7 · 20 Hours</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700 me-4">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'home'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('schedule')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'schedule'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>5-Day Plan</span>
            </button>

            {/* Modules Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsModuleMenuOpen(!isModuleMenuOpen)}
                className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                  currentView === 'module'
                    ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                    : 'hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                <span>
                  {currentView === 'module' ? `Module ${selectedModuleId}` : 'Modules (1–7)'}
                </span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isModuleMenuOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Core Java Syllabus Modules
                  </div>
                  {allModules.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleSelectModule(m.id)}
                      className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                        selectedModuleId === m.id && currentView === 'module'
                          ? 'bg-blue-50 text-blue-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="font-bold">M{m.id}:</span> {m.title.split(':')[1]}
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">Day {m.day}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentView('challenges')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'challenges'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-rose-600" />
              <span>Challenges</span>
            </button>

            <button
              onClick={() => setCurrentView('playground')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'playground'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-600" />
              <span>Playground</span>
            </button>

            <button
              onClick={() => setCurrentView('reference')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'reference'
                  ? 'bg-slate-100 text-slate-950 font-bold'
                  : 'hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Quick Reference</span>
            </button>

            <button
              onClick={() => setCurrentView('install-guide')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'install-guide'
                  ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                  : 'hover:bg-slate-50 hover:text-slate-900 text-blue-700'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Java 17</span>
              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                PDF
              </span>
            </button>

            <button
              onClick={() => setCurrentView('intellij-guide')}
              className={`me-4 px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shrink-0 ${
                currentView === 'intellij-guide'
                  ? 'bg-indigo-50 text-indigo-800 font-bold border border-indigo-200'
                  : 'hover:bg-slate-50 hover:text-slate-900 text-indigo-700'
              }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[8px]">
                IJ
              </div>
              <span>IntelliJ</span>
              <span className="me-4 bg-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                PDF
              </span>
            </button>
          </nav>

          {/* Medium Screen Navigation (1024px - 1280px) Compact Nav */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 text-xs font-semibold text-slate-700">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-2 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'home' ? 'bg-slate-100 text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentView('schedule')}
              className={`px-2 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'schedule' ? 'bg-slate-100 text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              5-Day
            </button>
            <button
              onClick={() => setIsModuleMenuOpen(!isModuleMenuOpen)}
              className={`px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 ${
                currentView === 'module' ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200' : 'hover:bg-slate-50'
              }`}
            >
              <span>{currentView === 'module' ? `M${selectedModuleId}` : 'Modules'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            <button
              onClick={() => setCurrentView('challenges')}
              className={`px-2 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'challenges' ? 'bg-slate-100 text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Challenges
            </button>
            <button
              onClick={() => setCurrentView('playground')}
              className={`px-2 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'playground' ? 'bg-slate-100 text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Playground
            </button>
            <button
              onClick={() => setCurrentView('reference')}
              className={`px-2 py-1.5 rounded-lg transition-colors shrink-0 ${
                currentView === 'reference' ? 'bg-slate-100 text-slate-950 font-bold' : 'hover:bg-slate-50'
              }`}
            >
              Ref
            </button>
            <button
              onClick={() => setCurrentView('install-guide')}
              className={`px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 ${
                currentView === 'install-guide' ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200' : 'hover:bg-slate-50 text-blue-700'
              }`}
            >
              <Download className="w-3 h-3 text-blue-600" />
              <span>JDK</span>
            </button>
            <button
              onClick={() => setCurrentView('intellij-guide')}
              className={`px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1 shrink-0 ${
                currentView === 'intellij-guide' ? 'bg-indigo-50 text-indigo-800 font-bold border border-indigo-200' : 'hover:bg-slate-50 text-indigo-700'
              }`}
            >
              <span>IJ (PDF)</span>
            </button>
          </nav>

          {/* Right Toolbar: Teaching Mode & Progress */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ms-3">
            {/* Teaching Mode Toggle */}
            <button
              onClick={toggleTeachingMode}
              className={`ms-4 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs shrink-0 ${
                teachingMode
                  ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="Toggle Teacher notes, whiteboard guides, and student discussion questions"
            >
              {/* <Sparkles className="w-3.5 h-3.5 shrink-0" /> */}
              {/* <span className="hidden sm:inline">Teaching Mode:</span> */}
              {/* <span>{teachingMode ? 'ON' : 'OFF'}</span> */}
            </button>

            {/* Real Progress Counter */}
            <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-xs shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-600">
                  <span>PROGRESS</span>
                  <span className="text-blue-600">{progressPercentage}%</span>
                </div>
                <div className="w-16 sm:w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Mobile / Tablet Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2 text-xs font-semibold animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentView('schedule'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>5-Day Teaching Schedule</span>
            </button>

            <div className="px-3 pt-2 text-[11px] font-bold text-slate-400 uppercase">Modules</div>
            <div className="grid grid-cols-2 gap-1 px-3">
              {allModules.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModule(m.id)}
                  className={`text-left p-2 rounded border text-xs ${
                    selectedModuleId === m.id && currentView === 'module'
                      ? 'bg-blue-50 border-blue-300 text-blue-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  Mod {m.id} (Day {m.day})
                </button>
              ))}
            </div>

            <button
              onClick={() => { setCurrentView('challenges'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-rose-600" />
              <span>7 Mini Challenges</span>
            </button>
            <button
              onClick={() => { setCurrentView('playground'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Java Playground</span>
            </button>
            <button
              onClick={() => { setCurrentView('reference'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Quick Reference Cheat Sheet</span>
            </button>
            <button
              onClick={() => { setCurrentView('install-guide'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-blue-700 font-bold"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-blue-600" />
                <span>Install Java 17 Guide (PDF)</span>
              </div>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                PDF
              </span>
            </button>
            <button
              onClick={() => { setCurrentView('intellij-guide'); setIsMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-indigo-700 font-bold"
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px]">
                  IJ
                </div>
                <span>IntelliJ IDEA Setup (PDF)</span>
              </div>
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                PDF
              </span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
