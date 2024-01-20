"use client"
import React from "react";
import Table from "../Components/Analysis";
import { FetchData } from "../work";
import NissanGTR from "../Components/MailUser";
import Footer from "../Components/Footer";
import MoneySaved from "../Components/MoneySaved";

function Tabular_Analysis() {
  let DataF=[]
  FetchData ? FetchData:[].map((item,index)=>{
    DataF.push(item.price)
  })
  // Sort the FetchData array in increasing order of item.price
  let sortedData = FetchData ? FetchData.sort((a, b) => a.price - b.price) : [];

  return (
    <div className="flex flex-col justify-center m-auto align-middle w-full p-32">
      <div className="m-auto">
        <NissanGTR />
      </div>
      <div className="m-auto w-full justify-center align-middle">
        <Table data={sortedData}></Table>
        <MoneySaved prices={DataF} />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Tabular_Analysis;
