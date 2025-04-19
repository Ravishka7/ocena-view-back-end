import express from "express";
import toursRouter from "./api/tour.js";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use("/api/tours", toursRouter);


app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));