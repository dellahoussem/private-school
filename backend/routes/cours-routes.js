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



router.get('/getCoursById/:id', async (req, res) => {
  try {
    const cours = await Cours.findById(req.params.id)
      .populate('teacherId', 'firstName lastName email')
      .populate('studentsId', 'firstName lastName email');
    res.json(cours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/affect-student/:id", async (req, res) => {
  try {
    const updatedCours = await Cours.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { studentsId: req.body.studentId } }, // empêche doublons
      { new: true }
    ).populate("studentsId", "firstName lastName email");
    res.json({ msg: "Student affecté avec succès", cours: updatedCours });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", error: err.message });
  }
});

// Retirer un student d’un cours
router.put("/remove-student/:id", async (req, res) => {
  try {
    const updatedCours = await Cours.findByIdAndUpdate(
      req.params.id,
      { $pull: { studentsId: req.body.studentId } }, // retire l'id
      { new: true }
    ).populate("studentsId", "firstName lastName email");

    res.json({ msg: "Student retiré avec succès", cours: updatedCours });
  } catch (err) {
    res.status(500).json({ msg: "Erreur serveur", error: err.message });
  }
});

// make router exportable
module.exports = router;