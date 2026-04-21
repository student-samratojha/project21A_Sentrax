const mongoose = require("mongoose");
const auditSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    action: {
      type: String,
      enum: ["LOGIN", "LOGOUT", "REGISTER", "UPDATE", "DELETE"],
    },
    route: String,
    method: String,
    status: { type: String, enum: ["SUCCESS", "FAILED"] },
    message: String,
    ip: { type: String, default: "unknown" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Audit", auditSchema);
