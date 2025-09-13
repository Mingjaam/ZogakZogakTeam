import React from 'react';
import PuzzleLogo from './icons/PuzzleLogo';

interface RoleSelectionScreenProps {
    onSelectRole: (role: 'guardian' | 'elderly') => void;
}

const RoleCard: React.FC<{
    imageUrl: string;
    label: string;
    onClick: () => void;
    bgColor: string;
}> = ({ imageUrl, label, onClick, bgColor }) => (
    <button
        onClick={onClick}
        className="bg-white rounded-3xl shadow-lg w-full flex flex-col items-center gap-3 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70c18c] p-4"
    >
        <div className={`w-28 h-28 rounded-2xl overflow-hidden flex items-center justify-center ${bgColor}`}>
            <img src={imageUrl} alt={label} className="w-24 h-24 object-contain" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mt-2">{label}</h3>
    </button>
);


const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelectRole }) => {
    return (
        <main className="bg-white min-h-screen w-screen flex flex-col antialiased">
            <header className="p-4 flex items-center gap-2">
                 <PuzzleLogo className="w-8 h-8"/>
                 <h1 className="text-xl font-bold text-gray-700">조각조각</h1>
            </header>
            <div className="flex-grow flex flex-col items-center justify-center p-4 -mt-12">
                <div className="w-full max-w-xs mx-auto text-center">
                    <h2 className="text-xl font-semibold text-gray-600 mb-4">역할을 선택해주세요</h2>
                    <p className="text-sm text-gray-500 mb-8">언제든지 다른 역할로 전환할 수 있습니다</p>
                    <div className="grid grid-cols-2 gap-5">
                        <RoleCard
                            imageUrl="https://i.imgur.com/RjrEbYa.png"
                            label="보호자"
                            onClick={() => onSelectRole('guardian')}
                            bgColor="bg-[#e0f3ff]"
                        />
                        <RoleCard
                            imageUrl="https://i.imgur.com/cZe1BTZ.png"
                            label="어르신"
                            onClick={() => onSelectRole('elderly')}
                            bgColor="bg-[#fff0e0]"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RoleSelectionScreen;
