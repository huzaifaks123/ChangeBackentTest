// import environment variable
import 'dotenv/config'

// import express from express-module
import express from 'express';

// import market router to route api req
import indexRouter from './src/features/routes/index.js';

// import mongoConnection from its directory
import { connectToMongoDB } from './src/config/mongo.js';

// import bodyParser from module
import bodyParser from 'body-parser'

// import CORS to work with cross-browser
import cors from 'cors'

// import cookie parser node module
import cookieParser from 'cookie-parser';

// import express-session node module
import session from 'express-session';

// import MongoStore node module
import MongoStore from 'connect-mongo';

// deifne port for server
const port = process.env.PORT;

// define express server
const app = express();

// Use the CORS middleware
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));

// use bodyParser middleware
app.use(bodyParser.json())

// use cookieParser middleware to save cookies
app.use(cookieParser())

// use bodyParser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// create session and save inside cookie and mongodb
app.use(session({
    name : "myCookie",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 2000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
    },
  }));

// use route for api
app.use('/api', indexRouter)

// listen server on defined port
app.listen(port, () => {
    console.log("Server is running on port : ", port);
    connectToMongoDB();
})
