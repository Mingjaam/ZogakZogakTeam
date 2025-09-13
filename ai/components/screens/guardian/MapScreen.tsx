import React, { useState, useRef } from 'react';
import GoogleMap from '../../GoogleMap';
import { Memory } from '../../../types/memory';
import SafeZoneModal from '../../modals/SafeZoneModal';
import { useSafeZone } from '../../../contexts/SafeZoneContext';
import LocationPinIcon from '../../icons/LocationPinIcon';
import RocketIcon from '../../icons/RocketIcon';
import ClockIcon from '../../icons/ClockIcon';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import WarningIcon from '../../icons/WarningIcon';
import PaperPlaneIcon from '../../icons/PaperPlaneIcon';

// Google Maps 타입 정의는 GoogleMap 컴포넌트에서 이미 정의되어 있음

const MapScreen: React.FC = () => {
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [isSafeZoneModalOpen, setIsSafeZoneModalOpen] = useState(false);
    const { safeZone, updateSafeZone } = useSafeZone();
    const mapRef = useRef<google.maps.Map | null>(null);

    const handleMemoryClick = (memory: Memory) => {
        setSelectedMemory(memory);
    };

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        
        // 어르신 현재 위치 마커 추가
        const elderlyLocation = { lat: 35.8714, lng: 128.6014 }; // 실제로는 API에서 가져와야 함
        
        new google.maps.Marker({
            position: elderlyLocation,
            map: map,
            title: '어르신 현재 위치',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="#70c18c" stroke="white" stroke-width="3"/>
                    <circle cx="16" cy="16" r="6" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
            }
        });
        
        // 안전구역 원 그리기
        new google.maps.Circle({
            strokeColor: '#70c18c',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#70c18c',
            fillOpacity: 0.2,
            map: map,
            center: safeZone.center,
            radius: safeZone.radius
        });
        
        // 안전구역 중심 마커 (집 모양)
        new google.maps.Marker({
            position: safeZone.center,
            map: map,
            title: '안전구역 중심',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L28 12V26C28 27.1046 27.1046 28 26 28H20V20C20 19.4477 19.5523 19 19 19H13C12.4477 19 12 19.4477 12 20V28H6C4.89543 28 4 27.1046 4 26V12L16 4Z" fill="#70c18c" stroke="white" stroke-width="2"/>
                    <rect x="12" y="20" width="8" height="8" fill="white"/>
                    <rect x="14" y="22" width="2" height="2" fill="#70c18c"/>
                    <rect x="18" y="22" width="2" height="2" fill="#70c18c"/>
                    <rect x="14" y="26" width="2" height="2" fill="#70c18c"/>
                    <rect x="18" y="26" width="2" height="2" fill="#70c18c"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
            }
        });
    };

    const handleSafeZoneSave = (center: { lat: number; lng: number }, radius: number) => {
        updateSafeZone(center, radius);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Map View - 전체 화면을 차지하도록 */}
            <div className="flex-1 relative bg-gray-200 overflow-hidden">
                <GoogleMap 
                    center={{ lat: 35.8714, lng: 128.6014 }}
                    zoom={15}
                    className="w-full h-full"
                    memories={[]}
                    onMemoryClick={handleMemoryClick}
                    selectedMemoryId={selectedMemory?.id}
                    onMapLoad={handleMapLoad}
                />
                
                {/* 지도 위에 떠있는 컨트롤 버튼들 */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                    <button className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition">
                        <PaperPlaneIcon className="w-6 h-6 text-gray-600 -rotate-45" />
                    </button>
                    <button 
                        onClick={() => setIsSafeZoneModalOpen(true)}
                        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition"
                    >
                        <LocationPinIcon className="w-6 h-6 text-[#70c18c]" />
                    </button>
                </div>

                {/* 현재 위치 정보 카드 - 지도 위에 오버레이 */}
                <div className="absolute top-4 left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-10 max-w-xs">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                            <LocationPinIcon className="w-5 h-5 text-gray-500" />
                            <h3 className="text-sm font-bold text-gray-800">현재 위치</h3>
                        </div>
                        <span className="px-2 py-1 text-xs font-bold text-white bg-[#70c18c] rounded-full">SAFE ZONE</span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                            <RocketIcon className="w-4 h-4 text-red-500" />
                            <span>대구광역시 남구 명덕로 104</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4 text-gray-400" />
                            <span>마지막 업데이트 : 10분 전</span>
                        </div>
                    </div>
                </div>

                {/* 안전구역 정보 카드 - 지도 하단에 오버레이 */}
                <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 z-10">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-gray-800">안심구역 설정</h3>
                        <button 
                            onClick={() => setIsSafeZoneModalOpen(true)}
                            className="px-3 py-1 text-xs font-semibold border border-gray-300 rounded-full hover:bg-gray-100 transition"
                        >
                            편집
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="bg-white border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                            <LocationPinIcon className="w-4 h-4 text-gray-600"/>
                            <span className="text-gray-700">반경: <span className="font-bold">{safeZone.radius}m</span></span>
                        </div>
                        <div className="bg-white border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                            <PaperPlaneIcon className="w-4 h-4 text-gray-600"/>
                            <span className="text-gray-700">중심: {safeZone.center.lat.toFixed(3)}, {safeZone.center.lng.toFixed(3)}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Safe Zone Modal */}
            <SafeZoneModal
                isOpen={isSafeZoneModalOpen}
                onClose={() => setIsSafeZoneModalOpen(false)}
                onSave={handleSafeZoneSave}
                currentCenter={safeZone.center}
                currentRadius={safeZone.radius}
            />
        </div>
    );
};

export default MapScreen;
