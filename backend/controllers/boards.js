const pool = require('../db');
const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = new AWS.S3({
    accessKeyId: process.env.BUCKET_ACCESS_KEY,
    secretAccessKey: process.env.BUCKET_SECRET_KEY,
    Bucket: process.env.BUCKET_NAME,
    endpoint: process.env.BUCKET_ENDPOINT,
});

const generateName = (file, timestamp, format) => `${file.mimetype.split('/')[0]}/${timestamp}/${format}.${file.originalname.split('.').pop()}`

const uploadObject = (buffer, file, timestamp, format) => {
    const params = {
        Body: buffer,
        Bucket: process.env.BUCKET_NAME,
        Key: generateName(file, timestamp, format),
        ACL: 'public-read',
        CacheControl: 'max-age=604800',
        ContentType: file.mimetype,
    };

    return s3.upload(params).promise();

};

const getAll = async (req, res) => {
    const { user } = req;

    let connection;
    try {
        connection = await pool.getConnection();

        // const boards = await connection.query('SELECT id, name, createdAt FROM boards WHERE deletedAt IS NULL AND userId = ?', [user.id]);

        let [ids] = await connection.query('SELECT `boardId` FROM `usersBoards` WHERE `userId` = ?', [user.id]);

        ids = ids.map(v => v.boardId);

        if (ids.length > 0) {
            const boards = await connection.query('SELECT * FROM `boards` WHERE `deletedAt` IS NULL AND `id` IN (?)', [ids]);
            return res.status(200).json({ boards: boards[0] });
        }
        
        return res.status(200).json({ boards: [] });
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

        const response = await connection.query('SELECT `id`, `name`, `createdAt`, `ownerId` FROM boards WHERE `id` = ? AND `deletedAt` IS NULL', [id]);
        
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

        const response = await connection.query('INSERT INTO boards (ownerId, name) VALUES (?, ?)', [user.id, name]);
        const board = await connection.query('SELECT `id`, `ownerId`, `name`, `createdAt` FROM boards WHERE id =  (?)', [response[0].insertId]);

        await connection.query('INSERT INTO usersBoards (userId, boardId) VALUES (?, ?)', [user.id,  response[0].insertId])

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
                return res.status(200).json({});
            } catch(error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
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
    const file = files[0];
    let connection;

    try {
        connection = await pool.getConnection();

        const [board] = await connection.query(
            'SELECT * FROM `usersBoards` WHERE `boardId` = ? AND `userId` = ?',
            [id, user.id]
        );

        if (board[0]) {
            const timestamp = Date.now().toString();

            const original = await uploadObject(file.buffer, file, timestamp,'original');

            const resizedBuffer = await sharp(file.buffer).resize(400, null).toBuffer().then((data) => data);

            const thumbnail = await uploadObject(resizedBuffer, file, timestamp,'thumbnail');

            const newFile = {
                originalname: file.originalname,
                mimetype: file.mimetype,
                size: file.size,
                bucket: original.Bucket,
                key: original.Key,
                url: original.Location,
                etag: original.ETag,
            };

            let response = await connection.query(
                'INSERT INTO files SET ?',
                {
                    userId: user.id,
                    boardId: id || 1,
                    name: newFile.originalname,
                    bucket: newFile.bucket,
                    etag: newFile.etag,
                    size: newFile.size,
                    mimeType: newFile.mimetype,
                    key: newFile.key,
                    url: newFile.url,
                    thumbnail: thumbnail.Location,
                }
            );

            const fileId = response[0].insertId;

            const [filesBD] = await connection.query('SELECT * FROM `files` WHERE `id` = ?', [fileId]);

            return res.status(200).json({ files: filesBD });
        }

        return res.status(500).json({ message: 'Internal server error' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};

const getFiles = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    let connection;
    try {
        connection = await pool.getConnection();

        const [board] = await connection.query(
            'SELECT * FROM `usersBoards` WHERE `boardId` = ? AND `userId` = ?',
            [id, user.id]
        );

        if (board[0]) {
            const files = await connection.query(
                'SELECT * FROM `files` WHERE `deletedAt` IS NULL AND `boardId` = ? ORDER BY `uploadedAt` DESC',
                [id, user.id]
            );
    
            return res.status(200).json({ files: files[0] });
        }

        return res.status(500).json({ message: 'Internal server error' });
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

const share = async (req, res) => {
    const boardId = req.params.id;
    const emails = req.body;

    let connection;

    try {
        connection = await pool.getConnection();

        const reqs = emails.map((email) => {
            return connection.query('SELECT `id` FROM `users` WHERE `email` = ?', [email]);
        });

        const [users] = await Promise.all(reqs);

        if (users.length > 0) {
            await Promise.all(users[0].map((user) => {
                console.log(user);
                return connection.query('INSERT INTO `usersBoards` SET ?', {
                    userId: user.id,
                    boardId,
                })
            }))

            return res.status(204).json({});
        }
        
        return res.status(404).json({ message: 'Not found' });
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
    share,
};