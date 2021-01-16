const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const type = file.mimetype.split("/")[0];
  if (type === "image" || type === "video") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});

const checkAuth = require("../middleware/check-auth");

const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "user exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              username: req.body.username,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            message: "auth successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:username", (req, res, next) => {
  const username = req.params.username;

  User.find({ username: username })
    .select("avatar username firstName lastName posts followings followers")
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      res.status(200).json({
        userInfo: user[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/uinfo/:username", checkAuth, (req, res, next) => {
  const username = req.params.username;
  if (username !== req.userData.username) {
    return res.status(401).json({
      message: "auth failed",
    });
  }
  User.find({ username: username })
    .select(
      "avatar username firstName lastName posts followings followers requests email"
    )
    .then((user) => {
      res.status(200).json(user[0]);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/uinfo/:username", checkAuth, (req, res, next) => {
  const username = req.params.username;
  if (username !== req.userData.username) {
    return res.status(401).json({
      message: "auth failed",
    });
  }
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ username: username }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.patch(
  "/avatarup/:username",
  checkAuth,
  upload.single("avatarImg"),
  (req, res, next) => {
    const username = req.params.username;
    if (username !== req.userData.username) {
      return res.status(401).json({
        message: "auth failed",
      });
    }
    User.update({ username: username }, { $set: { avatar: req.file.path } })
      .exec()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

router.post("/req/:username", checkAuth, (req, res, next) => {
  const reciver = req.params.username;
  const sender = req.userData.username;
  User.update({ username: reciver }, { $push: { requests: sender } })
    .exec()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/reqac/:username", checkAuth, (req, res, next) => {
  const reciver = req.params.username;
  const sender = req.userData.username;
  User.update(
    { username: sender },
    { $pull: { requests: reciver }, $push: { followers: reciver } }
  )
    .exec()
    .then((user) => {
      res.status(201).json({
        message: "ok",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/reqden/:username", checkAuth, (req, res, next) => {
  const reciver = req.params.username;
  const sender = req.userData.username;
  User.update({ username: sender }, { $pull: { requests: reciver } })
    .exec()
    .then((user) => {
      res.status(201).json({
        message: "ok",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
