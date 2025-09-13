import React from 'react';

interface GalleryIconProps {
  className?: string;
  isActive?: boolean;
}

const GalleryIcon: React.FC<GalleryIconProps> = ({ className, isActive = false }) => {
    const iconSrc = isActive 
        ? 'https://i.imgur.com/sOfTwCN.png'  // 활성화 상태
        : 'https://i.imgur.com/7aQv8Fy.png'; // 비활성화 상태
    
    return <img src={iconSrc} alt="갤러리 아이콘" className={className} />;
};

export default GalleryIcon;
