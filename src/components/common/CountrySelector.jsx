import { useState, useMemo, useRef, useEffect } from "react";
import { RefreshCw, Check, Search } from "lucide-react";

export const CountrySelector = ({
  countries,
  selectedCountry,
  onCountryChange,
  loading,
  error
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);

  const filteredCountries = useMemo(() => {
    if (!search) return countries;
    return countries.filter((c) =>
      c.country.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countries]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (iso2) => {
    onCountryChange(iso2);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="max-w-sm mb-6" ref={boxRef}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
          <Search className="shrink-0 size-4 text-gray-400" />
        </div>
        <input
          className="py-2.5 ps-10 pe-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          placeholder="Type a name"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          disabled={loading}
        />
        {loading && (
          <div className="absolute right-3 top-2.5">
            <RefreshCw size={20} className="animate-spin text-blue-500" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
          <div className="max-h-72 rounded-b-lg overflow-y-auto">
            {error ? (
              <div className="p-3 text-red-500 text-sm">{error}</div>
            ) : filteredCountries.length === 0 ? (
              <div className="p-3 text-gray-500 text-sm">No countries found</div>
            ) : (
              filteredCountries.map((country) => (
                <div
                  key={country.countryInfo._id || country.country}
                  className={`flex items-center cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 ${
                    selectedCountry === country.countryInfo.iso2?.toLowerCase() ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleSelect(country.countryInfo.iso2?.toLowerCase())}
                >
                  <div className="flex items-center w-full">
                    <div className="flex items-center justify-center rounded-full bg-gray-200 size-6 overflow-hidden me-2.5">
                      <img
                        className="shrink-0"
                        src={country.countryInfo.flag}
                        alt={country.country}
                        width={24}
                        height={24}
                      />
                    </div>
                    <span>{country.country}</span>
                  </div>
                  {selectedCountry === country.countryInfo.iso2?.toLowerCase() && (
                    <Check className="shrink-0 size-3.5 text-blue-600 ms-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};