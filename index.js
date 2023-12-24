import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet"
import morgan from "morgan"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";   

/* CONFUGURATION  Middlewere*/
// in case module
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResoursePolicy({policy:"cross-origin"}))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

/* FILE STORAGE */

const storage=multer.diskStorage({
    distination:function(req,file,cb){
        cb(nul,"public/assets")
    },
    filename: function(rq,file,cb){
        cb(null,file.originalname)
    }

})

const upload=multer({storage});

/* ROUTER with upload */
app.post("/auth/register",upload.single("picture"),register);
/* Auth Router */

app.use('/auth',authRoutes);
const PORT=process.env.PORT||2001;

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    app.listen(PORT,()=>console.log(`server port ${PORT}`))
})
.catch((error)=>console.log(`${error} did not connect`));
