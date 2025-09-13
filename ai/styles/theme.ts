// 조각조각 앱 테마 색상 상수

export const colors = {
  // 메인 브랜드 컬러
  primary: {
    50: '#f0f9f4',
    100: '#dcf2e4',
    200: '#bce5cd',
    300: '#8dd1a8',
    400: '#56b67c',
    500: '#70c18c', // 메인 브랜드 컬러
    600: '#4a9d6a',
    700: '#3a7d54',
    800: '#2f6445',
    900: '#285239',
  },
  
  // 보조 컬러
  secondary: {
    50: '#fef7ee',
    100: '#fdedd6',
    200: '#fad7ac',
    300: '#f6ba77',
    400: '#f19440',
    500: '#ed7a1a',
    600: '#de5f10',
    700: '#b8480f',
    800: '#933814',
    900: '#762f13',
  },
  
  // 노인 친화적 색상
  elderly: {
    warm: '#f9f8f4', // 배경색
    soft: '#e8e5d8', // 부드러운 회색
    gentle: '#d4c5a9', // 온화한 베이지
  },
  
  // 상태별 색상
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // 중성 색상
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // 텍스트 색상
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
  },
  
  // 배경 색상
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // 테두리 색상
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
} as const;

// 컴포넌트별 색상 매핑
export const componentColors = {
  // 버튼 색상
  button: {
    primary: {
      bg: colors.primary[500],
      text: colors.text.inverse,
      hover: colors.primary[600],
      active: colors.primary[700],
    },
    secondary: {
      bg: colors.secondary[500],
      text: colors.text.inverse,
      hover: colors.secondary[600],
      active: colors.secondary[700],
    },
    outline: {
      bg: 'transparent',
      text: colors.primary[500],
      border: colors.primary[500],
      hover: colors.primary[50],
    },
  },
  
  // 카드 색상
  card: {
    bg: colors.background.primary,
    border: colors.border.light,
    shadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  
  // 입력 필드 색상
  input: {
    bg: colors.background.primary,
    border: colors.border.medium,
    focus: colors.primary[500],
    placeholder: colors.text.tertiary,
  },
  
  // 헤더 색상
  header: {
    bg: colors.background.primary,
    text: colors.text.primary,
    border: colors.border.light,
  },
  
  // 네비게이션 색상
  navigation: {
    bg: colors.background.primary,
    active: colors.primary[500],
    inactive: colors.text.tertiary,
    border: colors.border.light,
  },
} as const;

// Tailwind CSS 클래스 매핑
export const tailwindClasses = {
  // 텍스트 색상
  textPrimary: 'text-gray-800',
  textSecondary: 'text-gray-600',
  textTertiary: 'text-gray-400',
  textInverse: 'text-white',
  
  // 배경 색상
  bgPrimary: 'bg-white',
  bgSecondary: 'bg-gray-50',
  bgTertiary: 'bg-gray-100',
  bgElderly: 'bg-[#f9f8f4]',
  
  // 브랜드 색상
  textBrand: 'text-[#70c18c]',
  bgBrand: 'bg-[#70c18c]',
  borderBrand: 'border-[#70c18c]',
  
  // 상태 색상
  textSuccess: 'text-green-600',
  textWarning: 'text-yellow-600',
  textError: 'text-red-600',
  textInfo: 'text-blue-600',
  
  bgSuccess: 'bg-green-600',
  bgWarning: 'bg-yellow-600',
  bgError: 'bg-red-600',
  bgInfo: 'bg-blue-600',
} as const;

// 타입 정의
export type ColorKey = keyof typeof colors;
export type ComponentColorKey = keyof typeof componentColors;
export type TailwindClassKey = keyof typeof tailwindClasses;

