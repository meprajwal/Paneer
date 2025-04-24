export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface SensorData {
  id: string;
  name: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  status?: 'normal' | 'warning' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  data: DataPoint[];
}

export interface DashboardState {
  refreshRate: number;
  lastUpdated: number;
  darkMode: boolean;
}