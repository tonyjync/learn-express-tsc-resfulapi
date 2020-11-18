import { IUserDocument } from "src/models/User";

export interface JwtPayload{
    id:IUserDocument["_id"]
}