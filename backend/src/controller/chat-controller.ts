import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async( req:Request,res:Response,next:NextFunction)=>{

    const {message} = req.body;

    try{
    const user = await User.findById(res.locals.jwtData.id)
    if(!user){
        return res.status(401).json({message:'USer not Registerred or token malfunctioned'})
    }

    const chats = user.chats.map(({role,content})=>({role,content})) as ChatCompletionRequestMessage[];
    chats.push({content:message,role:'user'})
    user.chats.push({content:message,role:'user'})

    const config = configureOpenAI();
    const openai = new OpenAIApi(config)
    const chatResponse = await openai.createChatCompletion({
        model:"gpt-3.5-turbo",
        messages:chats,
    });
    user.chats.push(chatResponse.data.choices[0].message)

    await user.save();
    return res.status(200).json({chats:user.chats})
}catch(err){
    console.log(err)
    return res.status(500).json({message:'something went wrong'})
}
}

export const sendChatsToUser = async( req:Request,res:Response,next:NextFunction)=>{

    
    try{

    
    const user = await User.findById(res.locals.jwtData.id)
    if(!user){
        return res.status(401).json({message:'USer not Registerred or token malfunctioned'})
    }

   if(user._id.toString() !== res.locals.jwtData.id){
    return res.status(401).send("permission didn't match");
   }
    return res.status(200).json({chats:user.chats})
}catch(err){
    console.log(err)
    return res.status(500).json({message:'something went wrong'})

}
}

export const deletechats = async(
    req:Request,res:Response,next:NextFunction
)=>{
    try{
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send('User not registered OR Token malfunction')
        }
        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission din't match ")
        }
        //@ts-ignore
        user.chats=[];

        await user.save();
        return res.status(200).json({messasge:'OK'})

    }catch(error){
        console.log(error);
        return res.status(200).json({message:'Error',cause:error.message})

    }

}