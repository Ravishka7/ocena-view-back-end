import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
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
    carouselImages: [{
        type: String,
        required: true,
    }],
});

const Tour = mongoose.model("Tour", tourSchema);
export default Tour;