import React from 'react';

interface PuzzleLogoProps {
  className?: string;
}

const PuzzleLogo: React.FC<PuzzleLogoProps> = ({ className }) => {
  const logoSrc = 'https://i.imgur.com/cYmvfwX.png';
  return <img src={logoSrc} alt="조각조각 로고" className={className} />;
};

export default PuzzleLogo;
