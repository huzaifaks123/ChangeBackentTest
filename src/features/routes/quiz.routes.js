// import exress module
import express from 'express'

// import controller for api route response
import QuizController from "../controllers/quiz.controller.js";

// create instance of controller class
const quizController = new QuizController();

// create new express router instence
const quizRouter = express.Router();

// implement define controller for routes
quizRouter.get('/', quizController.getAllQuiz)
quizRouter.get('/topic', quizController.getAllTopic)
quizRouter.get('/questions', quizController.getSelectedQuestions)

// export default router
export default quizRouter;