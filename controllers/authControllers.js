import {
  registerUser,
  loginUser,
  // refreshUser,
  getCurrentUser,
  logoutUser,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newUser = await registerUser(req.body);

  if (!newUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

export const loginController = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getCurrentController = async (req, res) => {
  const result = await getCurrentUser(req.user_id);

  res.json(result);
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user_id);

  res.status(204).send();
};
