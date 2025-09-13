import React from 'react';
import BellIcon from '../../icons/BellIcon';
import CheckCircleIcon from '../../icons/CheckCircleIcon';
import ClockIcon from '../../icons/ClockIcon';
import PillIcon from '../../icons/PillIcon';

interface ElderlyNotificationsScreenProps {
  onBack?: () => void;
}

type MedicationNotification = {
    type: 'completed' | 'upcoming';
    timeOfDay: string;
    medicines: string;
    statusText: string;
};

const NotificationItem: React.FC<MedicationNotification> = ({ type, timeOfDay, medicines, statusText }) => {
    const isCompleted = type === 'completed';
    const bgColor = isCompleted ? 'bg-lime-50' : 'bg-blue-50';
    const borderColor = isCompleted ? 'border-lime-200' : 'border-blue-200';
    const icon = isCompleted 
        ? <CheckCircleIcon className="w-7 h-7 text-green-500" /> 
        : <BellIcon className="w-7 h-7 text-blue-500" />;

    return (
        <div className={`p-4 rounded-2xl border ${borderColor} ${bgColor} flex items-start gap-4`}>
            {icon}
            <div>
                <p className="font-bold text-gray-800">{timeOfDay} 약</p>
                <p className="text-gray-600">{medicines}</p>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{statusText}</span>
                </div>
            </div>
        </div>
    );
};

const ElderlyNotificationsScreen: React.FC<ElderlyNotificationsScreenProps> = ({ onBack }) => {
    const notifications: MedicationNotification[] = [
        { type: 'upcoming', timeOfDay: '저녁', medicines: '당뇨약', statusText: '오후 7시 예정' },
        { type: 'upcoming', timeOfDay: '점심', medicines: '혈압약', statusText: '오후 1시 예정' },
        { type: 'completed', timeOfDay: '아침', medicines: '혈압약, 비타민', statusText: '오전 8:05 복용 완료' },
        { type: 'completed', timeOfDay: '어제 저녁', medicines: '당뇨약', statusText: '어제 오후 7:02 복용 완료' },
        { type: 'completed', timeOfDay: '어제 점심', medicines: '혈압약', statusText: '어제 오후 1:00 복용 완료' },
    ];

    return (
        <div className="p-4">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <PillIcon className="w-6 h-6 text-gray-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">약 복용 알림</h2>
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

export default ElderlyNotificationsScreen;
