import cors from 'cors'
import express, { Request, Response } from 'express'
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import coinRoutes from './routes/coinRoutes';
import { PriceUpdateJob } from './jobs/priceUpdateJob';

const app = express();

app.use(cors(
    {
        origin: '*', // Allow all origins, adjust as needed
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }
))
app.use(requestLogger);

const PORT = 4000

app.get("/health",(req:Request,res:Response)=>{
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service:'Crypto Backend API'
    });
})

app.use('/api', coinRoutes);

app.use((req:Request,res:Response) => {
    res.status(404).json({
    success:false,
    error:'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);

    // Start the price update job
    const priceUpdateJob = new PriceUpdateJob();
    priceUpdateJob.start();
})
