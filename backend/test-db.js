const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('🔗 Attempting to connect to MongoDB Atlas...');
console.log('📝 Connection string:', uri.replace(/\/\/.*@/, '//****:****@')); // Hides password

mongoose.connect(uri)
.then(() => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  console.log('📦 Database:', mongoose.connection.db.databaseName);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Connection error:', err.message);
  console.log('\n💡 Troubleshooting tips:');
  console.log('1. Check your IP is whitelisted in Atlas');
  console.log('2. Verify username and password are correct');
  console.log('3. Make sure the connection string is valid');
  process.exit(1);
});