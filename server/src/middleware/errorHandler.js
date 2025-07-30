const errorHandler = ( error, req, res, next) =>{
    console.log("ERROR:", error);

    res.status(500).json({
    success:false,
    error: 'Internal server error',
    message: process.env.Node_ENV === 'development' ? error.message : undefined, });
};

module.exports = { errorHandler };
