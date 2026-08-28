import React, { useState } from 'react';
import {
  Printer,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Cpu,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
  subtitle?: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ code, language = 'bash', title, subtitle }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xs my-2.5">
      {(title || subtitle) && (
        <div className="bg-slate-950/80 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between gap-2">
          <div>
            {title && <span className="text-xs font-bold text-slate-200">{title}</span>}
            {subtitle && <span className="text-[11px] text-slate-400 ml-2">({subtitle})</span>}
          </div>
          <span className="text-[10px] uppercase font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded no-print">
            {language}
          </span>
        </div>
      )}
      <div className="p-3 sm:p-4 flex items-start justify-between gap-3 font-mono text-xs text-emerald-400 overflow-x-auto">
        <pre className="flex-1 whitespace-pre-wrap leading-relaxed">{code}</pre>
        <button
          onClick={handleCopy}
          className="no-print p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors shrink-0"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

interface InstallGuidePageProps {
  setCurrentView?: (view: string) => void;
}

export const InstallGuidePage: React.FC<InstallGuidePageProps> = ({ setCurrentView }) => {
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('java_install_checklist');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleCheck = (id: string) => {
    const updated = { ...checkedSteps, [id]: !checkedSteps[id] };
    setCheckedSteps(updated);
    localStorage.setItem('java_install_checklist', JSON.stringify(updated));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-150">
      {/* Header & Print Actions */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <Download className="w-4 h-4" />
            <span>Complete Setup & Environment Manual</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Java 17 (JDK) Installation & Setup Guide
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Step-by-step guide to install <strong>Eclipse Temurin JDK 17</strong>, configure <strong>JAVA_HOME</strong> on Windows (PowerShell & CMD), run your first Java program, and configure <strong>VS Code, Eclipse, and IntelliJ IDEA</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 no-print">
          {setCurrentView && (
            <button
              onClick={() => setCurrentView('intellij-guide')}
              className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <div className="w-4 h-4 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px]">
                IJ
              </div>
              <span>IntelliJ IDEA Guide (PDF)</span>
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

      {/* Quick Setup Architecture Visual */}
      <div className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              One JDK 17 to Power Everything
            </span>
          </div>
          <span className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
            LTS (Long-Term Support) Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/70 border border-slate-700/70 p-4 rounded-2xl space-y-1.5 md:col-span-1 flex flex-col justify-center items-center text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold mb-1">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-sm">Eclipse Temurin JDK 17</h3>
            <p className="text-slate-300 text-[11px]">Runtime Engine + javac Compiler</p>
          </div>

          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-blue-400">Option A (Popular)</span>
              <h4 className="font-bold text-white text-xs">Visual Studio Code</h4>
              <p className="text-slate-300 text-[11px]">Lightweight editor with Microsoft Java Extension Pack.</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-purple-400">Option B (Enterprise)</span>
              <h4 className="font-bold text-white text-xs">Eclipse IDE</h4>
              <p className="text-slate-300 text-[11px]">Eclipse IDE for Java Developers with built-in workspace.</p>
            </div>
            <div className="bg-emerald-900/30 border border-emerald-700/50 p-3.5 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase text-emerald-400">Option C (Recommended ⭐)</span>
              <h4 className="font-bold text-white text-xs">IntelliJ IDEA</h4>
              <p className="text-slate-300 text-[11px]">Best-in-class developer ergonomics & smart auto-complete.</p>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-300 bg-slate-950/40 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
          <span className="font-bold text-amber-400 shrink-0">💡 Important Note:</span>
          <span>
            You <strong>do NOT</strong> need all three IDEs. For learning Core Java, we recommend installing <strong>IntelliJ IDEA (Community Edition)</strong> or <strong>VS Code</strong> with JDK 17.
          </span>
        </div>
      </div>

      {/* Main Step-by-Step Installation Cards */}
      <div className="space-y-6">
        {/* Step 1: Install Temurin JDK 17 */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 1 — Download & Install Eclipse Temurin JDK 17
                </h2>
                <p className="text-xs text-slate-500">Free, open-source production-ready OpenJDK distribution</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('step1')}
              className={`no-print flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                checkedSteps['step1']
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{checkedSteps['step1'] ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
            <p>
              We use <strong>Eclipse Temurin JDK 17</strong> (from Adoptium). It is completely free, community-backed, and compatible across Windows, macOS, and Linux.
            </p>

            <div className="p-3.5 bg-blue-50/60 border border-blue-200 rounded-2xl space-y-2">
              <h4 className="font-bold text-blue-900 text-xs">Windows Selection Options on Adoptium:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>Version:</strong> Select <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-bold">17 - LTS</code></li>
                <li><strong>Operating System:</strong> Select <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-bold">Windows</code></li>
                <li><strong>Architecture:</strong> Select <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-bold">x64</code> (for normal 64-bit Intel/AMD PC)</li>
                <li><strong>Package Type:</strong> Select <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-bold">JDK</code></li>
                <li><strong>Installer format:</strong> Download the <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-bold">.msi</code> installer file</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-950 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Installer Tip:</strong> During installation wizard, when feature options appear, make sure to enable <strong>"Add to PATH"</strong> and <strong>"Set JAVA_HOME variable"</strong> (select <em>"Will be installed on local hard drive"</em>).
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://adoptium.net/temurin/releases/?version=17"
                target="_blank"
                rel="noreferrer"
                className="no-print inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
              >
                <span>Download Eclipse Temurin JDK 17 (.msi)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Step 2: Verification */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 2 — Verify Java & Compiler Installation
                </h2>
                <p className="text-xs text-slate-500">Confirm both Runtime (`java`) and Compiler (`javac`) are active</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('step2')}
              className={`no-print flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                checkedSteps['step2']
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{checkedSteps['step2'] ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <p>
              Open <strong>Command Prompt (CMD)</strong> or <strong>PowerShell</strong> and run:
            </p>

            <CodeSnippet
              title="1. Check Java Runtime Version"
              subtitle="Runs in CMD or PowerShell"
              code="java -version"
            />

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
              <div className="text-slate-400 font-bold mb-1">// Expected Output:</div>
              <div>openjdk version "17.0.20.1" 2026-xx-xx</div>
              <div>OpenJDK Runtime Environment Temurin-17.x.x (build 17.0.20.1+1)</div>
              <div>OpenJDK 64-Bit Server VM Temurin-17.x.x (build 17.0.20.1+1, mixed mode, sharing)</div>
            </div>

            <p className="pt-2">
              Next, check the Java Compiler:
            </p>

            <CodeSnippet
              title="2. Check Java Compiler Version"
              subtitle="Must also report 17.x.x"
              code="javac -version"
            />

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
              <div className="text-slate-400 font-bold mb-1">// Expected Output:</div>
              <div>javac 17.0.20.1</div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-950 font-medium">
              ✅ <strong>Key Rule:</strong> Both <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-bold">java</code> and <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 font-bold">javac</code> must show version 17!
            </div>
          </div>
        </section>

        {/* Step 3: JAVA_HOME Check & PowerShell Configuration */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 3 — Check & Set JAVA_HOME Environment Variable
                </h2>
                <p className="text-xs text-slate-500">Crucial for Maven, Gradle, IntelliJ IDEA, Eclipse, and Android tools</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('step3')}
              className={`no-print flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                checkedSteps['step3']
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{checkedSteps['step3'] ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            {/* Why PowerShell vs CMD */}
            <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-2xl space-y-2">
              <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>PowerShell vs CMD Syntax Notice</span>
              </h4>
              <p className="text-slate-700 leading-relaxed">
                If you ran <code className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-mono">echo %JAVA_HOME%</code> in PowerShell and it printed <code className="font-mono">%JAVA_HOME%</code> literally, that is because PowerShell uses different syntax than CMD!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] pt-1">
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <span className="text-slate-400 block font-sans font-bold text-[10px]">Command Prompt (CMD):</span>
                  <code>echo %JAVA_HOME%</code>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <span className="text-slate-400 block font-sans font-bold text-[10px]">PowerShell:</span>
                  <code>$env:JAVA_HOME</code>
                </div>
              </div>
            </div>

            {/* Checking where executables are located */}
            <div>
              <p className="font-medium text-slate-800 mb-1.5">
                Check exact location of installed executables:
              </p>
              <CodeSnippet
                title="Check Executable Paths in PowerShell"
                code={`where.exe java\nwhere.exe javac`}
              />
            </div>

            {/* Permanent PowerShell Setup Command */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-slate-900">
                How to Set JAVA_HOME via PowerShell (1-Command Fix):
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Search for <strong>PowerShell</strong> in Windows Start Menu, right-click, and select <strong>"Run as Administrator"</strong>.</li>
                <li>Execute the following command (adjust path if your exact Temurin version folder is different):</li>
              </ol>

              <CodeSnippet
                language="powershell"
                title="PowerShell (Admin) - Set Machine Environment Variable"
                code={`[Environment]::SetEnvironmentVariable(
    "JAVA_HOME",
    "C:\\Program Files\\Eclipse Adoptium\\jdk-17.0.20.101-hotspot",
    "Machine"
)`}
              />

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2">
                <p className="font-semibold text-slate-800">Verify your new JAVA_HOME:</p>
                <p className="text-[11px] text-slate-600">
                  Close your current PowerShell window and open a <strong>fresh PowerShell window</strong>, then test:
                </p>
                <CodeSnippet
                  title="Verify Variable in Fresh PowerShell"
                  code="$env:JAVA_HOME"
                />
                <div className="p-2.5 bg-white rounded border border-slate-200 font-mono text-[11px] text-emerald-700">
                  // Expected Output: C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4: First Program (HelloWorld) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 4 — Compile & Run Your First Java Program
                </h2>
                <p className="text-xs text-slate-500">Test the entire compiler (javac) and runtime (JVM) pipeline</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('step4')}
              className={`no-print flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                checkedSteps['step4']
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{checkedSteps['step4'] ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <div>
              <p className="font-semibold text-slate-800 mb-1">1. Create a dedicated folder & source file:</p>
              <CodeSnippet
                title="Create Folder & Open Notepad"
                code={`mkdir JavaLearning\ncd JavaLearning\nnotepad HelloWorld.java`}
              />
            </div>

            <div>
              <p className="font-semibold text-slate-800 mb-1">2. Paste this code into Notepad and Save (<kbd className="bg-slate-100 px-1 py-0.5 rounded border border-slate-300 text-[10px]">Ctrl + S</kbd>):</p>
              <CodeSnippet
                language="java"
                title="HelloWorld.java"
                code={`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`}
              />
            </div>

            <div>
              <p className="font-semibold text-slate-800 mb-1">3. Compile with javac and execute with java in PowerShell / CMD:</p>
              <CodeSnippet
                title="Compile and Run Commands"
                code={`javac HelloWorld.java\njava HelloWorld`}
              />
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl font-mono text-[11px] text-emerald-900">
                <span className="text-emerald-600 font-bold block mb-1">// Terminal Output:</span>
                <span className="font-bold text-sm">Hello, Java!</span>
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: IDE Setup (VS Code, Eclipse, IntelliJ IDEA) */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                5
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Step 5 — Configure Your Favorite IDE
                </h2>
                <p className="text-xs text-slate-500">Pick any IDE: Visual Studio Code, IntelliJ IDEA, or Eclipse</p>
              </div>
            </div>
            <button
              onClick={() => toggleCheck('step5')}
              className={`no-print flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                checkedSteps['step5']
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{checkedSteps['step5'] ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* VS Code */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    VS
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Visual Studio Code</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Fast and lightweight. Install <strong>Extension Pack for Java</strong> by Microsoft.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 font-medium text-slate-700">
                  <div className="font-bold text-slate-900 text-[11px]">How to install in VS Code:</div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px]">
                    <li>Press <kbd className="bg-slate-100 px-1 py-0.5 rounded border text-[10px]">Ctrl+Shift+X</kbd></li>
                    <li>Search for <strong>Extension Pack for Java</strong></li>
                    <li>Click <strong>Install</strong></li>
                  </ol>
                </div>
                <p className="text-[11px] text-slate-500">
                  Includes Language Support, Debugger, Test Runner, Maven support, and Project Manager.
                </p>
              </div>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack"
                target="_blank"
                rel="noreferrer"
                className="no-print inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] transition-colors"
              >
                <span>VS Code Java Extension Pack</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* IntelliJ IDEA */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between ring-1 ring-emerald-200">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs">
                      IJ
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">IntelliJ IDEA</h3>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Recommended
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  The industry standard for Java developers. <strong>Community Edition</strong> is 100% free.
                </p>
                <div className="bg-white p-3 rounded-xl border border-emerald-100 space-y-1.5 font-medium text-slate-700">
                  <div className="font-bold text-slate-900 text-[11px]">Quick Setup in IntelliJ:</div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px]">
                    <li>Open IntelliJ & click <strong>New Project</strong></li>
                    <li>Select <strong>Java</strong> and pick <strong>JDK 17</strong></li>
                    <li>Create <strong>Main.java</strong> in <code className="font-mono text-[10px]">src/</code></li>
                    <li>Click green <strong>▶ Run</strong> button!</li>
                  </ol>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  ⭐ Built-in intelligent refactoring, memory inspection, and interactive debugging.
                </p>
              </div>
              <a
                href="https://www.jetbrains.com/idea/download/"
                target="_blank"
                rel="noreferrer"
                className="no-print inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] transition-colors"
              >
                <span>Download IntelliJ Community</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Eclipse IDE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold text-xs">
                    EC
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Eclipse IDE</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Classic enterprise Java IDE. Download <strong>Eclipse IDE for Java Developers</strong>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 font-medium text-slate-700">
                  <div className="font-bold text-slate-900 text-[11px]">Setup Steps in Eclipse:</div>
                  <ol className="list-decimal list-inside space-y-1 text-[11px]">
                    <li>Open Eclipse Installer</li>
                    <li>Choose <strong>Eclipse IDE for Java Developers</strong></li>
                    <li>Set JDK to your Temurin 17 path</li>
                  </ol>
                </div>
                <p className="text-[11px] text-slate-500">
                  Ideal for legacy enterprise applications and structured university curriculums.
                </p>
              </div>
              <a
                href="https://www.eclipse.org/downloads/"
                target="_blank"
                rel="noreferrer"
                className="no-print inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] transition-colors"
              >
                <span>Download Eclipse IDE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Troubleshooting & FAQ */}
        <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Frequently Encountered Setup Issues & Solutions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Issue: 'javac' is not recognized as an internal command</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                <strong>Fix:</strong> The JDK bin directory is not in your Windows PATH. Open Environment Variables, find <code>Path</code> under System Variables, and add <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">C:\Program Files\Eclipse Adoptium\jdk-17.0.20.101-hotspot\bin</code>.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Issue: $env:JAVA_HOME returns empty in PowerShell</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                <strong>Fix:</strong> You must restart your PowerShell terminal after setting environment variables so the new session inherits the updated Machine configuration.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Issue: java -version shows Java 8 or Java 11 instead of 17</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                <strong>Fix:</strong> Another older JDK appears earlier in your PATH. Run <code>where.exe java</code> to see all installed Java runtimes and move the JDK 17 path to the very top in System PATH variables.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Issue: Error: Could not find or load main class HelloWorld</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                <strong>Fix:</strong> When running <code className="font-mono bg-slate-100 px-1 rounded">java HelloWorld</code>, do NOT type <code className="line-through text-rose-600">.class</code> or <code className="line-through text-rose-600">.java</code> extension. Also ensure your current terminal directory is in the folder containing <code>HelloWorld.class</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Printable Summary Sheet Footer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-800 block">Mastering Programming using Java · Short-Term Training (STT 2026)</span>
            <span className="text-slate-500">Instructor & Student Setup Verification Checklist · All rights reserved</span>
          </div>
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF Version</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
