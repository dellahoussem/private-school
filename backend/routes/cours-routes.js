const express = require("express");
const router = express.Router();
const Cours = require("../models/cours-model");
const User = require("../models/user-model");

//Ajouter cours
router.post("/add", async (req, res) => {
  try {
    const newCours = new Cours({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration,
      startDate: req.body.startDate,
      teacherId: req.body.teacherId
    });

    const savedCours = await newCours.save();
    res.status(201).json({ message: "Cours ajouté avec succès", cours: savedCours });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getAlleCours", async (req, res) => {
  try {
    const cours = await Cours.find().populate("teacherId", "firstName lastName");
    res.status(200).json(cours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Supprimer un cours
router.delete("/:id", async (req, res) => {
  try {
    await Cours.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cours supprimé avec succès ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// make router exportable
module.exports = router;