import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

import RoomBookings from "../infrastructure/schemas/RoomBookings";

export const createRoomBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomBooking = req.body;

  //Validate request data
  if (!roomBooking.roomId || !roomBooking.userId || !roomBooking.checkInDate || !roomBooking.checkOutDate || !roomBooking.roomNumber) {
    throw new ValidationError("Invalid room booking data");
  }

  //Create new room booking
  await RoomBookings.create({
    roomId: roomBooking.roomId,
    userId: roomBooking.userId,
    checkInDate: roomBooking.checkInDate,
    checkOutDate: roomBooking.checkOutDate,
    roomNumber: roomBooking.roomNumber,
  });

  res.status(201).send();
  return;
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
