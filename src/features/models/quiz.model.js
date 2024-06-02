// import getDb to post on db
import { getDB } from "../../config/mongo.js"

// export default class
export default class QuizModel {
    constructor(){
        this.collection = "quiz"
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection)
            let quiz = await collection.find().toArray();
            return quiz;
        } catch (error) {
            console.log("Error while fetching data from DB : ", error);
        }
    }
    

    async getSelected(topic) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const quizCursor = await collection.find({ topic });
            const quiz = await quizCursor.toArray();
            return quiz;
        } catch (error) {
            console.log("Error while fetching data from DB: ", error);
            throw error;
        }
    }
}