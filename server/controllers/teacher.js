const Teacher = require("../models/teacher");

exports.getAllTeachers = async (req, res) => {
  try {
    const result = await Teacher.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Teachers found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Teachers not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const result = await Teacher.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Teacher found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Teacher not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const result = await Teacher.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Teacher deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      age: req.body.age,
      contract: req.body.contract,
      subjects: req.body.subjects
    };
    const result = await Teacher.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Teacher updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Teacher was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const data = new Teacher({
      name: req.body.name,
      age: req.body.age,
      contract: req.body.contract,
      subjects: req.body.subjects
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Teacher created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Teacher was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllSubjectNamesByTeacherId = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId).populate("subjects");

    if (!teacher) {
      return res.status(404).send({ msg: "Teacher not found" });
    }

    if (!teacher.subjects || teacher.subjects.length === 0) {
      return res.status(404).send({ msg: "This teacher has no subjects" });
    }

    const subjectNames = teacher.subjects.map(s => s.name);

    return res.status(200).send({
      msg: "Subject names retrieved successfully",
      payload: subjectNames
    });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getTeachersNamesBySubjectId = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const teachers = await Teacher.find({ subjects: subjectId });

    if (!teachers || teachers.length === 0) {
      return res.status(404).send({ msg: "No teachers found for this subject" });
    }

    const teacherNames = teachers.map(t => t.name);

    return res.status(200).send({
      msg: "Teacher names retrieved successfully",
      payload: teacherNames
    });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};