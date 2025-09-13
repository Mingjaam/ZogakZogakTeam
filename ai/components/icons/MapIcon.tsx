import React from 'react';

interface MapIconProps {
  className?: string;
  isActive?: boolean;
}

const MapIcon: React.FC<MapIconProps> = ({ className, isActive = false }) => {
    const iconSrc = isActive 
        ? 'https://i.imgur.com/5hvdPTP.png'  // 활성화 상태
        : 'https://i.imgur.com/XJNzxAD.png'; // 비활성화 상태
    
    return <img src={iconSrc} alt="지도 아이콘" className={className} />;
};

export default MapIcon;
