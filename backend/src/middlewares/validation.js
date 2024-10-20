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

export const isValidPassword = (passwordName) => (req, res, next) => {
  const password = req.body[passwordName];

  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const isValid = regex.test(password);

  if (!isValid) {
    return res.status(400).json({
      error: `Invalid password`,
    });
  }
  return next();
};
