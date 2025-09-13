import React from 'react';

interface UserIconProps {
  className?: string;
  isActive?: boolean;
}

const UserIcon: React.FC<UserIconProps> = ({ className, isActive = false }) => {
    const iconSrc = isActive 
        ? 'https://i.imgur.com/9W7g6jw.png'  // 활성화 상태
        : 'https://i.imgur.com/YUaBY9O.png'; // 비활성화 상태
    
    return <img src={iconSrc} alt="프로필 아이콘" className={className} />;
};

export default UserIcon;
