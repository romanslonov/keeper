const jwt = require('jsonwebtoken');
const pool = require('../db');

const { JWT_SECRET } = process.env;

/**
 *  The Auth Checker middleware function.
 */
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // Verify token, store decoded token and user into req
  let connection;
  try {
    connection = await pool.getConnection();

    const decoded = await jwt.verify(token, JWT_SECRET);
    const [rows] = await connection.query('SELECT * FROM `users` WHERE `id` = ?', [decoded.id]);
    const user = {...rows[0]};

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    req.token = decoded;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Unauthorized' });
  } finally {
    if (connection) connection.release();
  }

  return next();
};
