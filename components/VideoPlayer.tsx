
import React, { useState, useEffect, useRef } from 'react';
import { Scene, GeneratedAsset } from '../types';
import { generateSceneImage, generateSceneAudio, decodeAudioData } from '../services/geminiService';

interface VideoPlayerProps {
  scene: Scene;
  isAutoPlay: boolean;
  onSceneEnd: () => void;
  asset?: GeneratedAsset;
  onAssetLoaded: (sceneId: number, asset: GeneratedAsset) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ scene, isAutoPlay, onSceneEnd, asset, onAssetLoaded }) => {
  const [loading, setLoading] = useState(!asset || asset.loading);
  const [error, setError] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      if (asset && !asset.loading && !asset.error) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        onAssetLoaded(scene.id, { loading: true });
        
        // Generate assets in parallel
        const [imageUrl, audioBase64] = await Promise.all([
          generateSceneImage(scene.visualPrompt),
          generateSceneAudio(scene.voiceover)
        ]);

        const newAsset: GeneratedAsset = {
          imageUrl,
          audioBlob: new Blob([audioBase64]), // Storing as blob for convenience
          loading: false,
          // Stashing base64 directly for decoding later
          error: undefined
        };
        
        // We actually need the raw base64 for the audio player
        (newAsset as any).audioBase64 = audioBase64;
        
        onAssetLoaded(scene.id, newAsset);
        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch assets:", err);
        setError("Unable to load animation. Please try again.");
        onAssetLoaded(scene.id, { loading: false, error: err.message });
        setLoading(false);
      }
    };

    fetchAssets();
  }, [scene.id]);

  const playAudio = async () => {
    const currentAsset = asset as any;
    if (!currentAsset?.audioBase64) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Stop any existing audio
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      const buffer = await decodeAudioData(currentAsset.audioBase64, audioContextRef.current);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      
      source.onended = () => {
        setIsCurrentlyPlaying(false);
        if (isAutoPlay) {
          onSceneEnd();
        }
      };

      source.start();
      audioSourceRef.current = source;
      setIsCurrentlyPlaying(true);
    } catch (err) {
      console.error("Audio playback error:", err);
    }
  };

  useEffect(() => {
    if (!loading && isAutoPlay && asset?.imageUrl) {
      playAudio();
    }
    return () => {
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }
    };
  }, [loading, scene.id, isAutoPlay, !!asset?.imageUrl]);

  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-pink-50 p-8">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h3 className="text-pink-600 font-medium text-center">Creating Animation Scene...</h3>
          <p className="text-pink-400 text-sm mt-2">Connecting to Gemini Health Assistant</p>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 p-8 text-center">
          <i className="fas fa-exclamation-circle text-red-500 text-4xl mb-4"></i>
          <p className="text-red-700 font-medium mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <img 
            src={asset?.imageUrl} 
            alt={scene.title} 
            className="w-full h-full object-cover animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-xl font-bold mb-2">{scene.title}</h2>
            <div className="bg-black/30 backdrop-blur-md rounded-lg p-3 inline-block max-w-[90%]">
              <p className="text-sm italic leading-relaxed">
                <i className="fas fa-quote-left mr-2 text-pink-300"></i>
                {scene.voiceover}
              </p>
            </div>
          </div>

          {!isCurrentlyPlaying && !isAutoPlay && (
            <button 
              onClick={playAudio}
              className="absolute inset-0 m-auto w-20 h-20 bg-pink-500/90 text-white rounded-full flex items-center justify-center text-3xl hover:scale-110 transition-transform shadow-lg"
            >
              <i className="fas fa-play ml-1"></i>
            </button>
          )}

          {isCurrentlyPlaying && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-pink-500/80 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
              <i className="fas fa-volume-up"></i>
              Speaking
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
