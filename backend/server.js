import app from "./app.js";
import claudinary from 'claudinary';

claudinary.v2.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET,
})


app.listen(process.env.PORT, (req,res)=>{
    console.log("Server is running on port 8000");
})