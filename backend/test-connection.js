const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('🔗 Attempting to connect to MongoDB Atlas...');

mongoose.connect(uri)
.then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  console.log('📦 Database:', mongoose.connection.db.databaseName);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection error:', err.message);
  process.exit(1);
});