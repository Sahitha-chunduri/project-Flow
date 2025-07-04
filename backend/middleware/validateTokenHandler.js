const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next();
        } catch (err) {
            console.error("Token validation error:", err.message);
            
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({ 
                    message: "Access token expired",
                    error: "TOKEN_EXPIRED" 
                });
            } else if (err.name === 'JsonWebTokenError') {
                res.status(401).json({ 
                    message: "Invalid access token",
                    error: "INVALID_TOKEN" 
                });
            } else {
                res.status(401).json({ 
                    message: "User is not authorized",
                    error: "UNAUTHORIZED" 
                });
            }
        }
    } else {
        res.status(401).json({ 
            message: "User is not authorized or token is missing",
            error: "NO_TOKEN" 
        });
    }
});

module.exports = validateToken;