import HttpError from "../helpers/HttpError.js";

import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  // const {authorization} = req.headers;
  const authorization = req.get("Authorization");
  if (!authorization) throw HttpError(401, "Not authorized");

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer")
    throw HttpError(401, "Authoriaztion header must have Bearer type");

  const { data, error } = verifyToken(token);
  if (error) throw HttpError(401, error.message);

  const { id: user_id, token: user_token } = await findUser({ id: data.id });
  if (!user_id) throw HttpError(401, "Not authorized");

  if (!user_token) throw HttpError(401, "User already logout");
  if (user_token !== token) throw HttpError(401, "Invalid token");
  req.user_id = user_id;
  next();
};

export default authenticate;
