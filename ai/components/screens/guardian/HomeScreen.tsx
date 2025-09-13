import React, { useState, useRef } from 'react';
import GoogleMap from '../../GoogleMap';
import { useSafeZone } from '../../../contexts/SafeZoneContext';
import { useDiary } from '../../../contexts/DiaryContext';
import { EmotionType } from '../../../lib/ai';
import PhoneIcon from '../../icons/PhoneIcon';
import LocationPinIcon from '../../icons/LocationPinIcon';
import PillIcon from '../../icons/PillIcon';
import CheckIcon from '../../icons/CheckIcon';
import WarningIcon from '../../icons/WarningIcon';
import EmotionCharacter from '../../icons/EmotionCharacter';

// Google Maps 타입 정의
declare global {
  interface Window {
    google: any;
    googleMapsApiLoaded: boolean;
  }
  namespace google {
    namespace maps {
      class Map {
        constructor(element: HTMLElement, options?: any);
        panTo(latLng: { lat: number; lng: number }): void;
        setZoom(zoom: number): void;
      }
      class Circle {
        constructor(options?: any);
        setMap(map: Map | null): void;
        setCenter(center: { lat: number; lng: number }): void;
        setRadius(radius: number): void;
      }
      class Marker {
        constructor(options?: any);
        setMap(map: Map | null): void;
        setPosition(position: { lat: number; lng: number }): void;
      }
    }
  }
}

const HomeScreen: React.FC = () => {
    
    // SafeZoneContext에서 안전구역 정보 가져오기
    const { safeZone } = useSafeZone();
    
    // DiaryContext에서 일기 정보 가져오기
    const { diaries } = useDiary();
    
    // 어르신이 작성한 일기만 필터링 (최신순)
    const elderlyDiaries = diaries.filter(diary => diary.author === 'elderly').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // 오늘의 기분 계산 (가장 최근 일기의 가장 높은 점수 감정)
    const getTodayEmotion = (): EmotionType => {
        if (elderlyDiaries.length === 0) return 'joy';
        
        const todayDiary = elderlyDiaries[0]; // 가장 최근 일기
        const scores = todayDiary.emotionScores;
        
        // 가장 높은 점수의 감정 찾기
        const emotions: EmotionType[] = ['joy', 'happiness', 'surprise', 'sadness', 'anger', 'fear'];
        return emotions.reduce((prev, current) => 
            scores[current] > scores[prev] ? current : prev
        );
    };
    
    const todayEmotion = getTodayEmotion();
    const [elderlyLocation] = useState({ lat: 35.8720, lng: 128.6020 }); // 어르신 현재 위치
    const [isInSafeZone, setIsInSafeZone] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const mapRef = useRef<google.maps.Map | null>(null);
    const circleRef = useRef<google.maps.Circle | null>(null);
    const elderlyMarkerRef = useRef<google.maps.Marker | null>(null);

    // 거리 계산 함수 (하버사인 공식)
    const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const R = 6371e3; // 지구 반지름 (미터)
        const φ1 = lat1 * Math.PI/180;
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lng2-lng1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c; // 미터 단위
    };

    // 안전구역 내부 여부 확인
    React.useEffect(() => {
        const distance = calculateDistance(
            elderlyLocation.lat, elderlyLocation.lng,
            safeZone.center.lat, safeZone.center.lng
        );
        setIsInSafeZone(distance <= safeZone.radius);
    }, [elderlyLocation, safeZone.center, safeZone.radius]);

    // 현재 시간 업데이트 (1분마다)
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 1분마다 업데이트

        return () => clearInterval(timer);
    }, []);

    const handleMapLoad = (map: google.maps.Map) => {
        mapRef.current = map;
        
        // 안전구역 원형 표시
        if (circleRef.current) {
            circleRef.current.setMap(null);
        }
        
        circleRef.current = new google.maps.Circle({
            center: safeZone.center,
            radius: safeZone.radius,
            strokeColor: isInSafeZone ? '#70c18c' : '#ff6b6b',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: isInSafeZone ? '#70c18c' : '#ff6b6b',
            fillOpacity: 0.2,
            map: map
        });

        // 어르신 현재 위치 마커
        if (elderlyMarkerRef.current) {
            elderlyMarkerRef.current.setMap(null);
        }
        
        elderlyMarkerRef.current = new google.maps.Marker({
            position: elderlyLocation,
            map: map,
            title: '어르신 현재 위치',
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="14" fill="${isInSafeZone ? '#70c18c' : '#ff6b6b'}" stroke="white" stroke-width="3"/>
                    <circle cx="16" cy="16" r="6" fill="white"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
            }
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
                anchor: new google.maps.Point(16, 32), // 집의 바닥 중앙이 위치에 맞춰지도록
            }
        });
    };
    
    return (
        <div className="p-4 space-y-6">
            {/* User Status Card */}
            <div className="bg-white p-5 rounded-3xl shadow-md">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">박길수 님의 상태</h2>
                        <p className="text-gray-500 mt-1">65세 | 여 | 010-1234-5647</p>
                        <p className="text-gray-500 mt-1">현재 위치: 대구광역시 남구 명덕로 104</p>
                    </div>
                    <a 
                        href="tel:01037177644" 
                        className="bg-green-500 text-white rounded-full p-3 shadow-lg hover:bg-green-600 transition inline-block"
                    >
                        <PhoneIcon className="w-6 h-6" />
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className={`${isInSafeZone ? 'bg-[#e9f5ec]' : 'bg-red-50'} rounded-2xl p-4 flex flex-col items-center justify-center text-center`}>
                        <div className="relative">
                            <LocationPinIcon className={`w-12 h-12 ${isInSafeZone ? 'text-[#70c18c]' : 'text-red-500'}`} />
                             <span className="absolute top-0 right-[-10px] text-xs font-bold bg-white text-gray-600 px-1.5 py-0.5 rounded-full shadow">
                                {currentTime.toLocaleTimeString('ko-KR', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    hour12: false 
                                })}
                             </span>
                        </div>
                        <span className={`font-bold text-lg mt-2 ${isInSafeZone ? 'text-[#3e8e5a]' : 'text-red-600'}`}>
                            {isInSafeZone ? 'SAFE ZONE' : 'OUT OF ZONE'}
                        </span>
                        {!isInSafeZone && (
                            <div className="flex items-center gap-1 mt-1">
                                <WarningIcon className="w-4 h-4 text-red-500" />
                                <span className="text-xs text-red-600">주의 필요</span>
                            </div>
                        )}
                    </div>
                    <div className="bg-[#e9f5ec] rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                        <PillIcon className="w-12 h-12 text-[#f5a623]" />
                        <div className="flex gap-2 mt-2">
                           <CheckIcon className="w-5 h-5 text-green-500 bg-white rounded-full p-0.5" />
                           <CheckIcon className="w-5 h-5 text-green-500 bg-white rounded-full p-0.5" />
                           <CheckIcon className="w-5 h-5 text-green-500 bg-white rounded-full p-0.5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 오늘의 기분 섹션 */}
            <div className="bg-white p-5 rounded-3xl shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-800">오늘의 기분</h2>
                    <div className="text-sm text-gray-500">
                        {elderlyDiaries.length > 0 ? elderlyDiaries[0].date : '일기 없음'}
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                        <EmotionCharacter emotion={todayEmotion} size="lg" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-gray-800">
                                {todayEmotion === 'joy' ? '기뻐요' : 
                                 todayEmotion === 'happiness' ? '행복함' :
                                 todayEmotion === 'surprise' ? '놀라움' :
                                 todayEmotion === 'sadness' ? '슬퍼요' :
                                 todayEmotion === 'anger' ? '화나요' : '두려워요'}
                            </span>
                            {elderlyDiaries.length > 0 && (
                                <span className="text-sm text-gray-500">
                                    ({elderlyDiaries[0].emotionScores[todayEmotion]}%)
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            {elderlyDiaries.length > 0 
                                ? '어르신의 감정 상태입니다'
                                : '아직 작성된 일기가 없습니다'
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* 안전구역 지도 섹션 */}
            <div className="bg-white p-5 rounded-3xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">실시간 위치 확인</h2>
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${isInSafeZone ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-sm font-medium ${isInSafeZone ? 'text-green-600' : 'text-red-600'}`}>
                            {isInSafeZone ? '안전구역 내' : '안전구역 외'}
                        </span>
                    </div>
                </div>
                
                <div className="h-64 rounded-2xl overflow-hidden border border-gray-200">
                    <GoogleMap
                        center={safeZone.center}
                        zoom={15}
                        className="w-full h-full"
                        memories={[]}
                        onMapLoad={handleMapLoad}
                    />
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="font-medium text-gray-700">안전구역</span>
                        </div>
                        <p className="text-gray-500">반경: {safeZone.radius}m</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <div className={`w-3 h-3 rounded-full ${isInSafeZone ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="font-medium text-gray-700">어르신 위치</span>
                        </div>
                        <p className="text-gray-500">
                            {calculateDistance(
                                elderlyLocation.lat, elderlyLocation.lng,
                                safeZone.center.lat, safeZone.center.lng
                            ).toFixed(0)}m
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomeScreen;
