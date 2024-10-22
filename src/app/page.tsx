import CoinCards from "@/components/CoinCards";
import { PriceChart } from "@/components/LineChart";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="w-full">
     <Navbar />
     <CoinCards />
     <PriceChart />
    </div>
  );
}
