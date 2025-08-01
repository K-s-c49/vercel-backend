// createAdmin.js
const mongoose = require('mongoose');
// 👇 This will work if 'models' is in the same folder
const User = require('./model/user.js');


mongoose.connect('mongodb+srv://khushalsinghchundawat144:kri9gmI2DI8wm84w@cluster0.nddtxkr.mongodb.net/ecommerce').then(async () => {
  await User.create({
    name: 'khushal singh',
    email: 'khushalsingh7773@gmail.com',
    password: '7773',
    role: 'admin',
  }); 
  console.log('✅ Admin created');
  process.exit();
});
