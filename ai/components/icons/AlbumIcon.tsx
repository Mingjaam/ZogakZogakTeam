import React from 'react';

const AlbumIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M52.3 9.8H11.7C8 9.8 5 12.8 5 16.5v31.1c0 3.7 3 6.7 6.7 6.7h40.6c3.7 0 6.7-3 6.7-6.7V16.5c0-3.7-3-6.7-6.7-6.7z" fill="#a8d5b8"/>
        <path d="M19.1 33.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z" fill="#3e8e5a"/>
        <path d="M52.3 46.8H11.7c-.5 0-1-.4-1-1V33.4l8.3-9.9c.4-.5 1.1-.5 1.5 0l11.1 13.2 8-8c.4-.4 1-.4 1.4 0l10.4 10.4v6.7c-.1.5-.5.9-1.1.9z" fill="#3e8e5a"/>
    </svg>
);

export default AlbumIcon;
