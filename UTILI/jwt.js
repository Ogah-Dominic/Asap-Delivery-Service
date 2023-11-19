const jwt = require("jsonwebtoken")
const User = require("../MODEL/model")

const GenToken = async(id, time)=>{
    const token = await jwt.sign(
        {
         userID: id   
        },
        process.env.JWT_SECRET,
        {
            expiresIn: time
        }
    );
    return token
}

const decodeToken = async(token)=>{
    let user = null;
    await jwt.verify(token, process.env.JWT_SECRET, async(error, data)=>{
        if(error){
            throw error
        }else{
            user = await User.findById(data.userID)
        }
    });
    return user
}

module.exports = {GenToken, decodeToken}