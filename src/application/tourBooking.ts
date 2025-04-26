import { Request, Response, NextFunction } from "express";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

import TourBooking from "../infrastructure/schemas/TourBooking";

export const createTourBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourBooking = req.body;

  //Validate request data
  if (!tourBooking.tourId || !tourBooking.userId || !tourBooking.bookingDate || !tourBooking.numberOfAdults || !tourBooking.numberOfChildren) {
    throw new ValidationError("Invalid tour booking data");
  }

  //Create new tour booking
  await TourBooking.create({
    tourId: tourBooking.tourId,
    userId: tourBooking.userId,
    bookingDate: tourBooking.bookingDate,
    numberOfAdults: tourBooking.numberOfAdults,
    numberOfChildren: tourBooking.numberOfChildren,
  });

  res.status(201).send();
  return;
  } catch (error) {
    next(error);
  }
  
};

export const getAllTourBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tourBookings = await TourBooking.find().populate("tourId").populate("userId");
  res.status(200).json(tourBookings.map((tourBooking) => ({
    id: tourBooking._id,
    tourName: tourBooking.tourId.name,
    userName: tourBooking.userId.name,
    userEmail: tourBooking.userId.email,
    bookingDate: tourBooking.bookingDate,
    numberOfAdults: tourBooking.numberOfAdults,
    numberOfChildren: tourBooking.numberOfChildren,
  })));
  return;
  } catch (error) {
    next(error); 
  }
  
}