import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
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

    diagnosis: {
      type: String,
      required: true,
      trim: true,
    },

    symptoms: [
      {
        type: String,
        trim: true,
      },
    ],

    observations: {
      type: String,
      trim: true,
    },

    labTestsSuggested: [
      {
        type: String,
        trim: true,
      },
    ],

    reportFiles: [
      {
        public_id: String,
        url: String,
      },
    ],

    followUpDate: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = mongoose.model("Report", reportSchema);
