// import exress module
import express from 'express'

// import controller for api route response
import ScoreController from "../controllers/score.controller.js";

// create instance of controller class
const scoreController = new ScoreController();

// create new express router instence
const scoreRouter = express.Router();

// implement define controller for routes
scoreRouter.post('/', scoreController.postScore);
scoreRouter.get('/', scoreController.getAllScore)
scoreRouter.post('/:id', scoreController.postScore)

// export default router
export default scoreRouter;