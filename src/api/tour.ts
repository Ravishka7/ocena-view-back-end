import { isAuthenticated } from "./middleware/authentication-middleware";
import express from "express";
import { getAllTours, getTourByID, createTour, deleteTour, updateTour } from "../application/tour";
import { isAutherized } from "./middleware/autherization-middleware";


const toursRouter = express.Router();

toursRouter.route("/").get(getAllTours).post(isAuthenticated, isAutherized, createTour);
toursRouter.route("/:tourId").get(getTourByID).delete(deleteTour).put(updateTour);

export default toursRouter;