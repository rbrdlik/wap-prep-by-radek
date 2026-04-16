const Subject = require("../models/subject");
const Teacher = require("../models/teacher");

exports.getAllSubjects = async (req, res) => {
  try {
    const result = await Subject.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Subjects found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Subjects not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const result = await Subject.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Subject found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Subject not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    await Teacher.updateMany(
      { subjects: subjectId },
      { $pull: { subjects: subjectId } }
    );
    const result = await Subject.findByIdAndDelete(subjectId);

    if (result) {
      return res.status(200).send({
        msg: "Subject deleted and removed from teachers",
      });
    }

    res.status(404).send({ msg: "Subject not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.updateSubject = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      code: req.body.code,
      year: req.body.year,
      minimumHoursPerWeek: req.body.minimumHoursPerWeek,
      teachers: req.body.teachers
    };
    const result = await Subject.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Subject updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Subject was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createSubject = async (req, res) => {
  try {
    const data = new Subject({
      name: req.body.name,
      code: req.body.code,
      year: req.body.year,
      minimumHoursPerWeek: req.body.minimumHoursPerWeek,
      teachers: req.body.teachers
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Subject created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Subject was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
