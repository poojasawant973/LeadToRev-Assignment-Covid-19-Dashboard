export const DateRangePicker = ({ dateRange, setDateRange, minDate, maxDate }) => (
  <div className="flex items-center gap-2 mb-4">
    <label className="text-sm text-gray-700">From:</label>
    <input
      type="date"
      value={dateRange.start}
      min={minDate}
      max={dateRange.end || maxDate}
      onChange={e => setDateRange(r => ({ ...r, start: e.target.value }))}
      className="border rounded px-2 py-1"
    />
    <label className="text-sm text-gray-700">To:</label>
    <input
      type="date"
      value={dateRange.end}
      min={dateRange.start || minDate}
      max={maxDate}
      onChange={e => setDateRange(r => ({ ...r, end: e.target.value }))}
      className="border rounded px-2 py-1"
    />
  </div>
);