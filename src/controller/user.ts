import { NextFunction,Request,Response } from "express";
import User from "../models/User";

export const userRegister= async (req:Request,res:Response,_next:NextFunction)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
      });
  
      const resUser = await newUser.save();
    res.send(resUser)

}
