import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import patientData from "../../../public/data.json";
import { Patient, PatientState } from "../../types/user";


const initialState: PatientState = {
  patients: patientData as Patient[],
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
  },
});

export const { updatePatient } = patientSlice.actions;

export default patientSlice.reducer;