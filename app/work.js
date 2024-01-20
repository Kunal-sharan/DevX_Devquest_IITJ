import React, { useState } from "react";
import ActSnapdeal from "../app/Data_Scrapping/Snapdeal";
import ActEbay from "../app/Data_Scrapping/Ebay";
import ActFlipkart from "../app/Data_Scrapping/Flipkart";
import ActCroma from "../app/Data_Scrapping/Croma";
import Card from "./Components/Card";

export let Squery = "";
export let FetchData = null;

// Define your dummy data
const dummyData = [
  {
    title: "NBOX - Card Holder Mobile Holder for Smartphones ( Black )",
    price: "149",
    links:
      "https://www.snapdeal.com/product/elv-universal-mobile-phone-stand/661153369346#bcrumbSearch:smartphone",
    imgUrl:
      "https://n4.sdlcdn.com/imgs/k/a/z/Elv-Universal-Mobile-Phone-Stand-SDL034760993-1-36598.jpeg",
  },
  {
    title: "Mi Basic Wired Headset with Mic  (Red, In the Ear)",
    price: "337",
    links:
      "https://www.flipkart.com/mi-basic-wired-headset-mic/p/itma7f00d8a41d63?pid=ACCF3YPVECGQXTKK&lid=LSTACCF3YPVECGQXTKKAFPVDT&marketplace=FLIPKART&q=Earphones&store=0pm%2Ffcn%2F821&srno=s_1_20&otracker=search&otracker1=search&fm=Search&iid=4c11aaa7-578d-44f4-b27f-bb34ee3a8d07.ACCF3YPVECGQXTKK.SEARCH&ppt=sp&ppn=sp&ssid=tn3ni4qsio0000001705728257592&qH=34457b322a744d9e",
    imgUrl:
      "https://rukminim2.flixcart.com/image/832/832/jklgxow0/headphone/t/k/k/mi-ydjc01jy-original-imaf7x2ckna7hbym.jpeg?q=70&crop=false",
  },
  {
    title:
      "HP 15s-FR5012TU Intel Core i3 12th Gen (15.6 inch, 8GB)",
    price: "38,990",
    links:
      "https://www.croma.com/hp-15s-fr5012tu-intel-core-i3-12th-gen-15-6-inch-8gb-512gb-windows-11-ms-office-2021-intel-uhd-full-hd-display-natural-silver-91w53pa-/p/302437",
    imgUrl:
      "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1701617050/Croma%20Assets/Computers%20Peripherals/Laptop/Images/302437_0_zobekt.png?tr=w-480",
  },
  {
    title:
      "Nike Air Jordan 1 Low Retro Men AJ1 Casual Lifestyle Shoes",
    price: "7999.99",
    links:
      "https://www.ebay.com/itm/364591927312?hash=item54e35f5010:g:Q~MAAOSwnghlXZfH&amdata=enc%3AAQAIAAAA4K15Bceoddp%2FDGjMSga8DXi%2FoSIEfAiUoCmpPXk1bCTFCoBfE6AdNJWgWePRe4NfGtlZW1IJp%2F4mRrGupkCJQHsB9Dvbdu73MLtQG3uwz7ix1iewe8ADrXkabt1kreC2dAS2xz2GqkdAaTIZ8k4OqWQRrEfz2DhBuw0ChUtTrIWTXANiLb1BUsqHd%2FsFqv5Dgcaiz%2FEnbhf%2FLSBtPvLf4cqnWwU4qtk91uUHrII63lwPjGJbAMYCoy5cCWVweH1frdXiMancso7h6mgvnY4zE69p%2Fu%2By4zTaw6oL1UWHQ4kZ%7Ctkp%3ABk9SR4iwx9WkYw",
    imgUrl: "https://i.ebayimg.com/images/g/3eAAAOSwXA9ljZ6n/s-l960.jpg",
  },
  // Add more dummy items as needed
];

export default function Scraper() {
  const [loading, setLoading] = useState(false);
  // Initialize data state with dummy data
  let [data, setData] = useState(dummyData);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const dataSnapdeal = await ActSnapdeal(searchTerm);
      setData((prevData) => [...prevData, ...dataSnapdeal]);

      const dataEbay = await ActEbay(searchTerm);
      setData((prevData) => [...prevData, ...dataEbay]);

      const dataCroma = await ActCroma(searchTerm);
      setData((prevData) => [...prevData, ...dataCroma]);

      const dataFlipkart = await ActFlipkart(searchTerm);
      setData((prevData) => [...prevData, ...dataFlipkart]);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
      
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Squery = searchTerm;
    fetchData();
    FetchData = data;
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
          required
        />
        <button className="btn btn-primary w-[120px]" type="submit">
          Search
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex flex-row flex-wrap justify-center align-middle gap-4 p-2 m-16">
            {data.map((item, index) => {
              if (item.title && item.price && item.links && item.imgUrl) {
                return (
                  <div key={index}>
                    <Card
                      title={item.title}
                      price={item.price}
                      links={item.links}
                      img={item.imgUrl}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </main>
  );
}
