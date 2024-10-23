"use client";

import { useEffect, useState } from "react";
import { GitCommitVertical, TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the structure for the chart data
interface ChartData {
  date: string;
  price: number;
}

export const description = "A line chart with custom dots";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const popularSymbols = [
  { label: "Bitcoin", symbol: "bitcoin" },
  { label: "Ethereum", symbol: "ethereum" },
  { label: "Ripple", symbol: "ripple" },
  { label: "Litecoin", symbol: "litecoin" },
  { label: "Cardano", symbol: "cardano" },
  { label: "Polkadot", symbol: "polkadot" },
  { label: "Dogecoin", symbol: "dogecoin" },
  { label: "Solana", symbol: "solana" }
];

export function PriceChart() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [symbol, setSymbol] = useState<string>("bitcoin"); // Default symbol

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart`, {
          params: {
            vs_currency: 'usd', // Specify the currency, e.g., 'usd'
            days: 7,            // Number of days for the chart data (past week)
          },
        });

        const dailyPrices = response.data.prices.filter((price: [number, number], index: number, array: [number, number][]) => {
          const currentDate = new Date(price[0]).getDate();
          const previousDate = index > 0 ? new Date(array[index - 1][0]).getDate() : null;
          return currentDate !== previousDate; // Get the first price of each day
        }).map((price: [number, number]) => ({
          date: new Date(price[0]).toLocaleDateString(), // Convert timestamp to date string
          price: price[1], // Price value
        }));

        setChartData(dailyPrices);

        // Calculate price change
        const initialPrice = dailyPrices[0]?.price;
        const finalPrice = dailyPrices[dailyPrices.length - 1]?.price;
        const change = ((finalPrice - initialPrice) / initialPrice) * 100;
        setPriceChange(change);
      } catch (err) {
        setError("Failed to fetch cryptocurrency data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [symbol]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Card className="m-2 lg:w-[60%]">
      <CardHeader>
        <CardTitle>Price Trend - {symbol.toUpperCase()}</CardTitle>
        <CardDescription>Past Week</CardDescription>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)} // Update the symbol on select change
          className="mt-2 p-1 border rounded md:w-[20%]"
        >
          {popularSymbols.map((crypto) => (
            <option key={crypto.symbol} value={crypto.symbol}>
              {crypto.label}
            </option>
          ))}
        </select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)} // Format date (e.g., '10/01')
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="natural"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 24;
                return (
                  <GitCommitVertical
                    key={payload.date}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="var(--color-price)"
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {priceChange > 0 ? (
            <>
              Trending up by {priceChange.toFixed(2)}% this week{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(priceChange).toFixed(2)}% this week{" "}
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing price trend for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
