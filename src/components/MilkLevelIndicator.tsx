import React from 'react';

interface MilkLevelIndicatorProps {
  milkLevel: number;
  darkMode: boolean;
}

export const MilkLevelIndicator: React.FC<MilkLevelIndicatorProps> = ({ milkLevel, darkMode }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className={`text-base sm:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 sm:mb-8`}>
        Milk Level
      </h2>
      
      <div className="relative w-[120px] sm:w-[140px] md:w-[160px]">
        {/* Container */}
        <div className={`h-[240px] sm:h-[280px] md:h-[320px] w-full mx-auto rounded-3xl border ${
          darkMode 
            ? 'border-gray-700 bg-gray-800/50' 
            : 'border-gray-200 bg-gray-50'
        } relative overflow-hidden`}>
          {/* Liquid fill */}
          <div
            className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ${
              darkMode ? 'bg-blue-500/20' : 'bg-blue-500/15'
            }`}
            style={{ height: `${milkLevel}%` }}
          />
        </div>

        {/* Percentage display */}
        <div className="text-center mt-3 sm:mt-4">
          <div className={`text-xl sm:text-2xl ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {milkLevel.toFixed(1)}%
          </div>
          <div className={`text-xs sm:text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-500'
          } mt-1`}>
            Capacity
          </div>
        </div>
      </div>
    </div>
  );
}; 