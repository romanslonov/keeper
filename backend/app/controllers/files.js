const pool = require('../db');

const getAll = async (req, res) => {
    const { user } = req;
    let connection;
    try {
        connection = await pool.getConnection();

        const files = await connection.query('SELECT * FROM `files` WHERE `deletedAt` IS NULL AND userId = ? ORDER BY `uploadedAt` DESC', [user.id]);

        res.status(200).json({ files: files[0] });
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
            'UPDATE files SET deletedAt = (?) WHERE id IN (?)', 
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