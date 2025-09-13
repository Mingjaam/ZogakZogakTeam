import React, { useEffect, useRef, useState } from 'react';
import { Memory } from '../types/memory';

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
        addListener(event: string, handler: (event: any) => void): void;
      }
      class Marker {
        constructor(options?: any);
        setMap(map: Map | null): void;
        addListener(event: string, handler: () => void): void;
      }
      namespace Animation {
        const DROP: any;
      }
      namespace MapTypeId {
        const ROADMAP: any;
      }
      class Size {
        constructor(width: number, height: number);
      }
      class Point {
        constructor(x: number, y: number);
      }
    }
  }
}

// 지도 스타일 정의
const mapStyles = [
  { "id": "infrastructure.railwayTrack.commercial", "geometry": { "fillOpacity": 1, "fillColor": "#FF0000" } },
  { "id": "pointOfInterest.other.cemetery", "geometry": { "fillOpacity": 1, "fillColor": "#FF0000" } },
  { "id": "pointOfInterest.other.military", "label": { "pinFillColor": "#FF0000" } },
  { "id": "pointOfInterest.service.gasStation", "label": { "pinFillColor": "#FF0000" } },
  { "id": "pointOfInterest.service.parkingLot", "geometry": { "fillOpacity": 1, "fillColor": "#FF0000" } },
  { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] },
  { "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e6" }] },
  { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] },
  { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] },
  { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] },
  { "featureType": "administrative.neighborhood", "stylers": [{ "visibility": "off" }] },
  { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817c" }] },
  { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#447530" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e6" }] },
  { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#fdfcf8" }] },
  { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#e9bc62" }] },
  { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#e98d58" }] },
  { "featureType": "road.highway.controlled_access", "elementType": "geometry.stroke", "stylers": [{ "color": "#db8555" }] },
  { "featureType": "road.local", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#806b63" }] },
  { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
  { "featureType": "transit.line", "elementType": "labels.text.fill", "stylers": [{ "color": "#8f7d77" }] },
  { "featureType": "transit.line", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ebe3cd" }] },
  { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
  { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#92998d" }] },
  { "featureType": "all", "elementType": "geometry.fill", "stylers": [{ "weight": "2.00" }] },

];


interface GoogleMapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  memories?: Memory[];
  onMemoryClick?: (memory: Memory) => void;
  selectedMemoryId?: string;
  onMapLoad?: (map: google.maps.Map) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ 
  center = { lat: 35.8714, lng: 128.6014 }, // 대구 중심
  zoom = 15,
  className = "w-full h-full",
  memories = [],
  onMemoryClick,
  selectedMemoryId,
  onMapLoad,
  onMapClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || mapInstanceRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        gestureHandling: 'cooperative',
        // 커스텀 지도 스타일 적용
        styles: mapStyles
      });

      // 지도 클릭 이벤트 추가
      if (onMapClick) {
        map.addListener('click', (event: any) => {
          const lat = event.latLng.lat();
          const lng = event.latLng.lng();
          onMapClick(lat, lng);
        });
      }

      // 현재 위치 마커 추가
      new google.maps.Marker({
        position: center,
        map,
        title: '현재 위치',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#3e8e5a" stroke="white" stroke-width="2"/>
              <circle cx="12" cy="12" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
        }
      });

      mapInstanceRef.current = map;
      setIsMapLoaded(true);
      
      if (onMapLoad) {
        onMapLoad(map);
      }
    };

    // Google Maps API 로드 확인
    if (window.google && window.google.maps) {
      initMap();
    } else if (window.googleMapsApiLoaded) {
      initMap();
    } else {
      // API 로드 이벤트 대기
      const handleApiLoaded = () => {
        initMap();
      };
      
      window.addEventListener('googleMapsApiLoaded', handleApiLoaded);
      
      return () => {
        window.removeEventListener('googleMapsApiLoaded', handleApiLoaded);
      };
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom]);

  // 메모리 마커들 추가
  useEffect(() => {
    if (!mapInstanceRef.current || !memories.length || !isMapLoaded) return;

    // 기존 마커들 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 새 마커들 추가
    memories.forEach(memory => {
      // 둥근 정사각형 프레임 안에 사진 썸네일을 핀으로 사용
      const marker = new google.maps.Marker({
        position: { lat: memory.location.lat, lng: memory.location.lng },
        map: mapInstanceRef.current,
        title: memory.title,
        // 드롭 애니메이션 제거
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="rounded-square">
                  <rect x="10" y="10" width="60" height="60" rx="12" ry="12"/>
                </clipPath>
              </defs>
              <!-- 흰색 배경 -->
              <rect x="10" y="10" width="60" height="60" rx="12" ry="12" fill="white" stroke="#e5e7eb" stroke-width="2"/>
              <!-- 사진 -->
              <image href="${memory.imageUrl}" x="10" y="10" width="60" height="60" clip-path="url(#rounded-square)"/>
              <!-- 선택된 경우 노란색 테두리 -->
              ${selectedMemoryId === memory.id ? '<rect x="8" y="8" width="64" height="64" rx="14" ry="14" fill="none" stroke="#f59e0b" stroke-width="3"/>' : ''}
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(80, 80),
          anchor: new google.maps.Point(40, 80), // 핀의 하단 중앙이 위치에 맞춰지도록
        }
      });

      if (onMemoryClick) {
        marker.addListener('click', () => {
          onMemoryClick(memory);
        });
      }

      markersRef.current.push(marker);
    });
  }, [memories, onMemoryClick, selectedMemoryId, isMapLoaded]);

  // 선택된 마커가 변경될 때 지도 중앙으로 부드럽게 이동
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedMemoryId || !isMapLoaded) return;

    const selectedMemory = memories.find(memory => memory.id === selectedMemoryId);
    if (selectedMemory && mapInstanceRef.current) {
      const targetPosition = {
        lat: selectedMemory.location.lat,
        lng: selectedMemory.location.lng
      };
      
      // 부드러운 카메라 이동을 위해 panTo 사용 (Google Maps의 기본 애니메이션)
      mapInstanceRef.current.panTo(targetPosition);
      
      // 줌 레벨을 부드럽게 조정
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setZoom(16);
        }
      }, 300);
    }
  }, [selectedMemoryId, memories, isMapLoaded]);

  return (
    <div className={className}>
      {!isMapLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3e8e5a] mx-auto mb-2"></div>
            <p className="text-gray-600">지도 로딩 중...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className={`w-full h-full ${isMapLoaded ? 'block' : 'hidden'}`} />
    </div>
  );
};

export default GoogleMap;
