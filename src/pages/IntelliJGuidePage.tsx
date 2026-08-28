import React, { useState } from 'react';
import {
  Printer,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Laptop,
  Check,
  Copy,
  Calendar,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface IntelliJGuidePageProps {
  setCurrentView?: (view: string) => void;
}

export const IntelliJGuidePage: React.FC<IntelliJGuidePageProps> = ({ setCurrentView }) => {
  const [checkedOptions, setCheckedOptions] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('intellij_install_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeOS, setActiveOS] = useState<'win' | 'mac' | 'linux'>('win');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleCheck = (id: string) => {
    const updated = { ...checkedOptions, [id]: !checkedOptions[id] };
    setCheckedOptions(updated);
    localStorage.setItem('intellij_install_checklist', JSON.stringify(updated));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const courseRoadmap = [
    { day: 'Day 1', modules: 'Module 1 + Module 2', focus: 'Java basics + syntax', tag: 'Foundations' },
    { day: 'Day 2', modules: 'Module 2 + Module 3', focus: 'Operators, flow control + OOP introduction', tag: 'Core Flow' },
    { day: 'Day 3', modules: 'Module 3 + Module 4', focus: 'OOP + constructors + references + memory', tag: 'Memory' },
    { day: 'Day 4', modules: 'Module 5', focus: 'Inheritance + polymorphism + casting', tag: 'OOP Deep' },
    { day: 'Day 5', modules: 'Module 6 + Module 7', focus: 'Abstract class, interface, Object, modifiers, packages', tag: 'Architecture' },
    { day: 'Day 6', modules: 'Module 8', focus: 'Arrays + varargs', tag: 'Data' },
    { day: 'Day 7', modules: 'Module 9 + Module 10', focus: 'Strings + wrappers + exceptions', tag: 'Handling' },
    { day: 'Day 8', modules: 'Module 11', focus: 'Streams + files + I/O', tag: 'I/O & Streams' },
    { day: 'Day 9', modules: 'Module 12 + Revision', focus: 'Collections + complete revision', tag: 'Mastery' },
  ];

  const installerTable = [
    { option: 'Desktop shortcut', recommended: 'Yes', description: 'Keeps "IntelliJ IDEA" checked on desktop for fast access.' },
    { option: 'Add bin folder to PATH', recommended: 'Yes', description: 'Allows launching `idea` or project folders from terminal.' },
    { option: 'Open Folder as Project', recommended: 'Yes', description: 'Adds convenient right-click context menu in Windows Explorer.' },
    { option: '.java association', recommended: 'Yes', description: 'Double-clicking any Java file opens it immediately in IntelliJ.' },
    { option: '.gradle association', recommended: 'Yes', description: 'Recommended if you plan to build Gradle-based Java projects.' },
    { option: '.kt / .kts association', recommended: 'Optional', description: 'Useful if you plan to learn or write Kotlin scripts.' },
    { option: '.groovy / .pom association', recommended: 'Optional', description: 'Useful for Maven and Groovy build scripts.' },
    { option: 'Start Menu folder', recommended: 'JetBrains', description: 'Leave default as "JetBrains" (do NOT check "Do not create shortcuts").' },
    { option: 'Run IntelliJ IDEA after install', recommended: 'Yes', description: 'Starts IntelliJ automatically when clicking Finish.' },
    { option: 'Project Java version', recommended: 'OpenJDK 17', description: 'Point project SDK to your existing OpenJDK 17 installation.' },
  ];

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-150">
      {/* Header & Print Actions */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
              IJ
            </div>
            <span>IntelliJ IDEA IDE Guide · STT 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            IntelliJ IDEA Installation & Java 17 Setup Guide
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Official step-by-step setup guide for <strong>IntelliJ IDEA</strong> across Windows, macOS, and Linux. Learn how to configure your existing <strong>OpenJDK 17</strong>, select the optimal installer settings, and run your first project.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 no-print">
          {setCurrentView && (
            <button
              onClick={() => setCurrentView('install-guide')}
              className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Java 17 (JDK) Setup (PDF)</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Course Roadmap Syllabus Table (Days 1 - 9) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Course Syllabus & Schedule Alignment</h2>
              <p className="text-xs text-slate-500">How your IntelliJ coding exercises map to daily syllabus modules</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200">
            Day 1 to Day 9
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold">
              <tr>
                <th className="p-2.5 border border-slate-200 w-20">Day</th>
                <th className="p-2.5 border border-slate-200 w-44">Topics / Modules</th>
                <th className="p-2.5 border border-slate-200">Classroom Focus & Practice</th>
                <th className="p-2.5 border border-slate-200 w-28 text-center">Stage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courseRoadmap.map((item, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  <td className="p-2.5 border border-slate-200 font-bold text-indigo-900 bg-indigo-50/30">
                    {item.day}
                  </td>
                  <td className="p-2.5 border border-slate-200 font-semibold text-slate-900">
                    {item.modules}
                  </td>
                  <td className="p-2.5 border border-slate-200 text-slate-700">
                    {item.focus}
                  </td>
                  <td className="p-2.5 border border-slate-200 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                      {item.tag}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Step 1: Download & Multi-OS Selection */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Step 1 — Download IntelliJ IDEA for Your Operating System
              </h2>
              <p className="text-xs text-slate-500">Unified single installer with free core Java & Kotlin development</p>
            </div>
          </div>
          <a
            href="https://www.jetbrains.com/idea/download/"
            target="_blank"
            rel="noreferrer"
            className="no-print inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
          >
            <span>JetBrains Download Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Note on Free Unified Version */}
        <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl text-xs text-indigo-950 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-indigo-900 font-bold">Good to Know: Single Unified Version</strong>
            <p className="text-slate-700 leading-relaxed">
              The current IntelliJ IDEA download is a single unified package. You do not need to worry about choosing separate Community vs Ultimate editions on the main page—all core Java, Kotlin, and debugging features needed for learning and daily development are completely free!
            </p>
          </div>
        </div>

        {/* OS Switcher Tabs */}
        <div className="no-print flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveOS('win')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeOS === 'win'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🪟 Windows Setup
          </button>
          <button
            onClick={() => setActiveOS('mac')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeOS === 'mac'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🍎 macOS Setup
          </button>
          <button
            onClick={() => setActiveOS('linux')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeOS === 'linux'
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🐧 Linux Setup
          </button>
        </div>

        {/* OS Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Windows */}
          <div className={`p-4 rounded-2xl border ${activeOS === 'win' ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <span>🪟 Windows (10 & 11)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
              <li>Select <strong>Windows</strong> on JetBrains download page.</li>
              <li>Click <strong>Download (.exe)</strong>.</li>
              <li>Run the downloaded executable file to launch the setup wizard.</li>
              <li>Follow the installer options screen (detailed below in Step 2).</li>
            </ol>
          </div>

          {/* macOS */}
          <div className={`p-4 rounded-2xl border ${activeOS === 'mac' ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <span>🍎 macOS (Apple Silicon & Intel)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
              <li>Select <strong>macOS</strong>.</li>
              <li>Choose <strong>Apple Silicon (ARM64)</strong> for M1/M2/M3/M4 or <strong>Intel (x64)</strong>.</li>
              <li>Download the <strong>.dmg</strong> installer.</li>
              <li>Open the `.dmg` and drag <strong>IntelliJ IDEA</strong> into your <strong>Applications</strong> folder.</li>
            </ol>
          </div>

          {/* Linux */}
          <div className={`p-4 rounded-2xl border ${activeOS === 'linux' ? 'bg-indigo-50/40 border-indigo-300 ring-1 ring-indigo-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-2">
              <span>🐧 Linux (Ubuntu, Debian, Fedora, Arch)</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-700">
              <li>Download the <strong>.tar.gz</strong> package or install via Snap:</li>
              <div className="p-2 bg-slate-900 text-emerald-400 font-mono text-[10px] rounded my-1">
                sudo snap install intellij-idea-community --classic
              </div>
              <li>If using `.tar.gz`, extract and run: <code className="font-mono bg-slate-200 px-1 rounded">./bin/idea.sh</code>.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Step 2: Installer Options Screen (Detailed Checklist) */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Step 2 — Recommended "Installation Options" Settings (Windows)
              </h2>
              <p className="text-xs text-slate-500">Follow these exact checkboxes during the installation wizard</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          {/* Options Checklist */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Checkbox Configuration Checklist:</h3>
            <div className="space-y-2">
              {[
                { id: 'opt1', title: 'Create Desktop Shortcut', desc: 'Keep "IntelliJ IDEA" checked for 1-click launch from desktop.' },
                { id: 'opt2', title: 'Update PATH Variable', desc: 'Check "Add bin folder to the PATH" (recommended for CLI usage).' },
                { id: 'opt3', title: 'Update Context Menu', desc: 'Check "Add Open Folder as Project" to easily open code repositories.' },
                { id: 'opt4', title: 'Create Associations (.java)', desc: 'Check .java to associate Java source files with IntelliJ.' },
                { id: 'opt5', title: 'Create Associations (.gradle)', desc: 'Check .gradle if you plan to work on Gradle projects.' },
                { id: 'opt6', title: 'Start Menu Folder', desc: 'Leave as "JetBrains" (do not check "Do not create shortcuts").' },
                { id: 'opt7', title: 'Finish Screen', desc: 'Keep "Run IntelliJ IDEA" checked and click Finish.' },
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    checkedOptions[item.id]
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    checkedOptions[item.id]
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400 bg-white'
                  }`}>
                    {checkedOptions[item.id] && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900">{item.title}</span>
                    <span className="text-[11px] text-slate-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Visual Helper Box */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 font-mono text-xs shadow-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">// IntelliJ IDEA Setup Wizard Screen</span>
                <span className="text-slate-500 text-[10px]">Windows x64</span>
              </div>
              <div className="space-y-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">[✓]</span> Create Desktop Shortcut: IntelliJ IDEA
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">[✓]</span> Update PATH: Add "bin" folder to PATH
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">[✓]</span> Context Menu: Add "Open Folder as Project"
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">[✓]</span> Create Associations: .java & .gradle
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span>[ ]</span> Optional: .kt, .kts, .groovy, .pom
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-amber-300">
                  <span>→</span> Start Menu: "JetBrains" (Do not skip shortcuts)
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-950 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Why Add "Open Folder as Project"?</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                This enables you to right-click on any Java project folder inside Windows File Explorer and instantly launch it inside IntelliJ without searching for files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: OpenJDK 17 Configuration */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Step 3 — Configuring Existing OpenJDK 17 in IntelliJ
              </h2>
              <p className="text-xs text-slate-500">Crucial insight: IntelliJ IDE runtime vs your Project Java SDK</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2 text-amber-950">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Do I need to download another Java inside IntelliJ?</span>
            </div>
            <p className="text-slate-700">
              <strong>NO!</strong> IntelliJ IDEA comes with its own internal runtime (JetBrains Runtime) just to run the editor UI. When you create or run your Java assignments, IntelliJ will ask for a <strong>Project SDK</strong>. Simply point it to your existing installed <strong>OpenJDK 17</strong> (such as Eclipse Temurin 17).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
              <span className="font-bold text-indigo-700 block text-xs">1. Create New Project</span>
              <p className="text-slate-600 text-[11px]">Click <strong>New Project</strong> on the IntelliJ welcome screen.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
              <span className="font-bold text-indigo-700 block text-xs">2. Select Java & SDK</span>
              <p className="text-slate-600 text-[11px]">Select <strong>Java</strong> on the left, then in <strong>JDK</strong> dropdown choose <strong>17 (Temurin-17)</strong>.</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
              <span className="font-bold text-indigo-700 block text-xs">3. Automatic Detection</span>
              <p className="text-slate-600 text-[11px]">If not detected, click <em>Add SDK → JDK</em> and select <code className="font-mono text-[10px] bg-white px-1 rounded">C:\Program Files\Eclipse Adoptium\jdk-17...</code></p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: First Program & Execution Guide */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Step 4 — Running Your First Java Program in IntelliJ IDEA
              </h2>
              <p className="text-xs text-slate-500">6-Step classroom-proven hands-on workflow</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Step list */}
          <ol className="space-y-2 font-medium text-slate-700">
            <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>Open <strong>IntelliJ IDEA</strong> and select <strong>New Project</strong>.</span>
            </li>
            <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>Select <strong>Java</strong> and ensure <strong>Project SDK is Java 17</strong>.</span>
            </li>
            <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>Expand the project tree, right-click <code className="bg-slate-200 px-1 rounded font-mono">src</code> → <strong>New → Java Class</strong>, named <strong>HelloWorld</strong>.</span>
            </li>
            <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
              <span>Type or paste the Java code into the editor.</span>
            </li>
            <li className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">5</span>
              <span>Click the green <strong>▶ Run</strong> button next to <code className="font-mono">main</code> or press <kbd className="bg-slate-200 px-1 rounded text-[10px]">Shift+F10</kbd>.</span>
            </li>
            <li className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5 text-emerald-950 font-semibold">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">6</span>
              <span>Check the console at the bottom of IntelliJ to see output: <code className="text-emerald-700 font-bold">Hello, Java 17 from IntelliJ!</code></span>
            </li>
          </ol>

          {/* Sample Code Box with Copy */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                <span className="font-mono font-bold text-xs text-indigo-300">HelloWorld.java</span>
                <button
                  onClick={() => handleCopy(`public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java 17 from IntelliJ!");\n    }\n}`, 'hello')}
                  className="no-print px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-[11px] flex items-center gap-1 transition-colors"
                >
                  {copiedCode === 'hello' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'hello' ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>
              <pre className="font-mono text-xs text-emerald-400 leading-relaxed whitespace-pre-wrap">
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java 17 from IntelliJ!");
    }
}`}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <strong className="text-slate-200 block mb-1">⚡ IntelliJ Pro Tips:</strong>
              <div>• Type <code className="text-amber-400 font-bold">psvm</code> + Tab → auto-generates <code className="text-slate-300">public static void main</code></div>
              <div>• Type <code className="text-amber-400 font-bold">sout</code> + Tab → auto-generates <code className="text-slate-300">System.out.println()</code></div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 5: Recommended Setup at a Glance Table */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Recommended Setup at a Glance</h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Quick Reference Summary</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead className="bg-slate-100 text-slate-800 font-bold">
              <tr>
                <th className="p-2.5 border border-slate-200">Installation Option</th>
                <th className="p-2.5 border border-slate-200 w-32 text-center">Recommended</th>
                <th className="p-2.5 border border-slate-200">Rationale & Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {installerTable.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="p-2.5 border border-slate-200 font-semibold text-slate-900">
                    {row.option}
                  </td>
                  <td className="p-2.5 border border-slate-200 text-center font-bold">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] ${
                      row.recommended === 'Yes'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : row.recommended === 'No'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                    }`}>
                      {row.recommended}
                    </span>
                  </td>
                  <td className="p-2.5 border border-slate-200 text-slate-600">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Step 6: Safe Closing & Tips */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Laptop className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-900">
            Closing IntelliJ IDEA Safely & Managing Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Safe Exit (✕ Button)</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              To close IntelliJ IDEA, simply click the <strong>✕ button</strong> in the top-right corner. IntelliJ automatically saves all code changes, undo histories, and workspace states into disk. You do NOT lose any unsaved files.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Reopening Existing Projects</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              When you reopen IntelliJ, your recent projects appear on the welcome screen. You can also right-click any Java directory in File Explorer and click <strong>"Open Folder as IntelliJ IDEA Project"</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Printable Sheet Footer */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-800 block">Mastering Programming using Java · Short-Term Training (STT 2026)</span>
          <span className="text-slate-500">IntelliJ IDEA & OpenJDK 17 Setup Manual · Classroom Reference Guide</span>
        </div>
        <div className="flex items-center gap-2 no-print">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF Version</span>
          </button>
        </div>
      </div>
    </div>
  );
};
