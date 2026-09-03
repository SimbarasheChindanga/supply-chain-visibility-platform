const { readUsers, findUserByUsernameOrEmail } = require('./src/utils/userUtils');

console.log('🔍 Checking users...');

const users = readUsers();
console.log('📦 Total users found:', users.length);

// Check each user
users.forEach(u => {
    console.log(`👤 ${u.username} (${u.role}) - ${u.email}`);
});

// Check if admin exists
const admin = findUserByUsernameOrEmail('admin');
if (admin) {
    console.log('✅ Admin found!');
    console.log('   Username:', admin.username);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
} else {
    console.log('❌ Admin NOT found!');
}