// AI 관련 타입 정의

export interface Person {
    id: string;
    name: string;
    relationship: string;
    photo: string; // base64 encoded image
}

export type EmotionType = 'joy' | 'happiness' | 'surprise' | 'sadness' | 'anger' | 'fear';

export interface EmotionScores {
    joy: number;
    happiness: number;
    surprise: number;
    sadness: number;
    anger: number;
    fear: number;
}

export interface EmotionAnalysisResult {
    scores: EmotionScores;
    dominantEmotion: EmotionType;
}

export interface GeminiConfig {
    apiKey: string;
    model: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
