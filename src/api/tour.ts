import { isAuthenticated } from "./middleware/authentication-middleware";
import express from "express";
import { getAllTours, getTourByID, createTour, deleteTour, updateTour } from "../application/tour";
import { isAdmin } from "./middleware/autherization-middleware";


const toursRouter = express.Router();

toursRouter.route("/").get(getAllTours).post(isAuthenticated, isAdmin, createTour);
toursRouter.route("/:tourId").get(getTourByID).delete(isAuthenticated, isAdmin, deleteTour).put(isAuthenticated, isAdmin, updateTour);

export default toursRouter;