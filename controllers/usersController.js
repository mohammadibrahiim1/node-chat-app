const getUsers = (req, res, next) => {
  res.render("users", {
    title: "Login - Chat Application",
  });
};

module.exports = { getUsers };
