import { isAuthenticated } from "./middleware/authentication-middleware";
import express from "express";
import { getAllRooms, getRoomByID, createRoom, deleteRoom, updateRoom } from "../application/room";
import { isAdmin } from "./middleware/autherization-middleware";


const roomsRouter = express.Router();

roomsRouter.route("/").get(getAllRooms).post(isAuthenticated, isAdmin, createRoom);
roomsRouter.route("/:roomId").get(getRoomByID).delete(isAuthenticated, isAdmin, deleteRoom).put(isAuthenticated, isAdmin, updateRoom);

export default roomsRouter;