import React, { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Code2, Laptop } from 'lucide-react';
import type { Concept } from '../../types/course';

import { TeachingTip } from './TeachingTip';
import { CodePlayground } from './CodePlayground';
import { QuizCard } from './QuizCard';
import { useProgress } from '../../context/ProgressContext';
import { StackHeapVisualizer } from '../visualizers/StackHeapVisualizer';
import { AccessMatrixVisualizer } from '../visualizers/AccessMatrixVisualizer';
import { PolymorphismVisualizer } from '../visualizers/PolymorphismVisualizer';
import { RelationshipVisualizer } from '../visualizers/RelationshipVisualizer';
import { ObjectClassVisualizer } from '../visualizers/ObjectClassVisualizer';
import { CompilationFlowDiagram } from '../visualizers/CompilationFlowDiagram';
import { ConstructorChainDiagram } from '../visualizers/ConstructorChainDiagram';
import { CastingVisualizer } from '../visualizers/CastingVisualizer';
import { DataTypesVisualizer } from '../visualizers/DataTypesVisualizer';
import { FinalKeywordVisualizer } from '../visualizers/FinalKeywordVisualizer';
import { PackageTreeVisualizer } from '../visualizers/PackageTreeVisualizer';
import { MainMethodVisualizer } from '../visualizers/MainMethodVisualizer';
import { AbstractVsInterfaceVisualizer } from '../visualizers/AbstractVsInterfaceVisualizer';
import { IntelliJModal } from './IntelliJModal';

interface ConceptCardProps {
  concept: Concept;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const { isConceptCompleted, toggleConceptCompleted } = useProgress();
  const isDone = isConceptCompleted(concept.id);
  const [isIntelliJOpen, setIsIntelliJOpen] = useState<boolean>(false);
  const [showSandbox, setShowSandbox] = useState<boolean>(false);

  // Render matching visualizer if present
  const renderCustomVisualizer = () => {
    switch (concept.customVisualizer) {
      case 'stack-heap':
        return <StackHeapVisualizer />;
      case 'access-matrix':
        return <AccessMatrixVisualizer />;
      case 'polymorphism':
        return <PolymorphismVisualizer />;
      case 'relationship':
        return <RelationshipVisualizer />;
      case 'object-class':
        return <ObjectClassVisualizer />;
      case 'compilation-flow':
        return <CompilationFlowDiagram />;
      case 'main-method':
        return <MainMethodVisualizer />;
      case 'abstract-interface':
        return <AbstractVsInterfaceVisualizer />;
      case 'constructor-chain':
        return <ConstructorChainDiagram />;
      case 'casting-diagram':
        return <CastingVisualizer />;
      case 'data-types-grid':
        return <DataTypesVisualizer />;
      case 'final-keyword-grid':
        return <FinalKeywordVisualizer />;
      case 'package-tree':
        return <PackageTreeVisualizer />;
      default:
        return null;
    }
  };

  return (
    <div
      id={concept.id}
      className={`bg-white border rounded-2xl p-5 md:p-6 shadow-xs space-y-5 transition-all ${
        isDone ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200'
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Day {concept.dayNumber} · Mod {concept.moduleNumber}
            </span>
            <span className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-full">
              {concept.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">{concept.title}</h3>
          <p className="text-sm font-medium text-slate-600 leading-relaxed">
            {concept.shortIdea}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsIntelliJOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Try in IntelliJ</span>
          </button>

          <button
            onClick={() => toggleConceptCompleted(concept.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              isDone
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
            <span>{isDone ? 'Completed ✓' : 'Mark Done'}</span>
          </button>
        </div>
      </div>

      {/* Teaching Mode Tip (for the instructor) */}
      <TeachingTip note={concept.teachingMode} conceptTitle={concept.title} />

      {/* Architectural Diagram Image(s) (if available) */}
      {(
        concept.diagramImages && concept.diagramImages.length > 0
          ? concept.diagramImages
          : concept.diagramImage
          ? [concept.diagramImage]
          : []
      ).map((img, idx) => (
        <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-xs space-y-2">
          <div className="bg-white px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              {img.title || (img.alt.toLowerCase().includes('non-primitive')
                ? 'Non-Primitive (Reference) Data Types Architecture'
                : 'Architectural Concept Diagram')}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">High Resolution · Click to Zoom</span>
          </div>
          <div className="p-3 bg-white flex flex-col items-center">
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-[380px] w-auto rounded-lg object-contain border border-slate-200 cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => window.open(img.src, '_blank')}
              title="Click to view full size in new tab"
            />
            {img.caption && (
              <p className="text-xs text-slate-600 mt-2.5 text-center px-4 font-medium leading-relaxed">
                ℹ️ {img.caption}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Custom Visualizer OR Visual Diagram */}
      {concept.customVisualizer ? (
        renderCustomVisualizer()
      ) : concept.visualExplanation ? (
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl space-y-3 font-mono text-xs overflow-x-auto shadow-xs">
          <div className="text-slate-400 font-sans font-bold text-xs uppercase tracking-wider border-b border-slate-800 pb-1.5 flex items-center justify-between">
            <span>{concept.visualExplanation.title}</span>
            <span className="text-amber-400 font-mono text-[10px]">WHITEBOARD DIAGRAM</span>
          </div>

          {concept.visualExplanation.diagramText && (
            <pre className="text-emerald-300 leading-relaxed py-1">
              {concept.visualExplanation.diagramText}
            </pre>
          )}

          {concept.visualExplanation.note && (
            <div className="text-slate-400 font-sans text-xs pt-2 border-t border-slate-800">
              💡 <span className="text-slate-200">{concept.visualExplanation.note}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* Code & Expected Output Showcase */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-600" />
            <span>Essential Java Example:</span>
          </span>

          <button
            onClick={() => setShowSandbox(!showSandbox)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>{showSandbox ? 'Hide Live Sandbox' : 'Open in Live Sandbox'}</span>
            {showSandbox ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Static Syntax-Styled Example */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-slate-950 rounded-xl overflow-hidden font-mono text-xs border border-slate-800">
          <div className="lg:col-span-8 p-4 text-slate-100 overflow-x-auto">
            <pre className="leading-relaxed text-blue-200">{concept.javaExample}</pre>
          </div>
          <div className="lg:col-span-4 bg-slate-900/90 p-4 flex flex-col justify-between">
            <div>
              <span className="text-slate-400 font-sans font-bold text-[11px] block uppercase tracking-wider mb-2">
                Expected Output:
              </span>
              <pre className="text-emerald-300 leading-relaxed font-mono whitespace-pre-wrap">
                {concept.expectedOutput}
              </pre>
            </div>
            <div className="pt-2 text-[10px] text-slate-500 font-sans border-t border-slate-800/80">
              Tested on Java SE 17 (LTS)
            </div>
          </div>
        </div>
      </div>

      {/* Optional Expandable Live Sandbox */}
      {showSandbox && (
        <div className="animate-in fade-in duration-200">
          <CodePlayground
            initialCode={concept.javaExample}
            expectedOutput={concept.expectedOutput}
            title={`${concept.title} · Interactive Sandbox`}
          />
        </div>
      )}

      {/* Concept Check Quiz */}
      {concept.quizzes && concept.quizzes.length > 0 && (
        <QuizCard questions={concept.quizzes} conceptTitle={concept.title} />
      )}

      {/* IntelliJ Modal */}
      <IntelliJModal
        isOpen={isIntelliJOpen}
        onClose={() => setIsIntelliJOpen(false)}
        codeToCopy={concept.javaExample}
        title={`IntelliJ IDEA · ${concept.title}`}
      />
    </div>
  );
};
