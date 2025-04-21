import express from "express";
import { createRoomBooking } from "../application/roombooking.js";

const roomBookingsRouter = express.Router();

roomBookingsRouter.post("/", createRoomBooking);

export default roomBookingsRouter;