import React from "react";

const MoneySaved = ({ prices }) => {
  function findMoneySaved(prices) {
    return prices.length > 0 ? prices[prices.length - 1] - prices[0] : 0;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-3xl">Congratulations! You saved</p>
      <p className="font-bold text-gray-500 ">INR</p>
      <p className="font-bold text-4xl text-green-500">
        Rs. {new Intl.NumberFormat("en-IN").format(findMoneySaved(prices))}
      </p>
    </div>
  );
};

export default MoneySaved;
