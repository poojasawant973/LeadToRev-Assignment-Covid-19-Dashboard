import { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import {
  fetchCountries,
  fetchGlobalStats,
  fetchCountryData,
  fetchHistoricalData
} from '../api/covidApi';

export const useCovidData = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [countryInfo, setCountryInfo] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);
  const [loading, setLoading] = useState({
    countries: false,
    countryInfo: false,
    historical: false,
    global: false
  });
  const [error, setError] = useState({
    countries: null,
    countryInfo: null,
    historical: null,
    global: null
  });

  const sortedCountries = useMemo(
    () => _.sortBy(countries, country => country.country),
    [countries]
  );

  useEffect(() => {
    const getCountries = async () => {
      setLoading(l => ({ ...l, countries: true }));
      try {
        const data = await fetchCountries();
        setCountries(data);
        setError(e => ({ ...e, countries: null }));
      } catch (err) {
        setError(e => ({ ...e, countries: err.message }));
      } finally {
        setLoading(l => ({ ...l, countries: false }));
      }
    };
    const getGlobal = async () => {
      setLoading(l => ({ ...l, global: true }));
      try {
        const data = await fetchGlobalStats();
        setGlobalStats(data);
        setError(e => ({ ...e, global: null }));
      } catch (err) {
        setError(e => ({ ...e, global: err.message }));
      } finally {
        setLoading(l => ({ ...l, global: false }));
      }
    };
    getCountries();
    getGlobal();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const getCountryInfo = async () => {
      setLoading(l => ({ ...l, countryInfo: true }));
      try {
        const data = await fetchCountryData(selectedCountry);
        setCountryInfo(data);
        setError(e => ({ ...e, countryInfo: null }));
      } catch (err) {
        setError(e => ({ ...e, countryInfo: err.message }));
      } finally {
        setLoading(l => ({ ...l, countryInfo: false }));
      }
    };
    const getHistorical = async () => {
      setLoading(l => ({ ...l, historical: true }));
      try {
        const data = await fetchHistoricalData(selectedCountry);
        setHistoricalData(data);
        setError(e => ({ ...e, historical: null }));
      } catch (err) {
        setError(e => ({ ...e, historical: err.message }));
      } finally {
        setLoading(l => ({ ...l, historical: false }));
      }
    };
    getCountryInfo();
    getHistorical();
  }, [selectedCountry]);

  return {
    countries: sortedCountries,
    selectedCountry,
    setSelectedCountry,
    countryInfo,
    historicalData,
    globalStats,
    loading,
    error
  };
};