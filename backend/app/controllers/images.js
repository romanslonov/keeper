const pool = require('../db');

const getAll = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const images = await connection.query('SELECT * FROM images WHERE deletedAt IS NULL');

        res.status(200).json({ images: images[0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const remove = async (req, res) => {
    const ids = req.body;

    let connection;
    try {
        connection = await pool.getConnection();
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await connection.query(
            'UPDATE images SET deletedAt = (?) WHERE id IN (?)', 
            [now, [ids]]
        );

        res.status(201).json({});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

module.exports = {
    getAll,
    remove,
};