const uploader = require("../../utilities/singleUploader");

const avatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "only .jpg .jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (error) => {
    if (error) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: error.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUpload;
