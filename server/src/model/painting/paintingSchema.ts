import mongoose from "mongoose";

const paintingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Painting name is required"]
        },
        image: {
            type: File,
            required: [true, "Paiting image is required"]
        }

    },
    {
        timestamps: true
    }
)

export default paintingSchema;