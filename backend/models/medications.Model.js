import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    medicines: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        dosage: {
          type: String,
          required: true, // e.g. "500mg"
        },
        frequency: {
          type: String,
          required: true, // e.g. "Twice a day"
        },
        duration: {
          type: String,
          required: true, // e.g. "5 days"
        },
        instructions: {
          type: String, // e.g. "After meal"
        },
      },
    ],

    generalInstructions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Medication = mongoose.model("Medication", medicationSchema);
