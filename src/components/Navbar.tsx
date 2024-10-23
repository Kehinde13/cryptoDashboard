"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import logo from "@/assets/Logo (1).png";
import profile from "@/assets/profile.jpg";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { CircleX, EllipsisVertical, Search } from "lucide-react";

// Define the interface for CoinGecko response data
interface CoinData {
  name: string;
  symbol: string;
  image: {
    small: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
}

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [showDropdown, setShowDropdown] = useState(true);

  // Function to handle the search request
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      // Fetch data for the searched cryptocurrency
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${searchTerm.toLowerCase()}`
      );
      setCoinData(response.data);
      setShowDropdown(true); // Show dropdown when data is available
    } catch (error) {
      alert("Enter a valid coin name");
      console.log(error);

      setShowDropdown(false); // Hide dropdown on error
    }
  };

  // Function to hide the dropdown
  const hideDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="p-2 flex flex-col justify-between w-[100%] shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center md:hidden">
          <Image src={logo} alt="logo" className="w-12" />
        </div>
        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-sm items-center space-x-2 md:ml-10 ml-5 md:mt-2"
        >
          <Input
            type="text"
            placeholder="Search for a coin"
            className="md:w-full w-[60%]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
            onBlur={hideDropdown} // Hide dropdown when input loses focus
            onFocus={() => setShowDropdown(!!coinData)} // Show dropdown if coinData is available
          />
          <Button type="submit" className="bg-blue-400">
            <Search />
          </Button>
        </form>
        <div className="hidden mr-5 bg-blue-300 rounded-full py-2 px-4 lg:flex items-center gap-5 mt-2">
          <Image src={profile} alt="user" className="rounded-full w-[30px]" />
          <div className="text-xs">
            <h1 className="font-semibold">Kehinde Balogun</h1>
            <p>balogunkehinde3@gmail.com</p>
          </div>
          <EllipsisVertical />
        </div>
        <SidebarTrigger className="md:hidden absolute right-0 top-2 w-12" />
      </div>

      {showDropdown && coinData && (
        <div className="absolute z-10 mt-16 bg-white border rounded shadow-lg w-full max-w-sm p-4 dark:bg-black">
          <CircleX
            onClick={hideDropdown}
            className="cursor-pointer text-red-500 absolute right-5"
          />
          <div className="flex items-center gap-2">
            <Image
              src={coinData.image.small}
              alt={coinData.name}
              width={24}
              height={24}
            />
            <span className="font-semibold">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </span>
          </div>
          <div className="mt-2 space-y-3 px-2">
            <p>
              <span className="font-bold">Current Price:</span> 
              <span
                className={
                  coinData.market_data.current_price.usd > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
              {" "} ${coinData.market_data.current_price.usd.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Market Cap:</span> 
              <span
                className={
                  coinData.market_data.market_cap.usd > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
              {" "} ${coinData.market_data.market_cap.usd.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="font-bold">24h Volume:</span> 
              <span
                className={
                  coinData.market_data.total_volume.usd > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
              {" "} ${coinData.market_data.total_volume.usd.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="font-bold">Price Change (24h):</span>{" "}
              <span
                className={
                  coinData.market_data.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coinData.market_data.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
