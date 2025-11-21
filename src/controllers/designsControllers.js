import Design from "../models/Design.js";

//een nieuw design opslaan
export const createDesign = async (req, res) => {
    try {
        const newDesign = new Design(req.body);
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };


//alle designs ophalen

export const getAllDesigns = async (req, res) => {
    try {
      const designs = await Design.find();  // alle designs uit de database
      res.status(200).json(designs);        // stuur de lijst terug naar de frontend
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  