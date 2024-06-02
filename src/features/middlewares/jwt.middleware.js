// import jwt token from node-module
import jwt from "jsonwebtoken";

// import model from its model route
import UserModel from '../models/user.model.js';

// create an instance of model class
const userModel = new UserModel();

// create auth function to validate token recieved from client
const jwtAuth = async (req, res, next) => {

    // check authorization token in req header 
    const token = req.headers["authorization"];
    
    if(!token){
        // return for empty token
        res.status(401).json("Unauthorized")
    }
    try {
        // veirfy jwt token
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.body.user = await userModel.getUser(payload.userId)
        next()
    } catch (error) {
        // return for invalid token
        res.status(401).json("Unauthorized")
    }
}

// export default function
export default jwtAuth  