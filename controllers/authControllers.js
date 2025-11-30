import {
  registerUser,
  loginUser,
  // refreshUser,
  getCurrentUser,
  logoutUser,
  updateSubscription,
  updateAvatar,
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
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
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

export const updateUserSubscription = async (req, res) => {
  const user_id = req.user_id;
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Body must have at least one field",
    });
  }
  const { subscription } = req.body;
  const updatedUser = await updateSubscription(user_id, subscription);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(updatedUser);
};

export const updateUserAvatar = async (req, res, next) => {
  const user_id = req.user_id;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const updatedUser = await updateAvatar(user_id, req.file);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    avatarURL: updatedUser.avatarURL,
  });
};
