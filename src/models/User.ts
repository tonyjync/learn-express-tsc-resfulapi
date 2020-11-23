import { Schema,model,Model, Document,HookNextFunction} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

export interface IUserDocument extends Document{
    username:string;
    password:string;
    email:string;
    _doc?: IUserDocument;
    generateToken:()=>string;
}
const userSchema:Schema = new Schema({
    username:String,
    password:String,
    email:String
},{ timestamps: true});
//定义实例方法，生成token 需要配置JWT_SECRET_KEY 钥匙和EXPIRES_IN token有效期
userSchema.methods.generateToken=function():string{
    
 return jwt.sign({id:this.id},process.env.JWT_SECRET_KEY!,{expiresIn:process.env.EXPIRES_IN});
}

//定义保存前对密码加密
userSchema.pre<IUserDocument>('save',async function save(this:IUserDocument,next:HookNextFunction){
    
    //因为这个在保存的时候就会执行，所以当密码没有改变的时候需要执行就直接返回
    if (!this.isModified("password")) {
        return next();
      }
    
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
      } catch (error) {
        next(error);
      }
})


const User: Model<IUserDocument>  = model<IUserDocument>("User", userSchema);

 

export default User;