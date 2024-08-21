const mongoose=require("mongoose")

const URI=process.env.MONGODB_URI;

connectDb=async ()=>{
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful to DB");
    } catch (error) {
        console.error("Database connection failed");
        console.log(error)
        process.exit(0);
    }
}

module.exports=connectDb;