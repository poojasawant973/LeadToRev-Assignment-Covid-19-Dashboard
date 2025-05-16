export const Header = ({ lastUpdated }) => (
  <header className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">COVID-19 and Population Dashboard</h1>
        <p className="text-gray-600">Real-time COVID-19 statistics and visualizations</p>
      </div>
      {lastUpdated && (
        <div className="text-sm text-gray-500">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  </header>
);