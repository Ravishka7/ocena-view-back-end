import { Request, Response } from "express";

import TourBooking from "../infrastructure/schemas/TourBooking";

export const createTourBooking = async (req: Request, res: Response) => {
  const tourBooking = req.body;

  //Validate request data
  if (!tourBooking.tourId || !tourBooking.userId || !tourBooking.bookingDate || !tourBooking.numberOfAdults || !tourBooking.numberOfChildren) {
    return res.status(400).json();
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
};

export const getAllTourBookings = async (req: Request, res: Response) => {
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
}