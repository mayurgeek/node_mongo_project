import 'dotenv/config';
import jwt from "jsonwebtoken";
export function user_auth(req,res,next){
    if(req.headers.user_token)
    try {
            let decoded = jwt.verify(req.headers.user_token,process.env.JWT_SECRET_KEY);
            console.log("decoded========"+decoded["id"])
            req.user_id=decoded["id"]
            next()
        } catch(err) {
            console.log(err)
            res.status(200).json({"status":false,"response":"token error"})
      }
    
}