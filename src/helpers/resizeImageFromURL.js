const resizeImageFromURL = (image_url, width = 400, height = 300) => {
  const [ubication, filename] = image_url.split("upload/");
  const transformation = `w_${width},h_${height},c_thumb,q_100`;
  const resizedImageURL = `${ubication}upload/${transformation}/${filename}`;

  return resizedImageURL;
};

module.exports = resizeImageFromURL;
