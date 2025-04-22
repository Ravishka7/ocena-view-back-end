import express from "express";
import { createTourBooking, getAllTourBookings } from "../application/tourBooking.js";


const tourBookingsRouter = express.Router();

tourBookingsRouter.route("/").post(createTourBooking).get(getAllTourBookings);


export default tourBookingsRouter;