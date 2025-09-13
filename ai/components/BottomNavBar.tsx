import React from 'react';
import HomeIcon from './icons/HomeIcon';
import GalleryIcon from './icons/GalleryIcon';
import MapIcon from './icons/MapIcon';
import DiaryIcon from './icons/DiaryIcon';
import UserIcon from './icons/UserIcon';

// Make TabName generic to be used by both Guardian and Elderly apps
type TabName = 'home' | 'gallery' | 'map' | 'diary' | 'profile';

interface BottomNavBarProps {
    activeTab: TabName;
    setActiveTab: (tab: TabName) => void;
}

const NavItem: React.FC<{
    tabName: TabName;
    activeTab: TabName;
    setActiveTab: (tab: TabName) => void;
    children: React.ReactNode;
}> = ({ tabName, activeTab, setActiveTab, children }) => {
    const isActive = activeTab === tabName;
    const color = isActive ? '#3e8e5a' : '#a0a0a0';
    return (
        <button 
            onClick={() => setActiveTab(tabName)} 
            className="flex flex-col items-center justify-center flex-1 transition-transform transform hover:scale-110"
            style={{ color }}
            aria-label={tabName}
        >
            {children}
        </button>
    );
};


const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center z-20">
            <NavItem tabName="home" activeTab={activeTab} setActiveTab={setActiveTab}>
                <HomeIcon className="w-7 h-7" isActive={activeTab === 'home'} />
            </NavItem>
            <NavItem tabName="gallery" activeTab={activeTab} setActiveTab={setActiveTab}>
                <GalleryIcon className="w-7 h-7" isActive={activeTab === 'gallery'} />
            </NavItem>
            <NavItem tabName="map" activeTab={activeTab} setActiveTab={setActiveTab}>
                <MapIcon className="w-7 h-7" isActive={activeTab === 'map'} />
            </NavItem>
            <NavItem tabName="diary" activeTab={activeTab} setActiveTab={setActiveTab}>
                <DiaryIcon className="w-7 h-7" isActive={activeTab === 'diary'} />
            </NavItem>
            <NavItem tabName="profile" activeTab={activeTab} setActiveTab={setActiveTab}>
                <UserIcon className="w-7 h-7" isActive={activeTab === 'profile'} />
            </NavItem>
        </nav>
    );
};

export default BottomNavBar;
