import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import validator from "validator";
import HttpException from "../exception/HttpException";
import { StatusCodes } from "http-status-codes";
import { IUserDocument } from "../models/User";


export const getPosts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await Post.find();

        res.json({
            success: true,
            data: { posts }
        })
    } catch (error) {
        next(error)
    }

}

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id);
        if (post) {
            res.json({
                success: true,
                data: { post }
            })
        } else {
            throw new HttpException(StatusCodes.NOT_FOUND, "Post not found")
        }

    } catch (error) {
        next(error)
    }

}

export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = req.currentUser as IUserDocument;
        //得到前台提交的数据
        const { body } = req.body;
        //验证数据是否为空
        if (validator.isEmpty(body.trim())) {
            throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, "Body must be not empty", {
                body: "The body must be not empty"
            })
        }

        //创建记录
        const newPost = new Post({
            body,
            username: user.username,
            user: user.id,
            createAt: new Date().toISOString()
        })
        //保存记录
        await newPost.save();
        //返回结果
        res.json({ success: true, data: { message: "created successfully" } })
    } catch (error) {
        next(error)
    }
}