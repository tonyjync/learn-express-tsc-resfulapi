import express,{Express, NextFunction, Request,Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import HttpException from './exception/HttpException';
import errorMiddleware from './middlewares/error.middleware';
import * as userController from './controller/user';
import mongoose from "mongoose";
import morgan from "morgan";

const {NOT_FOUND} = StatusCodes

const app:Express=express();
//服务器端显示日志的中间件
app.use(morgan("dev"));

app.use(express.json());

app.get('/',(_req:Request,res:Response)=>{
    res.json({message:'Welcome to user Restful Api'});
})

app.post('/user/userRegist',userController.userRegister)



app.use((_req:Request,_res:Response,next:NextFunction)=>{
    const error = new HttpException(NOT_FOUND,'The Page is Not Found');
    next(error);
})

app.use(errorMiddleware);



const port:any=process.env.PORT || 6060;

const main=async () => {
    await mongoose.connect("mongodb+srv://testapi:testapi@todo.xhisi.mongodb.net/todo?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
    app.listen(port,()=>{
        console.log(`Running on http://localhost:${port}`)
    })
}

main()




