const mongoose = require("mongoose");
const { Schema } = mongoose;

const searchSchema = new Schema({
  searchQuery: String,
  statuses: [{}],
});

mongoose.model("searches", searchSchema);