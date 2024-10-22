import React from "react";
import wallet from "@/assets/Icon - Wallet.png";
import btcIcon from "@/assets/Icon - BTC.png";
import ethIcon from "@/assets/Icon - ETH.png";
import solIcon from "@/assets/Icon - SOL.png";
import btcLine from "@/assets/Vector (8).png";
import ethLine from "@/assets/Vector (9).png";
import solLine from "@/assets/Vector (10).png";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

function CoinCards() {
  const items = [
    {
      coin: "BTCUSDT",
      iconImg: btcIcon,
      balance: "$23,350",
      gains: "-14.98",
      percent: "+24.00%",
      graph: btcLine,
    },
    {
      coin: "ETHUSDT",
      iconImg: ethIcon,
      balance: "$23,350",
      gains: "+24.98",
      percent: "+24.00%",
      graph: ethLine,
    },
    {
      coin: "SOLUSDT",
      iconImg: solIcon,
      balance: "$23,350",
      gains: "+14.98",
      percent: "+24.00%",
      graph: solLine,
    },
  ];
  return (
    <div className="p-2 mt-5 space-y-5 lg:flex justify-between gap-3">
      <div className="lg:w-[25%] p-0 shadow-lg">
        <CardHeader className="flex flex-row gap-2 font-semibold">
          <Image src={wallet} alt="wallet" width={30} />
          <p className="text-sm">Estimated Balance</p>
        </CardHeader>
        <CardContent>
          <h1 className="text-4xl font-semibold">$123,456</h1>
        </CardContent>
        <CardFooter>
          <p className="text-sm lg:space-x-2 lg:text-xs space-x-4 text-gray-500">
            Monthly Profit{" "}
             <span className="ml-4 lg:ml-2 text-green-500">+8,350,56</span>{" "}
            <span className="text-green-500 p-1 rounded-full bg-green-200">
              +18.32%
            </span> 
          </p>
        </CardFooter>
      </div>
      {items.map((item, index) => {
        return (
          <Card key={index} className="lg:w-[25%]">
            <CardHeader className="flex flex-row gap-2 font-semibold items-center">
              <Image src={item.iconImg} alt={`${item.coin} icon`} width={30} />
              <div className="text-sm self-start">
                <p>{item.coin}</p>
                <p className="text-xs text-gray-500">
                    {
                        item.coin.includes("BTC") ?
                        "Bitcoin" :
                        item.coin.includes("ETH") ?
                        "Etherum" :
                        "Solana"
                    }
                </p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">{item.balance}</h1>
              <Image src={item.graph} alt={`${item.coin} line graph`} />
            </CardContent>
            <CardFooter>
              <p className="text-sm space-x-4 text-gray-500">
                PNL daily{" "}
                <span
                  className={`ml-4 ${
                    item.gains.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {item.gains}
                </span>{" "}
                <span className="text-green-500 p-1 rounded-full bg-green-200">
                  {item.percent}
                </span>
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default CoinCards;
