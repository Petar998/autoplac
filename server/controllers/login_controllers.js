const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

dotenv.config();

exports.login = async (req, res) => {
  User.findOne({ email: req.body.email })
    .exec(async (error, user) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!user) {
        return res.status(401).json({ message: 'Auth failed, user not found!' });
      }
      if (!user.validPassword(req.body.password)) {
        return res.status(401).json({ message: 'Auth failed, incorrect password' });
      }
      const t = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        },
      );
      req.user = user;
      res.cookie('jwt', t, { httpOnly: true, maxAge: 3600000 });
      return res.status(200).json({
        message: 'Auth successful',
        token: t,
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        expires: new Date(Date.now() + 43200000).toISOString(),
      });
    });
};