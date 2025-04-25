import express from "express";
import { getAllTours, getTourByID, createTour, deleteTour, updateTour } from "../application/tour";


const toursRouter = express.Router();

toursRouter.route("/").get(getAllTours).post(createTour);
toursRouter.route("/:tourId").get(getTourByID).delete(deleteTour).put(updateTour);

export default toursRouter;