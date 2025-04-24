import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format } from 'date-fns';
import { SensorData } from '../types/sensor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

interface SensorGraphsProps {
  history: SensorData[];
  darkMode: boolean;
}

export const SensorGraphs = ({ history, darkMode }: SensorGraphsProps) => {
  const textColor = darkMode ? '#E5E7EB' : '#374151';
  const gridColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const cardBg = darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)';

  const temperatureData = {
    labels: history.map(data => data.timestamp),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: history.map(data => ({
          x: data.timestamp,
          y: data.temperature
        })),
        borderColor: darkMode ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          if (darkMode) {
            gradient.addColorStop(0, 'rgba(96, 165, 250, 0.3)');
            gradient.addColorStop(1, 'rgba(96, 165, 250, 0)');
          } else {
            gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
            gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          }
          return gradient;
        },
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: darkMode ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        pointBorderColor: darkMode ? '#1F2937' : '#ffffff',
        pointHoverBackgroundColor: darkMode ? '#1F2937' : '#ffffff',
        pointHoverBorderColor: darkMode ? 'rgb(96, 165, 250)' : 'rgb(59, 130, 246)',
        pointHoverBorderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 750,
      easing: 'easeInOutQuart' as const,
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: cardBg,
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleFont: {
          size: 13,
          weight: 'normal' as const,
        },
        callbacks: {
          title: (context: any) => {
            const date = new Date(context[0].parsed.x);
            return format(date, 'HH:mm:ss');
          },
          label: function(context: any) {
            return `Temperature: ${context.parsed.y.toFixed(1)}°C`;
          }
        },
        bodyFont: {
          size: 14,
          weight: 'bold' as const,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: gridColor,
          drawBorder: false,
          lineWidth: 1,
        },
        ticks: {
          color: textColor,
          padding: 10,
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value + '°C';
          },
        },
        title: {
          display: false,
        },
      },
      x: {
        type: 'time' as const,
        time: {
          unit: 'second' as const,
          displayFormats: {
            second: 'HH:mm:ss'
          }
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: textColor,
          maxRotation: 0,
          font: {
            size: 12,
          },
          maxTicksLimit: 6,
        },
        title: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2.5,
        borderJoinStyle: 'round' as const,
        capBezierPoints: true,
      },
    },
  };

  return (
    <div className="h-72">
      <Line options={options} data={temperatureData} />
    </div>
  );
}; 