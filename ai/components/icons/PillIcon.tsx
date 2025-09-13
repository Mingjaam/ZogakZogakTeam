import React from 'react';

interface IconProps {
  className?: string;
}

const PillIcon: React.FC<IconProps> = ({ className }) => {
    const iconSrc = 'https://i.imgur.com/nLC8vRQ.png';
    return <img src={iconSrc} alt="약 복용 아이콘" className={className} />;
};

export default PillIcon;
