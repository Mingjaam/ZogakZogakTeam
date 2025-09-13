# 🤖 조각조각 AI 모듈

<div align="center">
  <p><strong>노인과 보호자를 위한 AI 기능 모듈</strong></p>
  
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)
  ![AI](https://img.shields.io/badge/AI-Face_Recognition-FF6B6B?style=for-the-badge&logo=ai&logoColor=white)
  ![Emotion Analysis](https://img.shields.io/badge/Emotion_Analysis-FFD93D?style=for-the-badge&logo=heart&logoColor=white)
</div>

---

## 📖 모듈 소개

**조각조각 AI 모듈**은 노인과 보호자를 위한 AI 기능을 제공하는 TypeScript 모듈입니다. Google Gemini AI를 활용하여 얼굴 인식, 감정 분석 등의 기능을 제공합니다.

### 🎯 주요 기능

- **👥 얼굴 인식**: 사진에서 인물을 자동으로 식별
- **😊 감정 분석**: 일기 내용의 감정 상태 분석
- **🔍 얼굴 감지**: 이미지에서 얼굴 존재 여부 확인
- **📊 감정 점수**: 상세한 감정 점수 분석

## 🚀 기술 스택

- **Language**: TypeScript 5.0+
- **AI Platform**: Google Gemini 2.5 Flash
- **Package Manager**: npm
- **Environment**: Vite/Node.js

## 📁 프로젝트 구조

```
ai-module/
├── README.md                    # 이 파일
├── package.json                 # 패키지 설정
├── index.ts                     # 진입점
├── ai-services.ts              # 통합 서비스 export
├── ai-types.ts                 # 타입 정의
├── face-recognition-service.ts # 얼굴 인식 서비스
├── emotion-analysis-service.ts # 감정 분석 서비스
└── gemini-api-client.ts        # Gemini API 클라이언트
```

## 🛠️ 설치 및 설정

### 1. 의존성 설치

```bash
npm install @google/genai
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 Gemini API 키를 설정합니다:

```env
# Vite 환경에서 사용
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# 또는 일반 환경에서 사용
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. API 키 발급

1. [Google AI Studio](https://makersuite.google.com/app/apikey)에 접속
2. Google 계정으로 로그인
3. "Create API Key" 클릭
4. 생성된 API 키를 환경 변수에 설정

## 📚 사용법

### 기본 사용법

```typescript
// 통합 import (권장)
import { 
  identifyPerson, 
  detectFace, 
  analyzeEmotion, 
  analyzeEmotionScores,
  EmotionType,
  Person 
} from './ai-module';

// 개별 서비스 import
import { identifyPerson } from './face-recognition-service';
import { analyzeEmotion } from './emotion-analysis-service';
```

### 얼굴 인식 사용법

```typescript
import { identifyPerson, Person } from './ai-module';

// 알고 있는 사람 목록
const knownPeople: Person[] = [
  {
    id: '1',
    name: '김할머니',
    relationship: '어머니',
    photo: 'base64_encoded_image_data'
  },
  {
    id: '2', 
    name: '이할아버지',
    relationship: '아버지',
    photo: 'base64_encoded_image_data'
  }
];

// 새로운 사진에서 사람 식별
const targetImageBase64 = 'base64_encoded_target_image';

try {
  const result = await identifyPerson(targetImageBase64, knownPeople);
  console.log('식별된 사람:', result); // "김할머니", "모르는 사람", "사람 없음"
} catch (error) {
  console.error('얼굴 인식 오류:', error);
}
```

### 감정 분석 사용법

```typescript
import { analyzeEmotion, analyzeEmotionScores, EmotionType } from './ai-module';

// 일기 내용
const diaryText = "오늘은 손자와 함께 산책을 했어요. 정말 즐거운 하루였습니다.";

// 단순 감정 분류
try {
  const emotion: EmotionType = await analyzeEmotion(diaryText);
  console.log('감정:', emotion); // "joy", "happiness", "surprise", "sadness", "anger", "fear"
} catch (error) {
  console.error('감정 분석 오류:', error);
}

// 상세 감정 점수 분석
try {
  const emotionScores = await analyzeEmotionScores(diaryText);
  console.log('감정 점수:', emotionScores);
  // {
  //   scores: { joy: 0.8, happiness: 0.9, surprise: 0.1, sadness: 0.0, anger: 0.0, fear: 0.0 },
  //   dominantEmotion: "happiness"
  // }
} catch (error) {
  console.error('감정 점수 분석 오류:', error);
}
```

### 얼굴 감지 사용법

```typescript
import { detectFace } from './ai-module';

const imageBase64 = 'base64_encoded_image_data';

try {
  const hasFace = await detectFace(imageBase64);
  console.log('얼굴 감지:', hasFace); // true 또는 false
} catch (error) {
  console.error('얼굴 감지 오류:', error);
}
```

## 🔧 API 레퍼런스

### 타입 정의

#### Person
```typescript
interface Person {
  id: string;           // 고유 식별자
  name: string;         // 이름
  relationship: string; // 관계 (어머니, 아버지, 손자 등)
  photo: string;        // base64 인코딩된 사진
}
```

#### EmotionType
```typescript
type EmotionType = 'joy' | 'happiness' | 'surprise' | 'sadness' | 'anger' | 'fear';
```

#### EmotionScores
```typescript
interface EmotionScores {
  joy: number;        // 기쁨 (0-1)
  happiness: number;  // 행복 (0-1)
  surprise: number;   // 놀라움 (0-1)
  sadness: number;    // 슬픔 (0-1)
  anger: number;      // 화남 (0-1)
  fear: number;       // 두려움 (0-1)
}
```

### 함수 목록

#### 얼굴 인식 관련
- `identifyPerson(targetImageBase64: string, knownPeople: Person[]): Promise<string>`
  - 사진에서 사람을 식별합니다
  - 반환값: "사람 이름", "모르는 사람", "사람 없음"

- `detectFace(imageBase64: string): Promise<boolean>`
  - 이미지에서 얼굴 존재 여부를 확인합니다
  - 반환값: true (얼굴 있음) 또는 false (얼굴 없음)

#### 감정 분석 관련
- `analyzeEmotion(diaryText: string): Promise<EmotionType>`
  - 일기 내용의 감정을 분류합니다
  - 반환값: 6가지 감정 중 하나

- `analyzeEmotionScores(diaryText: string): Promise<EmotionAnalysisResult>`
  - 일기 내용의 상세한 감정 점수를 분석합니다
  - 반환값: 감정 점수와 주요 감정

## 🎨 감정 분류 기준

| 감정 | 영어 | 설명 | 예시 |
|------|------|------|------|
| 😊 기뻐요 | joy | 즐거운 일, 성취감, 만족감 | "오늘 손자와 놀았어요" |
| 😌 행복함 | happiness | 평온함, 만족, 안정감 | "가족들과 함께 식사했어요" |
| 😲 놀라움 | surprise | 예상치 못한 일, 깜짝 놀란 일 | "갑자기 손자가 왔어요" |
| 😢 슬퍼요 | sadness | 우울함, 아쉬움, 그리움 | "옛날 생각이 나요" |
| 😠 화나요 | anger | 화남, 짜증, 분노 | "또 약을 깜빡했어요" |
| 😰 두려워요 | fear | 걱정, 불안, 두려움 | "혼자 있기 무서워요" |

## 🔧 개발 스크립트

```bash
# TypeScript 컴파일
npm run build

# 개발 모드 (파일 변경 감지)
npm run dev
```

## 🚨 에러 처리

모든 함수는 try-catch 블록으로 감싸서 사용하는 것을 권장합니다:

```typescript
try {
  const result = await identifyPerson(image, people);
  // 성공 처리
} catch (error) {
  console.error('AI 서비스 오류:', error);
  // 에러 처리 (기본값 설정 등)
}
```

### 일반적인 에러 상황

1. **API 키 미설정**: "API 키가 설정되지 않았습니다."
2. **네트워크 오류**: "AI 서비스 연결에 실패했습니다."
3. **잘못된 이미지**: "이미지를 처리할 수 없습니다."
4. **API 응답 오류**: "AI로부터 유효한 답변을 받지 못했습니다."

## 📊 성능 최적화

### 이미지 최적화
- 이미지 크기를 적절히 조정하여 API 호출 시간 단축
- JPEG 형식 사용 권장 (PNG보다 작은 파일 크기)

### 캐싱 전략
- 동일한 이미지에 대한 반복 호출 방지
- 감정 분석 결과 캐싱 고려

## 🔒 보안 고려사항

- API 키는 환경 변수로만 관리
- 민감한 이미지 데이터는 로컬에서만 처리
- API 호출 로그에서 개인정보 제거

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

AI 모듈 관련 문의사항이 있으시면 이슈를 생성해 주세요.

## 🚀 버전 히스토리

- **v1.0.0** (2024-12-19): 초기 버전 릴리스
  - 얼굴 인식 기능
  - 감정 분석 기능
  - Gemini API 통합
  - TypeScript 타입 지원

---

<div align="center">
  <p>Made with ❤️ for better elderly care</p>
  <p>© 2024 조각조각 AI 모듈. All rights reserved.</p>
</div>