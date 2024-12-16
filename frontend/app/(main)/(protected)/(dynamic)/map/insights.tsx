import React, { useEffect, useState } from "react";
import SproutLogo from "@/components/sprout-logo";
import Toto from "@/components/toto";

function GenerateInsightsButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <button
        className="transition-all flex items-center rounded-lg px-4 py-3 w-full bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-500 cursor-pointer font-medium text-emerald-50 relative"
        onClick={handleClick}
      >
        <Toto className="absolute right-2" height="50" />
        Generate Insights
      </button>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal} />
    </div>
  );
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const imageUrl =
    "https://www.opticslens.com/uploads/The-application-of-NDVI-01.jpg";
  const apiUrl = `http://localhost:5105/api/Insight/GenerateInsights`;

  async function fetchInsights() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ImageUrl: imageUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Full API Response:", data);

        if (data && data.result) {
          return data.result;
        } else {
          console.error(
            "API Response does not contain 'Result'. Full Response:",
            data
          );
          return "Error: Result field is missing in response.";
        }
      } else {
        return "Error: " + response.statusText;
      }
    } catch (error) {
      return "Request failed: " + error;
    }
  }

  useEffect(() => {
    async function getInsights() {
      setLoading(true);
      const data = await fetchInsights();
      setInsights(data);
      setLoading(false);
    }

    getInsights();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-lg relative border-[6px] border-blue-600 max-w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <Toto className="absolute -top-12 -right-1" height="110" />
        <div className="flex gap-3 items-center">
          <SproutLogo className="fill-blue-600" />
          <h2 className="text-xl font-semibold ">| Toto says...</h2>
        </div>
        <p className="mt-4">{loading ? "Loading..." : insights}</p>
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default GenerateInsightsButton;
