import { RefreshCw } from 'lucide-react';

export const CountrySelector = ({ countries, selectedCountry, onCountryChange, loading, error }) => (
  <div className="mb-6">
    <label htmlFor="country-select" className="block text-sm font-medium text-gray-700 mb-1">
      Select Country
    </label>
    <div className="relative">
      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        disabled={loading || error}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {countries.map((country) => (
          <option key={country.countryInfo._id || country.country} value={country.countryInfo.iso2?.toLowerCase()}>
            {country.country}
          </option>
        ))}
      </select>
      {loading && (
        <div className="absolute right-3 top-2">
          <RefreshCw size={20} className="animate-spin text-blue-500" />
        </div>
      )}
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-600">{error}</p>
    )}
  </div>
);