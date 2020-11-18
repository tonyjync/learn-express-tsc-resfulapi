import { NextFunction,Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import HttpException from "../exception/HttpException";
import { validateRegisterInput } from "../utils/validator";
import User, { IUserDocument } from "../models/User";
// import bcrypt from 'bcryptjs';

export const userLogin = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{

    }catch(error){
        next(error);
    }
    res.json(req.body)
}


export const userRegister= async (req:Request,res:Response,next:NextFunction): Promise<void>=>{
    try{
    //解析提交参数
    const {username,email,password,confirmPassword} =req.body;
    //验证提交参数
    const {errors,valid}=validateRegisterInput(username,email,password,confirmPassword);
    //判断验证给果
    if(!valid){
        //抛出异常后后面不执行，被catch到后再执行后面的程序
        throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY,"User register input error",errors);
    }

    //判断用户名是否存在
    const user=await User.findOne({username});
    if(user){
        throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY,"Username is taken",{
            username:"The username is taken"
        })
    }
    //密码加密码
    // const bcryptpassword=await bcrypt.hash(password,10);
    //换成了实例钩子
    //创建数据库记录
    const newUser: IUserDocument  = new User({username,email,password});
    //保存到mongoo数据库
    const resUser: IUserDocument  = await newUser.save();
    const token:string=resUser.generateToken();
    //返回数据到前台
    res.json({
        success:true,
        data:{
            token,
            user:resUser._doc
        }
    })
    }catch(error){
        next(error);
    }
}
