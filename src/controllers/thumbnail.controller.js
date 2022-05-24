const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { generateThumbnails } = require("../helpers/generateThumbnails");

const thumbnail = express.Router();

thumbnail.post("/uploadImage", async (req, res) => {
  try {
    const fileString = req.body.base64;

    const uploadResponse = await cloudinary.uploader.upload(fileString, {
      allowed_formats: ["jpeg", "png"],
      format: "jpeg",
    });

    const { public_id, secure_url } = uploadResponse;

    res.status(200).json({
      data: {
        message: "Image uploaded successfully!!",
        public_id,
        secure_url,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

thumbnail.get("/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const originalImage = await cloudinary.api.resource(image_id);

    const { format, height, width, secure_url, public_id, bytes } =
      originalImage;

    const data = {
      original: {
        bytes,
        format,
        height,
        width,
        public_id,
        secure_url,
      },
      thumbnails: generateThumbnails(image_id),
    };
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

thumbnail.delete("/:image_id", async (req, res) => {
  const { image_id } = req.params;

  try {
    const response = await cloudinary.uploader.destroy(image_id);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = thumbnail;
