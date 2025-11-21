import Design from "../models/Design.js";



//GET: alle designs ophalen
export const getAllDesigns = async (req, res) => {
    try {
      const designs = await Design.find(); 
       // alle designs uit de database
      res.status(200).json(designs);        // stuur de lijst terug naar de frontend
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


//POST: een nieuw design opslaan
export const createDesign = async (req, res) => {
    try {
        const newDesign = new Design(req.body);
        const savedDesign = await newDesign.save();
        res.status(201).json(savedDesign);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };


//PUT: een bestaand design aanpassen
export const updateDesign = async (req, res) => {
    try {
        const { id } = req.params; //het ID dat ik wil updaten komt uit de URL
        const updatedDesign = await Design.findByIdAndUpdate( //de nieuwe waarden komen uit de req.body
            id,
            req.body,
            { new: true } // retourneer het bijgewerkte document
        );
        if (!updatedDesign) { //als er geen design bestaat met dat ID
            return res.status(404).json({ error: "Design not found" });
        }
        res.status(200).json(updatedDesign);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//DELETE: een design verwijderen
export const deletedDesign = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDesign = await Design.findByIdAndDelete(id);
        if (!deletedDesign) {
            return res.status(404).json({ error: "Design not found" });
        }
        res.status(200).json({ message: "Design deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};