const Service=require("../models/service-model")

const services = async (req, res) => {
    try {
        const response=await Service.find();

        if(!response){
            res.status(404).json({msg:"No Service Found"})
            return
        }
        res.status(200).json({msg:response})

    } catch (err) {
        console.log("Services", err)
    }
}

module.exports=services;