import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import connectDB from "./infrastructure/db";
import cors from "cors";

import toursRouter from "./api/tour";
import roomsRouter from "./api/room";
import usersRouter from "./api/user";
import roomBookingsRouter from "./api/roomBooking";
import tourBookingsRouter from "./api/tourBooking";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import { clerkMiddleware } from "@clerk/express";

const app = express();
app.use(clerkMiddleware());

const PORT = 8000;
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/tours", toursRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);
app.use("/api/roomBookings", roomBookingsRouter);
app.use("/api/tourBookings", tourBookingsRouter);


app.use(globalErrorHandlingMiddleware);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
