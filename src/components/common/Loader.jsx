import { RefreshCw } from 'lucide-react';

export const Loader = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center p-6">
    <RefreshCw size={30} className="text-blue-500 animate-spin mb-2" />
    <p className="text-gray-500">{text}</p>
  </div>
);