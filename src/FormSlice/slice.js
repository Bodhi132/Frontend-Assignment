import { createSlice } from "@reduxjs/toolkit";


const FormSlice = createSlice({
  name: "form",
  initialState: {},
  reducers: {
    updateField: (state, action) => {
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    },
    resetForm: () => ({})
  }
});

export const { updateField,resetForm } = FormSlice.actions;

export default FormSlice.reducer;