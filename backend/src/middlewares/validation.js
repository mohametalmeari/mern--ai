export const hasRequiredFields =
  (...fields) =>
  (req, res, next) => {
    const missingFields = fields.filter((f) => !req.body[f]);
    if (missingFields.length) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
    return next();
  };
