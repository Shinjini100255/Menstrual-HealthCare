
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import SceneNavigator from './components/SceneNavigator';
import { SCENES } from './constants';
import { GeneratedAsset } from './types';

const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [assets, setAssets] = useState<Record<number, GeneratedAsset>>({});
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [started, setStarted] = useState(false);

  const handleAssetLoaded = useCallback((sceneId: number, asset: GeneratedAsset) => {
    setAssets(prev => ({
      ...prev,
      [sceneId]: {
        ...prev[sceneId],
        ...asset
      }
    }));
  }, []);

  const handleSceneEnd = useCallback(() => {
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    } else {
      setIsAutoPlay(false);
    }
  }, [currentSceneIndex]);

  const toggleAutoPlay = () => {
    if (!started) setStarted(true);
    setIsAutoPlay(!isAutoPlay);
  };

  const handleNext = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      setCurrentSceneIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex(prev => prev - 1);
    }
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-[#fffafb] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-pink-100">
          <div className="w-24 h-24 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
            <i className="fas fa-person-dress"></i>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Menstrual Aid</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Welcome. This is a safe space for adolescent girls and women to learn about their bodies, menstrual health, and self-care in a simple, respectful way.
          </p>
          <button 
            onClick={() => setStarted(true)}
            className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold text-lg hover:bg-pink-600 transition-all shadow-lg shadow-pink-200"
          >
            Start Learning <i className="fas fa-arrow-right ml-2"></i>
          </button>
          <p className="mt-4 text-xs text-gray-400 font-medium">Available in English • Simple Audio Guide</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fffafb]">
      <Header />
      
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-pink-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Understanding Periods</h2>
              <p className="text-sm text-gray-500">Scene {currentSceneIndex + 1} of {SCENES.length}</p>
            </div>
            <div className="flex gap-2">
               <button 
                onClick={toggleAutoPlay}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  isAutoPlay 
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-200' 
                  : 'bg-pink-50 text-pink-600 border border-pink-100'
                }`}
              >
                <i className={`fas ${isAutoPlay ? 'fa-pause' : 'fa-play'}`}></i>
                {isAutoPlay ? 'Auto-playing' : 'Play All'}
              </button>
            </div>
          </div>

          <VideoPlayer 
            scene={SCENES[currentSceneIndex]} 
            isAutoPlay={isAutoPlay}
            onSceneEnd={handleSceneEnd}
            asset={assets[SCENES[currentSceneIndex].id]}
            onAssetLoaded={handleAssetLoaded}
          />

          <div className="mt-6 flex items-center justify-between gap-4">
            <button 
              onClick={handlePrev}
              disabled={currentSceneIndex === 0}
              className="flex-1 py-3 px-6 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <i className="fas fa-chevron-left mr-2"></i> Previous
            </button>
            <div className="hidden md:flex flex-1 justify-center gap-1">
              {SCENES.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSceneIndex ? 'w-8 bg-pink-500' : 'w-2 bg-pink-100'}`}></div>
              ))}
            </div>
            <button 
              onClick={handleNext}
              disabled={currentSceneIndex === SCENES.length - 1}
              className="flex-1 py-3 px-6 bg-pink-100 text-pink-600 rounded-2xl font-bold hover:bg-pink-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>

        <section className="bg-white rounded-3xl p-6 shadow-sm border border-pink-50">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <i className="fas fa-clapperboard text-pink-400"></i>
            Animation Progress
          </h3>
          <SceneNavigator 
            currentIndex={currentSceneIndex} 
            onSelect={setCurrentSceneIndex} 
            assets={assets}
          />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-500 to-rose-400 p-6 rounded-3xl text-white shadow-lg shadow-pink-100">
            <i className="fas fa-droplet text-3xl mb-4 opacity-80"></i>
            <h4 className="font-bold text-lg mb-2">Track Your Cycle</h4>
            <p className="text-pink-50 text-sm leading-relaxed">Keeping a record of when your period starts and ends helps you understand your body's rhythm.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
            <i className="fas fa-utensils text-pink-500 text-3xl mb-4"></i>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Eat Healthy</h4>
            <p className="text-gray-500 text-sm leading-relaxed">Foods rich in iron like spinach and lentils help you stay strong during your period.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
            <i className="fas fa-hand-holding-medical text-pink-500 text-3xl mb-4"></i>
            <h4 className="font-bold text-lg text-gray-800 mb-2">Need Help?</h4>
            <p className="text-gray-500 text-sm leading-relaxed">If you feel very unwell, visit your local ASHA worker or health center. You are not alone.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-8 px-6 text-center border-t border-gray-100">
        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-2">Empowering Women's Health</p>
        <p className="text-gray-500 text-sm">© 2024 Menstrual Aid. Designed for healthy communities.</p>
      </footer>
    </div>
  );
};

export default App;
