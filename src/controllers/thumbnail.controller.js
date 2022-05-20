const express = require("express");
const fs = require("fs").promises;
const uploadImage = require("../middleware/multer");
const cloudinary = require("../utils/cloudinary");
const { generateThumbnails } = require("../helpers/generateThumbnails");

const thumbnail = express.Router();

thumbnail.post("/uploadImage", uploadImage(), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    await fs.unlink(req.file.path);

    res.status(200).json({
      message: "Image uploaded successfully",
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
      },
    });
  } catch (err) {
    const { error } = err;
    res.status(error?.http_code || 500).json(error || err);
  }
});

thumbnail.get("/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const originalImage = await cloudinary.api.resource(image_id);
    const { format, height, width, secure_url, bytes } = originalImage;
    const data = {
      original: {
        bytes,
        format,
        height,
        width,
        secure_url,
      },
      thumbnails: generateThumbnails(image_id),
    };
    res.status(200).json(data);
  } catch (err) {
    const { error } = err;
    res.status(error?.http_code || 500).json(error || err);
  }
});

thumbnail.delete("/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const response = await cloudinary.uploader.destroy(image_id);
    res
      .status(200)
      .json({ ...response, message: "Image deleted successfully!" });
  } catch (err) {
    const { error } = err;
    res.status(error?.http_code || 500).json(error || err);
  }
});

module.exports = thumbnail;
