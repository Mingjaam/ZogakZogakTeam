import React from 'react';
import { EmotionScores, EmotionType } from '../lib/ai';

interface EmotionChartProps {
  scores: EmotionScores;
  className?: string;
}

const EmotionChart: React.FC<EmotionChartProps> = ({ scores, className = '' }) => {
  console.log("📊 EmotionChart received scores:", scores);
  console.log("📊 Scores type:", typeof scores);
  console.log("📊 Scores keys:", Object.keys(scores));
  console.log("📊 Individual scores:", {
    joy: scores.joy,
    happiness: scores.happiness,
    surprise: scores.surprise,
    sadness: scores.sadness,
    anger: scores.anger,
    fear: scores.fear
  });
  
  const emotions: { key: EmotionType; label: string; color: string }[] = [
    { key: 'joy', label: '기뻐요', color: 'bg-green-400' },
    { key: 'happiness', label: '행복함', color: 'bg-pink-400' },
    { key: 'surprise', label: '놀라움', color: 'bg-yellow-400' },
    { key: 'sadness', label: '슬퍼요', color: 'bg-blue-400' },
    { key: 'anger', label: '화나요', color: 'bg-red-400' },
    { key: 'fear', label: '두려워요', color: 'bg-[#D9DCB9]' }
  ];

  // 가장 높은 점수의 감정 찾기
  const dominantEmotion = emotions.reduce((prev, current) => 
    scores[current.key] > scores[prev.key] ? current : prev
  );

  // 감정 점수 정렬 (높은 순) - 원본 배열을 변경하지 않도록 복사
  const sortedEmotions = [...emotions].sort((a, b) => scores[b.key] - scores[a.key]);
  
  console.log("📊 Sorted emotions:", sortedEmotions.map(e => ({ 
    emotion: e.key, 
    score: scores[e.key], 
    label: e.label 
  })));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 지배적 감정 표시 */}
      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="text-sm text-gray-600 mb-2">감정 분석 결과</div>
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${dominantEmotion.color} text-white font-bold text-lg shadow-lg`}>
          <div className="w-4 h-4 rounded-full bg-white opacity-90"></div>
          <span>{dominantEmotion.label}</span>
          <span className="text-white/90">({scores[dominantEmotion.key]}%)</span>
        </div>
        <div className="text-xs text-gray-500 mt-3">
          ✨ 가장 높은 점수의 감정이 오늘의 기분으로 설정됩니다
        </div>
      </div>

      {/* 감정 점수 그래프 */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-700 mb-3">📊 감정별 강도 분석</div>
        {sortedEmotions.map((emotion, index) => {
          const score = scores[emotion.key];
          const width = Math.max(score, 2); // 최소 2% 너비 보장
          
          console.log(`📊 Rendering ${emotion.key}: score=${score}, width=${width}%`);
          
          return (
            <div key={emotion.key} className="flex items-center gap-3">
              <div className="w-16 text-sm font-medium text-gray-700">
                {emotion.label}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                <div
                  className={`h-4 rounded-full ${emotion.color} transition-all duration-700 ease-out ${
                    scores[emotion.key] === scores[dominantEmotion.key] 
                      ? 'ring-2 ring-gray-400 shadow-lg' 
                      : 'opacity-80'
                  }`}
                  style={{ 
                    width: `${width}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
                {scores[emotion.key] === scores[dominantEmotion.key] && (
                  <div className="absolute top-0 left-0 w-full h-full bg-white/20 rounded-full animate-pulse"></div>
                )}
              </div>
              <div className={`w-12 text-sm font-bold text-right ${
                scores[emotion.key] === scores[dominantEmotion.key] 
                  ? 'text-gray-800' 
                  : 'text-gray-600'
              }`}>
                {score}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionChart;
