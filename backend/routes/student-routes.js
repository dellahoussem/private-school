const express = require("express");
const router = express.Router();
const Cours = require("../models/cours-model");
const Evaluation = require("../models/evaluation");

// 🔹 GET courses du student
router.get("/my-courses/:studentId", async (req, res) => {
  try {

    const courses = await Cours.find({
      studentsId: req.params.studentId
    });

    res.json(courses);

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});

router.get("/course-details/:studentId/:coursId", async (req, res) => {
  try {

    const cours = await Cours.findById(req.params.coursId);

    const evaluation = await Evaluation.findOne({
      studentId: req.params.studentId,
      coursId: req.params.coursId
    });

    res.json({
      cours,
      note: evaluation ? evaluation.note : null,
      evaluation: evaluation ? evaluation.evaluation : null
    });

  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur" });
  }
});
// make router exportable
module.exports = router;
