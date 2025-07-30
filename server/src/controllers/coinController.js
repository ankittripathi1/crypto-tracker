const { CoinService } = require("../services/coinService")

const coinService = new CoinService();

    const getCoins = async (req, res) => {
        try{
            const coinData = await coinService.getCurrentCoinsData();
            const response = {
                success: true,
                data: coinData,
                message: "Coins data fetched successfully"
            }
            res.json(response);
        }catch(error){
            console.error('Error in getCoins:', error);

            const response = {
                success: false,
                message: "Failed to fetch coins data"
            }

            res.status(500).json(response);
        }
    }

    const storePriceHistory = async (req, res) => {
        try{
            const result = await coinService.storePriceSnapshot();

            const response = {
                success: result.success,
                data: { count: result.count },
                message:`Successfully stored price snapshot for ${result.count} coins` 
            };
            res.json(response);
        }catch(error){
            console.error(`Error in storePriceHistory:`, error);

            const response = {
                success: false,
                message: 'Failed to store price snapshot'
            }
            res.status(500).json(response);
        }
    }

    const getCoinHistory = async (req, res) => {
        try{
            const { coinId } = req.params;
            const historyData = await coinService.getCoinHistory(coinId);

            const response = {
                success: true,
                data: historyData,
                message: `History data for coin ${coinId} fetched successfully`  
            }
            res.json(response);
        }catch(error){
            console.error(`Error in getCoinHistory:`, error);

            const response = {
                success: false,
                message: 'Failed to fetch coin history'
            }

            res.status(500).json(response);
        }
    }

    const getAllCoinHistory = async (req, res) => {
        try{
            const historyData = await coinService.getAllCoinHistory();

            const response = {
                success: true,
                data: historyData,
                message: `All history data fetched successfully`  
            }
            res.json(response);
        }catch(error){
            console.error(`Error in getAllCoinHistory:`, error);

            const response = {
                success: false,
                message: 'Failed to fetch all coin history'
            }

            res.status(500).json(response);
        }
    }

module.exports = {
    getCoins,
    storePriceHistory,
    getCoinHistory,
    getAllCoinHistory
};