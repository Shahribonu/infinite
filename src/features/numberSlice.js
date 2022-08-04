import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

export const fetchNumbers = createAsyncThunk("number/fetchNumbers", () => {
  const numbers = axios
    .get("https://jsonplaceholder.typicode.com/photos")
    .then((res) => res.data);

  console.log(numbers);
  return numbers;
});

const numberSlice = createSlice({
  name: "number",
  initialState: initialState,
  extraRedusers: (builder) => {
    builder.addCase(fetchNumbers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNumbers.fulfilled, (state, action) => {
      state.loading = false;
      state.numbers = action.payload;
      state.error = "";
    });
    builder.addCase(fetchNumbers.rejected, (state, action) => {
      state.loading = false;
      state.numbers = [];
      state.error = action.error.message;
    });
  },
});

export default numberSlice.reducer;
