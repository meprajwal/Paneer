import React from 'react';
import { SensorData } from '../../types';
import MetricCard from '../cards/MetricCard';
import TemperatureCard from '../cards/TemperatureCard';
import LevelCard from '../cards/LevelCard';

interface DashboardProps {
  sensors: SensorData[];
  darkMode: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sensors, darkMode }) => {
  const temperatureSensor = sensors.find(s => s.id === 'temp-sensor-1') || {
    id: 'temp-sensor-1',
    name: 'Temperature',
    value: 0,
    unit: '°C',
    status: 'warning',
    trend: 'stable',
    data: []
  };
  
  const milkLevelSensor = sensors.find(s => s.id === 'milk-level-1') || {
    id: 'milk-level-1',
    name: 'Milk Level',
    value: 0,
    unit: '%',
    status: 'warning',
    trend: 'stable',
    data: []
  };
  
  const pressureSensor = sensors.find(s => s.id === 'pressure-sensor-1') || {
    id: 'pressure-sensor-1',
    name: 'Pressure',
    value: 0,
    unit: 'hPa',
    status: 'warning',
    trend: 'stable',
    data: []
  };
  
  const themeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800';
  const cardClass = darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100';
  const disconnectedClass = sensors.length === 0 ? 'opacity-60' : '';
  
  return (
    <main className={`${themeClass} min-h-screen transition-colors duration-300 pt-8`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {sensors.length === 0 && (
          <div className="text-center mb-8">
            <p className="text-gray-500 dark:text-gray-400">
              Waiting for sensor data...
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TemperatureCard 
            sensor={temperatureSensor}
            className={`${cardClass} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${disconnectedClass}`}
            timeRange="6h"
          />
          
          <LevelCard 
            sensor={milkLevelSensor}
            className={`${cardClass} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${disconnectedClass}`}
            label="Milk Level"
            color="#3B82F6"
            timeRange="6h"
          />
          
          <MetricCard 
            sensor={pressureSensor}
            className={`${cardClass} hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${disconnectedClass}`}
            color="#8B5CF6"
            timeRange="6h"
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;