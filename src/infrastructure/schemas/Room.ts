import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    carouselImages: [{
        type: String,
        required: true,
    }],
});

const Room = mongoose.model("Room", roomSchema);
export default Room;