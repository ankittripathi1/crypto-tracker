import { CoinData , CoinGeckoResponse} from "../types/coin";
import axios from "axios";

class CoinGeckoService {
    private readonly baseUrl: string;

    constructor(){
        this.baseUrl = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
    }

    async fetchCoinsData(): Promise<CoinData[]>{
        try{
            const response = await axios.get(`${this.baseUrl}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
            },
            });

            return response.data.map(this.transformCoinData)
        }catch(error){
        console.error('Error fetching Data from CoinGecko: ', error)
            throw new Error('Failed to fetch data from CoinGecko')
        }
    }

    private transformCoinData( coin: CoinGeckoResponse):CoinData{
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

export const coinGeckoService = new CoinGeckoService();
