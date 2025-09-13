import React from 'react';

interface RecognitionResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: () => void;
    result: string;
    person: { name: string, relationship: string } | null;
}

// Fix: Implement RecognitionResultModal component.
const RecognitionResultModal: React.FC<RecognitionResultModalProps> = ({ isOpen, onClose, onRegister, result, person }) => {
    if (!isOpen) return null;

    const isUnknown = result === '모르는 사람';
    const isNotPerson = result === '사람 없음';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-8 text-center flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">인식 결과</h2>
                {isNotPerson ? (
                    <p className="text-lg text-gray-600 my-4">사진에서 사람을 찾을 수 없습니다.</p>
                ) : person ? (
                    <p className="text-lg text-gray-600 my-4">이 분은 <span className="font-bold text-xl text-[#3e8e5a]">{person.name}</span> ({person.relationship}) 님 입니다.</p>
                ) : isUnknown ? (
                     <p className="text-lg text-gray-600 my-4">등록되지 않은 사람입니다. 새로 등록하시겠어요?</p>
                ) : (
                    <p className="text-lg text-gray-600 my-4">{result}</p>
                )}
                
                <div className="w-full flex gap-3 mt-4">
                    {isUnknown ? (
                        <>
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 text-lg font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                            >
                                아니요
                            </button>
                            <button
                                onClick={onRegister}
                                className="flex-1 py-3 text-lg font-bold text-white bg-[#28a745] rounded-full hover:bg-[#218838] transition-all"
                            >
                                예
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-3 text-lg font-bold text-white bg-[#28a745] rounded-full hover:bg-[#218838] transition-all"
                        >
                            확인
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecognitionResultModal;
