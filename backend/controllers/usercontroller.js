const asyncHandler = require("express-async-handler");
const model = require("../models/models");
const userModel = model.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /user/register
const registerUser = asyncHandler(async (req, res) => {
    console.log("Register attempt with data:", req.body);
    
    const {username, firstName, lastName, email, password} = req.body;
    
    if(!username || !firstName || !lastName || !password || !email){
        res.status(400);
        throw new Error("All the fields are mandatory");
    }
    
    const userAvailable = await userModel.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");
    
    const user = await userModel.create({
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword,
    });
    
    console.log("User created successfully:", user._id);
    
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// POST /user/login
const loginUser = asyncHandler(async (req, res) => {
    console.log("Login attempt for:", req.body.email);
    
    const {email, password} = req.body;
    
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    
    const user = await userModel.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    console.log("User authenticated successfully");

    const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
    
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // true in production 
        sameSite: "strict",
        path: "/user/refresh"
    });

    res.json({ accessToken });
});

const getAllUsers = asyncHandler(async (req, res) => {
    console.log("Fetching all users");
    const users = await userModel.find({}, "-password"); // exclude password
    console.log("Found", users.length, "users");
    res.status(200).json(users);
});

module.exports = {registerUser, loginUser, getAllUsers};