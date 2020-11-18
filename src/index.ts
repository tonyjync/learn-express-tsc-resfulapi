import express,{Express, NextFunction, Request,Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import HttpException from './exception/HttpException';
import errorMiddleware from './middlewares/error.middleware';
import * as userController from './controller/user';
import dotenv from "dotenv"
import mongoose from "mongoose";
import morgan from "morgan";

const {NOT_FOUND} = StatusCodes

const app:Express=express();
//服务器端显示日志的中间件
app.use(morgan("dev"));

app.use(express.json());
dotenv.config()

app.get('/',(_req:Request,res:Response)=>{
    res.json({message:'Welcome to user Restful Api'});
})

app.post('/user/userRegist',userController.userRegister)

app.post('/user/userLogin',userController.userLogin)


//访问路径不存抛出异常
app.use((_req:Request,_res:Response,next:NextFunction)=>{
    const error = new HttpException(NOT_FOUND,'The Page is Not Found');
    next(error);
})
//统一处理异常中间件
app.use(errorMiddleware);
//从.env读取配置参数据
const port:any=process.env.PORT || 6060;

//主程序
const main=async() => {
    //连接mongodb数据库
    await mongoose.connect(process.env.MONGO_CONNECT!, {useNewUrlParser: true,useUnifiedTopology: true});
    app.listen(port,()=>{
        console.log(`Running on http://localhost:${port}`)
    })
}

main()




