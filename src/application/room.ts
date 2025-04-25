import { Request, Response } from "express";

import Room from "../infrastructure/schemas/Room";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAllRooms = async(req: Request, res: Response) => {
  const rooms = await Room.find();
  await sleep(1000); // Simulate a delay of 1 second
  res.status(200).json(rooms);
  return;
};

export const getRoomByID = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const room = await Room.findById(roomId);
  if (room) {
    res.status(200).json(room);
    return;
  } else {
    res.status(404).json();
    return;
  }
};

export const createRoom = async (req: Request, res: Response) => {
  const room = req.body;
    //Validate request data
    if (!room.name || !room.image || !room.description || !room.price || !room.carouselImages) {
    return res.status(400).json();
    }
  //Create new room
  await Room.create({
    name: room.name,
    image: room.image,
    description: room.description,
    price: room.price,
    carouselImages: room.carouselImages,
  });

  res.status(201).send();
  return;
};

export const deleteRoom =async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  await Room.findByIdAndDelete(roomId);

  res.status(200).send();
  return;
};

export const updateRoom = async (req: Request, res: Response) => {
  const roomId = req.params.roomId;
  const updatedRoom = req.body;

  //Validate request data
  if (
    !updatedRoom.name ||
    !updatedRoom.image ||
    !updatedRoom.description ||
    !updatedRoom.price ||
    !updatedRoom.carouselImages
  ) {
    return res.status(400).json();
  }

  await Room.findByIdAndUpdate(roomId, updatedRoom);

  res.status(200).send();
  return;
}