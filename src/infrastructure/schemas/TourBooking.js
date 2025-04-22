import mongoose from "mongoose";

const tourBookingSchema = new mongoose.Schema({
    tourId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    numberOfAdults: {
        type: Number,
        required: true,
    },
    numberOfChildren: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("TourBooking", tourBookingSchema);