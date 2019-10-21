const getProfile = (req, res) => {
  const { user } = req;

  delete user.password;

  res.status(200).json({ user: req.user });
};

const getToken = (req, res) => {
  const { token } = req;

  delete user.password;

  res.status(200).json({ user: req.user });
};

module.exports = {
  getProfile,
  getToken,
};