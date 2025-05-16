import { ArrowDown } from 'lucide-react';
import { formatNumber } from '../../utils/formatters';

export const StatsCard = ({ title, value, previous, icon: Icon, color }) => {
  const getChangePercentage = () => {
    if (!previous || previous === 0) return null;
    const change = ((value - previous) / previous) * 100;
    return change.toFixed(1);
  };
  const changePercentage = getChangePercentage();

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${color}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{formatNumber(value)}</p>
        </div>
        <div className={`p-2 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          <Icon size={20} className={color.replace('border-', 'text-')} />
        </div>
      </div>
      {changePercentage && (
        <div className="mt-2 flex items-center">
          <ArrowDown 
            size={16} 
            className={parseFloat(changePercentage) < 0 
              ? "text-green-500 transform rotate-180" 
              : "text-red-500"} 
          />
          <span className={parseFloat(changePercentage) < 0 
            ? "text-green-500 text-sm ml-1" 
            : "text-red-500 text-sm ml-1"}>
            {Math.abs(parseFloat(changePercentage))}%
          </span>
          <span className="text-gray-400 text-xs ml-1">from yesterday</span>
        </div>
      )}
    </div>
  );
};