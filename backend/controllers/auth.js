const jwt = require('jsonwebtoken');
const pool = require('../db');
const bcrypt = require('../services/bcrypt');

const { JWT_SECRET } = process.env;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let connection;
    try {
      connection = await pool.getConnection();

      const [rows] = await connection.query('SELECT * FROM `users` WHERE `email` = ?', [email]);

      const user = {...rows[0]};

      if (!user) {
        return res.status(400).json({ message: 'Email or password is wrong' });
      }

      if (bcrypt.comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        req.user = user;

        delete user.password;

        return res.status(200).json({ token, user });
      }

      return res.status(400).json({ message: 'Email or password is wrong' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      if (connection) return connection.release();
    }
  }

  return res.status(400).json({ message: 'Email or password is wrong' });
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    let connection;
    try {
        connection = await pool.getConnection();

        const response1 = await connection.query(
            'INSERT INTO users SET ?', 
            { email, name, password: bcrypt.password(password) },
        );

        const response2 = await connection.query(
            'SELECT * FROM users WHERE id = ?', [response1[0].insertId]
        );

        const user = response2[0][0];

        delete user.password;

        const token = jwt.sign({ id: user.id }, JWT_SECRET);

        res.status(200).json({ token, user });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
      if (connection) return connection.release();
    }
};
