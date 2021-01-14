const express = require("express");
const router = express.Router();

router.get("/:username", (req, res, next) => {
  const username = req.params.username;

  res.status(200).json({
    username: username,
  });
});

module.exports = router;
