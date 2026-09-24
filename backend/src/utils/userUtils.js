const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../../users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

async function createUser(userData) {
  const users = readUsers();
  
  if (users.find(u => u.username === userData.username)) {
    throw new Error('Username already exists');
  }
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const newUser = {
    id: Date.now().toString(),
    ...userData,
    password: hashedPassword,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeUsers(users);
  
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

async function validateUser(usernameOrEmail, password) {
  const user = readUsers().find(u => 
    u.username === usernameOrEmail || 
    u.email === usernameOrEmail
  );
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = { readUsers, writeUsers, createUser, validateUser };