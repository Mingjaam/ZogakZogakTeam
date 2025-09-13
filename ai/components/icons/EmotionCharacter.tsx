import React from 'react';

export type EmotionType = 'joy' | 'happiness' | 'surprise' | 'sadness' | 'anger' | 'fear';

interface EmotionCharacterProps {
  emotion: EmotionType;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const EmotionCharacter: React.FC<EmotionCharacterProps> = ({ 
  emotion, 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const getEmotionImage = (emotion: EmotionType): string => {
    switch (emotion) {
      case 'joy':
        return 'https://i.imgur.com/O0Z5u8g.png'; // 로그인 화면 아이콘
      case 'happiness':
        return 'https://i.imgur.com/EpvL2Dv.png';
      case 'surprise':
        return 'https://i.imgur.com/kysFp5M.png';
      case 'sadness':
        return 'https://i.imgur.com/mg8AYM4.png';
      case 'anger':
        return 'https://i.imgur.com/vFtphnl.png';
      case 'fear':
        return 'https://i.imgur.com/24xyq9F.png';
      default:
        return 'https://i.imgur.com/O0Z5u8g.png';
    }
  };

  const getEmotionLabel = (emotion: EmotionType): string => {
    switch (emotion) {
      case 'joy':
        return '기뻐요';
      case 'happiness':
        return '행복함';
      case 'surprise':
        return '놀라움';
      case 'sadness':
        return '슬퍼요';
      case 'anger':
        return '화나요';
      case 'fear':
        return '두려워요';
      default:
        return '기뻐요';
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src={getEmotionImage(emotion)} 
        alt={`${getEmotionLabel(emotion)} 캐릭터`}
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="text-sm font-medium text-gray-700 mt-1">
        {getEmotionLabel(emotion)}
      </span>
    </div>
  );
};

export default EmotionCharacter;



