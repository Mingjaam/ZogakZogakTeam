import React, { useState, useRef, useEffect } from 'react';
import GoogleMap from '../GoogleMap';
import { Memory } from '../../types/memory';
import { useSafeZone } from '../../contexts/SafeZoneContext';

// Google Maps 타입 정의는 GoogleMap 컴포넌트에서 이미 정의되어 있음

interface SafeZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (center: { lat: number; lng: number }, radius: number) => void;
  currentCenter?: { lat: number; lng: number };
  currentRadius?: number;
}

const SafeZoneModal: React.FC<SafeZoneModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentCenter = { lat: 35.8714, lng: 128.6014 },
  currentRadius = 500
}) => {
  const { safeZone, updateSafeZone } = useSafeZone();
  const [center, setCenter] = useState(safeZone.center);
  const [radius, setRadius] = useState(safeZone.radius);
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  // 모달이 열릴 때 현재 안전구역 설정을 반영
  useEffect(() => {
    if (isOpen) {
      setCenter(safeZone.center);
      setRadius(safeZone.radius);
    }
  }, [isOpen, safeZone]);

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    
    // 원형 안심구역 표시
    if (circleRef.current) {
      circleRef.current.setMap(null);
    }
    
    circleRef.current = new google.maps.Circle({
      center: center,
      radius: radius,
      strokeColor: '#70c18c',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#70c18c',
      fillOpacity: 0.2,
      map: map
    });

    // 중앙 마커
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }
    
    markerRef.current = new google.maps.Marker({
      position: center,
      map: map,
      title: '안심구역 중심',
      draggable: true,
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
        anchor: new google.maps.Point(16, 32), // 집의 바닥 중앙이 위치에 맞춰지도록
      }
    });

    // 마커 드래그 이벤트
    markerRef.current.addListener('dragstart', () => {
      setIsDragging(true);
    });

    markerRef.current.addListener('dragend', () => {
      const newCenter = markerRef.current!.getPosition();
      const newLat = newCenter.lat();
      const newLng = newCenter.lng();
      
      setCenter({ lat: newLat, lng: newLng });
      circleRef.current!.setCenter({ lat: newLat, lng: newLng });
      map.panTo({ lat: newLat, lng: newLng });
      
      setIsDragging(false);
    });
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (circleRef.current) {
      circleRef.current.setRadius(newRadius);
    }
  };

  const handleSave = () => {
    updateSafeZone(center, radius);
    onSave(center, radius);
    document.body.style.overflow = '';
    onClose();
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (isDragging) return;
    
    setCenter({ lat, lng });
    
    if (markerRef.current) {
      markerRef.current.setPosition({ lat, lng });
    }
    
    if (circleRef.current) {
      circleRef.current.setCenter({ lat, lng });
    }
    
    if (mapRef.current) {
      mapRef.current.panTo({ lat, lng });
    }
  };

  if (!isOpen) return null;

  // PWA 디버깅
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  console.log('SafeZoneModal rendering:', {
    isOpen,
    isMobile: window.innerWidth < 768,
    isPWA,
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    userAgent: navigator.userAgent,
    displayMode: window.matchMedia('(display-mode: standalone)').matches ? 'standalone' : 'browser'
  });
  
  // PWA에서 강제로 모달 표시
  if (isPWA && isOpen) {
    console.log('PWA 모드에서 모달 강제 표시');
    document.body.style.overflow = 'hidden';
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 sm:p-4 touch-manipulation pwa-modal"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        WebkitOverflowScrolling: 'touch',
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: '4px'
      }}
    >
      <div 
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] sm:max-h-[90vh] flex flex-col mx-2 sm:mx-0 pwa-modal-content"
        style={{
          maxHeight: 'calc(100vh - 8px)',
          width: 'calc(100vw - 8px)',
          maxWidth: '480px',
          minHeight: '400px',
          overflow: 'hidden',
          margin: 0,
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header - 고정 */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0 pwa-modal-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">안심구역 설정</h2>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 transition touch-manipulation"
            >
              <span className="text-gray-600">×</span>
            </button>
          </div>
        </div>

        {/* Content - 스크롤 가능 */}
        <div className="flex-1 overflow-y-auto pwa-modal-body">
          <div className="p-6 space-y-6">
            {/* 지도 */}
            <div className="h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-200">
              <GoogleMap
                center={center}
                zoom={15}
                className="w-full h-full"
                memories={[]}
                onMapLoad={handleMapLoad}
                onMapClick={handleMapClick}
              />
            </div>

            {/* 설정 옵션 */}
            <div className="space-y-6">
              {/* 반경 설정 */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  반경 설정: <span className="text-[#70c18c] font-bold">{radius}m</span>
                </label>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={radius}
                  onChange={(e) => handleRadiusChange(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #70c18c 0%, #70c18c ${((radius - 100) / (2000 - 100)) * 100}%, #e5e7eb ${((radius - 100) / (2000 - 100)) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>100m</span>
                  <span>1000m</span>
                  <span>2000m</span>
                </div>
              </div>

              {/* 좌표 입력 */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">중심 좌표</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      위도 (Latitude)
                    </label>
                    <input
                      type="number"
                      value={center.lat.toFixed(6)}
                      onChange={(e) => setCenter({ ...center, lat: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70c18c] focus:border-transparent"
                      step="0.000001"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      경도 (Longitude)
                    </label>
                    <input
                      type="number"
                      value={center.lng.toFixed(6)}
                      onChange={(e) => setCenter({ ...center, lng: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70c18c] focus:border-transparent"
                      step="0.000001"
                    />
                  </div>
                </div>
              </div>

              {/* 현재 설정 정보 */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-blue-800 mb-2">현재 설정</h3>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>중심 위치:</span>
                    <span className="font-mono">{center.lat.toFixed(4)}, {center.lng.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>반경:</span>
                    <span className="font-bold">{radius}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span>면적:</span>
                    <span className="font-bold">{(Math.PI * radius * radius / 10000).toFixed(1)}ha</span>
                  </div>
                </div>
              </div>

              {/* 사용법 안내 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-lg">
                <h3 className="text-sm font-medium text-gray-800 mb-2">💡 사용법</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• <strong>지도 클릭:</strong> 원하는 위치를 클릭하여 중심점 설정</p>
                  <p>• <strong>마커 드래그:</strong> 집 모양 마커를 드래그하여 정확한 위치 조정</p>
                  <p>• <strong>슬라이더:</strong> 반경을 100m~2000m 범위에서 조정</p>
                  <p>• <strong>좌표 입력:</strong> 정확한 위도/경도 값으로 직접 설정</p>
                </div>
              </div>

              {/* 추가 옵션들 */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">추가 옵션</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">알림 설정</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#70c18c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70c18c]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">자동 업데이트</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#70c18c]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#70c18c]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - 고정 */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 flex-shrink-0 pwa-modal-footer">
          <button
            onClick={handleClose}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 active:bg-gray-300 transition touch-manipulation min-h-[44px]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 text-white bg-[#70c18c] rounded-full hover:bg-[#5aa373] active:bg-[#4a8a5f] transition touch-manipulation min-h-[44px]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeZoneModal;
