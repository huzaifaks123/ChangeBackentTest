// import objectId to create its _id instance 
import { ObjectId } from "mongodb";

// import getDb to post on db
import { getDB } from "../../config/mongo.js"

// export default class
export default class ScoreModel {

    // create constructor to store its instance inside db
    constructor(name, score, userId) {
        this.name = name,
            this.score = score,
            this.timeStamp = new Date()
        this.userId = userId
    }

    // function to post score to db
    async postScore(name, score, userId) {
        // define db collection
        const db = getDB();
        const collection = db.collection("score")
        // check if user has previous score
        const presentScore = await collection.findOne({ userId });
        if (presentScore) {
            try {
                // update previous score
                await collection.updateOne({ _id: new ObjectId(presentScore._id) }, { $set: { score, timeStamp: new Date() } })
            } catch (error) {
                return "Error adding score to db"
            }
        } else {
            try {
                // post new score
                const userScore = new ScoreModel(name, score, userId)
                await collection.insertOne(userScore)
            } catch (error) {
                return "Error adding score to db"
            }
        }
    }

    // function to get all score for leaderboard
    async getAll() {
        try {
            // define db collection
            const db = getDB();
            const collection = db.collection("score")
            // return array of scores available
            let score = await collection.find().toArray();
            return score;
        } catch (error) {
        }
    }

    // function to get score for user
    async getSelected(id) {
        try {

            // define db collection
            const db = getDB();
            const collection = db.collection("score");

            const quizCursor = await collection.findOne({ _id: new ObjectId(id) });
            const quiz = await quizCursor.toArray();
            return quiz;
        } catch (error) {
            throw error;
        }
    }
}