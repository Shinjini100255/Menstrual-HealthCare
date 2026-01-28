
import React from 'react';
import { SCENES } from '../constants';

interface SceneNavigatorProps {
  currentIndex: number;
  onSelect: (index: number) => void;
  assets: Record<number, any>;
}

const SceneNavigator: React.FC<SceneNavigatorProps> = ({ currentIndex, onSelect, assets }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-4 px-2 no-scrollbar scroll-smooth">
      {SCENES.map((scene, index) => {
        const isCompleted = assets[scene.id] && !assets[scene.id].loading && !assets[scene.id].error;
        const isActive = index === currentIndex;
        
        return (
          <button
            key={scene.id}
            onClick={() => onSelect(index)}
            className={`
              flex-shrink-0 w-24 p-2 rounded-xl border-2 transition-all
              ${isActive ? 'border-pink-500 bg-pink-50' : 'border-gray-100 bg-white hover:border-pink-200'}
            `}
          >
            <div className={`
              h-12 w-full rounded-md mb-2 flex items-center justify-center relative overflow-hidden
              ${isCompleted ? 'bg-pink-100' : 'bg-gray-100'}
            `}>
              {assets[scene.id]?.imageUrl ? (
                <img src={assets[scene.id].imageUrl} className="w-full h-full object-cover" alt="" />
              ) : (
                <span className="text-gray-400 text-xs">{index + 1}</span>
              )}
              {isCompleted && <i className="fas fa-check-circle absolute bottom-1 right-1 text-green-500 text-[10px] drop-shadow-sm"></i>}
            </div>
            <p className={`text-[10px] font-bold truncate text-center ${isActive ? 'text-pink-600' : 'text-gray-500'}`}>
              {scene.title}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default SceneNavigator;
