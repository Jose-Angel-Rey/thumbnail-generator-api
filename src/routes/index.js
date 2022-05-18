const express = require("express");
const uploadFile = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs-extra");
const resizeImageFromURL = require("../helpers/resizeImageFromURL");
const router = express.Router();

router.get("thumbnail/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const originalImage = await cloudinary.api.resource(image_id);

    const { derived, format, height, width, secure_url, bytes } = originalImage;

    const data = {
      // ...originalImage,
      original: {
        bytes,
        format,
        height,
        width,
        secure_url,
      },
      thumbnails: derived,
      // thumb_400x260: resizeImageFromURL(originalImage.secure_url, 400, 260),
      // thumb_160x120: resizeImageFromURL(originalImage.secure_url, 160, 120),
      // thumb_120x120: resizeImageFromURL(originalImage.secure_url, 120, 120),
    };

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("thumbnail/delete/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const response = await cloudinary.uploader.destroy(image_id);
    res.status(200).json(response);
  } catch (err) {
    const { error } = err;
    res.status(error.http_code).json(error.message);
  }
});

router.post("uploadImage", uploadFile(), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    res.send({
      msg: "File uploaded successfully",
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });
  } catch (err) {
    const { error } = err;
    res.status(error.http_code).json(error.message);
  }
});

module.exports = router;
