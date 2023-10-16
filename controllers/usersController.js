const bcrypt = require("bcrypt");

const getUsers = (req, res, next) => {
  res.render(
    "users"
    //  {
    //   title: "Users - Chat Application",
    // }
  );
};

const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error",
        },
      },
    });
    
  }
};
module.exports = { getUsers, addUser };
