import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import {db_connect} from './db_connection/db_connection.js';
import {register_login_Router} from './src/routers/register_and_login.js'

const app= express();

db_connect();
app.use(cors());
app.use(express.json());
app.use(register_login_Router)

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is running at ${process.env.SERVER_PORT}`)
})