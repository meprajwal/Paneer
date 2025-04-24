import { SensorData } from '../types';
import { addHours, addMinutes, subHours, getTime } from 'date-fns';

// Generate random data points for the past n hours
const generateDataPoints = (
  baseValue: number,
  volatility: number,
  hoursBack: number,
  minuteInterval: number
) => {
  const points = [];
  const now = new Date();
  const startTime = subHours(now, hoursBack);
  
  let currentValue = baseValue;
  let currentTime = startTime;
  
  while (currentTime <= now) {
    // Add some random variation
    const change = (Math.random() - 0.5) * volatility;
    currentValue = Math.max(0, currentValue + change);
    
    points.push({
      timestamp: getTime(currentTime),
      value: parseFloat(currentValue.toFixed(2))
    });
    
    currentTime = addMinutes(currentTime, minuteInterval);
  }
  
  return points;
};

// Mock sensor data
export const mockSensors: SensorData[] = [
  {
    id: 'temp-sensor-1',
    name: 'Temperature',
    value: 32.9,
    unit: '°C',
    min: 0,
    max: 50,
    status: 'normal',
    trend: 'up',
    data: generateDataPoints(32.8, 0.2, 6, 15)
  },
  {
    id: 'milk-level-1',
    name: 'Milk Level',
    value: 72,
    unit: '%',
    min: 0,
    max: 100,
    status: 'normal',
    trend: 'down',
    data: generateDataPoints(75, 5, 6, 15)
  },
  {
    id: 'pressure-sensor-1',
    name: 'Pressure',
    value: 1013.2,
    unit: 'hPa',
    min: 950,
    max: 1050,
    status: 'normal',
    trend: 'stable',
    data: generateDataPoints(1013, 0.5, 6, 15)
  },
  {
    id: 'buzzer-status-1',
    name: 'Buzzer Status',
    value: 0,
    unit: '',
    min: 0,
    max: 1,
    status: 'normal',
    data: generateDataPoints(0, 0.3, 6, 15).map(point => ({
      ...point,
      value: point.value > 0.5 ? 1 : 0
    }))
  }
];

export const refreshData = () => {
  return mockSensors.map(sensor => {
    const lastDataPoint = sensor.data[sensor.data.length - 1];
    let newValue;
    
    switch (sensor.id) {
      case 'buzzer-status-1':
        // Buzzer randomly turns on or off occasionally
        newValue = Math.random() > 0.95 ? 1 : 0;
        break;
      case 'milk-level-1':
        // Milk level slowly decreases
        newValue = Math.max(0, lastDataPoint.value - Math.random() * 0.5);
        break;
      default:
        // Other sensors fluctuate around their current value
        const volatility = sensor.id.includes('temp') ? 0.2 : 
                          sensor.id.includes('pressure') ? 0.5 : 3;
        
        const change = (Math.random() - 0.5) * volatility;
        newValue = Math.max(sensor.min || 0, Math.min(sensor.max || 100, lastDataPoint.value + change));
    }
    
    // Update the sensor value and add new data point
    const updatedValue = parseFloat(newValue.toFixed(2));
    const newDataPoint = {
      timestamp: getTime(new Date()),
      value: updatedValue
    };
    
    // Determine trend
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (sensor.data.length > 5) {
      const avgRecent = sensor.data.slice(-5).reduce((sum, dp) => sum + dp.value, 0) / 5;
      if (updatedValue > avgRecent + (sensor.id.includes('temp') ? 0.1 : 1)) {
        trend = 'up';
      } else if (updatedValue < avgRecent - (sensor.id.includes('temp') ? 0.1 : 1)) {
        trend = 'down';
      }
    }
    
    // Determine status based on thresholds
    let status: 'normal' | 'warning' | 'critical' = 'normal';
    if (sensor.id === 'temp-sensor-1') {
      if (updatedValue > 38) status = 'critical';
      else if (updatedValue > 35) status = 'warning';
    } else if (sensor.id === 'milk-level-1') {
      if (updatedValue < 10) status = 'critical';
      else if (updatedValue < 30) status = 'warning';
    }
    
    return {
      ...sensor,
      value: updatedValue,
      trend,
      status,
      data: [...sensor.data.slice(-100), newDataPoint] // Keep last 100 points
    };
  });
};