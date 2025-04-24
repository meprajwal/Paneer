import React, { useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import { DataPoint } from '../../types';
import { formatTimestampForAxis } from '../../utils/helpers';

interface LineChartProps {
  data: DataPoint[];
  color: string;
  timeRange: string;
  isFilled?: boolean;
  isStepChart?: boolean;
  valueFormatter?: (value: number) => string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  color,
  timeRange,
  isFilled = false,
  isStepChart = false,
  valueFormatter
}) => {
  const filteredData = useMemo(() => {
    const now = Date.now();
    let timeRangeMs: number;
    
    switch (timeRange) {
      case '1h':
        timeRangeMs = 60 * 60 * 1000;
        break;
      case '6h':
        timeRangeMs = 6 * 60 * 60 * 1000;
        break;
      case '24h':
        timeRangeMs = 24 * 60 * 60 * 1000;
        break;
      case '7d':
        timeRangeMs = 7 * 24 * 60 * 60 * 1000;
        break;
      case '30d':
        timeRangeMs = 30 * 24 * 60 * 60 * 1000;
        break;
      default:
        timeRangeMs = 6 * 60 * 60 * 1000;
    }
    
    const cutoff = now - timeRangeMs;
    return data.filter(point => point.timestamp >= cutoff);
  }, [data, timeRange]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const formattedValue = valueFormatter ? valueFormatter(value) : value;
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 border border-gray-200 shadow-lg rounded-lg">
          <p className="text-sm font-medium text-gray-600">{`${formatTimestampForAxis(label)}`}</p>
          <p className="text-sm font-bold mt-1" style={{ color }}>
            {`Value: ${formattedValue}`}
          </p>
        </div>
      );
    }
    return null;
  };
  
  const chartProps = {
    data: filteredData,
    margin: { top: 10, right: 10, left: 0, bottom: 0 },
  };
  
  const axisProps = {
    stroke: '#9CA3AF',
    fontSize: 12,
    tickLine: false,
    axisLine: false,
  };
  
  if (isFilled) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart {...chartProps}>
          <defs>
            <linearGradient id={`colorGradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatTimestampForAxis}
            {...axisProps}
          />
          <YAxis 
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            {...axisProps}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type={isStepChart ? "stepAfter" : "monotone"}
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#colorGradient-${color.replace('#', '')})`}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart {...chartProps}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
        <XAxis 
          dataKey="timestamp" 
          tickFormatter={formatTimestampForAxis}
          {...axisProps}
        />
        <YAxis 
          domain={isStepChart ? [0, 1] : ['dataMin - 1', 'dataMax + 1']}
          {...axisProps}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type={isStepChart ? "stepAfter" : "monotone"}
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          animationDuration={300}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;