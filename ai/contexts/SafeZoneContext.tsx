import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SafeZoneData {
  center: { lat: number; lng: number };
  radius: number;
}

interface SafeZoneContextType {
  safeZone: SafeZoneData;
  updateSafeZone: (center: { lat: number; lng: number }, radius: number) => void;
}

const SafeZoneContext = createContext<SafeZoneContextType | undefined>(undefined);

interface SafeZoneProviderProps {
  children: ReactNode;
}

export const SafeZoneProvider: React.FC<SafeZoneProviderProps> = ({ children }) => {
  const [safeZone, setSafeZone] = useState<SafeZoneData>({
    center: { lat: 35.8714, lng: 128.6014 },
    radius: 500
  });

  const updateSafeZone = (center: { lat: number; lng: number }, radius: number) => {
    setSafeZone({ center, radius });
  };

  return (
    <SafeZoneContext.Provider value={{ safeZone, updateSafeZone }}>
      {children}
    </SafeZoneContext.Provider>
  );
};

export const useSafeZone = () => {
  const context = useContext(SafeZoneContext);
  if (context === undefined) {
    throw new Error('useSafeZone must be used within a SafeZoneProvider');
  }
  return context;
};
