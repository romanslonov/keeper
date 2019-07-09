const pool = require('../db');

const getAll = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const boards = await connection.query('SELECT * FROM boards WHERE deletedAt IS NULL');

        res.status(200).json({ boards: boards[0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const getOne = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const { id } = req.params;

        const board = await connection.query('SELECT id, name, createdAt FROM boards WHERE id = (?)', [id]);

        res.status(200).json({ board: board[0][0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const create = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();

        const { name } = req.body;
        const { user } = req;

        const response = await connection.query('INSERT INTO boards (userId, name) VALUES (?, ?)', [user.id, name]);
        const board = await connection.query('SELECT id, name, createdAt FROM boards WHERE id =  (?)', [response[0].insertId]);

        res.status(201).json({ board: board[0][0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const remove = async (req, res) => {
    const { id } = req.params;

    let connection;
    try {
        connection = await pool.getConnection();
        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
        await connection.query(
            'UPDATE boards SET deletedAt = (?) WHERE id IN (?)', 
            [now, id]
        );

        res.status(200).json({});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const uploadFiles = async (req, res) => {
    const { files, user } = req;
    const { id } = req.params;
    let connection;

    try {
        connection = await pool.getConnection();

        const queries = files.map((file) => {
            return connection.query(
                'INSERT INTO files SET ?',
                {
                    userId: user.id,
                    boardId: id,
                    name: file.originalname,
                    bucket: file.bucket,
                    etag: file.etag,
                    size: file.size,
                    mimeType: file.mimetype,
                    key: file.key,
                    url: file.location,
                }
            );
        });

        let response = await Promise.all(queries);

        response = response.map(res => ({ ...res[0] }));

        const requested = response.map(res => (`${res.insertId}`));

        const filesBD = await connection.query(
            'SELECT * FROM files WHERE id IN (?)',
            [requested],
        );

        res.status(200).json({ files: filesBD[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const getFiles = async (req, res) => {
    const { id } = req.params;
    let connection;
    try {
        connection = await pool.getConnection();

        const files = await connection.query(
            'SELECT * FROM files WHERE deletedAt IS NULL AND boardId = (?)', 
            [id]
        );

        res.status(200).json({ files: files[0] });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const removeFiles = async (req, res) => {
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
    getOne,
    create,
    remove,
    uploadFiles,
    getFiles,
    removeFiles,
};