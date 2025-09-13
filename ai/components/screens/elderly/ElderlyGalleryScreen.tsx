import React, { useState, useRef } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { identifyPerson, Person, detectFace } from '../../../lib/ai';
import CameraMagnifierIcon from '../../icons/CameraMagnifierIcon';
import AlbumIcon from '../../icons/AlbumIcon';
import CameraView from '../../CameraView';
import RegistrationModal from '../../modals/RegistrationModal';
import RecognitionResultModal from '../../modals/RecognitionResultModal';
import TrashIcon from '../../icons/TrashIcon';

const ElderlyGalleryScreen: React.FC = () => {
    const [people, setPeople] = useLocalStorage<Person[]>('known_people', []);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [newPersonPhoto, setNewPersonPhoto] = useState<string | null>(null);
    const [recognitionResult, setRecognitionResult] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCapture = async (imageBase64: string) => {
        setIsCameraOpen(false);
        setLoadingText('사진을 분석하고 있습니다...');
        setIsLoading(true);
        setNewPersonPhoto(imageBase64);
        try {
            const result = await identifyPerson(imageBase64, people);
            setRecognitionResult(result);
        } catch (error) {
            console.error(error);
            setRecognitionResult('오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
            setIsResultModalOpen(true);
        }
    };

    const handleRegister = (name: string, relationship: string) => {
        if (newPersonPhoto) {
            const newPerson: Person = {
                id: new Date().toISOString(),
                name,
                relationship,
                photo: newPersonPhoto,
            };
            setPeople([...people, newPerson]);
            setIsRegisterModalOpen(false);
            setNewPersonPhoto(null);
        }
    };
    
    const handleDeletePerson = (idToDelete: string) => {
        if (window.confirm("정말로 이 인물을 삭제하시겠습니까?")) {
            setPeople(currentPeople => currentPeople.filter(p => p.id !== idToDelete));
        }
    };

    const handleOpenRegistrationFromRecognition = () => {
        setIsResultModalOpen(false);
        if (newPersonPhoto) {
            setIsRegisterModalOpen(true);
        }
    }

    const handleRegisterClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                setLoadingText('사진에서 얼굴을 찾고 있습니다...');
                setIsLoading(true);
                try {
                    const base64String = (reader.result as string).split(',')[1];
                    const hasFace = await detectFace(base64String);

                    if (hasFace) {
                        setNewPersonPhoto(base64String);
                        setIsRegisterModalOpen(true);
                    } else {
                        alert("사진에서 얼굴을 찾을 수 없습니다. 다른 사진을 선택해주세요.");
                    }
                } catch (error) {
                    console.error("Face detection error:", error);
                    alert("얼굴을 인식하는 중 오류가 발생했습니다.");
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
        if (event.target) {
            event.target.value = '';
        }
    };
    
    const foundPerson = people.find(p => p.name === recognitionResult);

    return (
        <div className="p-4 space-y-5">
             <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            {isLoading && (
                <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                    <p className="mt-4 text-lg font-semibold text-gray-700">{loadingText}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setIsCameraOpen(true)}
                    className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 transition-colors"
                >
                    <CameraMagnifierIcon className="w-14 h-14" />
                    <h2 className="text-base font-bold text-gray-800">누구인지 찾아보기</h2>
                </button>
                
                <button 
                    onClick={handleRegisterClick}
                    className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center gap-2 text-center hover:bg-gray-50 transition-colors"
                >
                    <AlbumIcon className="w-14 h-14" />
                    <h2 className="text-base font-bold text-gray-800">인물 등록하기</h2>
                </button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">등록된 인물</h2>
                {people.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">아직 등록된 인물이 없습니다.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {people.map((person) => (
                            <div key={person.id} className="relative group h-40">
                                <img src={`data:image/jpeg;base64,${person.photo}`} alt={person.name} className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-2xl z-10">
                                    <p className="font-bold">{person.name}</p>
                                    <p className="text-sm">{person.relationship}</p>
                                </div>
                                <button
                                    onClick={() => handleDeletePerson(person.id)}
                                    className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full text-white transition-opacity z-20"
                                    aria-label="삭제"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isCameraOpen && <CameraView onCapture={handleCapture} onClose={() => setIsCameraOpen(false)} />}
            
            {isRegisterModalOpen && newPersonPhoto && (
                <RegistrationModal
                    isOpen={isRegisterModalOpen}
                    onClose={() => setIsRegisterModalOpen(false)}
                    onRegister={handleRegister}
                    photo={newPersonPhoto}
                />
            )}

            <RecognitionResultModal 
                isOpen={isResultModalOpen}
                onClose={() => setIsResultModalOpen(false)}
                onRegister={handleOpenRegistrationFromRecognition}
                result={recognitionResult}
                person={foundPerson ? { name: foundPerson.name, relationship: foundPerson.relationship } : null}
            />
        </div>
    );
};

export default ElderlyGalleryScreen;