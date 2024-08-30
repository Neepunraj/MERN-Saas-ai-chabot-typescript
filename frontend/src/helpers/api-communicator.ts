import axios from "axios"


export const loginUser = async(email:string,password:string)=>{
    const res= await axios.post('/user/login',{email,password})
    if(res.status !== 200){
        throw new Error('unable to login')
    }
    const data = await res.data;
    return data;

}
export const signupUser= async(name:string, email:string,password:string)=>{
    const res= await axios.post('/user/signup',{name,email,password})
    if(res.status !== 201){
        throw new Error('unable to signup')
    }
    const data = await res.data;
    return data;

}
export const checkAuthStatus= async()=>{
    const res= await axios.get('/user/auth-status')
    if(res.status !== 200){
        throw new Error('unable to authenticate')
    }
    const data = await res.data;
    return data;

}
export const sendChatRequest= async(message:string)=>{
    const res= await axios.post('/chat/new',{message})
    if(res.status !== 200){
        throw new Error('unable to send chat ')
    }
    const data = await res.data;
    return data;

}

export const getUserChat = async ()=>{
    const res = await axios.get('/chat/all-chats')
    if(res.status!== 200){
        throw  new Error('unable to send Chats ')
    }
    const data = await res.data;
    return data;
}
export const deleteUserChats= async ()=>{
    const res = await axios.delete('chat/delete')

    if(res.status!==200){
        throw new Error('ubale to delete Chats')
    }
    const data = await res.data;
    return data;
}
export const logoutUser = async()=>{
    const res = await axios.get('/user/logout')
    if(res.status !== 200){
        throw new Error ('Unable to delete Chats')
    }
    const data = await res.data;
    return data;
}