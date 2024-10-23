import CoinCards from "@/components/CoinCards";
import { PriceChart } from "@/components/LineChart";
import Navbar from "@/components/Navbar";
import { Converter } from "@/components/Converter";


export default function Home() {
     
  return (
    <div className="w-full">
     <Navbar />
     <CoinCards />
     <div className="lg:flex w-full justify-between">
     <PriceChart />
     <Converter />
     </div>
    </div>
  );
}
