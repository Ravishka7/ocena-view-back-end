import mongoose from 'mongoose';

const roomBookingsSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('RoomBookings', roomBookingsSchema);