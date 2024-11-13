import {Job} from '../models/jobs.model.js';

// Controller for creating a new job
export const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, salaryRange, description, applicationLink } = req.body;

    // Create a new job entry in the database
    const newJob = new Job({
      title,
      company,
      location,
      jobType,
      salaryRange,
      description,
      
    });

    // Save the job to the database
    await newJob.save();

    // Send success response
    res.status(201).json({ success: true, job: newJob });
  } catch (error) {
    // Catch and send error response
    console.error('Error creating job:', error); // Log the error to the console
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for getting all jobs
export const getJobs = async (req, res) => {
  try {
    // Fetch all jobs from the database and sort them by creation date in descending order
    const jobs = await Job.find().sort({ createdAt: -1 });

    // Send success response with the jobs
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    // Catch and send error response
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for getting a job by its ID
export const getJobById = async (req, res) => {
  const { jobId } = req.params;

  try {
    // Fetch the job by ID from the database
    const job = await Job.findById(jobId);

    // If the job is not found, return 404
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Send success response with the job details
    res.status(200).json({ success: true, job });
  } catch (error) {
    // Catch and send error response
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Controller for updating a job



