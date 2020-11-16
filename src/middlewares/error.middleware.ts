import { NextFunction,Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "src/exception/HttpException";


const errorMiddleware=(
    error:HttpException,
    _req:Request,
    res:Response,
    next:NextFunction
    )=>{
    const status=error.status || StatusCodes.INTERNAL_SERVER_ERROR
    const message=error.message || 'Somethin went Wrong'
    res.status(status).json({
        success:false,
        message,
        error:error.errors
    });
    next();
}
export default errorMiddleware;