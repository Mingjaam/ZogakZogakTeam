// Gemini API 클라이언트 설정 및 유틸리티 함수

import { GoogleGenAI } from "@google/genai";
import { GeminiConfig } from "./ai-types";

// Gemini API 클라이언트 초기화
export const createGeminiClient = (): GoogleGenAI | null => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("Gemini API 키가 설정되지 않았습니다.");
        return null;
    }
    
    return new GoogleGenAI({ apiKey });
};

// 기본 Gemini 설정
export const defaultGeminiConfig: GeminiConfig = {
    apiKey: import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '',
    model: 'gemini-2.5-flash'
};

// 이미지를 GenerativePart로 변환하는 유틸리티 함수
export const fileToGenerativePart = (base64: string, mimeType: string) => {
    return {
        inlineData: {
            data: base64,
            mimeType,
        },
    };
};

// API 응답 검증 함수
export const validateApiResponse = (response: any): boolean => {
    if (!response || typeof response.text !== 'string') {
        console.error("Invalid or empty response from Gemini API:", response);
        return false;
    }
    return true;
};

// 에러 핸들링 유틸리티
export const handleApiError = (error: any, context: string): string => {
    console.error(`Error in ${context}:`, error);
    return `${context} 중 오류가 발생했습니다.`;
};
