const express = require('express');
const cors = require('cors');
const contactRouter = require('./app/routes/contact.route');
const ApiError = require("./app/api-error");
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: '' });
});
app.use('/api/contacts', contactRouter);

app.use((req, res, next) => {
  return next(new ApiError("Resource not found", 404));
});
app.use((err, req, res) => {
  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;