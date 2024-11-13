import express from 'express';
import { createJob, getJobs, getJobById } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', getJobs);               // Get all jobs
router.get('/:jobId', getJobById);       // Get a job by ID
router.post('/', createJob);             // Create a new job


export default router;

