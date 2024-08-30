import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const validate = (validations:ValidationChain[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        for (let validation of validations){
            const result = validation.run(req);
            if(!(await result).isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        return res.status(422).json({error:errors.array()})

    }
}
export const loginValidator = [
    body('email').trim().isEmail().withMessage('Email is Required'),
    body('password').trim().isLength({min:6}).withMessage('Password  must be atlaeast 6 character')
]
export const signupValidator =[
    body('name').notEmpty().withMessage('name is required'),
    ...loginValidator,
]

export const chatCompletionValidator =[
    body('message').notEmpty().withMessage('message is required'),
    
]