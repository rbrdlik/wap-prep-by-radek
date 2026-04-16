var express = require("express");
var router = express.Router();

const teacherController = require("../controllers/teacher");

router.get("/", teacherController.getAllTeachers);
router.get("/:id", teacherController.getTeacherById);
router.post("/", teacherController.createTeacher);
router.put("/:id", teacherController.updateTeacher);
router.delete("/:id", teacherController.deleteTeacher);

router.get("/:teacherId/subjects", teacherController.getAllSubjectNamesByTeacherId);

router.get("/subject/:subjectId", teacherController.getTeachersNamesBySubjectId);

module.exports = router;
