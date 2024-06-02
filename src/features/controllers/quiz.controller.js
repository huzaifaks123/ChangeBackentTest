// import QuizModel from it directory
import QuizModel from "../models/quiz.model.js"

// export default class
export default class QuizController{
    
    // create instance of quizmodel class in constructor
    constructor(){
        this.quizModel = new QuizModel();
    }

    // function to return all topics with question if required
    getAllQuiz = async (req, res) => {
        try {
            const quiz = await this.quizModel.getAll();
            res.status(200).send(quiz);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };

    // function to return all topics
    getAllTopic = async (req, res) => {
        try {
            let topics = [];
            const quiz = await this.quizModel.getAll();
            for(let item of quiz){
                topics.push(item.topic)
            }
            res.status(200).json(topics);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    };

    // function to get question for selected topics
    getSelectedQuestions = async (req, res) => {
        const params = req.query.topics
        const body = params.split(',')
        let quiz = []
        for(let topic of body){
            const topicQuiz = await this.quizModel.getSelected(topic)
            quiz = [...quiz, ...topicQuiz]
        }
        if(quiz.length == 0){
            res.status(500).send('Internal Server Error');
        }else{
            let questions = []
            for(let categ of quiz){
                questions = [...questions, ...categ.questions]
            }
            res.status(200).json(questions)
        }
    }
}