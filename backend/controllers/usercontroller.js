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
    const users = await userModel.find({}, "-password");
    console.log("Found", users.length, "users");
    res.status(200).json(users);
});

// GET /user/current 
const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        console.log("Getting current user details for user ID:", req.user.id);
        
        const user = await userModel.findById(req.user.id).select("-password");
        
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        
        console.log("Current user details retrieved successfully");
        res.status(200).json({
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            avatar: user.avatar,
            isActive: user.isActive,
            joinedDate: user.createdAt
        });
    } catch (error) {
        console.error("Error getting current user:", error);
        res.status(500);
        throw new Error("Server error while fetching user details");
    }
});

// PUT /user/update-username
const updateUsername = asyncHandler(async (req, res) => {
    const { username } = req.body;
    
    if (!username) {
        res.status(400);
        throw new Error("Username is required");
    }

    const existingUser = await userModel.findOne({ username, _id: { $ne: req.user.id } });
    if (existingUser) {
        res.status(400);
        throw new Error("Username already exists");
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(
        req.user.id,
        { username },
        { new: true }
    ).select("-password");
    
    if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
    }
    
    console.log("Username updated successfully for user:", req.user.id);
    res.status(200).json({ message: "Username updated successfully", user: updatedUser });
});

// PUT /user/update-email
const updateEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }
    
    const existingUser = await userModel.findOne({ email, _id: { $ne: req.user.id } });
    if (existingUser) {
        res.status(400);
        throw new Error("Email already exists");
    }
    
    const updatedUser = await userModel.findByIdAndUpdate(
        req.user.id,
        { email },
        { new: true }
    ).select("-password");
    
    if (!updatedUser) {
        res.status(404);
        throw new Error("User not found");
    }
    
    console.log("Email updated successfully for user:", req.user.id);
    res.status(200).json({ message: "Email updated successfully", user: updatedUser });
});

// PUT /user/change-password
const changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
        res.status(400);
        throw new Error("Current password and new password are required");
    }
    
    if (newPassword.length < 6) {
        res.status(400);
        throw new Error("New password must be at least 6 characters long");
    }
    
    const user = await userModel.findById(req.user.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        res.status(400);
        throw new Error("Current password is incorrect");
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
    await userModel.findByIdAndUpdate(req.user.id, { password: hashedNewPassword });
    
    console.log("Password changed successfully for user:", req.user.id);
    res.status(200).json({ message: "Password changed successfully" });
});


module.exports = {registerUser, loginUser, getAllUsers, getCurrentUser, updateUsername, updateEmail, changePassword};