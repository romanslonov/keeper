const bcrypt = require('bcrypt-nodejs');

exports.password = (password) => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

exports.comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);
