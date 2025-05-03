const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  from:  { type: String, required: true },
  to:    { type: String, required: true },
  type:  { type: String, required: true },
  result: { type: Number },
  createdAt: { type: Date, default: Date.now } 
});

const Unit = mongoose.model('Unit', unitSchema);
module.exports = Unit;
