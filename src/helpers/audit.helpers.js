const auditModel = require("../db/models/audit.model");
async function auditLog(req, user, action, status) {
  try {
    await auditModel.create({
      user: user?._id || req.user?._id || null,
      action: action,
      route: req.originalUrl,
      method: req.method,
      status,
      ip: req.ip,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = auditLog;
