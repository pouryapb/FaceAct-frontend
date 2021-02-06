import { Router } from "express";
const router = Router();
import multer, { diskStorage } from "multer";

import checkAuth from "../middleware/check-auth";
import {
  signup,
  login,
  search,
  get_user_info_public,
  get_user_info_private,
  patch_user_info,
  patch_avatar,
  send_request,
  accept_request,
  unsend_request,
  unfriend,
  deny_request,
} from "../controllers/users";

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

router.post("/signup", signup);

router.post("/login", login);

router.get("/search/:username", search);

router.get("/:username", get_user_info_public);

router.get("/uinfo/:username", checkAuth, get_user_info_private);

router.patch("/uinfo/:username", checkAuth, patch_user_info);

router.patch(
  "/avatarup/:username",
  checkAuth,
  upload.single("avatarImg"),
  patch_avatar
);

router.post("/req/:username", checkAuth, send_request);

router.post("/reqac/:username", checkAuth, accept_request);

router.post("/unreq/:username", checkAuth, unsend_request);

router.post("/unfriend/:username", checkAuth, unfriend);

router.post("/reqden/:username", checkAuth, deny_request);

export default router;
