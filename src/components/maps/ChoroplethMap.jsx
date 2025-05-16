export const ChoroplethMap = ({ countryInfo }) => (
  <div className="bg-white rounded-lg shadow-md p-4 h-64 flex items-center justify-center">
    {countryInfo?.countryInfo?.flag ? (
      <div className="text-center">
        <img 
          src={countryInfo.countryInfo.flag} 
          alt={`${countryInfo.country} flag`} 
          className="h-24 w-auto mx-auto mb-4 border"
        />
        <h3 className="text-lg font-semibold">{countryInfo.country}</h3>
        <div className="text-sm text-gray-500">
          Population: {countryInfo.population?.toLocaleString()}
        </div>
      </div>
    ) : (
      <p className="text-gray-500">Select a country to view details</p>
    )}
  </div>
);