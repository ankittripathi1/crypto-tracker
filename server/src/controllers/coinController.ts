import { Request, Response } from "express";
import { CoinService } from "../services/coinService"
import { ApiResponse } from "../types/coin";

const coinService = new CoinService();

    export const getCoins = async (req: Request, res:Response) => {
        try{
            const coinData = await coinService.getCurrentCoinsData();
            const response: ApiResponse<any> = {
                success: true,
                data: coinData,
                message: "Coins data fetched successfully"
            }
            res.json(response);
        }catch(error){
            console.error('Error in getCoins:', error);

            const response: ApiResponse<any> = {
                success: false,
                message: "Failed to fetch coins data"
            }

            res.status(500).json(response);
        }
    }

    export const storePriceHistory = async (req: Request, res:Response) => {
        try{
            const result = await coinService.storePriceSnapshot();

            const response: ApiResponse<any> = {
                success: result.success,
                data: { count: result.count },
                message:`Successfully stored price snapshot for ${result.count} coins` 
            };
            res.json(response);
        }catch(error){
            console.error(`Error in storePriceHistory:`, error);

            const response: ApiResponse<any> = {
                success: false,
                message: 'Failed to store price snapshot'
            }
            res.status(500).json(response);
        }
    }

    export const getCoinHistory = async (req: Request, res:Response) => {
        try{
            const { coinId } = req.params;
            const historyData = await coinService.getCoinHistory(coinId);

            const response: ApiResponse<any> = {
                success: true,
                data: historyData,
                message: `History data for coin ${coinId} fetched successfully`  
            }
            res.json(response);
        }catch(error){
            console.error(`Error in getCoinHistory:`, error);

            const response: ApiResponse<any> = {
                success: false,
                message: 'Failed to fetch coin history'
            }

            res.status(500).json(response);
        }
    }

    export const getAllCoinHistory = async (req: Request, res:Response) => {
        try{
            const historyData = await coinService.getAllCoinHistory();

            const response: ApiResponse<any> = {
                success: true,
                data: historyData,
                message: `All history data fetched successfully`  
            }
            res.json(response);
        }catch(error){
            console.error(`Error in getAllCoinHistory:`, error);

            const response: ApiResponse<any> = {
                success: false,
                message: 'Failed to fetch all coin history'
            }

            res.status(500).json(response);
        }
    }