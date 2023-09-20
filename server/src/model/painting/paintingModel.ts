import mongoose from "mongoose";
import paitingSchema from "./paintingSchema";

const Painting = mongoose.model('Paintings', paitingSchema);
export default Painting;
