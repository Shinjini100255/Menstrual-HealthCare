
export interface Scene {
  id: number;
  title: string;
  description: string;
  voiceover: string;
  visualPrompt: string;
  type: 'narrative' | 'diagram' | 'educational';
}

export interface GeneratedAsset {
  imageUrl?: string;
  audioBlob?: Blob;
  videoUrl?: string;
  loading: boolean;
  error?: string;
}

export interface AppState {
  currentSceneIndex: number;
  assets: Record<number, GeneratedAsset>;
  isPlaying: boolean;
  isAutoPlay: boolean;
}
