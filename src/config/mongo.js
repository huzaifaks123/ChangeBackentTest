// import mongoClient form mongodb module
import { MongoClient } from "mongodb";

// define client
let client;

// function to connect mongo DB 
export const connectToMongoDB = () => {
    MongoClient.connect(process.env.MONGO_URL)
    .then(instance => {
        client = instance
        console.log("MongoDB is connected Successfully");
    })
    .catch(err => {
        console.log("Error connecting mongoDB : ", err);
    })
}

// function to export dataBase
export const getDB = () => {
    return client.db();
}