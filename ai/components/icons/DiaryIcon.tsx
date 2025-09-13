import React from 'react';

interface DiaryIconProps {
  className?: string;
  isActive?: boolean;
}

const DiaryIcon: React.FC<DiaryIconProps> = ({ className, isActive = false }) => {
    const iconSrc = isActive 
        ? 'https://i.imgur.com/umndjjo.png'  // 활성화 상태
        : 'https://i.imgur.com/8pmYg3B.png'; // 비활성화 상태
    
    return <img src={iconSrc} alt="일기장 아이콘" className={className} />;
};

export default DiaryIcon;
