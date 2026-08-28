export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TeachingNote {
  explain2Min: string[];
  drawTips: string;
  codeHighlight: string;
  studentQuestion: string;
  studentAnswer: string;
}

export type CustomVisualizerType =
  | 'compilation-flow'
  | 'main-method'
  | 'stack-heap'
  | 'access-matrix'
  | 'polymorphism'
  | 'relationship'
  | 'object-class'
  | 'abstract-interface'
  | 'constructor-chain'
  | 'casting-diagram'
  | 'data-types-grid'
  | 'final-keyword-grid'
  | 'package-tree';

export interface VisualExplanation {
  title: string;
  diagramText?: string;
  flowSteps?: { step: string; label: string; desc?: string }[];
  beforeAfter?: {
    beforeTitle: string;
    beforeCode: string;
    afterTitle: string;
    afterCode: string;
  };
  note?: string;
}

export interface Concept {
  id: string;
  title: string;
  shortIdea: string;
  moduleNumber: number;
  dayNumber: number;
  category: string;
  visualExplanation?: VisualExplanation;
  customVisualizer?: CustomVisualizerType;
  diagramImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  javaExample: string;
  expectedOutput: string;
  tryItCode?: string;
  teachingMode: TeachingNote;
  quizzes: QuizQuestion[];
}

export interface MiniChallenge {
  id: string;
  moduleNumber: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Core OOP';
  problem: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  solutionCode: string;
  explanation: string;
}

export interface HourlyAgenda {
  hour: string;
  topic: string;
  concepts: string[];
  practical: string;
}

export interface DaySchedule {
  day: number;
  title: string;
  subtitle: string;
  hours: number;
  modulesCovered: number[];
  flow: string[];
  hourlyAgenda: HourlyAgenda[];
  goals: string[];
}

export interface ModuleData {
  id: number;
  title: string;
  subtitle: string;
  day: number;
  estimatedHours: number;
  description: string;
  topicsCovered: string[];
  concepts: Concept[];
  miniChallenge: MiniChallenge;
}
