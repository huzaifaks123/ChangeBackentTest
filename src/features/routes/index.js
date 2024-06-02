// import exress module
import express from 'express'

// import different api router to implement routes
import quizRouter from './quiz.routes.js';
import scoreRouter from './score.routes.js';
import userRouter from './users.routes.js';

// import auth middleware to authenticate based on token
import jwtAuth from '../middlewares/jwt.middleware.js';

// create new express router instence
const indexRouter = express.Router();

// implement auth middleware and between routes
indexRouter.use('/quiz',jwtAuth, quizRouter)
indexRouter.use('/score',jwtAuth, scoreRouter)
indexRouter.use('/users', userRouter)

// export default router
export default indexRouter;