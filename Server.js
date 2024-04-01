import express from 'express';
import { mongoDB } from './Data/database.js';
import userRouter from './Routes/User.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoDB();

// Using Routes
app.use("/api/v1/user", userRouter)

app.get("/", (req, res) => {
    res.send("Nice ")
})


app.listen(5000, () => {
    console.log("Server is listening");

})