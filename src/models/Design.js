import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    backgroundColor: { type: String, required: true },
    bagColor: { type: String, required: true },

    title: { type: String, required: true },
    titleFont: { type: String, required: true },

    flavors: { type: [String], required: true },

    smallImageUrl: { type: String },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

}, { timestamps: true });

export default mongoose.model("Design", designSchema);
