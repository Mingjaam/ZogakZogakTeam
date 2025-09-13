import React from 'react';
import PuzzleLogo from './icons/PuzzleLogo';
import NotificationBellIcon from './icons/NotificationBellIcon';

interface AppHeaderProps {
  title: string;
  onTitleClick?: () => void;
  onNotificationClick?: () => void;
  currentRole?: 'guardian' | 'elderly';
  onRoleSwitch?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onTitleClick, onNotificationClick, currentRole, onRoleSwitch }) => {
  return (
    <header className="bg-white p-4 flex justify-between items-center sticky top-0 z-10 w-full">
        <button onClick={onTitleClick} className="flex items-center gap-2 cursor-pointer p-1 -ml-1 rounded-md hover:bg-gray-100 transition-colors">
            <PuzzleLogo className="w-8 h-8"/>
            <h1 className="text-lg font-bold text-gray-700">{title}</h1>
        </button>
        
        <div className="flex items-center gap-2">
            {/* 역할 전환 버튼 */}
            {currentRole && onRoleSwitch && (
                <button
                    onClick={onRoleSwitch}
                    className="px-3 py-1.5 text-xs font-medium text-[#70c18c] bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                    title="역할 전환"
                >
                    {currentRole === 'guardian' ? '어르신으로 전환' : '보호자로 전환'}
                </button>
            )}
            
            {/* 알림 버튼 */}
            <button 
                onClick={onNotificationClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" 
                aria-label="알림 보기"
            >
                <NotificationBellIcon className="w-6 h-6 text-gray-500" />
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
        </div>
    </header>
  );
};

export default AppHeader;