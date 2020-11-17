import { Schema,model,Model, Document} from "mongoose";

export interface IUserDocument extends Document{
    username:string;
    password:string;
    email:string;
    _doc?: IUserDocument;
}
const userSchema:Schema = new Schema({
    username:String,
    password:String,
    email:String
});

const User: Model<IUserDocument>  = model<IUserDocument>("User", userSchema);


export default User;