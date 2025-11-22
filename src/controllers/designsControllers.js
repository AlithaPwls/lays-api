import Design from "../models/Design.js";

// GET all designs
export const getAllDesigns = async (req, res) => {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
};

// CREATE design
export const createDesign = async (req, res) => {
    try {
        const newDesign = await Design.create({
            userId: req.user.userId,
            ...req.body
        });
        res.status(201).json(newDesign);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//UPDATE design
export const updateDesign = async (req, res) => {
    const { id } = req.params;

    const design = await Design.findById(id);
    if (!design) return res.status(404).json({ error: "Design not found" });

    if (design.userId.toString() !== req.user.userId)
        return res.status(403).json({ error: "Not authorized to update this design" });

    const updatedDesign = await Design.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedDesign);
};


//DELETE design
export const deleteDesign = async (req, res) => {
    const { id } = req.params;

    const design = await Design.findById(id);
    if (!design) return res.status(404).json({ error: "Design not found" });

    if (design.userId.toString() !== req.user.userId)
        return res.status(403).json({ error: "Not authorized to delete this design" });

    await design.remove();
    res.json({ message: "Design deleted" });
};

// LIKE design
export const likeDesign = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const design = await Design.findById(id);
    if (!design) return res.status(404).json({ error: "Design not found" });

    if (design.userId.toString() === userId)
        return res.status(403).json({ error: "Cannot like your own design" });

    if (design.likes.includes(userId))
        return res.status(400).json({ error: "Already liked" });

    design.likes.push(userId);
    await design.save();

    res.json({ message: "Liked" });
};

// REMOVE LIKE
export const removeLike = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    const design = await Design.findById(id);
    if (!design) return res.status(404).json({ error: "Not found" });

    design.likes = design.likes.filter(like => like.toString() !== userId);
    await design.save();

    res.json({ message: "Like removed" });
};
