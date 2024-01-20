import React from "react";
import HeartButton from "./HeartButton";

const NissanGTR = () => {
  return (
    <div className="p-8 bg-blue-100 flex flex-col gap-5 w-full border-2 border-black rounded-2xl">
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold mb-2 text-4xl">Nissan GT-R</h2>
          <HeartButton />
        </div>
        <p className="mb-2 text-xl">
          NISMO has become the embodiment of Nissan's outstanding performance,
          inspired by the most unforgiving proving ground, the "race track".
        </p>
      </div>
      <div className="flex flex-row gap-10">
        <div>
          <div className="flex flex-row gap-7">
            <p className="text-lg font-semibold text-gray-500">Type Car</p>
            <p className="text-lg font-bold">Sport</p>
          </div>
          <div className="flex flex-row gap-7">
            <p className="text-lg font-semibold text-gray-500">Capacity</p>
            <p className="text-lg font-bold">2 Person</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-7">
            <p className="text-lg font-semibold text-gray-500">Steering</p>
            <p className="text-lg font-bold">Manual</p>
          </div>

          <div className="flex flex-row gap-7">
            <p className="text-lg font-semibold text-gray-500">Gasoline</p>
            <p className="text-lg font-bold">70L</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg mr-2">
          Notify me when the price range of this product is:
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-10 justify-evenly w-1/2">
            <input
              id="price-less-than"
              type="radio"
              className="border px-2 py-1"
            />
            <label htmlFor="price-less-than" className="text-lg">
              Less than or equal to
            </label>

            <input
              className="w-1/2 h-1/2 border-2 p-2 rounded-md"
              placeholder="Rs.0000"
            />
          </div>
          <div className="flex flex-row gap-10 justify-start w-1/2">
            <input
              id="price-more-than"
              type="radio"
              className="border px-2 py-1"
            />
            <label htmlFor="price-more-than" className="text-lg">
              More than
            </label>
          </div>
        </div>
      </div>
      <input
        className="w-1/2 p-2 h-1/2 rounded-md border-2"
        placeholder="Email"
      />
      <button className="bg-blue-500 w-1/6 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
        Notify Me
      </button>
    </div>
  );
};

export default NissanGTR;
