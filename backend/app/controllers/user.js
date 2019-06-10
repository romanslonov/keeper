const profile = (req, res) => {
    res.status(200).json({
      user: { name: 'name' },
    });
  };
  
  module.exports = {
    profile,
  };