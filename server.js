const port=  process.env.API_BASE_URL;
import './database/db.js'
import express from "express";
import router from "./router/route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

const allowedOrigins = [
  "https://sportify-fyp.vercel.app",
  "https://sportify-fyp.netlify.app",
  "http://localhost:3000",
  "https://sportify-plyj.onrender
];

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(router);





app.listen(port, ()=>{
    console.log(`Server connected at http://localhost:${port}`);
})
