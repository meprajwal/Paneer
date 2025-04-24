import { format } from 'date-fns';
import { TimeRange } from '../types';

export const formatTimestamp = (timestamp: number): string => {
  return format(timestamp, 'HH:mm:ss');
};

export const formatTimestampForAxis = (timestamp: number): string => {
  return format(timestamp, 'HH:mm');
};

export const formatDate = (timestamp: number): string => {
  return format(timestamp, 'MMM dd, yyyy HH:mm:ss');
};

export const getStatusColor = (status: string | undefined): string => {
  switch (status) {
    case 'critical':
      return 'text-red-500';
    case 'warning':
      return 'text-amber-500';
    case 'normal':
    default:
      return 'text-green-500';
  }
};

export const getTrendIcon = (trend: string | undefined): string => {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'stable':
    default:
      return '→';
  }
};

export const getTrendColor = (trend: string | undefined): string => {
  switch (trend) {
    case 'up':
      return 'text-green-500';
    case 'down':
      return 'text-red-500';
    case 'stable':
    default:
      return 'text-blue-500';
  }
};

export const getTimeRangeLabel = (range: TimeRange): string => {
  switch (range) {
    case '1h':
      return 'Last Hour';
    case '6h':
      return 'Last 6 Hours';
    case '24h':
      return 'Last 24 Hours';
    case '7d':
      return 'Last 7 Days';
    case '30d':
      return 'Last 30 Days';
    default:
      return 'Custom Range';
  }
};

export const getRefreshRateLabel = (rate: number): string => {
  if (rate < 1000) {
    return `${rate}ms`;
  } else if (rate < 60000) {
    return `${rate / 1000}s`;
  } else {
    return `${rate / 60000}m`;
  }
};

export const truncateValue = (value: number): string => {
  return value % 1 === 0 ? value.toString() : value.toFixed(1);
};