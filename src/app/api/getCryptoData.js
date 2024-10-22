import axios from 'axios';

async function fetchCryptoData(cryptoId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
    const data = response.data;

    const currentPrice = data.market_data.current_price.usd; // Current price in USD
    const marketCap = data.market_data.market_cap.usd; // Market cap in USD
    const priceChangePercentage = data.market_data.price_change_percentage_24h; // Price change percentage over the last 24 hours
    const tradingVolume = data.market_data.total_volume.usd; // Trading volume in USD over the last 24 hours

    return {
      currentPrice,
      marketCap,
      priceChangePercentage,
      tradingVolume,
    };
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return null;
  }
}

// Example usage:
fetchCryptoData('bitcoin').then(data => {
  if (data) {
    console.log(`Current Price: $${data.currentPrice}`);
    console.log(`Market Cap: $${data.marketCap}`);
    console.log(`Price Change (24h): ${data.priceChangePercentage}%`);
    console.log(`Trading Volume (24h): $${data.tradingVolume}`);
  }
});
