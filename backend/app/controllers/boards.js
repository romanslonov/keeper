const pool = require('../db');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    Bucket: process.env.BUCKET_NAME,
    endpoint: process.env.BUCKET_ENDPOINT,
});

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

        const response = await connection.query('SELECT id, name, createdAt FROM boards WHERE `id` = ? AND `deletedAt` IS NULL', [id]);
        
        const board = response[0][0];

        if (board) {
            return res.status(200).json({ board });
        }

        return res.status(404).json({ message: 'Board is not found' });
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

        await connection.query('UPDATE `boards` SET `deletedAt` = (?) WHERE `id` IN (?)', [now, id]);

        const [filesKeys] = await connection.query('SELECT `key` FROM `files` WHERE `boardId` = (?) AND `deletedAt` IS NULL', [id]);

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: filesKeys.map(file => ({ Key: file.key })),
            },
        };

        if (filesKeys.length > 0) {
            try {
                await s3.deleteObjects(params).promise();
                await connection.query('UPDATE `files` SET `deletedAt` = ? WHERE `key` IN ?', [now, [filesKeys.map(file => file.key)]]);
            } catch {
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.status(200).json({});
        }
        
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
                    boardId: id || 1,
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

        const [filesBD] = await connection.query(
            'SELECT * FROM files WHERE id IN (?)',
            [requested],
        );

        res.status(200).json({ files: filesBD });
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
            'SELECT * FROM `files` WHERE `deletedAt` IS NULL AND `boardId` = (?) ORDER BY `uploadedAt` DESC',
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
    const { keys } = req.body;

    let connection;
    try {
        connection = await pool.getConnection();

        const params = {
            Bucket: process.env.BUCKET_NAME,
            Delete: {
                Objects: keys.map(key => ({ Key: key })),
            },
        };

        await s3.deleteObjects(params).promise();

        const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

        await connection.query('UPDATE `files` SET `deletedAt` = ? WHERE `key` IN ?', [now, [keys]]);

        res.status(201).json({});
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const moveFiles = async (req, res) => {
    const { keys } = req.body;
    const boardId = req.params.id;

    let connection;
    try {
        connection = await pool.getConnection();

        await connection.query(
            'UPDATE files SET boardId = ? WHERE `key` IN ?', 
            [boardId, [keys]]
        );

        res.status(204).json({});
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
    moveFiles,
};