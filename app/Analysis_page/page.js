"use client"
import React from "react";
import Table from "../Components/Analysis";
import { FetchData } from "../work";
import NissanGTR from "../Components/MailUser";
import { Line } from "react-chartjs-2";
import Footer from "../Components/Footer";
import MoneySaved from "../Components/MoneySaved";

function Tabular_Analysis() {
  let DataF=[]
  FetchData ? FetchData:[].map((item,index)=>{
    DataF.push(item.price)
  })
  // Sort the FetchData array in increasing order of item.price
  let sortedData = FetchData ? FetchData.sort((a, b) => a.price - b.price) : [];
   const data = {
     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
     datasets: [
       {
         id: 1,
         label: "Price History",
         data: [1,2,3,4,5,6,7],
         borderColor: "rgba(0, 0, 255, 1)", // Blue color
         borderWidth: 4, // Increased width
         pointRadius: 4,
         pointBackgroundColor: "rgba(0, 0, 255, 1)", // Blue color for points
         fill: false, // Do not fill the area under the line
       },
     ],
   };


  return (
    <div className="flex flex-col justify-center m-auto align-middle w-full p-32">
      <div className="m-auto">
        <NissanGTR />
      </div>
      <div className="m-auto w-full justify-center align-middle">
        <Table data={sortedData}></Table>
        <Line data={data} />
        <MoneySaved prices={DataF} />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Tabular_Analysis;
