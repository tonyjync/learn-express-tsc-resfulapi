import express,{Express, NextFunction, Request,Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import HttpException from './exception/HttpException';
import errorMiddleware from './middlewares/error.middleware';
import * as userController from './controller/user'

const {NOT_FOUND} = StatusCodes

const app:Express=express();

app.use(express.json());

app.get('/',(_req:Request,res:Response)=>{
    res.send('Hello World!');
})

app.post('/user/userRegist',userController.userRegister)

app.use((_req:Request,_res:Response,next:NextFunction)=>{
    const error = new HttpException(NOT_FOUND,'The Page is Not Found');
    next(error);
})

app.use(errorMiddleware);



const port:any=process.env.PORT || 6060;

const main=()=>{
    app.listen(port,()=>{
        console.log(`Running on http://localhost:${port}`)
    })
}

main()




