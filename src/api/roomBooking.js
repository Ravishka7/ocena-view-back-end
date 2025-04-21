import express from "express";
import { createRoomBooking, getAllRoomBookings } from "../application/roombooking.js";


const roomBookingsRouter = express.Router();

roomBookingsRouter.route("/").post(createRoomBooking).get(getAllRoomBookings);


export default roomBookingsRouter;