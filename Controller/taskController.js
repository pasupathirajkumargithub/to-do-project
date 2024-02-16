const task = require("../Modal/taskModel");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "Faild..!" : "Error !";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

//==========================================================================

exports.getAllTasks = async (req, res, next) => {
  const Task = await task.find();

  if (!task) {
    return next(new AppError("No Tasks", 204));
  }

  res.status(200).json({ status: "Success", results: Task.length, data: Task });
};

//==========================================================================

exports.getOneTask = async (req, res, next) => {
  const Task = await task.findById(req.params.id);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Data for single Task", data: Task });
};

//===========================================================================

exports.createTask = async (req, res) => {
  const newTask = await task.create(req.body);

  res.status(201).json({
    status: "Success",
    message: "Task Created successfully ",
    data: newTask,
  });
};

//=========================================================

exports.updateTask = async (req, res, next) => {
  const Task = await task.findByIdAndUpdate(req.params.id, req.body);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res.status(201).json({
    status: "Success",
    data: Task,
  });
};

//=====================================================================

exports.deleteTask = async (req, res, next) => {
  const Task = await task.findByIdAndDelete(req.params.id);

  if (!Task) {
    return next(new AppError("No document found in this ID..!", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
};

//========================================================================
