import { Request, Response, NextFunction } from "express";

export const getPosts = (_req: Request, res: Response, _next: NextFunction) => {
    try {
        res.json(
            success: true,
            data: {
            getpost
        }
        )
    } catch (error) {
        next(error)
    }

}