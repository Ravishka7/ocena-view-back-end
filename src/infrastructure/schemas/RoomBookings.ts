// src/infrastructure/schemas/RoomBooking.ts
import mongoose from "mongoose";

const roomBookingSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  userId: {
    type: String, // Assuming Clerk user ID is string
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
    min: 1,
  },
  children: {
    type: Number,
    required: true,
    min: 0,
  },
  mealPlan: {
    type: String,
    enum: ["Room Only", "Bed & Breakfast", "Half Board", "Full Board"],
    default: "Room Only",
  },
  bookingNumber: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema);
export default RoomBooking;
