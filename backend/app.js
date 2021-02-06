import express, { urlencoded, json, static } from "express";
const app = express();
import morgan from "morgan";
import { connect, Promise } from "mongoose";

import usersRoute from "./api/routes/users";
import postsRoute from "./api/routes/posts";

connect(
  "mongodb+srv://faceact-db-user:" +
    process.env.DB_PASSWORD +
    "@faceact-db.fnxua.mongodb.net/" +
    process.env.DB_NAME +
    "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);
Promise = global.Promise;

app.use(morgan("dev"));

// CORS handling
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested_With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(urlencoded({ extended: false }));
app.use(json());
app.use("/uploads/", static("uploads"));

// Routes handling
app.use("/", usersRoute);
app.use("/posts", postsRoute);

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
