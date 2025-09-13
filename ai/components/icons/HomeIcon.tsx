import React from 'react';

interface HomeIconProps {
  className?: string;
  isActive?: boolean;
}

const HomeIcon: React.FC<HomeIconProps> = ({ className, isActive = false }) => {
    const iconSrc = isActive 
        ? 'https://i.imgur.com/1KyirUn.png'  // 활성화 상태
        : 'https://i.imgur.com/63Cr9Oi.png'; // 비활성화 상태
    
    return <img src={iconSrc} alt="홈 아이콘" className={className} />;
};

export default HomeIcon;
