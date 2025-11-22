import User from "../models/User.js";
import Design from "../models/Design.js";

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
};

export const deleteDesignAdmin = async (req, res) => {
    await Design.findByIdAndDelete(req.params.id);
    res.json({ message: "Design deleted by admin" });
};

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
