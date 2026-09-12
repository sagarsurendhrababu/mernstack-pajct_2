import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

const createSuperAdmin = async () => {
    try{
        const email = 'superadmin@gmail.com';
        const password = 'sgr##TS7997';
        const role = 'superadmin';

        const DatabaseURL = process.env.DB;
        if(!DatabaseURL) throw new Error("The Database Link is Missing");
        mongoose.connect(DatabaseURL);
        const isExist = await userModel.findOne({email})
        if(isExist){
            console.log("Superadmin already exist")
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        await userModel.create({email,password:hash,role});
        console.log("Super admin has been created")             
    }catch(err){
        throw err;
    }finally{
        await mongoose.connection.close();
    }
}

createSuperAdmin();