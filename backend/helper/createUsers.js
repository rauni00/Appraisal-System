const User = require('../models/userSchema');

const createUsers = async () => {
  try {
    // Common password for all users
    const commonPassword = '3edc#EDC';

    const users = [
      {
        email: 'admin@gmail.com',
        password: commonPassword,
        role: 'Admin',
      },
      {
        email: 'supervisor@gmail.com',
        password: commonPassword,
        role: 'Supervisor',
      },
      {
        email: 'peer@gmail.com',
        password: commonPassword,
        role: 'Peer',
      },
      {
        email: 'junior@gmail.com',
        password: commonPassword,
        role: 'Junior',
      },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        const user = new User(userData);
        await user.save();
        console.log(`User created: ${userData.email}`);
      } else {
        console.log(`User already exists: ${userData.email}`);
      }
    }

    console.log('User creation process completed!');
  } catch (error) {
    console.error('Error creating users:', error);
  }
};

module.exports = createUsers;
