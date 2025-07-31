const cron = require('node-cron');
const { CoinService } = require('../services/coinService');


class PriceUpdateJob{
    isRunning = false;
    coinService;

    constructor(){
        this.coinService = new CoinService();
    }

    start(){
        cron.schedule('*/20 * * * *', async () => {
            console.log('Price update job triggered');
            if(this.isRunning) return;

            this.isRunning = true;
            console.log('Starting price update job...');

            try {
                const result = await this.coinService.storePriceSnapshot();
                console.log(`Price update job completed successfully. Stored ${result.count} coins.`);
            } catch (error) {
                console.error('Error in price update job:', error);
            } finally {
                this.isRunning = false;
            }
        });
        console.log('Price update job scheduled to run every 20 minutes.');
    }

    async runmanually(){
        if(this.isRunning) return;

        if (this.isRunning){
            console.log('Price update job is already running.');
            return;
        }

        this.isRunning = true;
        console.log('Running price update job manually...');

        try{
            const result = await this.coinService.storePriceSnapshot();

            console.log(`Manual price update job completed successfully. Stored ${result.count} coins.`);

        }catch(error){
            console.error('Error in manual price update job:', error);
            throw error;
        }finally{
            this.isRunning = false;
        }
    }
}

module.exports = { PriceUpdateJob };
