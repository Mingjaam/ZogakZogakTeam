// AI 서비스 통합 파일
// 모든 AI 관련 기능을 한 곳에서 export하여 사용하기 편리하게 만듦

// 타입 정의
export type {
    Person,
    EmotionType,
    EmotionScores,
    EmotionAnalysisResult,
    GeminiConfig,
    ApiResponse
} from './ai-types';

// 사람 인식 관련 기능
export {
    identifyPerson,
    detectFace
} from './face-recognition-service';

// 감정 분석 관련 기능
export {
    analyzeEmotion,
    analyzeEmotionScores
} from './emotion-analysis-service';

// Gemini 클라이언트 관련 기능
export {
    createGeminiClient,
    defaultGeminiConfig,
    fileToGenerativePart,
    validateApiResponse,
    handleApiError
} from './gemini-api-client';
