import mongoose from "mongoose";
let isConnect=false;

export const connectToMongo=async()=>{

    if(isConnect===true)
    {
        console.log("Already Connected to MongoDB");
        return;
    }
    else{
        try
        {
            await  mongoose.connect(process.env.MONGO_URI,{dbName:'MumbaiDB'});
            console.log("Connected to MongoDB");
            isConnect=true;
        }
        catch(error)
        {
           console.log("Mongo DB Connection Error",error);
        }
    }
}
