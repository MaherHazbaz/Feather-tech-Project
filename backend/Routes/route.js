const express = require("express");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  findAllTodo,
} = require("../controller/controller");
const router = express.Router();

router.route("/").get(findAllTodo).post(createTodo).put(updateTodo);

router.route("/:id").delete(deleteTodo);
module.exports = router;
