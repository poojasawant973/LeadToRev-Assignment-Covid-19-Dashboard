import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader } from '../common/Loader';
import { AlertTriangle } from 'lucide-react';
import { useMemo } from 'react';
import { formatNumber } from '../../utils/formatters';

export const CaseDistributionChart = ({ countryInfo, loading, error }) => {
  const chartData = useMemo(() => {
    if (!countryInfo) return [];
    return [
      { name: "Active", value: countryInfo.active, color: "#3B82F6" },
      { name: "Recovered", value: countryInfo.recovered, color: "#10B981" },
      { name: "Deaths", value: countryInfo.deaths, color: "#EF4444" }
    ];
  }, [countryInfo]);

  if (loading) return <Loader text="Loading chart data..." />;
  if (error) return (
    <div className="bg-white rounded-lg shadow-md p-4 h-80 flex items-center justify-center text-red-500">
      <AlertTriangle size={30} className="mb-2" />
      Failed to load chart data
    </div>
  );
  if (!countryInfo) return (
    <div className="bg-white rounded-lg shadow-md p-4 h-80 flex items-center justify-center">
      <p className="text-gray-500">Select a country to view distribution</p>
    </div>
  );

  const totalCases = countryInfo.cases;
  const activePercentage = ((countryInfo.active / totalCases) * 100).toFixed(1);
  const recoveredPercentage = ((countryInfo.recovered / totalCases) * 100).toFixed(1);
  const deathPercentage = ((countryInfo.deaths / totalCases) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Case Distribution</h3>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 md:pr-2">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatNumber(value), 'Cases']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-2 mt-4 md:mt-0">
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Active</span>
              <span className="text-sm font-medium text-gray-700">{activePercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${activePercentage}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{formatNumber(countryInfo.active)} cases</span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Recovered</span>
              <span className="text-sm font-medium text-gray-700">{recoveredPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${recoveredPercentage}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{formatNumber(countryInfo.recovered)} cases</span>
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Deaths</span>
              <span className="text-sm font-medium text-gray-700">{deathPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${deathPercentage}%` }}></div>
            </div>
            <span className="text-xs text-gray-500">{formatNumber(countryInfo.deaths)} cases</span>
          </div>
        </div>
      </div>
    </div>
  );
};