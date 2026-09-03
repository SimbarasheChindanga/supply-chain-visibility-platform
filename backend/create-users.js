const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

async function createUsers() {
  const usersFilePath = path.join(__dirname, 'users.json');
  
  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  const users = [
    {
      id: "1",
      username: "admin",
      email: "admin@supplychain.com",
      password: hashedPassword,
      role: "admin",
      fullName: "System Administrator",
      phoneNumber: "+263771234567",
      company: "Supply Chain Zimbabwe",
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      username: "driver1",
      email: "driver1@supplychain.com",
      password: hashedPassword,
      role: "driver",
      fullName: "Tendai Moyo",
      phoneNumber: "+263771234568",
      company: "Harare Logistics",
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      username: "customer1",
      email: "customer1@supplychain.com",
      password: hashedPassword,
      role: "customer",
      fullName: "Simbarashe Chindanga",
      phoneNumber: "+263771234569",
      company: "Zimbabwe Traders",
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  console.log('✅ Users created successfully!');
  console.log('📦 Total users:', users.length);
  console.log('👤 Users:', users.map(u => ({ username: u.username, role: u.role })));
  console.log('🔑 Password for all users: password123');
}

createUsers().catch(console.error);