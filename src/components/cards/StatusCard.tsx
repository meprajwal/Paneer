import React from 'react';
import { SensorData } from '../../types';
import LineChart from '../charts/LineChart';
import { Power } from 'lucide-react';

interface StatusCardProps {
  sensor: SensorData;
  timeRange: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ 
  sensor, 
  timeRange,
  className = '' 
}) => {
  const isActive = sensor.value > 0.5;
  const statusColor = isActive ? 'bg-green-500' : 'bg-red-500';
  const statusText = isActive ? 'ON' : 'OFF';
  const chartColor = '#22C55E';
  
  return (
    <div className={`rounded-xl shadow-lg ${className} transition-all duration-300 hover:shadow-xl overflow-hidden`}>
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{sensor.name}</h2>
          <div className="flex items-center space-x-2">
            <Power className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="px-6">
        <div className={`flex items-center justify-center h-24 rounded-xl ${statusColor} bg-opacity-10 border-2 ${statusColor.replace('bg-', 'border-')} mb-6`}>
          <span className={`text-3xl font-bold ${statusColor.replace('bg-', 'text-')}`}>
            {statusText}
          </span>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <div className="h-48">
          <LineChart 
            data={sensor.data.map(point => ({
              ...point,
              value: point.value > 0.5 ? 1 : 0
            }))} 
            color={chartColor}
            timeRange={timeRange}
            isStepChart={true}
            valueFormatter={(value) => value > 0.5 ? 'ON' : 'OFF'}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusCard;