// import objectId to create its _id instance 
import { ObjectId } from "mongodb";

// import getDb to post on db
import { getDB } from "../../config/mongo.js"

// export default class
export default class UserModel {

    // create constructor to store its instance inside db
    constructor(name, emailId, password) {
        this.name = name,
            this.emailId = emailId,
            this.password = password
    }

    // post User data to database 
    async postRegisteredData(name, emailId, password) {
        // define db collection
        const db = getDB();
        const collection = db.collection("users")
        // check if user exist ( Already handled in Validation )
        const isExist = await collection.findOne({ emailId });
        if (isExist) {
            return "User already exist" // if validation fails
        }
        try {
            // create instance
            const profile = new UserModel(name, emailId, password)
            const user = await collection.insertOne(profile)
        } catch (error) {
            return "Error adding score to db"
        }
    }
    
    async verifyUser(emailId) {
        try {
            // define db collection
            const db = getDB();
            const collection = db.collection("users");
            // find user in db using email
            const user = await collection.findOne({ emailId });
            if (user) {
                return user
            }
        } catch (error) {
            throw error;
        }
    }

    // validate user if already exist
    async validate(emailId) {
        try {
            // define db collection
            const db = getDB();
            const collection = db.collection("users");
            // find user in db using email
            const user = await collection.findOne({ emailId })
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    // get user for session
    async getUser(id) {
        try {
            // define db collection
            const db = getDB();
            const collection = db.collection("users");
            // find user in db using id
            const user = await collection.findOne({ _id: new ObjectId(id) });
            if (user) {
                return user
            }
        } catch (error) {
            throw error;
        }
    }
}