import { useCovidData } from './hooks/useCovidData';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CountrySelector } from './components/common/CountrySelector';
import { StatsCard } from './components/common/StatsCard';
import { ChoroplethMap } from './components/maps/ChoroplethMap';
import { GlobalSituation } from './components/common/GlobalSituation';
import { DailyCasesChart } from './components/charts/DailyCasesChart';
import { CumulativeCasesChart } from './components/charts/CumulativeCasesChart';
import { CaseDistributionChart } from './components/charts/CaseDistributionChart';
import { Activity, Users, TrendingUp, Clock } from 'lucide-react';

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
            historicalData={historicalData} 
            loading={loading.historical}
            error={error.historical}
          />
          <CumulativeCasesChart 
            historicalData={historicalData} 
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