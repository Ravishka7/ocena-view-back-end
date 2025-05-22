import { Request, Response, NextFunction } from "express";

import Room from "../infrastructure/schemas/Room";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { CreateRoomDTO } from "../domain/dtos/room";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllRooms = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await Room.find();
    await sleep(500); // Simulate a delay of 1 second
    res.status(200).json(rooms);
    return;
  } catch (error) {
    next(error);
  }
  
};

export const getRoomByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);
    if (room) {
      res.status(200).json(room);
      return;
    } else {
      throw new NotFoundError("Room not found");
    }
  } catch (error) {
    next(error);
  }
  
};

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const room = CreateRoomDTO.safeParse(req.body);
    //Validate request data
    if (!room.success) {
      throw new ValidationError(room.error.message);
    }
  //Create new room
  await Room.create({
    name: room.data.name,
    image: room.data.image,
    description: room.data.description,
    price: room.data.price,
  });

  res.status(201).send();
  return;
  } catch (error) {
    next(error);
  }
  
};

export const deleteRoom =async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.params.roomId;
    await Room.findByIdAndDelete(roomId);

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
  
};

export const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const roomId = req.params.roomId;
    const updatedRoom = req.body;

    // Validate request data
    if (
      !updatedRoom.name ||
      !updatedRoom.image ||
      !updatedRoom.description ||
      !updatedRoom.price 
    ) {
      throw new ValidationError("Invalid room data");
    }

    // Proceed with updating the room
    await Room.findByIdAndUpdate(roomId, updatedRoom);

    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};
