import 'dotenv/config';
import jwt from "jsonwebtoken";
import userModel from "../schema/user_schema.js";
import {StatusCodes} from 'http-status-codes'

export async function user_rgistration(req, res){
let res_obj = {}
    console.log(req.body)
    var {name,password,parent_id}= req.body;
    const refer_id = Math.floor(100000 + Math.random() * 900000);  
if(name && password){
    if(parent_id){
        try{
            let user_data = new userModel({name,password,refer_id,parent_id,earning_amount:0});
            let saved_user_data = await  user_data.save();
            try{
                let token = jwt.sign({ id:saved_user_data["_id"] }, process.env.JWT_SECRET_KEY);
                res_obj["status"]=true
                res_obj["response"]="user created"
                res_obj["token"]=token
            }catch(e){
                console.log(e)
                res_obj["token"]="token not genreted find error"
            }

            let updated_parent = await userModel.findOneAndUpdate( {refer_id:parent_id},{ $inc: { earning_amount: 10 } },{ new: true } );
            if(updated_parent){
                console.log(updated_parent["parent_id"])
                let updated_grandparent = await userModel.findOneAndUpdate( {refer_id:updated_parent["parent_id"]},{ $inc: { earning_amount: 2 } },{ new: true } )
                console.log(updated_grandparent) 
            } else{
                res_obj["error"]="parent id wrong" 
            }                       
            res.status(200).json(res_obj);
        }catch(e){
            console.log(e["code"]==11000)
           if(e["code"]==11000){
                res_obj["status"]=false
                res_obj["response"]="user name already exists"               
                res.status(200).json(res_obj)
           }else{
            res.status(200).json({status:false,"response":"find some error"})
           }
            
        }        
    }else{
        try{
        let user_data = new userModel({name,password,refer_id,earning_amount:0});
        let saved_user_data = await  user_data.save();
        let token = jwt.sign({ id:saved_user_data["_id"] }, process.env.JWT_SECRET_KEY);
        res.status(201).json({status:true,"user_detaile":saved_user_data,"response":"user created","token":token}); 
        }catch(e){
            if(e["code"]==11000){
                res_obj["status"]=false
                res_obj["response"]="user name already exists"               
                res.status(200).json(res_obj)
           }else{
            res.status(200).json({status:false,"response":"find some error"})
           }  
        }
        
    }
}else{
    console.log("please fill all inputs")
    res.status(200).json({"status":false,"response":"please fill all inputs"});
}
}

export async function user_login(req,res){
    console.log(req.body)
    let {name,password}=req.body
    if(name && password){
        let user_detaile = await userModel.find( {name:name,password:password});   
            console.log(user_detaile)
            if(user_detaile.length===0){
                res.status(200).json({"status":false,"response":"not found"});
            }else{
                console.log(user_detaile[0]["_id"])
                let token = jwt.sign({ id:user_detaile[0]["_id"] }, process.env.JWT_SECRET_KEY);
                res.status(200).json({"status":true,"response":"login successfull","user_detaile":user_detaile,"token":token});
            }
            
    }else{
        res.status(200).json({"status":false,"response":"please fill all inputs"});
    
    }
}


export async function user_dashbord(req,res){
    let total_count_with_bonus;
  try{
    let user_detaile = await userModel.find( {_id:req.user_id});   
console.log(user_detaile)
   let count_bonus = await userModel.countDocuments({ parent_id:user_detaile[0]["refer_id"] });
   if(count_bonus % 2 === 0){
        total_count_with_bonus = count_bonus*2.5
        total_count_with_bonus = total_count_with_bonus + user_detaile[0]["earning_amount"]
    }else{
       let even_count = count_bonus-1
       total_count_with_bonus = even_count*2.5
       total_count_with_bonus = total_count_with_bonus + user_detaile[0]["earning_amount"]
    }

    res.status(200).json({"status":true,"response":total_count_with_bonus,"name":user_detaile[0]["name"],"refer_id":user_detaile[0]["refer_id"]});
  }catch(e){
    console.log(e)
    res.status(200).json({"status":false,"response":"find error"});
  }          
    }
export async function test_db(req,res){
    try{
    // console.log("test_db___set_data____")
    //            const user_data=  new  userModel({name:"malay",password:"12345678",refer_id:"321321",parent_id:"212137"});
    //            const saved_user_data = await  user_data.save();
    //            res.status(200).json(saved_user_data);

    // console.log("test_db___get_data__findone_____")
    // const parent_user = await userModel.findOne({parent_id:212137});
    // res.status(200).json(parent_user);

    // console.log("test_db___findOneAndUpdate_____")
    const updated_user = await userModel.findOneAndUpdate( {parent_id:112233},{ $inc: { earning_amount: 10 } } ,{ new: true } )
    res.status(200).json(updated_user);

    }catch(e){
        console.log("code: 11000"+e)
    res.status(200).json(e);

    }
}