import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  completedConcepts: string[];
  toggleConceptCompleted: (id: string) => void;
  isConceptCompleted: (id: string) => boolean;
  completedQuizzes: Record<string, number>;
  setQuizAnswer: (quizId: string, answerIndex: number) => void;
  completedChallenges: string[];
  toggleChallengeCompleted: (id: string) => void;
  resetProgress: () => void;
  totalConceptsCount: number;
  completedConceptsCount: number;
  progressPercentage: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode; totalConcepts?: number }> = ({
  children,
  totalConcepts = 35,
}) => {
  const [completedConcepts, setCompletedConcepts] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('java_course_concepts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('java_course_quizzes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [completedChallenges, setCompletedChallenges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('java_course_challenges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('java_course_concepts', JSON.stringify(completedConcepts));
  }, [completedConcepts]);

  useEffect(() => {
    localStorage.setItem('java_course_quizzes', JSON.stringify(completedQuizzes));
  }, [completedQuizzes]);

  useEffect(() => {
    localStorage.setItem('java_course_challenges', JSON.stringify(completedChallenges));
  }, [completedChallenges]);

  const toggleConceptCompleted = (id: string) => {
    setCompletedConcepts(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isConceptCompleted = (id: string) => completedConcepts.includes(id);

  const setQuizAnswer = (quizId: string, answerIndex: number) => {
    setCompletedQuizzes(prev => ({
      ...prev,
      [quizId]: answerIndex,
    }));
  };

  const toggleChallengeCompleted = (id: string) => {
    setCompletedChallenges(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const resetProgress = () => {
    setCompletedConcepts([]);
    setCompletedQuizzes({});
    setCompletedChallenges([]);
    localStorage.removeItem('java_course_concepts');
    localStorage.removeItem('java_course_quizzes');
    localStorage.removeItem('java_course_challenges');
  };

  const completedConceptsCount = completedConcepts.length;
  const progressPercentage = totalConcepts > 0
    ? Math.min(100, Math.round((completedConceptsCount / totalConcepts) * 100))
    : 0;

  return (
    <ProgressContext.Provider
      value={{
        completedConcepts,
        toggleConceptCompleted,
        isConceptCompleted,
        completedQuizzes,
        setQuizAnswer,
        completedChallenges,
        toggleChallengeCompleted,
        resetProgress,
        totalConceptsCount: totalConcepts,
        completedConceptsCount,
        progressPercentage,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
