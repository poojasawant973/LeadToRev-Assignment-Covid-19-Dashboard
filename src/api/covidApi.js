export const API_BASE_URL = 'https://disease.sh/v3/covid-19';

export const fetchCountries = async () => {
  const response = await fetch(`${API_BASE_URL}/countries`);
  if (!response.ok) throw new Error('Failed to fetch countries');
  return response.json();
};

export const fetchGlobalStats = async () => {
  const response = await fetch(`${API_BASE_URL}/all`);
  if (!response.ok) throw new Error('Failed to fetch global stats');
  return response.json();
};

export const fetchCountryData = async (country) => {
  const response = await fetch(`${API_BASE_URL}/countries/${country}`);
  if (!response.ok) throw new Error(`Failed to fetch data for ${country}`);
  return response.json();
};

export const fetchHistoricalData = async (country) => {
  const response = await fetch(`${API_BASE_URL}/historical/${country}?lastdays=30`);
  if (!response.ok) throw new Error(`Failed to fetch historical data for ${country}`);
  return response.json();
};