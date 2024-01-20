"use client"
import React, { useState } from "react";
import ActSnapdeal from "../Data_Scrapping/Snapdeal";
import ActEbay from "../Data_Scrapping/Ebay";
import ActFlipkart from "../Data_Scrapping/Flipkart";
import ActCroma from "../Data_Scrapping/Croma";
import Card from "../Components/Card";

export let Squery = "";
export let FetchData = null;

// Define your dummy data
export default function Scraper() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const dataSnapdeal = await ActSnapdeal(searchTerm);
      const dataEbay = await ActEbay(searchTerm);
      const dataCroma = await ActCroma(searchTerm);
      const dataFlipkart = await ActFlipkart(searchTerm);

      // Combine the data from all sources
      const combinedData = [
        ...dataSnapdeal,
        ...dataEbay,
        ...dataCroma,
        ...dataFlipkart,
      ];

      setData(combinedData);
      Squery = searchTerm;
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <main>
      <form
        className="flex flex-row gap-10 justify-center"
        onSubmit={handleSubmit}
      >
        <input
          placeholder="Search"
          type="text"
          className="input input-bordered w-1/2 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary w-[120px]" type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex flex-row flex-wrap gap-4 p-2 m-16">
            {data.map((item, index) => (
              <div key={index}>
                <Card
                  title={item.title}
                  price={item.price}
                  links={item.links}
                  img={item.imgUrl}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
