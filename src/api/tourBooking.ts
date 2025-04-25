import express from "express";
import { createTourBooking, getAllTourBookings } from "../application/tourBooking";


const tourBookingsRouter = express.Router();

tourBookingsRouter.route("/").post(createTourBooking).get(getAllTourBookings);


export default tourBookingsRouter;