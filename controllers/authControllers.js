import { registerUser, loginUser } from "../services/authServices.js";

export const addUserController = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newUser = await registerUser(req.body);

    if (!newUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    res
      .status(201)
      .json({
        user: { email: newUser.email, subscription: newUser.subscription },
      });
  } catch (error) {
    next(error);
  }
};

export const loginUserController = async (req, res, next) => {
  try {
    const token = await loginUser(req.body);
    res.json(token);
  } catch (error) {
    next(error);
  }
};
