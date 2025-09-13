import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface Memory {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    name: string;
    address: string;
    description?: string;
  };
  imageUrl: string;
  imageName?: string;
  imageSize?: number;
  date: string;
  createdAt: string;
  tags: string[];
}

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  loadMemories: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};

interface MemoryProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'zogakzogak_memories';
const MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB 제한

// 빈 배열로 시작
const defaultMemories: Memory[] = [];

// 이미지 압축 함수
const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // 이미지 크기 계산 (비율 유지)
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // 이미지 그리기
      ctx?.drawImage(img, 0, 0, width, height);
      
      // 압축된 이미지를 Base64로 변환
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };
    
    img.onerror = () => reject(new Error('이미지 로드 실패'));
    img.src = URL.createObjectURL(file);
  });
};

// 로컬 스토리지 용량 체크
const checkStorageQuota = (): boolean => {
  try {
    const testKey = 'storage_test';
    const testData = 'x'.repeat(1024); // 1KB 테스트 데이터
    
    localStorage.setItem(testKey, testData);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// 오래된 추억 정리 (용량 절약)
const cleanupOldMemories = (memories: Memory[]): Memory[] => {
  // 최신 50개만 유지
  const sortedMemories = memories.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return sortedMemories.slice(0, 50);
};

// 로컬 스토리지에서 추억 데이터 로드
const loadMemoriesFromStorage = (): Memory[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : defaultMemories;
    }
  } catch (error) {
    console.error('로컬 스토리지에서 추억 데이터를 로드하는 중 오류:', error);
  }
  return defaultMemories;
};

// 로컬 스토리지에 추억 데이터 저장
const saveMemoriesToStorage = (memories: Memory[]) => {
  try {
    // 용량 체크
    if (!checkStorageQuota()) {
      console.warn('⚠️ 로컬 스토리지 용량 부족 - 오래된 추억 정리 중...');
      const cleanedMemories = cleanupOldMemories(memories);
      console.log(`🧹 정리 전: ${memories.length}개, 정리 후: ${cleanedMemories.length}개`);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedMemories));
        console.log('✅ 정리 후 저장 성공');
        return;
      } catch (error) {
        console.error('❌ 정리 후에도 저장 실패:', error);
        // 최후의 수단: 모든 데이터 삭제
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ 모든 추억 데이터 삭제됨');
        return;
      }
    }
    
    const dataToStore = JSON.stringify(memories);
    const dataSize = new Blob([dataToStore]).size;
    
    if (dataSize > MAX_STORAGE_SIZE) {
      console.warn(`⚠️ 데이터 크기 초과: ${(dataSize / 1024 / 1024).toFixed(2)}MB`);
      const cleanedMemories = cleanupOldMemories(memories);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedMemories));
      console.log('🧹 오래된 추억 정리 후 저장 완료');
    } else {
      localStorage.setItem(STORAGE_KEY, dataToStore);
      console.log(`✅ 저장 완료: ${(dataSize / 1024).toFixed(2)}KB`);
    }
  } catch (error) {
    console.error('로컬 스토리지에 추억 데이터를 저장하는 중 오류:', error);
    
    // QuotaExceededError 처리
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('⚠️ 저장소 용량 초과 - 오래된 추억 정리 중...');
      const cleanedMemories = cleanupOldMemories(memories);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedMemories));
        console.log('✅ 정리 후 저장 성공');
      } catch (retryError) {
        console.error('❌ 정리 후에도 저장 실패:', retryError);
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ 모든 추억 데이터 삭제됨');
      }
    }
  }
};

export const MemoryProvider: React.FC<MemoryProviderProps> = ({ children }) => {
  const [memories, setMemories] = useState<Memory[]>([]);

  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    console.log("🚀 MemoryProvider 마운트 - 데이터 로드 시작");
    const loadedMemories = loadMemoriesFromStorage();
    console.log("📊 초기 로드된 추억 개수:", loadedMemories.length);
    setMemories(loadedMemories);
  }, []);

  // 페이지 포커스 시 데이터 새로고침 (역할 전환 시 중요)
  useEffect(() => {
    const handleFocus = () => {
      console.log("🔄 페이지 포커스 - 추억 데이터 새로고침");
      const loadedMemories = loadMemoriesFromStorage();
      console.log("📊 포커스 후 로드된 추억 개수:", loadedMemories.length);
      setMemories(loadedMemories);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("🔄 페이지 가시성 변경 - 추억 데이터 새로고침");
        const loadedMemories = loadMemoriesFromStorage();
        console.log("📊 가시성 변경 후 로드된 추억 개수:", loadedMemories.length);
        setMemories(loadedMemories);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>) => {
    console.log("📝 addMemory called with:", memory);
    
    // 필수 필드 검증
    if (!memory.title || !memory.imageUrl || !memory.location) {
      console.error("❌ 필수 필드가 누락되었습니다:", { title: memory.title, imageUrl: memory.imageUrl, location: memory.location });
      return;
    }
    
    const newMemory: Memory = {
      ...memory,
      id: `memory_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      tags: memory.tags || [], // tags가 없으면 빈 배열로 설정
    };
    
    console.log("📝 New memory created:", newMemory);
    
    setMemories(prev => {
      console.log("📝 Previous memories count:", prev.length);
      
      // 중복 체크 (같은 ID가 이미 있는지 확인)
      const existingMemory = prev.find(m => m.id === newMemory.id);
      if (existingMemory) {
        console.warn("⚠️ 중복된 추억 ID 발견, 추가를 건너뜁니다:", newMemory.id);
        return prev;
      }
      
      const updated = [newMemory, ...prev];
      console.log("📝 Updated memories count:", updated.length);
      
      // 로컬 스토리지에 저장
      try {
        saveMemoriesToStorage(updated);
        console.log("✅ Memories saved to storage successfully");
      } catch (error) {
        console.error("❌ Error saving to storage:", error);
        alert("추억 저장 중 오류가 발생했습니다. 저장소 용량을 확인해주세요.");
        return prev; // 저장 실패 시 이전 상태 유지
      }
      
      return updated;
    });
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev => {
      const updated = prev.map(memory => 
        memory.id === id ? { ...memory, ...updates } : memory
      );
      saveMemoriesToStorage(updated);
      return updated;
    });
  };

  const deleteMemory = (id: string) => {
    console.log("🗑️ deleteMemory called with id:", id);
    
    setMemories(prev => {
      console.log("📝 Previous memories count:", prev.length);
      const updated = prev.filter(memory => memory.id !== id);
      console.log("📝 After deletion count:", updated.length);
      
      try {
        saveMemoriesToStorage(updated);
        console.log("✅ Memory deleted and saved to storage");
      } catch (error) {
        console.error("❌ Error saving after deletion:", error);
        return prev; // 삭제 실패 시 이전 상태 유지
      }
      
      return updated;
    });
  };

  const loadMemories = useCallback(() => {
    console.log("🔄 loadMemories 호출됨");
    const loadedMemories = loadMemoriesFromStorage();
    console.log("📊 로드된 추억 개수:", loadedMemories.length);
    setMemories(loadedMemories);
  }, []);

  return (
    <MemoryContext.Provider value={{ memories, addMemory, updateMemory, deleteMemory, loadMemories }}>
      {children}
    </MemoryContext.Provider>
  );
};