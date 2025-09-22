import nodemailer from "nodemailer";
import "dotenv/config";

const {
  UKR_NET_EMAIL,
  UKR_NET_PASSWORD,
  UKR_NET_HOST,
  UKR_NET_PORT,
  UKR_NET_SECURE,
} = process.env;

const nodemailerConfig = {
  host: UKR_NET_HOST,
  port: UKR_NET_PORT,
  secure: UKR_NET_SECURE,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = (payload) => {
  const email = { ...payload, from: UKR_NET_EMAIL };
  return transport.sendMail(email);
};
