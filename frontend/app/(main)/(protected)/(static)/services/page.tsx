import React from "react";
import Navbar from "../../navbar";

function Services() {
  return (
    <div className="relative w-full h-full bg-[url('/bg/sign-in.png')] overflow-y-scroll bg-cover bg-no-repeat">
      <div className="z-40 w-full p-4 top-0 fixed">
        <Navbar />
      </div>

      <div className="z-0 flex pt-32 flex-col gap-4 max-w-[1200px] p-12 mx-auto">
        <section className=" bg-white/60 backdrop-blur p-8 rounded-xl space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">Weather Analysis</h2>
          <div className="bg-white/60 backdrop-blur p-8 rounded-xl shadow-lg">
            <h3 className="font-bold">Overview</h3>
            <p className="text-primary">
              Offer real-time and historical weather data to help farmers make
              timely decisions.
            </p>
          </div>
          <div className="bg-white/60 backdrop-blur p-8 rounded-xl shadow-lg">
            <h3 className="font-bold">Benefits</h3>
            <ul className="text-primary list-disc list-inside">
              <li>
                Access to detailed forecasts for the registered area (Premium:
                extended forecasts).
              </li>
              <li>
                Analyze weather trends to adjust farming practices like
                irrigation, planting, or harvesting.
              </li>
              <li>
                Get alerted to weather risks such as storms, droughts, or
                flooding.
              </li>
            </ul>
          </div>
        </section>

        <section className=" bg-white/60 backdrop-blur p-8 rounded-xl space-y-4 h-fit">
          <h2 className="text-5xl text-primary font-bold">
            Climate-Resilient Agriculture
          </h2>
          <div className="bg-white/60 backdrop-blur p-8 rounded-xl shadow-lg">
            <h3 className="font-bold">Overview</h3>
            <p className="text-primary">
              Tools to help farmers adapt to changing climates and optimize
              productivity.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur p-8 rounded-xl shadow-lg">
            <h3 className="font-bold">Benefits</h3>
            <ul className="text-primary list-disc list-inside">
              <li>
                NDVI forecasting to monitor crop health and productivity over
                time.
              </li>
              <li>
                Tips and best practices for adopting sustainable,
                climate-resilient farming methods.
              </li>
              <li>
                Identify high-risk weather conditions and plan accordingly
                (e.g., drought-resistant crops, water management strategies).
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Services;
