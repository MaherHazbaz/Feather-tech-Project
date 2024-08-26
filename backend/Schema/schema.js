const { default: mongoose } = require("mongoose");
const Schema = new mongoose.Schema({
  todo: { type: String },
});
const todoModel = mongoose.model("todo", Schema);
module.exports = todoModel;
