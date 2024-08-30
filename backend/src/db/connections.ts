import { connect, disconnect } from "mongoose";

async function connecttoDatabase(){
    try{
        await connect(process.env.MONGODB_URL)

    }catch(error){
        console.log(error);
        throw new Error('Cannot Connect to DataBase: MongoDB')
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect();

    }catch(error){
        console.log(error)
        throw new Error ('Couldnot Disconnect')
    }
}
export { connecttoDatabase,disconnectFromDatabase}