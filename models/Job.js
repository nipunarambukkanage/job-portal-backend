const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  category: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: 'Category',
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
