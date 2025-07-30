import { prisma } from "../config/database";
import { CoinData } from "../types/coin";
import { coinGeckoService } from "./coinGeckoService";

export class CoinService{
    async getCurrentCoinsData(): Promise<CoinData[]>{
        try{
            return await coinGeckoService.fetchCoinsData();
        }catch(error){
            console.error('Error in getCurrentCoinsData',error);
            throw error;
        }

    }

    async storePriceSnapshot(): Promise<{success:boolean; count:number}>{
        try{
            const coinData = await  coinGeckoService.fetchCoinsData();
            const currentDataPromises = coinData.map(coin =>
                prisma.currentData.upsert({
                where: { coinId: coin.coinId},
                update:{
                    name: coin.name,
                    symbol: coin.symbol,
                    price: coin.price,
                    marketCap: coin.marketCap,
                    changePercent: coin.changePercent,
                    timestamp:coin.timestamp 
                },
                create:{
                    coinId: coin.coinId,
                    name: coin.name,
                    symbol: coin.symbol,
                    price: coin.price,
                    marketCap: coin.marketCap,
                    changePercent: coin.changePercent,
                    timestamp:coin.timestamp 
                }
            }));

            const historyDataPromises =  coinData.map(coin=>
                prisma.historyData.create({
                    data: {
                        coinId: coin.coinId,
                        name: coin.name,
                        symbol: coin.symbol,
                        price: coin.price,
                        marketCap: coin.marketCap,
                        changePercent: coin.changePercent,
                        timestamp: coin.timestamp
                    }
                })
            );

            await Promise.all([...currentDataPromises, ...historyDataPromises]);

            return { success: true, count: coinData.length };
        }catch(error){
            console.error('Error storing price snapshot: ', error);
            throw new Error('Failed to store price snapshot');
        }
    }

    async getCoinHistory(coinId: string): Promise<any[]> {
        try{

            const historyData = await prisma.historyData.findMany({
                where:{ coinId },
                orderBy: {timestamp: 'desc'},
                take: 168
            })

            return historyData.map((record:CoinData) => ({
                coinId: record.coinId,
                name: record.name,
                symbol: record.symbol,
                price: record.price,
                marketCap: record.marketCap,
                changePercent: record.changePercent,
                timestamp: record.timestamp
            }));

        }catch(error){
            console.error('Error in get Coin History', error);
            throw new Error('Failed to retrieve coin history');
        }
    }

    async getAllCoinHistory(): Promise<any[]> {
        try{

            const historyData = await prisma.historyData.findMany({
                orderBy: {timestamp: 'desc'},
                take: 168
            })

            return historyData.map((record:CoinData) => ({
                coinId: record.coinId,
                name: record.name,
                symbol: record.symbol,
                price: record.price,
                marketCap: record.marketCap,
                changePercent: record.changePercent,
                timestamp: record.timestamp
            }));

        }catch(error){
            console.error('Error in get All Coin History', error);
            throw new Error('Failed to retrieve all coin history');
        }
    }
}
