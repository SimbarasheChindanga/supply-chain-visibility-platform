const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../../users.json');

// Read users from file
function readUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write users to file
function writeUsers(users) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Find user by username or email
function findUserByUsernameOrEmail(usernameOrEmail) {
  const users = readUsers();
  return users.find(u => 
    u.username === usernameOrEmail || 
    u.email === usernameOrEmail
  );
}

// Find user by ID
function findUserById(id) {
  const users = readUsers();
  return users.find(u => u.id === id);
}

// Create new user
async function createUser(userData) {
  const users = readUsers();
  
  // Check if user exists
  if (users.find(u => u.username === userData.username)) {
    throw new Error('Username already exists');
  }
  if (users.find(u => u.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  
  const newUser = {
    id: Date.now().toString(), // Simple ID generation
    ...userData,
    password: hashedPassword,
    isActive: true,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeUsers(users);
  
  // Don't return password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

// Validate user credentials
async function validateUser(usernameOrEmail, password) {
  const user = findUserByUsernameOrEmail(usernameOrEmail);
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  // Don't return password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

module.exports = {
  readUsers,
  writeUsers,
  findUserByUsernameOrEmail,
  findUserById,
  createUser,
  validateUser
};