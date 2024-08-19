import express from "express";
import cors from "cors";
import rateLimit from 'express-rate-limit';

import { config } from "dotenv";
import dataWebRouter from "./routs/DataWeb.js"



config();
const app=express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const limiter = rateLimit({
    windowMs: 1000, // 1 second window
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.'
});

app.use("/api/dataweb",limiter,dataWebRouter);


let port=process.env.PORT||4500;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})
