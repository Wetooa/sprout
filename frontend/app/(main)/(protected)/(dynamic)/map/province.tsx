import { ChevronDown } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Province() {
  return (
    <div className="relative w-full">
      <Select defaultValue="Cebu">
        <SelectTrigger className="appearance-none w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600">
          <SelectValue placeholder="Selected Province" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Cebu">Cebu</SelectItem>
          <SelectItem value="Davao">Davao</SelectItem>
          <SelectItem value="Manila">Manila</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Province;
