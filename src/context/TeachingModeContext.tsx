import React, { createContext, useContext, useState, useEffect } from 'react';

interface TeachingModeContextType {
  teachingMode: boolean;
  setTeachingMode: (enabled: boolean) => void;
  toggleTeachingMode: () => void;
  showAnswersByDefault: boolean;
  setShowAnswersByDefault: (show: boolean) => void;
}

const TeachingModeContext = createContext<TeachingModeContextType | undefined>(undefined);

export const TeachingModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [teachingMode, setTeachingModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('java_teaching_mode');
    return saved !== null ? JSON.parse(saved) : true; // Default to TRUE for the instructor
  });

  const [showAnswersByDefault, setShowAnswersByDefault] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('java_teaching_mode', JSON.stringify(teachingMode));
  }, [teachingMode]);

  const toggleTeachingMode = () => {
    setTeachingModeState(prev => !prev);
  };

  const setTeachingMode = (enabled: boolean) => {
    setTeachingModeState(enabled);
  };

  return (
    <TeachingModeContext.Provider
      value={{
        teachingMode,
        setTeachingMode,
        toggleTeachingMode,
        showAnswersByDefault,
        setShowAnswersByDefault,
      }}
    >
      {children}
    </TeachingModeContext.Provider>
  );
};

export const useTeachingMode = () => {
  const context = useContext(TeachingModeContext);
  if (!context) {
    throw new Error('useTeachingMode must be used within a TeachingModeProvider');
  }
  return context;
};
