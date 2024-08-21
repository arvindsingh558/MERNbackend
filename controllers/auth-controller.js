const User = require("../models/user-model")
const bcrypt=require("bcryptjs");

//Home logic
const home=async (req,res)=>{
    try {
        res.status(200).send("Hello World");
    } catch (err) {
        console.log(err)
    }
}
//Registration logic

//1.Get Registration Data: Retrieve user data (username,email,password).
//2.Check Email Exitence :Check if the email is already registered.
//3.Hash Password: Securely hash the password.
//4.Create User: Create a new user with hashed password.
//5.Save to DB: Save user data to the database.
//6.Respond: Respond with "Registration Successful " or handle errors.


const register=async (req,res)=>{
    try {
        // console.log(req.body)
        const {username,email,phone,password}=req.body;

        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"Email already exist"})
        }

        // hash the password 
        // const saltRound=10;
        // const hash_password=await bcrypt.hash(password,saltRound)



        // const userCreated =await User.create({username,email,phone,password:hash_password})
        const userCreated =await User.create({username,email,phone,password})

        res.status(201).send({msg:"Registration Successful" ,
        token: await userCreated.generateToken(),
        userId:userCreated._id.toString()});
    } catch (err) { 
        res.status(404).send({msg:"Internal Server error"})
    }
}

//user login logic
const login =async (req,res)=>{
    try {
        const {email,password}=req.body
        const userExist=await User.findOne({email})

        if(!userExist){
            res.status(400).json({message:"Invalid Credentials"})
        }
        // const user=await bcrypt.compare(password,userExist.password)
        const user= await userExist.comparePassword(password)

        if(user){
            res.status(201).send({msg:"Login Successful" ,
            token: await userExist.generateToken(),
            userId:userExist._id.toString()});
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }

    } catch (err) {
        res.status(404).send({msg:"Internal Server error"})
    }
}

//user logic 

const user=async(req, res)=>{
    try {
        const userData=req.user;
        console.log(userData)
        return res.status(200).json({userData})
    } catch (error) {
        console.log(`Error from the user route ${error}`)
    }
}


module.exports={home,register,login,user}