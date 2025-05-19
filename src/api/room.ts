import { isAuthenticated } from "./middleware/authentication-middleware";
import express from "express";
import { getAllRooms, getRoomByID, createRoom, deleteRoom, updateRoom } from "../application/room";
import { isAutherized } from "./middleware/autherization-middleware";


const roomsRouter = express.Router();

roomsRouter.route("/").get(getAllRooms).post(isAuthenticated, isAutherized, createRoom);
roomsRouter.route("/:roomId").get(getRoomByID).delete(deleteRoom).put(updateRoom);

export default roomsRouter;