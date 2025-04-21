import RoomBookings from "../infrastructure/schemas/RoomBookings.js";

export const createRoomBooking = async (req, res) => {
  const roomBooking = req.body;

  //Validate request data
  if (!roomBooking.roomId || !roomBooking.userId || !roomBooking.checkInDate || !roomBooking.checkOutDate || !roomBooking.roomNumber) {
    return res.status(400).json();
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
};

export const getAllRoomBookings = async (req, res) => {
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
}