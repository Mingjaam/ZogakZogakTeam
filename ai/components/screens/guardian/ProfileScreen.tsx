import React, { useState } from 'react';

const ProfileScreen: React.FC = () => {
    const [locationNotification, setLocationNotification] = useState(false);
    const [medicationNotification, setMedicationNotification] = useState(false);
    const [memoryNotification, setMemoryNotification] = useState(false);

    const handleLogout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            // 로그아웃 로직
            console.log('로그아웃');
        }
    };

    return (
        <div className="p-4 space-y-6">
            {/* 프로필 정보 카드 */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" 
                            alt="프로필" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800">김영서</h3>
                        <p className="text-sm text-gray-600">Zeroowe01@naver.com</p>
                        <p className="text-sm text-green-600 font-medium mt-1">보호자 계정</p>
                    </div>
                    <button className="px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors">
                        편집
                    </button>
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

export default ProfileScreen;
