const upload = (req, res) => {
    console.log(req.files.length);
    res.status(200).json({
        files: req.files,
    });
};

module.exports = {
    upload,
};