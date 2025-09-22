import {
  registerUser,
  loginUser,
  logoutUser,
  changeAvatarUser,
  verifyUser,
  resendVerifyEmail,
} from "../services/authServices.js";

export const registerController = async (req, res) => {
  const { email, subscription, avatarURL } = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    data: { email: email, subscription: subscription, avatarURL: avatarURL },
  });
};

export const loginController = async (req, res) => {
  const { token, user } = await loginUser(req.body);
  res.status(200).json({
    token: token,
    user: user,
  });
};

export const verifyController = async (req, res) => {
  const { verificationToken } = req.params;
  await verifyUser(verificationToken);
  res.json({
    message: "Verification successful",
  });
};

export const resendVerifyController = async (req, res) => {
  await resendVerifyEmail(req.body);
  res.json({
    message: "Verify email resend successfully",
  });
};

export const currentController = async (req, res) => {
  const { email, name, avatarURL } = req.user;
  res.status(200).json({
    email,
    name,
    avatarURL,
  });
};

export const changeAvatarController = async (req, res) => {
  const poster = await changeAvatarUser(req.file, req.user);
  res.status(200).json({
    avatarURL: poster,
  });
};

export const logoutController = async (req, res) => {
  await logoutUser(req.user);
  res.status(204).json({
    message: "Logout is successfully!",
  });
};
