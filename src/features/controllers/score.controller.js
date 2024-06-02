// import ScoreModel from it directory
import ScoreModel from "../models/score.model.js";

// export default class
export default class ScoreController {

    // create instance of scoreModel class in constructor
    constructor() {
        this.scoreModel = new ScoreModel();
    }

    // function to post score
    postScore = async (req, res) => {
        const { user, score } = req.body;
        try {
            const Error = await this.scoreModel.postScore(user.name, score, user._id);
            if(Error){
                res.status(400).json('Error posting data');
            }else{
                res.status(201).json('Data posted successfully');
            }
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
    };

    // function to get AllScore
    getAllScore = async (req, res) => {
        try {
            const leaderBoard = await this.scoreModel.getAll();
            res.status(200).send(leaderBoard);
        } catch (error) {
            res.status(500).json('Internal Server Error');
        }
    };

    // function to get score for user in profile
    getScore = async (req, res) => {
        try {
            const score = await this.scoreModel.getSelected(req.params.id)
            res.status(200).json(score)
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}