import { module1Data } from './module1';
import { module2Data } from './module2';
import { module3Data } from './module3';
import { module4Data } from './module4';
import { module5Data } from './module5';
import { module6Data } from './module6';
import { module7Data } from './module7';
import type { ModuleData, Concept, MiniChallenge } from '../types/course';

export const allModules: ModuleData[] = [
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
];

export const allConcepts: Concept[] = allModules.flatMap(m => m.concepts);

export const allChallenges: MiniChallenge[] = allModules.map(m => m.miniChallenge);

export const totalConceptsCount: number = allConcepts.length;

export const getModuleById = (id: number): ModuleData | undefined => {
  return allModules.find(m => m.id === id);
};

export const getConceptById = (id: string): Concept | undefined => {
  return allConcepts.find(c => c.id === id);
};

export const getConceptsByDay = (day: number): Concept[] => {
  return allConcepts.filter(c => c.dayNumber === day);
};
