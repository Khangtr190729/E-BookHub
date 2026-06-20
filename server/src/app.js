const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const env = require("./config/env");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");

const app = express();

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false, // For serving local uploads
}));

// CORS
app.use(cors({
  origin: env.CLIENT_URL,
  credentials: true,
}));

// Development logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folder for local uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Chào mừng bạn đến với E-BookHub API" });
});

// API Routes
app.use("/api", routes);

// Handle unknown routes
app.use(notFoundMiddleware);

// Global error handling
app.use(errorMiddleware);

module.exports = app;
