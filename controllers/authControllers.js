import {
  registerUser,
  loginUser,
  logoutUser,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const { email, subscription } = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    data: { email: email, subscription: subscription },
  });
};

export const loginController = async (req, res) => {
  const { token, user } = await loginUser(req.body);
  res.status(200).json({
    token: token,
    user: user,
  });
};

export const currentController = async (req, res) => {
  const { email, name } = req.user;
  res.status(200).json({
    email,
    name,
  });
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(200).json({
    message: "Logout is successfully!",
  });
};
