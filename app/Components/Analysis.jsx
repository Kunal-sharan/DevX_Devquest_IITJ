import React from "react";

export default function Table({ data }) {
  if (!data || !Array.isArray(data)) {
    return <div>No data available</div>;
  }
  return (
    <div className="rounded-3xl overflow-hidden justify-center align-middle w-3/4 p-4">
      <table className="text-sm text-center text-gray-500 dark:text-gray-400 bg-white border w-full rounded-3xl">
        <thead className="text-xs font-bold text-gray-700 uppercase">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3">
              Serial Number
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product Details
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b border-gray-300">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
              </th>
              <td className="px-6 py-4 flex items-center justify-center">
                <img
                  src={item.imgUrl}
                  alt={item.productName}
                  className="w-16 h-16"
                />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center">
                  <span>{item.title}</span>
                </div>
              </td>
              <td className="px-6 py-4">Rs.{item.price}</td>
              <td className="px-6 py-4">
                <a
                  href={item.links}
                  className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Website
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         
    </div>
  );
}
