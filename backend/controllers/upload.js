const pool = require('../db');

module.exports = async (req, res) => {
    const { files, user } = req;
    let connection;

    try {
        connection = await pool.getConnection();

        const queries = files.map((file) => {
            return connection.query(
                'INSERT INTO images SET ?',
                {
                    userId: user.id,
                    fileName: file.filename,
                    originalName: file.originalname,
                    size: file.size,
                    mimeType: file.mimetype,
                    destination: file.destination,
                    path: file.path,
                }
            );
        });

        let response = await Promise.all(queries);

        response = response.map(res => ({ ...res[0] }));

        const requested = response.map(res => (`${res.insertId}`));

        const images = await connection.query(
            'SELECT * FROM images WHERE id IN (?)',
            [requested],
        );

        res.status(200).json({ images: images[0] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};