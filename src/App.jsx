import { useState, useMemo } from "react";
import { useCovidData } from './hooks/useCovidData';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CountrySelector } from './components/common/CountrySelector';
import { DateRangePicker } from './components/common/DateRangePicker';
import { StatsCard } from './components/common/StatsCard';
import { ChoroplethMap } from './components/maps/ChoroplethMap';
import { GlobalSituation } from './components/common/GlobalSituation';
import { DailyCasesChart } from './components/charts/DailyCasesChart';
import { CumulativeCasesChart } from './components/charts/CumulativeCasesChart';
import { CaseDistributionChart } from './components/charts/CaseDistributionChart';
import { Activity, Users, TrendingUp, Clock } from 'lucide-react';

function parseDateString(dateString) {
  // disease.sh returns dates as MM/DD/YY
  const [month, day, year] = dateString.split("/");
  return new Date(`20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
}

export default function App() {
  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    countryInfo,
    historicalData,
    globalStats,
    loading,
    error
  } = useCovidData();

  // Date range state
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Filtered data by date range for charts
  const filteredHistoricalData = useMemo(() => {
    if (!historicalData || !historicalData.timeline || !historicalData.timeline.cases) return historicalData;
    const { cases, deaths, recovered } = historicalData.timeline;
    const filterDates = Object.keys(cases).filter(date => {
      if (!dateRange.start && !dateRange.end) return true;
      const d = parseDateString(date);
      const start = dateRange.start ? new Date(dateRange.start) : null;
      const end = dateRange.end ? new Date(dateRange.end) : null;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });
    return {
      ...historicalData,
      timeline: {
        cases: Object.fromEntries(filterDates.map(d => [d, cases[d]])),
        deaths: Object.fromEntries(filterDates.map(d => [d, deaths[d]])),
        recovered: Object.fromEntries(filterDates.map(d => [d, recovered[d]])),
      }
    };
  }, [historicalData, dateRange]);

  // Find min/max date from data for picker limits
  const minDate = useMemo(() => {
    if (!historicalData || !historicalData.timeline || !historicalData.timeline.cases) return "";
    const dates = Object.keys(historicalData.timeline.cases).map(parseDateString);
    return dates.length ? dates[0].toISOString().slice(0, 10) : "";
  }, [historicalData]);
  const maxDate = useMemo(() => {
    if (!historicalData || !historicalData.timeline || !historicalData.timeline.cases) return "";
    const dates = Object.keys(historicalData.timeline.cases).map(parseDateString);
    return dates.length ? dates[dates.length - 1].toISOString().slice(0, 10) : "";
  }, [historicalData]);

  const handleCountryChange = (countryCode) => setSelectedCountry(countryCode);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Header lastUpdated={countryInfo?.updated} />
      <ErrorBoundary>
        <div className="mb-6">
          <CountrySelector 
            countries={countries} 
            selectedCountry={selectedCountry} 
            onCountryChange={handleCountryChange}
            loading={loading.countries}
            error={error.countries}
          />
        </div>
        {historicalData && (
          <DateRangePicker
            dateRange={dateRange}
            setDateRange={setDateRange}
            minDate={minDate}
            maxDate={maxDate}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Cases" 
            value={countryInfo?.cases} 
            previous={countryInfo?.cases - countryInfo?.todayCases}
            icon={Activity}
            color="border-blue-500"
          />
          <StatsCard 
            title="Active Cases" 
            value={countryInfo?.active} 
            previous={null}
            icon={Users}
            color="border-yellow-500"
          />
          <StatsCard 
            title="Recovered" 
            value={countryInfo?.recovered} 
            previous={countryInfo?.recovered - countryInfo?.todayRecovered}
            icon={TrendingUp}
            color="border-green-500"
          />
          <StatsCard 
            title="Deaths" 
            value={countryInfo?.deaths} 
            previous={countryInfo?.deaths - countryInfo?.todayDeaths}
            icon={Clock}
            color="border-red-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-1">
            <ChoroplethMap countryInfo={countryInfo} />
          </div>
          <div className="col-span-1 md:col-span-2">
            <GlobalSituation 
              globalStats={globalStats}
              loading={loading.global}
              error={error.global}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DailyCasesChart 
            historicalData={filteredHistoricalData} 
            loading={loading.historical}
            error={error.historical}
          />
          <CumulativeCasesChart 
            historicalData={filteredHistoricalData} 
            loading={loading.historical}
            error={error.historical}
          />
        </div>
        <div className="mb-6">
          <CaseDistributionChart 
            countryInfo={countryInfo} 
            loading={loading.countryInfo}
            error={error.countryInfo}
          />
        </div>
        <Footer />
      </ErrorBoundary>
    </div>
  );
}