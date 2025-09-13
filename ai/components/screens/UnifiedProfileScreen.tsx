import React, { useState } from 'react';

interface UnifiedProfileScreenProps {
    currentRole: 'guardian' | 'elderly';
    onRoleSwitch: () => void;
}

const UnifiedProfileScreen: React.FC<UnifiedProfileScreenProps> = ({ currentRole, onRoleSwitch }) => {
    const [locationNotification, setLocationNotification] = useState(false);
    const [medicationNotification, setMedicationNotification] = useState(true);
    const [memoryNotification, setMemoryNotification] = useState(true);

    const handleLogout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            // 로그아웃 로직
            console.log('로그아웃');
        }
    };

    // 가족 정보 데이터
    const familyMembers = [
        {
            id: 'guardian',
            name: '김영서',
            email: 'Zeroowe01@naver.com',
            role: '보호자',
            roleColor: 'text-green-600',
            roleBg: 'bg-green-50',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            isActive: currentRole === 'guardian'
        },
        {
            id: 'elderly',
            name: '박길수',
            email: 'grandpa@family.com',
            role: '어르신',
            roleColor: 'text-blue-600',
            roleBg: 'bg-blue-50',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            isActive: currentRole === 'elderly'
        }
    ];

    return (
        <div className="p-4 space-y-6">
            {/* 가족 프로필 카드 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-[#70c18c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">가족 프로필</h3>
                </div>

                {/* 가족 구성원들 */}
                <div className="space-y-4">
                    {familyMembers.map((member, index) => (
                        <div key={member.id} className="relative">
                            {/* 연결선 */}
                            {index < familyMembers.length - 1 && (
                                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-[#70c18c] to-transparent"></div>
                            )}
                            
                            <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                                member.isActive 
                                    ? 'bg-gradient-to-r from-[#70c18c]/10 to-green-50 border-2 border-[#70c18c]/30' 
                                    : 'bg-gray-50 hover:bg-gray-100'
                            }`}>
                                {/* 프로필 이미지 */}
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                                        <img 
                                            src={member.avatar} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* 활성 상태 표시 */}
                                    {member.isActive && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#70c18c] rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* 정보 */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${member.roleBg} ${member.roleColor}`}>
                                            {member.role}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{member.email}</p>
                                    {member.isActive && (
                                        <p className="text-xs text-[#70c18c] font-medium mt-1">현재 활성 계정</p>
                                    )}
                                </div>

                                {/* 역할 전환 버튼 */}
                                {!member.isActive && (
                                    <button
                                        onClick={onRoleSwitch}
                                        className="px-3 py-1.5 text-xs font-medium text-[#70c18c] bg-green-50 rounded-full hover:bg-green-100 transition-colors"
                                    >
                                        전환
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 연결 상태 표시 */}
                <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700 font-medium">가족 계정이 연결되어 있습니다</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">언제든지 역할을 전환하여 다른 관점에서 앱을 사용할 수 있습니다</p>
                </div>
            </div>

            {/* 알림 설정 카드 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.5 5.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">알림설정</h3>
                </div>
                
                <div className="space-y-4">
                    {/* 위치 알림 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium">위치 알림</span>
                        </div>
                        <button
                            onClick={() => setLocationNotification(!locationNotification)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                locationNotification ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    locationNotification ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* 약물 알림 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium">약물 알림</span>
                        </div>
                        <button
                            onClick={() => setMedicationNotification(!medicationNotification)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                medicationNotification ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    medicationNotification ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    {/* 추억 알림 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-gray-700 font-medium">추억 알림</span>
                        </div>
                        <button
                            onClick={() => setMemoryNotification(!memoryNotification)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                memoryNotification ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    memoryNotification ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* 앱 정보 및 로그아웃 카드 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="text-center mb-6">
                    <p className="text-gray-600 mb-1">조각조각 v1.0.0</p>
                    <p className="text-gray-500 text-sm">@403uk team</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default UnifiedProfileScreen;
