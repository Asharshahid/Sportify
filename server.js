const port=  process.env.PORT || 4000;
import './database/db.js'
import express from "express";
import router from "./router/route.js"
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(router)





app.listen(port, ()=>{
    console.log(`Server connected at http://localhost:${port}`);
})
