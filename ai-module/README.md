# ZogakZogak AI Module

조각조각 앱의 AI 기능을 담당하는 모듈입니다.

## 기능

- **얼굴 인식**: `face-recognition-service.ts`
  - `identifyPerson`: 사람 식별
  - `detectFace`: 얼굴 감지

- **감정 분석**: `emotion-analysis-service.ts`
  - `analyzeEmotion`: 감정 분류
  - `analyzeEmotionScores`: 감정 점수 분석

- **API 클라이언트**: `gemini-api-client.ts`
  - Gemini API 설정 및 유틸리티

- **타입 정의**: `ai-types.ts`
  - 모든 AI 관련 타입 정의

## 사용법

```typescript
// 통합 import
import { 
  identifyPerson, 
  detectFace, 
  analyzeEmotion, 
  analyzeEmotionScores,
  EmotionType,
  Person 
} from './ai';

// 개별 서비스 import
import { identifyPerson } from './face-recognition-service';
import { analyzeEmotion } from './emotion-analysis-service';
```

## 설치

```bash
npm install @google/genai
```

## 환경 변수

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
# 또는
GEMINI_API_KEY=your_gemini_api_key
```
