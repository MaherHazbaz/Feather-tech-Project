const todoModel = require("../Schema/schema");

exports.createTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const todoo = await todoModel.create({
      todo,
    });
    if (todoo) {
      return res.status(201).send({ message: "Success", data: todoo });
    }
    return res.status(400).send({ message: "Not Created" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id, todo } = req.body;
    const existTodo = await todoModel.findById({ _id: id });
    if (!existTodo) {
      return res.status(404).send({
        status: true,
        success: false,
        message: "Task not available",
      });
    } else {
      const todoo = await todoModel.findByIdAndUpdate(
        { _id: id },
        { todo },
        { new: true }
      );
      return res.status(201).send({ message: "updated", data: todoo });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.params);

    const existTodo = await todoModel.findById({ _id: id });
    if (!existTodo) {
      return res.status(404).send({
        status: true,
        success: false,
        message: "Task not available",
      });
    } else {
      await todoModel.findByIdAndDelete({ _id: id });
      return res.status(200).send({
        status: true,
        success: true,
        message: "Task deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

exports.findAllTodo = async (req, res) => {
  try {
    const todoo = await todoModel.find();
    if (todoo) {
      return res.status(200).send({ message: "success", data: todoo });
    }
    return res.status(400).send({ message: "failed" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
