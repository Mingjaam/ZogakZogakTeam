/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 프로젝트 메인 컬러 팔레트
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
        }
      },
      fontFamily: {
        'korean': ['Pretendard', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}

