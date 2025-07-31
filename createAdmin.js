// createAdmin.js
const mongoose = require('mongoose');
// 👇 This will work if 'models' is in the same folder
const User = require('./model/user.js');


mongoose.connect('mongodb://localhost:27017/ecommerce').then(async () => {
  await User.create({
    name: 'Admin',
    email: 'khushal02@gmail.com',
    password: '123',
    role: 'admin',
  });
  console.log('✅ Admin created');
  process.exit();
});
