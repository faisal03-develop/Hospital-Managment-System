import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        dbName: "hospital",
    }).then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        console.log(`Failed to connect to the database:  ${err}`);
    })
}