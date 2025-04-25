import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import connectDB from "./infrastructure/db";
import cors from "cors";

import toursRouter from "./api/tour";
import roomsRouter from "./api/room";
import usersRouter from "./api/user";
import roomBookingsRouter from "./api/roomBooking";
import tourBookingsRouter from "./api/tourBooking";


const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/tours", toursRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);
app.use("/api/roomBookings", roomBookingsRouter);
app.use("/api/tourBookings", tourBookingsRouter);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// DNC8GMaR6RSCCSnZ

// mongodb+srv://ravishkaranasinghe:DNC8GMaR6RSCCSnZ@oceanview.kmht5ln.mongodb.net/?retryWrites=true&w=majority&appName=OceanView