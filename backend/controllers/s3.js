const pool = require('../db');

module.exports = async (req, res) => {
    const { files, user } = req;
    let connection;

    try {
        connection = await pool.getConnection();

        const queries = files.map((file) => {
            return connection.query(
                'INSERT INTO files SET ?',
                {
                    userId: user.id,
                    boardId: 1,
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