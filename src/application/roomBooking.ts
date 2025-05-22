import { Request, Response, NextFunction } from "express";
import ValidationError from "../domain/errors/validation-error";
import Room from "../infrastructure/schemas/Room";
import RoomBooking from "../infrastructure/schemas/RoomBookings";

async function generateBookingNumber() {
  // Simple approach: YYYYMMDD + random 4-digit number
  const dateStr = new Date().toISOString().slice(0,10).replace(/-/g, "");
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `BK${dateStr}${randomNum}`;
}

export const createRoomBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      mealPlan,
    } = req.body;

    if (
      !roomId || !userId || !checkInDate || !checkOutDate ||
      adults == null || children == null || !mealPlan
    ) {
      throw new ValidationError("Missing required booking data");
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      throw new ValidationError("Check-out date must be after check-in date");
    }

    const room = await Room.findById(roomId);
    if (!room) {
      throw new ValidationError("Room not found");
    }

    const maxGuests = room.name.toLowerCase().includes("triple") ? 3 : 2;
    if (adults + children > maxGuests) {
      throw new ValidationError(`Max guests for this room is ${maxGuests}`);
    }

    // Optionally: Check if room is available for the selected dates (not booked already)

    const bookingNumber = await generateBookingNumber();

    await RoomBooking.create({
      roomId,
      userId,
      checkInDate,
      checkOutDate,
      adults,
      children,
      mealPlan,
      bookingNumber,
    });

    res.status(201).json({ message: "Booking created", bookingNumber });
  } catch (error) {
    next(error);
  }
};

export const getAllRoomBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomBookings = await RoomBookings.find().populate("roomId").populate("userId");
  res.status(200).json(roomBookings.map((roomBooking) => ({
    id: roomBooking._id,
    roomName: roomBooking.roomId.name,
    userName: roomBooking.userId.name,
    userEmail: roomBooking.userId.email,
    checkInDate: roomBooking.checkInDate,
    checkOutDate: roomBooking.checkOutDate,
    roomNumber: roomBooking.roomNumber,
  })));
  return;
  } catch (error) {
    next(error);
  }
  
}

export const getUserRoomBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const roomBookings = await RoomBooking.find({ userId }).populate("roomId");
    res.status(200).json(roomBookings.map((roomBooking) => ({
      id: roomBooking._id,
      roomName: roomBooking.roomId.name,
      checkInDate: roomBooking.checkInDate,
      checkOutDate: roomBooking.checkOutDate,
      adults: roomBooking.adults,
      children: roomBooking.children,
      mealPlan: roomBooking.mealPlan,
      bookingNumber: roomBooking.bookingNumber,
    })));
    return;
  } catch (error) {
    next(error);
  }
  
}
