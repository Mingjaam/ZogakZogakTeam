import React, { useRef, useState, useCallback, useEffect } from 'react';
import CameraIcon from './icons/CameraIcon';

interface CameraViewProps {
    onCapture: (imageSrc: string) => void;
    onClose: () => void;
}

// Fix: Implement CameraView component to capture photos.
const CameraView: React.FC<CameraViewProps> = ({ onCapture, onClose }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        let mediaStream: MediaStream;
        const getMedia = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { facingMode: 'user' } 
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setStream(mediaStream);
            } catch (err) {
                console.error("Error accessing camera:", err);
                alert("카메라에 접근할 수 없습니다. 권한을 확인해주세요.");
                onClose();
            }
        };

        getMedia();

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [onClose]);

    const handleCapture = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                // 좌우반전을 위해 context를 변환
                context.save();
                context.scale(-1, 1);
                context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
                context.restore();
                
                const dataUrl = canvas.toDataURL('image/jpeg');
                const base64 = dataUrl.split(',')[1];
                onCapture(base64);
            }
        }
    }, [onCapture]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* 카메라 화면 - 좌우 반전 적용 */}
            <div className="flex-1 relative overflow-hidden">
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                />
                {/* 카메라 오버레이 UI */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* 상단 상태바 영역 */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent"></div>
                    
                    {/* 중앙 촬영 가이드 */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-64 h-64 border-2 border-white/50 rounded-lg"></div>
                    </div>
                </div>
            </div>
            
            {/* 하단 컨트롤 영역 - 고정 높이 */}
            <div className="h-32 bg-black bg-opacity-90 flex items-center justify-around px-6 pb-6">
                <button 
                    onClick={onClose}
                    className="text-white text-lg font-semibold px-4 py-2 rounded-lg bg-gray-700/50"
                >
                    취소
                </button>
                <button
                    onClick={handleCapture}
                    className="w-20 h-20 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                    aria-label="사진 찍기"
                >
                    <CameraIcon className="w-10 h-10 text-gray-700" />
                </button>
                <div className="w-16"></div> {/* Spacer */}
            </div>
        </div>
    );
};

export default CameraView;
