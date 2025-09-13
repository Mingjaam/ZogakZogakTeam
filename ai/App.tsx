import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import RoleSelectionScreen from './components/RoleSelectionScreen';
import GuardianApp from './GuardianApp';
import ElderlyApp from './ElderlyApp';
import { SafeZoneProvider } from './contexts/SafeZoneContext';
import { DiaryProvider } from './contexts/DiaryContext';
import { MemoryProvider } from './contexts/MemoryContext';

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [role, setRole] = useState<'guardian' | 'elderly' | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Show splash screen for 2 seconds

        return () => clearTimeout(timer);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    
    const handleRoleSelect = (selectedRole: 'guardian' | 'elderly') => {
        console.log("🔄 역할 선택:", selectedRole);
        setRole(selectedRole);
    };

    const handleRoleReset = () => {
        console.log("🔄 역할 리셋");
        setRole(null);
    };

    if (loading) {
        return <SplashScreen />;
    }

    if (!isLoggedIn) {
        return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
    }

    if (!role) {
        return <RoleSelectionScreen onSelectRole={handleRoleSelect} />;
    }

    // MemoryProvider를 최상위로 이동 (역할 전환 시에도 데이터 유지)
    return (
        <MemoryProvider>
            {role === 'guardian' ? (
                <DiaryProvider>
                    <SafeZoneProvider>
                        <GuardianApp onHeaderClick={handleRoleReset} />
                    </SafeZoneProvider>
                </DiaryProvider>
            ) : (
                <DiaryProvider>
                    <SafeZoneProvider>
                        <ElderlyApp onHeaderClick={handleRoleReset} />
                    </SafeZoneProvider>
                </DiaryProvider>
            )}
        </MemoryProvider>
    );

};

export default App;