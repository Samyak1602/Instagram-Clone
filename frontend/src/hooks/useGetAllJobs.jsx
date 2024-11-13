import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setLoading, setError } from "../redux/jobSlice";
import axios from "axios";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch(setLoading(true));
      try {
        const res = await axios.get("http://localhost:8000/api/v1/jobs", { withCredentials: true });
        if (res.data.success) {
          dispatch(setJobs(res.data.jobs)); // Set jobs after successful fetch
        }
      } catch (error) {
        dispatch(setError('Failed to fetch jobs.'));
      } finally {
        dispatch(setLoading(false)); // Set loading to false when done
      }
    };

    fetchJobs();
  }, [dispatch]);

  // Return the jobs, loading, and error states from the Redux store
  return { jobs, loading, error };
};

export default useGetAllJobs;


