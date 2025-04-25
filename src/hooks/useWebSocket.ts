import { useState, useEffect } from 'react';
import { SensorData } from '../types/sensor';

const MAX_HISTORY = 20; // Number of data points to keep in history
const CONTAINER_HEIGHT = 40; // Container height in cm

export const useWebSocket = () => {
  const [data, setData] = useState<SensorData>({ 
    temperature: 0, 
    distance: 0, 
    timestamp: Date.now(),
    milkLevel: 0 
  });
  const [isConnected, setIsConnected] = useState(false);
  const [history, setHistory] = useState<SensorData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.48.231:81');

    ws.onopen = () => {
      console.log('Connected to ESP32');
      setIsConnected(true);
    };

    ws.onclose = () => {
      console.log('Disconnected from ESP32');
      setIsConnected(false);
    };

    ws.onmessage = (event) => {
      try {
        const sensorData: Omit<SensorData, 'timestamp' | 'milkLevel'> = JSON.parse(event.data);
        const milkLevel = Math.max(0, Math.min(100, ((CONTAINER_HEIGHT - sensorData.distance) / CONTAINER_HEIGHT) * 100));
        
        const dataWithTimestamp: SensorData = {
          ...sensorData,
          timestamp: Date.now(),
          milkLevel: Number(milkLevel.toFixed(1))
        };
        
        setData(dataWithTimestamp);
        setHistory(prev => {
          const newHistory = [...prev, dataWithTimestamp];
          if (newHistory.length > MAX_HISTORY) {
            return newHistory.slice(-MAX_HISTORY);
          }
          return newHistory;
        });
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return { data, isConnected, history };
};