const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const User = require("../models/user");
const Post = require("../models/post");

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

router.get("/:postid", (req, res, next) => {
  Post.find({ id: postid })
    .exec()
    .then((post) => {
      if (post.length >= 1) {
        res.status(200).json({
          post
        });
      }else{
        res.status(500).json({
        });
      }
    });
});

router.post("/", checkAuth, upload.single("postmedia"), (req, res, next) => {
  const post;
  if(req.file){
    post = new Post({
      username : req.body.username,
      text : req.body.text,
      media : req.file.path,
      mediatype: req.file.mimetype.split("/")[0],
    });
  }else{
    post = new Post({
      username : req.body.username,
      text : req.body.text,
      media : "",
      mediatype: "null",
    });
  }
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "posted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/feed/", checkAuth, upload.single("postmedia"), (req, res, next) => {
  const posts = {};
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if(user[0][following] > 0){
        user[0][following].map((userid) => {
          Post.find({ username:userid }).exec().then((friendposts) =>{
            friendposts.map((singlepost) => {
              posts.push(singlepost);
            });
          });
        });
        posts.sort(function(a,b){return a[date] < b[date]});
        res.statusCode(200).json({
          posts,
        });
      }
    });
});

router.delete("/", checkAuth, (req, res, next) => {
  Post.deleteOne({ id:req.body.postid, username:req.userData.username}).exec().then((result) => {
    res.statusCode(200).json({});
  }).catch((err) => {
    console.log(err);
  })
});
module.exports = router;
