const port=  process.env.PORT;
import './database/db.js'
import express from "express";
import router from "./router/route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

<<<<<<< HEAD
const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(router)
=======

const app = express();

//const allowedOrigins = [
  //"https://sportify-fyp.vercel.app",
  //"https://sportify-fyp.netlify.app",
  //"http://localhost:3000",
  //"https://sportify-plyj.onrender"
//];

//const corsOptions = {
  //origin: allowedOrigins,
  //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//};

//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(router);
>>>>>>> 1857e68724f9d5f082370e82443cbaa21704ffeb





app.listen(port, ()=>{
    console.log(`Server connected at http://localhost:${port}`);
})
