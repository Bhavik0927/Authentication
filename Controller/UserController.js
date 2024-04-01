import { User } from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        

        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User is Already exist"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        // console.log(hashPassword)
        user = await User.create({ name, email, password: hashPassword });

        res.status(201).json({
            success: true,
            message: "Successfully added"
        })
    } catch (error) {
        console.log(error)
    }
}

export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await  User.findOne({email}).select("+password");

        if(!user){
            return  res.status(404).json({
                success:"false",
                message:"Invalid Email or Password"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        // console.log(isMatch);

        if(!isMatch){
            return  res.status(404).json({
                success:"false",
                message:"Invalid Email or Password"
            })
        }

        const token =  jwt.sign({_id:user._id},"hfbdskjfbdsj");

        res.status(200).cookie("token",token,{
            httpOnly:true,
            maxAge:15*60*1000
        }).json({
            success:"true",
            message:`welcome ${user.name}`
        })

    } catch (error) {
        console.log(error)
    }
}

export const LogOut = async (req,res) =>{
    try {
        res.status(200).cookie("token","",{
            expires:new Date(Date.now() )
        }).json({
            success:true,
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const GetDetails = async (req,res) =>{
    try {
        const id = "myId";
        console.log(req.cookies);
        const {token} = req.cookies;

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Login First"
            })
        }

        const decoded = jwt.verify(token,"hfbdskjfbdsj");

        const user = await User.findById(decoded._id);

        res.status(200).json({
            success:true,
            user:req.user,
        })

    } catch (error) {
        console.log(error)
    }
}
