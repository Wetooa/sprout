import { useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import regions from "../../../../../data/regions.json";

function AddField() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRegion("");
    setSelectedProvince("");
    setProvinces([]);
  };

  const handleRegionChange = (value) => {
    const region = value;
    setSelectedRegion(region);
    setProvinces(regions[region] || []);
  };

  const handleProvinceChange = (value) => {
    setSelectedProvince(value);
  };

  const handleAddField = async () => {
    if (!selectedProvince) {
      alert("Please select a province.");
      return;
    }

    const fieldData = {
      ownerId: 1, // Replace with actual owner ID logic
      name: selectedProvince,
      location: '{"type": "Point", "coordinates": [0, 0]}', // Dummy GeoJSON
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5105/api/fields", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldData),
      });

      if (response.ok) {
        alert("Field added successfully!");
        const data = await response.json();
        handleCloseModal();
        setProvinces([...provinces, data.field]);
      } else {
        alert("Failed to add field.");
      }
    } catch (error) {
      console.error("Error adding field:", error);
      alert("An error occurred while adding the field.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="transition-all text-white flex justify-between bg-gradient-to-br from-[#059568] to-[#065f46] hover:from-[#216958] hover:to-[#216958] px-4 py-2 items-center cursor-pointer"
        onClick={handleOpenModal}
      >
        <div className="font-medium text-[#ECFDF5]">Add field</div>
        <div className="rounded-full border-2">
          <PlusIcon className="w-3.5 h-3.5" />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-lg relative border-[6px] border-[#2165f6] max-w-[400px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              Select Region and Province
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <Select
                  defaultValue={selectedRegion}
                  onValueChange={handleRegionChange}
                >
                  <SelectTrigger className="w-full border border-gray-300 p-2 rounded-lg">
                    <SelectValue placeholder="Selected Region" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.keys(regions).map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Province
                </label>
                <Select
                  value={selectedProvince}
                  onValueChange={handleProvinceChange}
                  disabled={!selectedRegion}
                >
                  <SelectTrigger className="w-full border border-gray-300 p-2 rounded-lg">
                    <SelectValue placeholder="Selected Province" />
                  </SelectTrigger>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <button
              onClick={handleAddField}
              disabled={loading}
              className={`mt-6 py-2 px-4 text-white rounded-lg ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#2165f6] hover:bg-[#1a4bcc]"
              }`}
            >
              {loading ? "Adding..." : "Add field"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddField;
