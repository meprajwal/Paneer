import React from 'react';
import { SensorData } from '../../types';
import { getStatusColor, getTrendIcon, getTrendColor, truncateValue } from '../../utils/helpers';
import LineChart from '../charts/LineChart';

interface LevelCardProps {
  sensor: SensorData;
  timeRange: string;
  className?: string;
  label?: string;
  color?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ 
  sensor, 
  timeRange,
  className = '',
  label = 'Level',
  color = '#3B82F6'
}) => {
  const percentage = sensor.value;
  const height = `${percentage}%`;
  
  return (
    <div className={`rounded-xl shadow-lg p-6 ${className} transition-all duration-300 hover:shadow-xl`}>
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold">{sensor.name}</h2>
        <div className="flex items-center space-x-3">
          <span className={`text-base font-medium ${getTrendColor(sensor.trend)}`}>
            {getTrendIcon(sensor.trend)}
          </span>
          <span className={`text-sm font-medium rounded-full px-3 py-1 ${getStatusColor(sensor.status)}`}>
            {sensor.status}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="flex items-center justify-center">
          <div className="relative h-48 w-24 border-2 border-gray-300 rounded-xl overflow-hidden">
            <div 
              className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out" 
              style={{ 
                height, 
                backgroundColor: color 
              }} 
            />
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
              {Math.round(percentage)}%
            </div>
          </div>
        </div>
        
        <div className="h-48">
          <LineChart 
            data={sensor.data} 
            color={color}
            timeRange={timeRange}
          />
        </div>
      </div>
    </div>
  );
};

export default LevelCard