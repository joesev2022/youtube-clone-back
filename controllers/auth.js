import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({...req.body, password: hash});
        
        await newUser.save();
        res.status(200).send("User has been created");
    }
    catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    try {
        //Buscar al usuario por su username
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(404).send("User not found");
        //Comparar la contraseña enviada por el usuario con la contraseña del usuario que se encuentra en la BD.
        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return res.status(400).send("Wrong credentials");

        const token = jwt.sign({id: user._id}, process.env.JWT)
        const {password, ...others} = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others);
    }
    catch (error) {
        next(error);
    }
}