const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    image:String
})

// schema name in db , schema you created here
const UserModel=mongoose.model("user",UserSchema)
module.exports = UserModel