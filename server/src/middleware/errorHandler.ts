import { NextFunction, Request, Response } from "express";

export const errorHandler = ( error: Error, req:Request, res:Response, next:NextFunction) =>{
    console.log("ERROR:", error);

    res.status(500).json({
    success:false,
    error: 'Internal server error',
    message: process.env.Node_ENV === 'development' ? error.message : undefined, });
};
