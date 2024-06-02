// import exress module
import express from 'express'

// import controller for api route response
import UserController from "../controllers/user.controller.js";

// import validation for login and register request
import { validateLoginRequest, validateRegisterRequest } from '../middlewares/validation.middleware.js';

// import auth middleware to authenticate based on token
import jwtAuth from '../middlewares/jwt.middleware.js';

// create instance of controller class
const userController = new UserController();

// create new express router instence
const userRouter = express.Router();

// implement auth middleware and between routes
userRouter.post('/', validateLoginRequest, userController.verifyUser)
userRouter.post('/register', validateRegisterRequest, userController.postRegisteredData)
userRouter.post('/logout', userController.logout)
userRouter.post('/validate-token', jwtAuth, (req,res) => {res.status(200).json("validation is successful")})

// export default router
export default userRouter;