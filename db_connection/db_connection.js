import mongoose from 'mongoose';
import 'dotenv/config'

export function db_connect(){
    mongoose.connect("mongodb+srv://mayurgeek:TGngrAccYJJOvsSd@cluster0.nuchlk2.mongodb.net/?retryWrites=true&w=majority");
     const dbconnection=mongoose.connection;
     dbconnection.once('connected',()=>{
        console.log("db is connected")
     })
     dbconnection.on('error',()=>{
        console.log("error in db connection")
     })
}