import express from "express";
import {user_rgistration, user_login,user_dashbord, test_db} from "../controllers/register_and_login.js";
import {user_auth} from "../middleware/user_auth.js";

const register_login_Router = express.Router();

register_login_Router.post("/user_resgister",user_rgistration)
register_login_Router.post("/user_login",user_login)
register_login_Router.get("/user_dashbord",user_auth,user_dashbord)

register_login_Router.get("/set_user",test_db)


export { register_login_Router}