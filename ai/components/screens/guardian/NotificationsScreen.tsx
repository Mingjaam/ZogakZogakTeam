import React from 'react';
import BellIcon from '../../icons/BellIcon';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import ClockIcon from '../../icons/ClockIcon';
import WarningIcon from '../../icons/WarningIcon';

interface NotificationsScreenProps {
  onBack?: () => void;
}

type NotificationItemProps = { type: 'safe' | 'warning', message: string, time: string };

const NotificationItem = ({ type, message, time }: NotificationItemProps) => {
    const isSafe = type === 'safe';
    const bgColor = isSafe ? 'bg-lime-50' : 'bg-orange-50';
    const borderColor = isSafe ? 'border-lime-200' : 'border-orange-200';
    const icon = isSafe 
        ? <CheckCircleIcon className="w-7 h-7 text-green-500" /> 
        : <WarningIcon className="w-7 h-7 text-orange-500" />;

    return (
        <div className={`p-4 rounded-2xl border ${borderColor} ${bgColor} flex items-start gap-4`}>
            {icon}
            <div>
                <p className="font-semibold text-gray-800">{message}</p>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>마지막 업데이트 : {time}</span>
                </div>
            </div>
        </div>
    );
};


const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
    const notifications: NotificationItemProps[] = [
        { type: 'safe', message: '안전지대로 돌아왔습니다', time: '10분 전' },
        { type: 'warning', message: '안전지대를 벗어났습니다', time: '50분 전' },
        { type: 'safe', message: '안전지대로 돌아왔습니다', time: '10분 전' },
        { type: 'safe', message: '안전지대로 돌아왔습니다', time: '10분 전' },
        { type: 'safe', message: '안전지대로 돌아왔습니다', time: '10분 전' },
        { type: 'warning', message: '안전지대를 벗어났습니다', time: '10분 전' },
    ];

    return (
        <div className="p-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <BellIcon className="w-6 h-6 text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">알림</h2>
                    </div>
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            뒤로가기
                        </button>
                    )}
                </div>
                <div className="space-y-4">
                    {notifications.map((item, index) => (
                        <NotificationItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationsScreen;
