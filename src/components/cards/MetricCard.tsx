import React from 'react';
import { SensorData } from '../../types';
import { getStatusColor, getTrendIcon, getTrendColor, truncateValue } from '../../utils/helpers';
import LineChart from '../charts/LineChart';

interface MetricCardProps {
  sensor: SensorData;
  timeRange: string;
  className?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  sensor, 
  timeRange,
  className = '', 
  color = '#3B82F6' 
}) => {
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
      
      <div className="flex items-baseline mt-4 mb-8">
        <div className="text-5xl font-bold tracking-tight">
          {truncateValue(sensor.value)}
          <span className="text-xl ml-2 opacity-70">{sensor.unit}</span>
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
  );
};

export default MetricCard