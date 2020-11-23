import validator from "validator";
import { IUserDocument } from "../models/User";
import isEmail from 'validator/lib/isEmail';

const { isEmpty, equals } = validator
//Partial 将继承的属性变成可选
interface RegisterInputError extends Partial<IUserDocument> {
    confirmPassword?: string;
}

export interface LoginInputError extends Partial<IUserDocument> {
    general?: string;
}
//登录验证
export const validateLoginInput = (
    username: IUserDocument['username'],
    password: IUserDocument['password']
) => {
    const errors: LoginInputError = {};
    if (isEmpty(username.trim())) {
        errors.username = "Username must be not empty"
    }

    if (isEmpty(password.trim())) {
        errors.password = "Password must be not empty"
    }

    return { errors, valid: Object.keys(errors).length < 1 }
}
//注册验证
export const validateRegisterInput = (
    username: IUserDocument['username'],
    email: IUserDocument['email'],
    password: IUserDocument['password'],
    confirmPassword: IUserDocument['password']
) => {
    //定义一个存放错误的对像，放入各字段校验的结果，因为有可能没有错误的，所以这些对像的属性要可选，最后判断对像字段长度确认校验是否通过
    const errors: RegisterInputError = {};
    if (isEmpty(username.trim())) {
        errors.username = 'Username must be not empty'
    }

    if (isEmpty(password.trim())) {
        errors.password = 'Password must be not empty'
    }

    if (isEmpty(confirmPassword.trim())) {
        errors.confirmPassword = 'ConfirmPassword must be not empty'
    }

    if (!equals(password.trim(), confirmPassword.trim())) {
        errors.confirmPassword = 'ConfirmPassword and Password is not equals'
    }

    if (isEmpty(email.trim())) {
        errors.email = 'Email must be not empty'
    }


    if (!isEmail(email.trim())) {
        errors.email = 'Email format is wrong'
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}