const cloudinary = require("../utils/cloudinary");

const commonThumbnailSizes = ["400x300", "160x120", "120x120"];

const generateThumbnails = (image_id) => {
  return commonThumbnailSizes.map((commonThumbSize) => {
    const [width, height] = commonThumbSize.split("x");
    return {
      width,
      height,
      secure_url: cloudinary.url(image_id, {
        width,
        height,
        crop: "thumb",
        quality: 100,
      }),
    };
  });
};

module.exports = {
  commonThumbnailSizes,
  generateThumbnails,
};
