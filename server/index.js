import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from './routes/user.route'
import postRoute from './routes/post.route'
import commentRoute from './routes/comment.route'
import fileRoute from './routes/file.route'
//  CONFIGURATION //
const app = express();
dotenv.config({ path: "./.env" });
app.use(express.json());
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

// MONGODB CONNECT //
const PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

// ROUTES //
app.use("/api", userRoute);
app.use("/api", postRoute);
app.use("/api", fileRoute);
app.use("/api", commentRoute);
