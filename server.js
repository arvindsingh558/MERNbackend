require('dotenv').config();
const express=require("express");
const cors=require("cors")
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router")
const serviceRoute=require("./router/service-router")
const connectDb=require("../server/utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH,HEAD",
    credentials:true,
}

app.use(cors(corsOptions))


//Middleware
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/form",contactRoute)
app.use("/api/data",serviceRoute)


app.use(errorMiddleware)

connectDb().then(()=>{
    const port=5000;
    app.listen(port,()=>{
        console.log(`Server is running at ${port} port......`);
    })
})

