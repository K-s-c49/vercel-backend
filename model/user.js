const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// ✅ Hash password before saving (WORKING VERSION)
userSchema.pre('save', function (next) {
  const user = this;

  // Only hash if password is new or modified
  if (!user.isModified('password')) return next();

  // Generate salt and hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
