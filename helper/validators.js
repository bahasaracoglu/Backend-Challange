const validator = require("validator");

function isImageUrl(url) {
  return (
    validator.isURL(url) &&
    (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png"))
  );
}

module.exports = { isImageUrl };
