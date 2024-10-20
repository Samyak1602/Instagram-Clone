import { User } from "../model/user.model.js";
import bcrypt from  'bcryptjs';
import jwt from  'jsonwebtoken';


export const register = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(401).json({
                message:"Please fill in all fields",
                success:false,
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                message:"Email already exists",
                success:false,
            });
        }
        const  hashedPassword = await bcrypt.hash(password,12);
        await  User.create({
            username,
            email,
            password : hashedPassword
        });
        return res.status(201).json({
            message:"Account created successfully",
            success:true,
        });
    }catch(error){
        console.log(error);
    }
}

export const login  = async (req,res)=>{
    try{
        const {email,password} = re.body;
        if( !email || !password){
            return res.status(401).json({
                message:"Please fill in all fields",
                success:false,
            })
        }
        let  user = await User.findOne({email});
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false,
            })
        }
        const  isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password",
                success:false,
            })

        }
        user = {
            id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            bio:user.bio,
            followers:user.followers,
            following:user.following,
            posts:user.posts
        }
        const token = await  jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1d"});

        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message: `Welcome back ${user.username}`,
            success:true,
            user
        })

    }catch(error){
        console.log(error);
    }
}

export const logout = async (_,res)=>{
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true
        })
    }catch{
        console.log(error);
    }
}

export const getProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        let user = await User.findById(userId);
        return res.status(200).json({
            user,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
