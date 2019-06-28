module.exports = (req, res) => {
  const { user } = req;

  delete user.password;

  res.status(200).json({ user: req.user });
};