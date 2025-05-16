import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Loader } from '../common/Loader';
import { AlertTriangle } from 'lucide-react';
import { useMemo } from 'react';
import { formatNumber } from '../../utils/formatters';

export const DailyCasesChart = ({ historicalData, loading, error }) => {
  const chartData = useMemo(() => {
    if (!historicalData?.timeline?.cases) return [];
    const timeline = historicalData.timeline;
    const caseEntries = Object.entries(timeline.cases);
    return caseEntries.map(([date, cases], index) => {
      const previousCases = index > 0 ? caseEntries[index - 1][1] : 0;
      const dailyNewCases = cases - previousCases;
      return {
        date,
        newCases: dailyNewCases > 0 ? dailyNewCases : 0,
        deaths: timeline.deaths[date] - (index > 0 ? timeline.deaths[caseEntries[index - 1][0]] : 0),
        recovered: timeline.recovered[date] - (index > 0 ? timeline.recovered[caseEntries[index - 1][0]] : 0)
      };
    });
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
      <h3 className="text-lg font-semibold mb-4">Daily New Cases</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
            <Bar dataKey="newCases" name="New Cases" fill="#3B82F6" />
            <Bar dataKey="deaths" name="Deaths" fill="#EF4444" />
            <Bar dataKey="recovered" name="Recovered" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};