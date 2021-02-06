import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";
import checkAuth from "../middleware/check-auth";
import {
  get_feed,
  get_profile_posts,
  post,
  delete_post,
  like,
  dislike,
} from "../controllers/posts";

const storage = diskStorage({
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

router.get("/feed", checkAuth, get_feed);

router.get("/userposts/:username", checkAuth, get_profile_posts);

router.post("/", checkAuth, upload.single("postmedia"), post);

router.delete("/delete/:postid", checkAuth, delete_post);

router.get("/like/:postid", checkAuth, like);

router.get("/dislike/:postid", checkAuth, dislike);

export default router;
