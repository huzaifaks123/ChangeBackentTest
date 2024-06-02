// import UserModel from it directory
import UserModel from "../models/user.model.js";

// import jwt to sign token on user login
import jwt from 'jsonwebtoken'

// import bcrypt for encription of password
import bcrypt from 'bcrypt'

// export default class
export default class UserController {

    // create instance of quizmodel class in constructor
    constructor() {
        this.userModel = new UserModel();
    }

    // function to verify user during login
    verifyUser = async (req, res) => {
        try {
            // check is user is registerd or not
            const user = await this.userModel.verifyUser(req.body.email)
            if (!user) {
                // return if user is not registered
                return res.status(400).json("Invalid Credential")
            } else {
                // encrypt input password and compare with password registered in db
                const result = await bcrypt.compare(req.body.password, user.password)
                if (result) {
                    // if crededntial is correct sign new jwt token and return to user for authentication
                    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
                    req.session.user = user;
                    res.status(200).json(token)
                } else {
                    // return error for invalid credential
                    return res.status(400).send("Invalid Credential")
                }
            }
        } catch (error) {
            return res.status(500).send("Something went wrong")
        }
    };

    // function to register user after validation
    postRegisteredData = async (req, res) => {
        // destructure req body
        const { name, email, password } = req.body
        // encrypt password by hashing
        const hashPassword = await bcrypt.hash(password, 12)
        try {
            // post data on db
            const Error = await this.userModel.postRegisteredData(name, email, hashPassword);
            if (Error) {
                res.status(401).send(Error);
            } else {
                res.status(201).send('Data posted successfully');
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    // funciton to logout user and destroy session
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Logout failed' });
            }
            // clear session cookie
            res.clearCookie('myCookie');
            res.status(200).json({ message: 'Logout successful' });
        })
    }
}