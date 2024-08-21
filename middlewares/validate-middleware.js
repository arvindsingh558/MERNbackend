

const validate =(schema)=> async (req, res, next)=>{
    try {
        const parseBody=await schema.parseAsync(req.body)
        req.body=parseBody
        next()
    } catch (err) {
        const message="Fill the input properly"
        const extraDetails=err.errors[0].message;
        // console.log(message)
        // res.status(400).json({msg:message})
        const status=422;
        const error={
            status,message,extraDetails
        }
        console.log(message)
        next(error)
    }
}

module.exports=validate; 