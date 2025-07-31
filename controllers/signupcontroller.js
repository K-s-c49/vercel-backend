const Signup = require('../model/signup.js');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await Signup.findOne({ email });
    if (exist) return res.status(400).json({ message: 'Email already registered' });

    const user = new Signup({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Signup.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Simulate session by sending user info (frontend handles session state)
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout (frontend clears session or token)
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
