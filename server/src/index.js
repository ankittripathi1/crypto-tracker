const cors = require('cors');
const express = require('express');
const { requestLogger } = require('./middleware/requestLogger');
const { errorHandler } = require('./middleware/errorHandler');
const coinRoutes = require('./routes/coinRoutes');
const { PriceUpdateJob } = require('./jobs/priceUpdateJob');

const app = express();

app.use(cors(
    {
        origin: '*', // Allow all origins, adjust as needed
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }
))
app.use(requestLogger);

const PORT = process.env.PORT || 4000

app.get("/health",(req,res)=>{
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service:'Crypto Backend API'
    });
})

app.use('/api', coinRoutes);

app.use((req,res) => {
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
