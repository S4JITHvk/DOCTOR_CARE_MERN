import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../API/DoctorCareApi"

const initialState = {
  slots: [],
  loading: false,
  error: null,
};

export const fetchSlotsAsync = createAsyncThunk(
  'slots/fetchSlotsAsync',
  async (doctorId, thunkAPI) => {
    try {
      const response = await Api.get(`/doctor/fetchslots/${doctorId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const slotsSlice = createSlice({
  name: "slots",
  initialState,
  reducers: {
    addSlot(state, action) {
      state.slots.push(action.payload);
    },
    removeSlots(state) {
      state.slots = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlotsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlotsAsync.fulfilled, (state, action) => {
        state.slots = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchSlotsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addSlot, removeSlots } = slotsSlice.actions;
export default slotsSlice.reducer;
