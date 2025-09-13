// 감정 분석 관련 AI 기능

import { EmotionType, EmotionScores, EmotionAnalysisResult } from "./ai-types";
import { createGeminiClient, validateApiResponse, handleApiError } from "./gemini-api-client";

/**
 * 일기 내용에서 감정을 분석하는 함수 (단순 분류)
 * @param diaryText - 분석할 일기 내용
 * @returns 감정 타입
 */
export const analyzeEmotion = async (diaryText: string): Promise<EmotionType> => {
    const ai = createGeminiClient();
    
    if (!ai) {
        console.error("API 키가 설정되지 않았습니다.");
        return 'joy'; // 기본값
    }

    try {
        const prompt = `다음 일기 내용을 분석하여 감정을 분류해주세요. 
다음 6가지 감정 중 하나로만 답변해주세요: joy, happiness, surprise, sadness, anger, fear

일기 내용: "${diaryText}"

감정 분석 기준:
- joy (기뻐요): 즐거운 일, 성취감, 만족감
- happiness (행복함): 평온함, 만족, 안정감
- surprise (놀라움): 예상치 못한 일, 깜짝 놀란 일
- sadness (슬퍼요): 우울함, 아쉬움, 그리움
- anger (화나요): 화남, 짜증, 분노
- fear (두려워요): 걱정, 불안, 두려움

답변은 반드시 다음 중 하나의 단어로만 해주세요: joy, happiness, surprise, sadness, anger, fear`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }] },
        });

        if (!validateApiResponse(response)) {
            return 'joy';
        }

        const text = response.text?.trim() || '';
        
        // 응답에서 감정 타입 추출
        const emotions: EmotionType[] = ['joy', 'happiness', 'surprise', 'sadness', 'anger', 'fear'];
        const detectedEmotion = emotions.find(emotion => text.includes(emotion));
        
        return detectedEmotion || 'joy';
    } catch (error) {
        console.error("Error analyzing emotion:", error);
        return 'joy'; // 기본값
    }
};

/**
 * 일기 내용에서 감정 점수를 분석하는 함수 (상세 분석)
 * @param diaryText - 분석할 일기 내용
 * @returns 감정 점수와 주요 감정
 */
export const analyzeEmotionScores = async (diaryText: string): Promise<EmotionAnalysisResult> => {
    const ai = createGeminiClient();
    
    if (!ai) {
        console.error("API 키가 설정되지 않았습니다.");
        return { 
            scores: { joy: 50, happiness: 30, surprise: 10, sadness: 5, anger: 3, fear: 2 }, 
            dominantEmotion: 'joy' 
        };
    }

    try {
        const prompt = `다음 일기 내용을 분석하여 6가지 감정의 강도를 0-100점으로 평가해주세요.

일기 내용: "${diaryText}"

감정 분석 기준:
- joy (기뻐요): 즐거운 일, 성취감, 만족감
- happiness (행복함): 평온함, 만족, 안정감  
- surprise (놀라움): 예상치 못한 일, 깜짝 놀란 일
- sadness (슬퍼요): 우울함, 아쉬움, 그리움
- anger (화나요): 화남, 짜증, 분노
- fear (두려워요): 걱정, 불안, 두려움

중요: 반드시 다음 JSON 형식으로만 답변해주세요. 다른 텍스트는 포함하지 마세요.

{
  "joy": 0,
  "happiness": 0,
  "surprise": 0,
  "sadness": 0,
  "anger": 0,
  "fear": 0
}

각 감정의 점수는 0-100 사이의 정수여야 합니다.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }] },
        }).catch((error) => {
            console.error('Gemini API 호출 실패:', error);
            throw new Error(`API 호출 실패: ${error.message}`);
        });

        if (!validateApiResponse(response)) {
            return { 
                scores: { joy: 50, happiness: 30, surprise: 10, sadness: 5, anger: 3, fear: 2 }, 
                dominantEmotion: 'joy' 
            };
        }

        const text = response.text?.trim() || '';
        
        console.log("🔍 Gemini API Raw Response:", text);
        
        try {
            // JSON 파싱 시도 (여러 줄이나 추가 텍스트가 있을 수 있으므로 JSON 부분만 추출)
            let jsonText = text;
            
            // JSON 부분만 추출 (```json ... ``` 또는 { ... } 형태)
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                jsonText = jsonMatch[0];
            }
            
            console.log("🔍 Extracted JSON:", jsonText);
            
            const emotionData = JSON.parse(jsonText);
            console.log("✅ Parsed emotion data:", emotionData);
            
            // 유효성 검사
            const validEmotions = ['joy', 'happiness', 'surprise', 'sadness', 'anger', 'fear'];
            const scores: EmotionScores = { joy: 0, happiness: 0, surprise: 0, sadness: 0, anger: 0, fear: 0 };
            
            validEmotions.forEach(emotion => {
                const value = emotionData[emotion];
                if (typeof value === 'number' && value >= 0 && value <= 100) {
                    scores[emotion as keyof EmotionScores] = Math.round(value);
                } else {
                    console.warn(`⚠️ Invalid value for ${emotion}:`, value);
                }
            });
            
            console.log("📊 Raw scores before normalization:", scores);
            
            // 점수 정규화 (합계가 100이 되도록) - 하지만 원래 점수가 0이면 정규화하지 않음
            const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
            console.log("📊 Total score:", totalScore);
            
            // 모든 점수가 0이 아니고, 합계가 0보다 클 때만 정규화
            if (totalScore > 0 && totalScore !== 100) {
                console.log("📊 Normalizing scores...");
                validEmotions.forEach(emotion => {
                    const originalScore = scores[emotion as keyof EmotionScores];
                    const normalizedScore = Math.round((originalScore / totalScore) * 100);
                    scores[emotion as keyof EmotionScores] = normalizedScore;
                    console.log(`📊 ${emotion}: ${originalScore} -> ${normalizedScore}`);
                });
            } else if (totalScore === 0) {
                console.log("📊 All scores are 0, using default distribution");
                // 모든 점수가 0이면 기본 분포 사용
                scores.joy = 50;
                scores.happiness = 30;
                scores.surprise = 10;
                scores.sadness = 5;
                scores.anger = 3;
                scores.fear = 2;
            }
            
            console.log("📊 Final normalized scores:", scores);
            
            // 가장 높은 점수의 감정 찾기
            const dominantEmotion = validEmotions.reduce((prev, current) => 
                scores[current as keyof EmotionScores] > scores[prev as keyof EmotionScores] ? current : prev
            ) as EmotionType;
            
            console.log("🎯 Dominant emotion calculated:", dominantEmotion);
            
            return { scores, dominantEmotion };
        } catch (parseError) {
            console.error("Error parsing emotion scores JSON:", parseError);
            return { 
                scores: { joy: 50, happiness: 30, surprise: 10, sadness: 5, anger: 3, fear: 2 }, 
                dominantEmotion: 'joy' 
            };
        }
    } catch (error) {
        console.error("Error analyzing emotion scores:", error);
        return { 
            scores: { joy: 50, happiness: 30, surprise: 10, sadness: 5, anger: 3, fear: 2 }, 
            dominantEmotion: 'joy' 
        };
    }
};
