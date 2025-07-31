const axios = require("axios");

class CoinGeckoService {
    baseUrl;

    constructor(){
        this.baseUrl = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
        this.apiKey = process.env.COINGECKO_API_KEY;
    }

    async fetchCoinsData(){
        try{
            const response = await axios.get(`${this.baseUrl}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                x_cg_demo_api_key: this.apiKey
            },
            });

            return response.data.map(this.transformCoinData)
        }catch(error){
        console.error('Error fetching Data from CoinGecko: ', error)
            throw new Error('Failed to fetch data from CoinGecko')
        }
    }

    transformCoinData( coin){
        return {
            coinId: coin.id,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            marketCap: coin.market_cap,
            changePercent: coin.price_change_percentage_24h || 0,
            timestamp: new Date(coin.last_updated)
        }
    }
}

const coinGeckoService = new CoinGeckoService();

module.exports = { coinGeckoService };
