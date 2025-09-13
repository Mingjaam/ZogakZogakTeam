import React from 'react';

interface IconProps {
  className?: string;
}

const PuzzleCameraIcon: React.FC<IconProps> = ({ className }) => {
    const iconSrc = 'https://i.imgur.com/ydT6EQx.png';
    return <img src={iconSrc} alt="인물 찾기 아이콘" className={className} />;
};

export default PuzzleCameraIcon;
