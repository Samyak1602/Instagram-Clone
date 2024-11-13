import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socketio",
  initialState: {
    // socket: null // Remove this line
  },
  reducers: {
    // actions
    // setSocket: (state, action) => {
    //   state.socket = action.payload; // Remove this line
    // }
  }
});

// export const { setSocket } = socketSlice.actions; // Remove this line
export default socketSlice.reducer;