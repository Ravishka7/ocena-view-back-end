import express from "express";
import { getAllRooms, getRoomByID, createRoom, deleteRoom, updateRoom } from "../application/room";


const roomsRouter = express.Router();

roomsRouter.route("/").get(getAllRooms).post(createRoom);
roomsRouter.route("/:roomId").get(getRoomByID).delete(deleteRoom).put(updateRoom);

export default roomsRouter;