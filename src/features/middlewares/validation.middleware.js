// import required element to us express-validator for validation
import { body, validationResult } from 'express-validator'

// import model from its model route
import UserModel from '../models/user.model.js';

// create an instance of model class
const userModel = new UserModel();

// export validateRegisterRequest middleware to validate new user
export const validateRegisterRequest = async (req, res, next) => {

    // set rules for express validators
    const rules = [
        body('name')
            .notEmpty()
            .withMessage('Name is required!'),
        body('email')
            .notEmpty()
            .withMessage('Email is required!'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password should have Minimum 8 character'),
        body('email')
            .custom(async (email) => {
                const userExist = await userModel.validate(email);
                if (userExist) {
                    throw new Error('Email already Exist!');
                }
            }),
    ]

    // check all rules that are set
    await Promise.all(
        rules.map((rule) => rule.run(req))
    )

    // define error from result
    var validationErrors = validationResult(req)

    
    // return if error or move to next
    if (!validationErrors.isEmpty()) {
        const errorMessage = validationErrors.array()[0].msg;
        return res.status(401).send(errorMessage)
    } else {
        next()
    }
}


// export validateLoginRequest middleware to validate user login
export const validateLoginRequest = async (req, res, next) => {
    // set rules for express validators
    const rules = [
        body('email')
            .custom(async (email, { req }) => {
                const isVerified = await userModel.verifyUser(email);
                if (!isVerified) {
                    throw new Error('Invaid Credentials');
                }
            }),
    ]

    // check all rules that are set
    await Promise.all(
        rules.map((rule) => rule.run(req))
    )

    // define error from result
    var validationErrors = validationResult(req)

    
    // return if error or move to next
    if (!validationErrors.isEmpty()) {
        const errorMessage = validationErrors.array()[0].msg;
        return res.status(401).send(errorMessage)
    } else {
        next()
    }
}