import mongoose from "mongoose";
  const userSchema= new mongoose.Schema({
 
    name:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    refer_id:{type:Number, required:true,unique:true},
    parent_id:{type:Number},
    position:{type:String},
    earning_amount:{type:Number},  
})
const userModel= mongoose.model('user',userSchema);
export default userModel;