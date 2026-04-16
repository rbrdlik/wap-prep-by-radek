var express = require("express");
var router = express.Router();

const subjectController = require("../controllers/subject");

router.get("/", subjectController.getAllSubjects);

router.get("/:id", subjectController.getSubjectById);

router.delete("/:id", subjectController.deleteSubject);

router.put("/:id", subjectController.updateSubject);

router.post("/", subjectController.createSubject);

module.exports = router;
