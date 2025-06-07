const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');

const secretKey = process.env.SECRET_KEY;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

let hashedAdminPassword = null;

// Hash admin password once on server start
bcrypt.hash(adminPassword, 10).then(hash => {
  hashedAdminPassword = hash;
  console.log('Admin password hashed');
});

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email !== adminEmail) return res.status(400).json({ message: 'Admin not found' });
    if (!hashedAdminPassword) return res.status(500).json({ message: 'Admin password not ready' });

    const isMatch = await bcrypt.compare(password, hashedAdminPassword);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: adminEmail, role: 'admin' }, secretKey, { expiresIn: '1h' });
    res.json({ message: 'Admin login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in admin', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};
