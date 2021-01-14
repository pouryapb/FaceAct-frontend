const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "posts route!",
    method: "GET",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "posts route!",
    method: "POST",
  });
});

module.exports = router;
