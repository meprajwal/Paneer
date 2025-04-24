import React from 'react';
import { Moon, Sun, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { DashboardState } from '../../types';
import { formatDate } from '../../utils/helpers';

interface HeaderProps {
  dashboardState: DashboardState;
  onRefreshData: () => void;
  onToggleDarkMode: () => void;
  isConnected: boolean;
  error: string | null;
}

const Header: React.FC<HeaderProps> = ({
  dashboardState,
  onRefreshData,
  onToggleDarkMode,
  isConnected,
  error
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div >

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="h-4 w-4 text-green-400" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-400" />
              )}
              <span className="text-sm">
                {isConnected ? 'Connected' : error || 'Disconnected'}
              </span>
            </div>

            <div className="text-xs text-blue-100">
              Last updated: {formatDate(dashboardState.lastUpdated)}
            </div>

            <button
              className="flex items-center px-3 py-1 bg-blue-800 hover:bg-blue-600 rounded-md text-sm transition-colors duration-200"
              onClick={onRefreshData}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              <span>Reconnect</span>
            </button>

            <button
              className="flex items-center px-3 py-1 bg-blue-800 hover:bg-blue-600 rounded-md text-sm transition-colors duration-200"
              onClick={onToggleDarkMode}
            >
              {dashboardState.darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;