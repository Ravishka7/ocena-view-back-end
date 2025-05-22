import express from "express";
import { createRoomBooking, getAllRoomBookings, getUserRoomBookings } from "../application/roomBooking";
import { isAuthenticated } from "./middleware/authentication-middleware";


const roomBookingsRouter = express.Router();

roomBookingsRouter.route("/").post(isAuthenticated, createRoomBooking).get(getAllRoomBookings);

roomBookingsRouter.route("/user/:userId").get(isAuthenticated, getUserRoomBookings);


export default roomBookingsRouter;