import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { PresentationNav } from './components/PresentationNav';
import { PresenterNotes } from './components/PresenterNotes';
import { DashboardView } from './components/DashboardView';

import { SlideHero } from './components/slides/SlideHero';
import { SlideMap3D } from './components/slides/SlideMap3D';
import { SlideComponents } from './components/slides/SlideComponents';
import { SlideRestoration } from './components/slides/SlideRestoration';
import { SlideGallery } from './components/slides/SlideGallery';
import { SlideGeneralTrade } from './components/slides/SlideGeneralTrade';

import { SLIDES } from './data/telefericoData';
import { playClickSound } from './utils/audio';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [viewMode, setViewMode] = useState<'presentation' | 'dashboard'>('presentation');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isLight } = useTheme();

  // Fullscreen toggle handler
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  const handleSwitchToPresentation = (slideIndex: number) => {
    setCurrentSlideIndex(slideIndex);
    setViewMode('presentation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current slide component
  const renderCurrentSlide = () => {
    switch (SLIDES[currentSlideIndex].id) {
      case 'hero':
        return (
          <SlideHero
            onStartPresentation={() => setCurrentSlideIndex(1)}
          />
        );
      case 'map3d':
        return <SlideMap3D />;
      case 'components':
        return <SlideComponents />;
      case 'restoration':
        return <SlideRestoration />;
      case 'gallery':
        return <SlideGallery />;
      case 'general-trade':
        return <SlideGeneralTrade />;
      default:
        return (
          <SlideHero
            onStartPresentation={() => setCurrentSlideIndex(1)}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden ${
        isLight
          ? 'bg-slate-200 text-slate-900 selection:bg-amber-400 selection:text-slate-950'
          : 'bg-slate-800/80 text-slate-100 selection:bg-cyan-500 selection:text-slate-950'
      }`}
    >
      {/* Ambient background soft light circles */}
      {isLight ? (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
        </div>
      ) : (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute -top-20 left-1/3 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Top Application Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        currentSlideNum={currentSlideIndex + 1}
        totalSlides={SLIDES.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {viewMode === 'presentation' ? (
          <div className="space-y-4">
            
            {/* Slide Progress Indicator Bar */}
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${
              isLight ? 'bg-slate-200' : 'bg-slate-800/80'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-500 transition-all duration-500"
                style={{
                  width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%`,
                }}
              />
            </div>

            {/* Slide Body with Smooth Entrance Transition */}
            <AnimatePresence mode="wait">
              <motion.div
                key={SLIDES[currentSlideIndex].id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {renderCurrentSlide()}
              </motion.div>
            </AnimatePresence>

          </div>
        ) : (
          <DashboardView
            onSwitchToPresentation={handleSwitchToPresentation}
          />
        )}
      </main>

      {/* Presentation Navigation Footer (Shown in Presentation Mode) */}
      {viewMode === 'presentation' && (
        <PresentationNav
          slides={SLIDES}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={handleSelectSlide}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          showNotes={showNotes}
          onToggleNotes={() => setShowNotes(!showNotes)}
        />
      )}

      {/* Presenter Notes Drawer (If enabled) */}
      {showNotes && viewMode === 'presentation' && (
        <PresenterNotes
          slide={SLIDES[currentSlideIndex]}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
