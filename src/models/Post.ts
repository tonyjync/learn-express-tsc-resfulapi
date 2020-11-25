import { Schema, model, Document } from "mongoose";
import { IUserDocument } from "./User";

export interface IPostDocument extends Document {
    body: string;
    username: IUserDocument["username"];
    createAt: string;
    user: IUserDocument["_id"];
}


const postSchema: Schema = new Schema({
    body: String,
    username: String,
    createAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})

const Post = model<IPostDocument>("Post", postSchema);
export default Post;

