
import React, { useState } from 'react';
import PuzzleLogo from './icons/PuzzleLogo';

interface AuthScreenProps {
    onLoginSuccess: () => void;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    number: string;
    // role 제거 - 로그인 후 선택하도록 변경
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [registerData, setRegisterData] = useState<RegisterData>({
        name: '',
        email: '',
        password: '',
        number: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onLoginSuccess();
    };

    const handleRegisterClick = () => {
        setIsLoginMode(false);
        // 위로 스크롤
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToLogin = () => {
        setIsLoginMode(true);
        setRegisterData({
            name: '',
            email: '',
            password: '',
            number: ''
        });
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://52.79.251.209:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData)
            });

            if (response.ok) {
                alert('회원가입이 완료되었습니다!');
                handleBackToLogin();
            } else {
                const errorData = await response.json();
                alert(`회원가입 실패: ${errorData.message || '알 수 없는 오류가 발생했습니다.'}`);
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof RegisterData, value: string) => {
        setRegisterData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const playStartupSound = () => {
        try {
            const audio = new Audio(`${import.meta.env.BASE_URL}sounds/startup.mp3`);
            audio.play().catch(error => {
                console.log('사운드 재생 실패:', error);
            });
        } catch (error) {
            console.log('사운드 재생 오류:', error);
        }
    };

    return (
        <main className="bg-white min-h-screen w-screen flex flex-col items-center justify-center p-4 antialiased">
            <div className="w-full max-w-sm mx-auto">
                {isLoginMode ? (
                    <>
                        <div className="flex flex-col items-center text-center mb-8">
                            <img 
                                src="http://imgur.com/O0Z5u8g.png" 
                                alt="조각조각 로고" 
                                className="w-45 h-40 cursor-pointer hover:scale-105 transition-transform select-none" 
                                onClick={playStartupSound}
                            />
                            <h1 className="text-4xl font-extrabold text-[#3e8e5a] mt-4">조각조각</h1>
                            <p className="text-md text-[#6a9f7e] mt-1">소중한 순간을 담는 추억기록 APP</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg w-full">
                            <form className="space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="아이디"
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="비밀번호"
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                    />
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleLoginClick}
                                        className="w-full py-4 text-lg font-bold text-white bg-[#70c18c] rounded-full hover:bg-[#5da576] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70c18c] transition-all duration-300 transform hover:scale-105"
                                    >
                                        로그인
                                    </button>
                                </div>
                            </form>
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-500">
                                    아직 가입 안하셨나요? <button onClick={handleRegisterClick} className="font-semibold text-[#3e8e5a] hover:underline">회원가입</button>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center text-center mb-8">
                            <h1 className="text-4xl font-extrabold text-[#3e8e5a] mt-4">조각조각</h1>
                            <p className="text-md text-[#6a9f7e] mt-1">소중한 순간을 담는 추억기록 APP</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-lg w-full">
                            <form onSubmit={handleRegisterSubmit} className="space-y-5">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="이름"
                                        value={registerData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="이메일"
                                        value={registerData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="password"
                                        placeholder="비밀번호"
                                        value={registerData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="전화번호"
                                        value={registerData.number}
                                        onChange={(e) => handleInputChange('number', e.target.value)}
                                        className="w-full px-5 py-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#70c18c] transition-shadow"
                                        required
                                    />
                                </div>
                                

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBackToLogin}
                                        className="flex-1 py-4 text-lg font-bold text-[#3e8e5a] bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-300"
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 py-4 text-lg font-bold text-white bg-[#70c18c] rounded-full hover:bg-[#5da576] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#70c18c] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? '가입 중...' : '회원가입'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default AuthScreen;
