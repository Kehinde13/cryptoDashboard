import axios from 'axios';

export default async function handler(req, res) {
  const { symbol } = req.query;
  const coinId = symbol.toLowerCase(); // CoinGecko requires the coin ID in lowercase, e.g., 'bitcoin' for BTC.

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: 7, // Fetch data for the past 7 days
      },
    });

    const data = response.data.prices.map((price) => ({
      time: new Date(price[0]).toLocaleDateString(),
      value: price[1],
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching historical data:', error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
}
