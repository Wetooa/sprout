import { ChevronDown } from "lucide-react";

function Province() {
  return (
    <div className="relative w-full">
      <select
        className="block appearance-none w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        defaultValue="Cebu"
      >
        <option value="Cebu">Cebu</option>
        <option value="Davao">Davao</option>
        <option value="Manila">Manila</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 pointer-events-none" />
    </div>
  );
}

export default Province;
