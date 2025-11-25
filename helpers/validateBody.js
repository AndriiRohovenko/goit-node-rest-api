import HttpError from "./HttpError.js";

// Status: 400 Bad Request
// Content-Type: application/json
// ResponseBody: {
//   "message": "Помилка від Joi або іншої бібліотеки валідації"
// }

const validateBody = (schema) => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
