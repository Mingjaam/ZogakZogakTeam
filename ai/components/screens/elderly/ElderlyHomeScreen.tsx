import React from 'react';
import PuzzleCameraIcon from '../../icons/PuzzleCameraIcon';
import PuzzleBookIcon from '../../icons/PuzzleBookIcon';
import PuzzlePillIcon from '../../icons/PuzzlePillIcon';
import HelpPhoneIcon from '../../icons/HelpPhoneIcon';

interface ElderlyHomeScreenProps {
    setShowModal: (show: boolean) => void;
    setActiveTab: (tab: 'home' | 'gallery' | 'map' | 'notifications' | 'profile') => void;
}

const MainFeatureButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    bgColor?: string;
    iconBgColor?: string;
}> = ({ icon, label, onClick, bgColor = "bg-white", iconBgColor = "bg-gray-50" }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-3 ${bgColor} rounded-2xl shadow-lg p-4 hover:shadow-xl transition-all duration-200 active:scale-95 min-w-[100px] touch-manipulation flex-1`}
    >
        <div className={`w-12 h-12 flex items-center justify-center ${iconBgColor} rounded-xl`}>
            {icon}
        </div>
        <span className="font-semibold text-gray-700 text-sm text-center">{label}</span>
    </button>
);

const PillIcon: React.FC<{ className?: string }> = ({ className }) => {
    const iconSrc = 'https://i.imgur.com/nLC8vRQ.png';
    return <img src={iconSrc} alt="약 복용 아이콘" className={className} />;
};

const ElderlyHomeScreen: React.FC<ElderlyHomeScreenProps> = ({ setShowModal, setActiveTab }) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Welcome Section */}
            <div className="px-6 pt-6 pb-4">
                <h2 className="text-lg text-gray-700">환영합니다, 어르신</h2>
            </div>

            {/* Main Content */}
            <div className="px-6 space-y-6">
                {/* Main Feature Buttons */}
                <div className="flex justify-between items-stretch gap-3 py-4">
                    <MainFeatureButton
                        icon={<PuzzleCameraIcon className="w-11 h-11" />}
                        label="인물 찾기"
                        onClick={() => setActiveTab('gallery')}
                        bgColor="bg-blue-50"
                        iconBgColor="bg-blue-100"
                    />
                    <MainFeatureButton
                        icon={<PuzzleBookIcon className="w-11 h-11" />}
                        label="추억 찾기"
                        onClick={() => setActiveTab('map')}
                        bgColor="bg-green-50"
                        iconBgColor="bg-green-100"
                    />
                    <MainFeatureButton
                        icon={<PuzzlePillIcon className="w-11 h-11" />}
                        label="약 복용"
                        onClick={() => setActiveTab('notifications')}
                        bgColor="bg-orange-50"
                        iconBgColor="bg-orange-100"
                    />
                </div>

                {/* Next Medication Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 flex items-center gap-5">
                    <div className="bg-green-100 p-3 rounded-full">
                        <PillIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800">다음 약 복용</h3>
                        <p className="text-gray-500 text-sm">오후 1시 (30분 후)</p>
                    </div>
                </div>

                {/* Today's Medication Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-4">오늘의 약</h3>
                    <div className="space-y-4">
                        {/* Morning */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="font-semibold text-gray-700">아침</span>
                            </div>
                            <span className="text-gray-600 text-sm">혈압약, 비타민</span>
                            <span className="text-green-600 font-semibold text-sm">복용완료</span>
                        </div>
                        
                        {/* Lunch */}
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <span className="font-semibold text-gray-700">점심</span>
                            </div>
                            <span className="text-gray-600 text-sm">혈압약</span>
                            <div className="w-16"></div>
                        </div>
                        
                        {/* Evening */}
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="font-semibold text-gray-700">저녁</span>
                            </div>
                            <span className="text-gray-600 text-sm">당뇨약</span>
                            <div className="w-16"></div>
                        </div>
                    </div>
                </div>

                {/* Help Request Button */}
                <a
                    href="tel:01037177644"
                    className="w-full bg-red-500 text-white rounded-full py-4 text-lg font-bold flex items-center justify-center gap-3 shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105 mb-6 inline-block"
                >
                    <HelpPhoneIcon className="w-5 h-5" />
                    도움 요청
                </a>
            </div>
        </div>
    );
};

export default ElderlyHomeScreen;