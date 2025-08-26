import { isHttpError } from "http-errors";

export function errorHandler(err, _req, res, _next) {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
  res.status(500).json({ status: 500, message: "Server error" });
}
