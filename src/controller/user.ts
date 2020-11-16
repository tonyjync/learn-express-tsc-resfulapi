import { NextFunction,Request,Response } from "express";

export const userRegister=(_req:Request,res:Response,next:NextFunction):void =>{
    // res.set('Content-Type', 'text/plain')
    // res.send(req.body);
    res.status(200).send('Ok')
    // res.end();
    next();
}
