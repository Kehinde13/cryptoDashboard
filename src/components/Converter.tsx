"use client"
import * as React from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Converter() {
  const [amount, setAmount] = React.useState<string>("");
  const [crypto, setCrypto] = React.useState<string>("");
  const [currency, setCurrency] = React.useState<string>("");
  const [convertedAmount, setConvertedAmount] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleConvert = async () => {
    if (!amount || !crypto || !currency) {
      setError("Please fill in all fields");
      return;
    }

    setError(null);
    try {
      // Fetch the conversion rate from CoinGecko
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: crypto,
            vs_currencies: currency,
          },
        }
      );

      const rate = response.data[crypto][currency];
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result);
    } catch (err) {
      setError("Failed to convert. Please try again.");
      console.error(err);
    }
  };

  const formatAmount = (value: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="lg:w-[40%] m-2">
      <CardHeader>
        <CardTitle>Converter</CardTitle>
        <CardDescription>Convert Crypto to any fiat currency</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="crypto">Crypto</Label>
              <Select onValueChange={setCrypto}>
                <SelectTrigger id="crypto">
                  <SelectValue placeholder="Select Cryptocurrency" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                  <SelectItem value="litecoin">Litecoin (LTC)</SelectItem>
                  <SelectItem value="dogecoin">Dogecoin (DOGE)</SelectItem>
                  <SelectItem value="solana">Solana (SOL)</SelectItem>
                  <SelectItem value="cardano">Cardano (ADA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={setCurrency}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="ngn">NGN</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {convertedAmount !== null && (
          <p className="text-blue-500 mt-5">
            Converted Amount: {formatAmount(convertedAmount, currency)}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setConvertedAmount(null)}>
          Reset
        </Button>
        <Button className="bg-blue-400" onClick={handleConvert}>
          Convert
        </Button>
      </CardFooter>
    </Card>
  );
}
