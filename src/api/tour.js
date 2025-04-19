import express from "express";
import { getAllTours, getTourByID, createTour, deleteTour, updateTour } from "../application/tour.js";


const toursRouter = express.Router();

toursRouter.get("/", getAllTours);
toursRouter.get("/:tourId", getTourByID);
toursRouter.post("/", createTour);
toursRouter.delete("/:tourId", deleteTour);
toursRouter.put("/:tourId", updateTour);

export default toursRouter;