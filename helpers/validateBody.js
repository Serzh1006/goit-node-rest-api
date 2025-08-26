import createError from "http-errors";

const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ status: 400, message: "Body must have at least one field" });
      }
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      next(new createError.BadRequest(errorMessage));
    }
  };
};

export default validateBody;
