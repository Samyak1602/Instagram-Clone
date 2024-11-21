import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setJobs, setSelectedJob, setLoading, setError } from '@/redux/jobSlice';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const JobsPage = () => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { jobs, loading, error } = useSelector(store => store.jobs);
    const [comment, setComment] = useState([]);
    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        jobType: '',
        salaryRange: '',
        description: '',
        applied: false,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            dispatch(setLoading(true));
            try {
                const response = await axios.get('http://localhost:8000/api/v1/jobs');
                dispatch(setJobs(response.data.jobs));
            } catch (err) {
                dispatch(setError(err.message));
                toast.error('Failed to fetch jobs');
            } finally {
                dispatch(setLoading(false));
            }
        };
        fetchJobs();
    }, [dispatch]);

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const handlePostJob = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/jobs', newJob); // Ensure this URL matches the backend route
            dispatch(setJobs([...jobs, response.data.job]));
            setNewJob({ title: '', company: '', location: '', jobType: '', salaryRange: '', description: '', applied: false });
            toast.success('Job posted successfully');
        } catch (err) {
            console.error('Failed to post job:', err); // Log the error to the console
            toast.error('Failed to post job');
        }
    };

    const handleApply = async (index) => {
        try {
            const jobToUpdate = jobs[index];
            const response = await axios.put(`http://localhost:8000/api/v1/jobs/${jobToUpdate._id}`, { ...jobToUpdate, applied: true });
            const updatedJobs = jobs.map((job, i) => i === index ? response.data.job : job);
            dispatch(setJobs(updatedJobs));
            toast.success('Applied to job successfully');
        } catch (err) {
            console.error('Failed to apply to job:', err); // Log the error to the console
            toast.success('Successfully applied to job');
        }
    };

    const deleteJobHandler = async () => {
        // Similar to deletePostHandler in Post.jsx
    };

    return (
        <div className='my-8 w-full max-w-2xl mx-auto'>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='post-job-form bg-blue-50 p-6 rounded-lg shadow-md mb-8'>
                <h2 className='text-2xl font-semibold mb-4 text-blue-700'>Post a Job</h2>
                <Input
                    name="title"
                    value={newJob.title}
                    onChange={handleInputChange}
                    placeholder="Job Title"
                    className='mb-4'
                />
                <Input
                    name="company"
                    value={newJob.company}
                    onChange={handleInputChange}
                    placeholder="Company"
                    className='mb-4'
                />
                <Input
                    name="location"
                    value={newJob.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                    className='mb-4'
                />
                <Input
                    name="jobType"
                    value={newJob.jobType}
                    onChange={handleInputChange}
                    placeholder="Job Type"
                    className='mb-4'
                />
                <Input
                    name="salaryRange"
                    value={newJob.salaryRange}
                    onChange={handleInputChange}
                    placeholder="Salary Range"
                    className='mb-4'
                />
                <Textarea
                    name="description"
                    value={newJob.description}
                    onChange={handleInputChange}
                    placeholder="Job Description"
                    className='mb-4'
                />
                <Button onClick={handlePostJob} className="bg-blue-600 text-white w-full py-2 rounded-lg">
                    Post Job
                </Button>
            </div>
            <div className="job-listings">
                {jobs && jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <div key={index} className="job-item bg-white p-6 rounded-lg shadow-md mb-4">
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src={job.author?.profilePicture} alt="job_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex items-center gap-3'>
                                        <h1 className='font-semibold'>{job.author?.username}</h1>
                                        {user?._id === job.author?._id && <Badge variant="secondary">Author</Badge>}
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <MoreHorizontal className='cursor-pointer' />
                                    </DialogTrigger>
                                    <DialogContent className="flex flex-col items-center text-sm text-center">
                                        {
                                            job?.author?._id !== user?._id && <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
                                        }
                                        <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
                                        {
                                            user && user?._id === job?.author?._id && <Button onClick={deleteJobHandler} variant='ghost' className="cursor-pointer w-fit">Delete</Button>
                                        }
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <h3 className='text-xl font-semibold mt-4'>{job.title}</h3>
                            <p className='text-gray-700 mt-2'>{job.description}</p>
                            <div className='flex items-center justify-between mt-4'>
                                <div className='flex items-center gap-3'>
                                    <span className='font-medium'>{job.company}</span>
                                    <span className='text-gray-500'>{job.location}</span>
                                </div>
                                <Badge variant="secondary" className="px-3 py-1 text-xs">
                                    {job.jobType}
                                </Badge>
                            </div>
                            <div className='flex items-center justify-between mt-4'>
                                <span className='text-gray-500'>{job.salaryRange}</span>
                                <div className="job-actions">
                                    {job.applied ? (
                                        <Button className="bg-gray-400 text-white">Applied</Button>
                                    ) : (
                                        <Button
                                            className="bg-[#0095F6] hover:bg-[#3192d2] text-white"
                                            onClick={() => handleApply(index)}
                                        >
                                            Apply Now
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No job listings available.</p>
                )}
            </div>
        </div>
    );
};

export default JobsPage;
