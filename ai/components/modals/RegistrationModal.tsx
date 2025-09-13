import React, { useState } from 'react';

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (name: string, relationship: string) => void;
    photo: string;
}

// Fix: Implement RegistrationModal component.
const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onRegister, photo }) => {
    const [name, setName] = useState('');
    const [relationship, setRelationship] = useState('');

    if (!isOpen) return null;

    const handleRegister = () => {
        if (name.trim() && relationship.trim()) {
            onRegister(name, relationship);
            setName('');
            setRelationship('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm p-6 text-center flex flex-col items-center" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">새로운 인물 등록</h2>
                <img src={`data:image/jpeg;base64,${photo}`} alt="New person" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200" />
                
                <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                    <input
                        type="text"
                        placeholder="이름 (예: 김철수)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#70c18c]"
                    />
                    <input
                        type="text"
                        placeholder="관계 (예: 아들)"
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 bg-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#70c18c]"
                    />
                </form>

                <div className="w-full flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-lg font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300 transition-all"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleRegister}
                        disabled={!name.trim() || !relationship.trim()}
                        className="flex-1 py-3 text-lg font-bold text-white bg-[#28a745] rounded-full hover:bg-[#218838] disabled:bg-gray-400 transition-all"
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationModal;
