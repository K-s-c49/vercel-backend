const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/user.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1️⃣ Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  // 2️⃣ Compare entered password with hashed one in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

  // 3️⃣ Create and return token
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
