import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from '../common/Loader';
import { AlertTriangle } from 'lucide-react';
import { useMemo } from 'react';
import { formatNumber } from '../../utils/formatters';

export const CumulativeCasesChart = ({ historicalData, loading, error }) => {
  const chartData = useMemo(() => {
    if (!historicalData?.timeline?.cases) return [];
    return Object.entries(historicalData.timeline.cases).map(([date, cases]) => ({
      date,
      cases,
      deaths: historicalData.timeline.deaths[date],
      recovered: historicalData.timeline.recovered[date]
    }));
  }, [historicalData]);

  if (loading) return <Loader text="Loading chart data..." />;
  if (error) return (
    <div className="bg-white rounded-lg shadow-md p-4 h-80 flex items-center justify-center text-red-500">
      <AlertTriangle size={30} className="mb-2" />
      Failed to load chart data
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Cumulative Cases</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 5, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
              interval={chartData.length > 14 ? Math.floor(chartData.length / 7) : 0}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickFormatter={formatNumber}
            />
            <Tooltip 
              formatter={(value) => [formatNumber(value), 'Cases']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="cases" 
              name="Total Cases" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="deaths" 
              name="Deaths" 
              stroke="#EF4444" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="recovered" 
              name="Recovered" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={false} 
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};