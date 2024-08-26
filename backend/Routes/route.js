const express = require("express");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  findAllTodo,
} = require("../controller/controller");
const router = express.Router();

router.route("/todo").get(findAllTodo).post(createTodo).put(updateTodo);

router.route("/todo/:id").delete(deleteTodo);
module.exports = router;
