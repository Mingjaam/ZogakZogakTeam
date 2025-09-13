import React from 'react';

const CameraIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M52.6 15.7h-9.9l-4.2-5.9H25.5l-4.2 5.9h-9.9c-2.3 0-4.3 1.9-4.3 4.3v27.2c0 2.3 1.9 4.3 4.3 4.3h41.2c2.3 0 4.3-1.9 4.3-4.3V20c0-2.4-1.9-4.3-4.3-4.3z" fill="#a8d5b8"/>
        <circle cx="32" cy="34.4" r="9.9" fill="#3e8e5a"/>
        <path d="M42.3 15.7h-5.7l-4.2-5.9H27.6l-4.2 5.9h-5.7c-.5 0-1 .4-1 1s.4 1 1 1h5.7l4.2-5.9h5.7l4.2 5.9h5.7c.5 0 1-.4 1-1s-.5-1-1-1z" fill="#3e8e5a"/>
    </svg>
);

export default CameraIcon;
