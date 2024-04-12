const express = require("express");
const router = express.Router();
const Task = require("../model/task");
const { auth } = require("../middleware/requireLogin");

router.get("/fetchAllTask",auth, async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 5;
    const skip = (page - 1) * pageSize;
    const totalDocument = await Task.countDocuments();
	  const totalPage = Math.ceil(totalDocument / pageSize);
    const hasNextPage = totalPage > page;
    const hasPreviousPage = page > 1;
    const task = await Task.find().skip(skip).limit(pageSize);
    res.json({task, totalPage , hasNextPage , hasPreviousPage});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getTaskById/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.find({ _id: id });
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/addNewTask",auth, async (req, res) => {
  try {
    const { title, description, duedate } = req.body;
    const newTask = new Task({
      title,
      description,
      duedate,
    });
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateStatusById/:id",auth, async (req, res) => {
  try {
    const { status } = req.body;
	const {id} = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { status: status }
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/updateTaskById/:id",auth, async (req, res) => {
  try {
    const { title, description, duedate } = req.body;
    const { id } = req.params;
    let isVerified = false;
    const newTask = {};
    if (title !== undefined) {
      newTask.title = title;
    }
    if (description !== undefined) {
      newTask.description = description;
    }
    if (duedate !== undefined) {
      newTask.duedate = duedate;
    }
    const existingTask = await Task.findById(id);

    if (!existingTask) {
      return res.status(404).send("Not Found");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { $set: newTask },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteTask/:id",auth, async (req, res) => {
  try {
    taskDeleted = await Task.findByIdAndDelete(req.params.id);
    res.json(taskDeleted);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
