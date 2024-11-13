import { createSlice } from '@reduxjs/toolkit';  // Correct import

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [], // Initialize jobs as an empty array
    loading: false,
    error: null,
    selectedJob: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedJob: (state, action) => {
      state.selectedJob = action.payload;
    },
  },
});

export const { setJobs, setLoading, setError, setSelectedJob } = jobSlice.actions;
export default jobSlice.reducer;


