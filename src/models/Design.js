import mongoose from "mongoose";

//structuur of templateje voor een zak design
const designSchema = new mongoose.Schema({
    color: { type: String, required: true },
    bagImage: { type: String, required: true },
    name: { type: String, required: true },
    font: { type: String, required: true },
    flavors: { type: [String], required: true },
});

const Design = mongoose.model("Design", designSchema); //maakt nieuwe collectie genaamds designs met per design de eigenschappen vanuit designschema

export default Design;
