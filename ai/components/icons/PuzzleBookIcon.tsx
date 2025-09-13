import React from 'react';

interface IconProps {
  className?: string;
}

const PuzzleBookIcon: React.FC<IconProps> = ({ className }) => {
    const iconSrc = 'https://i.imgur.com/W9hWIr0.png';
    return <img src={iconSrc} alt="추억 찾기 아이콘" className={className} />;
};

export default PuzzleBookIcon;
