import React, { useState, useEffect } from 'react';
import { TeachingModeProvider } from './context/TeachingModeContext';
import { ProgressProvider } from './context/ProgressContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { SchedulePage } from './pages/SchedulePage';
import { ModulePage } from './pages/ModulePage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { ReferencePage } from './pages/ReferencePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { InstallGuidePage } from './pages/InstallGuidePage';
import { IntelliJGuidePage } from './pages/IntelliJGuidePage';
import { AssignmentsPage } from './pages/AssignmentsPage';
import { totalConceptsCount } from './data';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>(() => {
    const saved = localStorage.getItem('java_active_view');
    return saved || 'home';
  });

  const [selectedModuleId, setSelectedModuleId] = useState<number>(() => {
    const saved = localStorage.getItem('java_active_module');
    return saved ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('java_active_view', currentView);
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('java_active_module', selectedModuleId.toString());
  }, [selectedModuleId]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomePage
            setCurrentView={setCurrentView}
            setSelectedModuleId={setSelectedModuleId}
          />
        );
      case 'schedule':
        return (
          <SchedulePage
            setCurrentView={setCurrentView}
            setSelectedModuleId={setSelectedModuleId}
          />
        );
      case 'module':
        return (
          <ModulePage
            moduleId={selectedModuleId}
            setSelectedModuleId={setSelectedModuleId}
            setCurrentView={setCurrentView}
          />
        );
      case 'playground':
        return <PlaygroundPage />;
      case 'reference':
        return <ReferencePage setCurrentView={setCurrentView} />;
      case 'challenges':
        return <ChallengesPage />;
      case 'install-guide':
        return <InstallGuidePage setCurrentView={setCurrentView} />;
      case 'intellij-guide':
        return <IntelliJGuidePage setCurrentView={setCurrentView} />;
      case 'assignments':
        return <AssignmentsPage setCurrentView={setCurrentView} />;
      default:
        return (
          <HomePage
            setCurrentView={setCurrentView}
            setSelectedModuleId={setSelectedModuleId}
          />
        );
    }
  };

  return (
    <TeachingModeProvider>
      <ProgressProvider totalConcepts={totalConceptsCount}>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
          <Navbar
            currentView={currentView}
            setCurrentView={setCurrentView}
            selectedModuleId={selectedModuleId}
            setSelectedModuleId={setSelectedModuleId}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            {renderCurrentView()}
          </main>

          <Footer />
        </div>
      </ProgressProvider>
    </TeachingModeProvider>
  );
};

export default App;
