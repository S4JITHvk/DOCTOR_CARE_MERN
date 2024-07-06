
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctor: null, 
  isAuthenticated: false,
};
const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setDoctor(state, action) {
      state.doctor= action.payload;
      state.isAuthenticated = true;
    },
    clearDoctor(state) {
      state.doctor = null;
      state.isAuthenticated = false;
    }
  }
});
export const { setDoctor, clearDoctor} = doctorSlice.actions;
export default doctorSlice.reducer;
