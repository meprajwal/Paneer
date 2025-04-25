import { useWebSocket } from '../hooks/useWebSocket';
import { SensorGraphs } from './SensorGraphs';
import { MilkLevelIndicator } from './MilkLevelIndicator';
import { useState } from 'react';
import { MoonIcon, SunIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const Dashboard = () => {
  const { data, isConnected, history } = useWebSocket();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold ${ 
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            System Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg ${
              isConnected 
                ? darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-700'
                : darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-700'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`} />
              <span className="text-sm font-medium">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-700'
              } hover:opacity-80 transition-all duration-200 shadow-lg`}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <MoonIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Temperature Alert Banner */}
        {data.temperature > 40 && (
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-center space-x-3 ${
            darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-700'
          }`}>
            <ExclamationTriangleIcon className="h-6 w-6 flex-shrink-0" />
            <div className="text-center">
              <p className="font-medium">High Temperature Alert!</p>
              <p className="text-sm">Temperature is above 40°C. Please add vinegar to the mixture.</p>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Milk Level Card */}
          <div className={`rounded-2xl ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-100'
          } shadow-xl overflow-hidden`}>
            <div className="p-4 sm:p-6 md:p-8 flex justify-center">
              <MilkLevelIndicator milkLevel={data.milkLevel} darkMode={darkMode} />
            </div>
          </div>

          {/* Temperature Card */}
          <div className={`rounded-2xl ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-100'
          } shadow-xl overflow-hidden`}>
            <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
              {/* Current Temperature */}
              <div className={`p-4 sm:p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-blue-50/70'
              }`}>
                <h3 className={`text-base sm:text-lg font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Current Temperature
                </h3>
                <div className="flex items-baseline space-x-2">
                  <span className={`text-4xl sm:text-5xl font-medium ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {data.temperature.toFixed(1)}
                  </span>
                  <span className={`text-xl sm:text-2xl ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    °C
                  </span>
                </div>
                
              </div>

              {/* Temperature Graph */}
              <div>
                <h3 className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Temperature History
                </h3>
                <div className="h-[250px] sm:h-[300px] md:h-[320px]">
                  <SensorGraphs history={history} darkMode={darkMode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 