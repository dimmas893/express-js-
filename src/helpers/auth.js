
const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
    // Mendapatkan header Authorization dari request
    const authHeader = req.headers['authorization'];
    // Mendapatkan token JWT dari header Authorization
    const token = authHeader && authHeader.split(' ')[1];
    
    // Jika token tidak tersedia, kirim respon status 401 Unauthorized
    if (!token) return res.sendStatus(401);
  
    // Memverifikasi token JWT
    jwt.verify(token, 'secretkey', (err, user) => {
      // Jika token tidak valid, kirim respon status 403 Forbidden
      if (err) return res.sendStatus(403);
      // Jika token valid, simpan informasi pengguna dalam objek req untuk digunakan di rute selanjutnya
      req.user = user;
      next();
    });
  };
  module.exports = {
    authenticateToken,
  };
  