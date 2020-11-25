import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import HttpException from "../exception/HttpException";
import User from "../models/User"
import { JwtPayload } from "../types/Jwt"
const checkAuthMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    // const authorizationHeaher = req.headers["authorization"];
    const authorizationHeader = req.headers["authorization"];
    if (authorizationHeader) {
        const token = authorizationHeader.split("Bearer ")[1];
        if (token) {
            try {
                const jwtData = jwt.verify(
                    token,
                    process.env.JWT_SECRET_KEY!
                ) as JwtPayload;
                const user = await User.findById(jwtData.id)
                if (user) {
                    req.currentUser = user;
                    return next()
                } else {
                    return next(new HttpException(StatusCodes.UNAUTHORIZED, "No such user"));
                }
            } catch (error) {
                return next(new HttpException(StatusCodes.UNAUTHORIZED, "Invalid/Expired token"))
            }
        }
    };
    next(new HttpException(StatusCodes.UNAUTHORIZED, "Authorization header must be provided"))
}

export default checkAuthMiddleware;