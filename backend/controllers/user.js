const getProfile = (req, res) => {
  const { user } = req;

  delete user.password;

  return res.status(200).json({ user });
};

const getToken = (req, res) => {
  const { token } = req;

  return res.status(200).json({ token });
};

module.exports = {
  getProfile,
  getToken,
};