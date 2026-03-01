const express = require("express");
const router = express.Router();
const Cours = require("../models/cours-model");
const Evaluation = require("../models/evaluation");

//Ajouter cours
router.post("/addCours/:teacherId", async (req, res) => {
  try {

    const cours = new Cours({
      name: req.body.name,
      description: req.body.description,
      duration: req.body.duration,
      startDate: req.body.startDate,
      teacherId: req.params.teacherId,
      studentsId: []
    });

    const savedCours = await cours.save();
    res.json(savedCours);

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error: error.message });
  }
});
//get cours du teacher connecte
router.get("/my-courses/:teacherId", async (req, res) => {

   try {

    const courses = await Cours.find({
      teacherId: req.params.teacherId
    }).populate("studentsId", "firstName lastName email");

    res.json(courses);

  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});
//delet cours
router.delete("/:id", async (req, res) => {
  await Cours.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

//get cours et les sudent qui on affecter  

router.get("/getCourseById/:id", async (req, res) => {
  try {

    const cours = await Cours.findById(req.params.id)
      .populate("studentsId", "firstName lastName email");

    if (!cours) {
      return res.status(404).json({ msg: "Cours introuvable" });
    }

    // Récupérer toutes les évaluations du cours
    const evaluations = await Evaluation.find({
      coursId: req.params.id
    });

    // Fusionner students + evaluation
    const studentsWithGrades = cours.studentsId.map(student => {

      const existingEvaluation = evaluations.find(ev =>
        ev.studentId.toString() === student._id.toString()
      );

      return {
        ...student.toObject(),
        note: existingEvaluation ? existingEvaluation.note : null,
        evaluation: existingEvaluation ? existingEvaluation.evaluation : ""
      };
    });

    res.json({
      ...cours.toObject(),
      students: studentsWithGrades
    });

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});
//add evaluation
router.post("/grade", async (req, res) => {

  try {

    const evaluation = await Evaluation.findOneAndUpdate(
      {
        studentId: req.body.studentId,
        coursId: req.body.coursId
      },
      {
        note: req.body.note,
        evaluation: req.body.evaluation
      },
      { new: true, upsert: true }
    );

    res.json(evaluation);

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }

});

// make router exportable
module.exports = router;    