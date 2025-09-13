import React, { useState, useEffect } from 'react';
import ElderlyHomeScreen from './components/screens/elderly/ElderlyHomeScreen';
import ElderlyGalleryScreen from './components/screens/elderly/ElderlyGalleryScreen';
import ElderlyMapScreen from './components/screens/elderly/ElderlyMapScreen';
import ElderlyNotificationsScreen from './components/screens/elderly/ElderlyNotificationsScreen';
import ElderlyDiaryScreen from './components/screens/elderly/ElderlyDiaryScreen';
import UnifiedProfileScreen from './components/screens/UnifiedProfileScreen';
import BottomNavBar from './components/BottomNavBar';
import AppHeader from './components/AppHeader';
import MedicationReminderModal from './components/modals/MedicationReminderModal';
import { useMemory } from './contexts/MemoryContext';

export type TabName = 'home' | 'gallery' | 'map' | 'diary' | 'profile';

interface ElderlyAppProps {
    onHeaderClick: () => void;
}

const ElderlyApp: React.FC<ElderlyAppProps> = ({ onHeaderClick }) => {
    const [activeTab, setActiveTab] = useState<TabName>('home');
    const [showMedicationModal, setShowMedicationModal] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const { loadMemories } = useMemory();

    // 어르신 앱 마운트 시 데이터 새로고침
    useEffect(() => {
        console.log("🔄 어르신 앱 마운트 - 추억 데이터 새로고침");
        loadMemories();
    }, [loadMemories]);

    const renderContent = () => {
        if (showNotifications) {
            return <ElderlyNotificationsScreen onBack={() => setShowNotifications(false)} />;
        }
        
        switch (activeTab) {
            case 'home':
                return <ElderlyHomeScreen setShowModal={setShowMedicationModal} setActiveTab={setActiveTab} />;
            case 'gallery':
                return <ElderlyGalleryScreen />;
            case 'map':
                return <ElderlyMapScreen />;
            case 'diary':
                return <ElderlyDiaryScreen />;
            case 'profile':
                return <UnifiedProfileScreen currentRole="elderly" onRoleSwitch={onHeaderClick} />;
            default:
                return <ElderlyHomeScreen setShowModal={setShowMedicationModal} setActiveTab={setActiveTab} />;
        }
    };
    
    const getHeaderTitle = () => {
        if (showNotifications) {
            return '약 복용 알림';
        }
        
        switch (activeTab) {
            case 'home':
                return '조각조각';
            case 'gallery':
                 return '인물 찾기';
            case 'map':
                return '추억 찾기';
            case 'diary':
                return '오늘의 일기';
            case 'profile':
                return '내 정보';
            default:
                return '조각조각';
        }
    };

    return (
        <div className="h-screen w-screen bg-white flex flex-col antialiased">
            <AppHeader 
                title={getHeaderTitle()} 
                onTitleClick={onHeaderClick}
                onNotificationClick={() => setShowNotifications(true)}
                currentRole="elderly"
                onRoleSwitch={onHeaderClick}
            />
            <main className="flex-grow overflow-y-auto pb-20">
                {renderContent()}
            </main>
            <BottomNavBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <MedicationReminderModal isOpen={showMedicationModal} onClose={() => setShowMedicationModal(false)} />
        </div>
    );
};

export default ElderlyApp;