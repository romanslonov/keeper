const pool = require('../db');

module.exports = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const images = await connection.query('SELECT * FROM images');

        res.status(200).json({ images: images[0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};