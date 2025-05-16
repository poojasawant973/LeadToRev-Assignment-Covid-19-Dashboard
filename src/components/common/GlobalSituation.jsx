import { Loader } from './Loader';

export const GlobalSituation = ({ globalStats, loading, error }) => {
  if (loading) return <Loader text="Loading global data..." />;
  if (error) return (
    <div className="bg-white rounded-lg shadow-md p-4 h-32 flex items-center justify-center text-red-500">
      Failed to load global data
    </div>
  );
  if (!globalStats) return (
    <div className="bg-white rounded-lg shadow-md p-4 h-32 flex items-center justify-center text-gray-500">
      No global data available
    </div>
  );
  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h3 className="text-lg font-semibold mb-2">Global Situation</h3>
      <p>
        Worldwide, there have been <span className="font-bold">{globalStats.cases.toLocaleString()}</span> confirmed cases of COVID-19,
        including <span className="font-bold">{globalStats.deaths.toLocaleString()}</span> deaths.
      </p>
      <p className="mt-2 text-blue-700">
        Today: +{globalStats.todayCases.toLocaleString()} new cases and +{globalStats.todayDeaths.toLocaleString()} new deaths reported.
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Last updated: {new Date(globalStats.updated).toLocaleString()}
      </p>
    </div>
  );
};