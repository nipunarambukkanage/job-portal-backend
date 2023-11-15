const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('category'); 
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error in getting jobs:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getJobById = async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId).populate('category');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    console.error('Error in getting job by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createJob = async (req, res) => {
  const { title, company, location, description, requirements, categoryId } = req.body;

  try {
    const newJob = new Job({
      title,
      company,
      location,
      description,
      requirements,
      category: categoryId,
    });

    await newJob.save();

    res.status(201).json({ message: 'Job created successfully', job: newJob });
  } catch (error) {
    console.error('Error in creating job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateJob = async (req, res) => {
  const jobId = req.params.id;
  const { title, company, location, description, requirements, category } = req.body;

  console.log("category *****", category);

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title,
        company,
        location,
        description,
        requirements,
        category,
      },
      { new: true, runValidators: true }
    ).populate('category');

    console.log("category *****", category);

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Error in updating job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    const deletedJob = await Job.findOneAndDelete({ _id: jobId }).populate('category');

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
  } catch (error) {
    console.error('Error in deleting job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
