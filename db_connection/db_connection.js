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
// import express from 'express';
// import multer from 'multer';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// const app = express();
// const port = 3000;

// // Get the current directory using ESM syntax
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const field = file.fieldname === 'shop_logo' ? 'shop_logo' : 'documents';
//     const uploadPath = join(__dirname, 'public', field);
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Define your API endpoint using .fields()
// app.post('/upload', upload.fields([{ name: 'shop_logo' }, { name: 'documents', maxCount: 3 }]), (req, res) => {
//   const shopLogoFiles = req.files['shop_logo'];
//   const documentsFiles = req.files['documents'];

//   // Process the files as needed

//   // Return paths or perform further actions
//   res.json({
//     shop_logo: shopLogoFiles.map((file) => file.path),
//     documents: documentsFiles.map((file) => file.path),
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
