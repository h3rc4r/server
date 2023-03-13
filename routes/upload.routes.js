const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const { cloudinaryConfig } = require("../config/cloudinary.config");

router.post("/api/upload", cloudinaryConfig, (req, res) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "ladiaria-project",
      allowed_formats: ["jpg", "png"],
    },
  });
  const upload = multer({ storage }).single("avatar");

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.json({ imageUrl: req.file.path });
  });
});

module.exports = router;