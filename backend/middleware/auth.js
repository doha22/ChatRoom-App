const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    try {
      if (!req.headers.authorization) throw "Forbidden!!";
      const token = req.headers.authorization.split(" ")[1];
      const payload = await jwt.verify(token,'AuthUser');
      req.payload = payload;
      next();
    } catch (err) {
      res.status(401).json({
        message: "Forbidden 🚫🚫🚫",
      });
    }
  };
 

