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

        await Promise.all(queries);

        res.status(200).json({ files });
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        if (connection) return connection.release();
    }
};