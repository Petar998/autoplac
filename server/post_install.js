const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('\nDB connected...\n');
    const prevAdmin = await User.findOne({ email: process.env.INIT_ADMIN_EMAIL });
    if (!prevAdmin) {
      console.log('\nCreating initial admin user!\n');
      const admin = await new User({
        role: 'admin',
        // emailToken: 'null',
        // passwordToken: 'null',
        email: process.env.INIT_ADMIN_EMAIL,
        password: process.env.INIT_ADMIN_PASSWORD,
        firstName: process.env.INIT_ADMIN_FIRSTNAME,
        lastName: process.env.INIT_ADMIN_LASTNAME,
      }).save();
      if (admin) console.log('Admin created!\n', 'Email: ' + process.env.INIT_ADMIN_EMAIL + '\n', 'Password: ' + process.env.INIT_ADMIN_PASSWORD);
    }
  })
  .catch((error) => console.error(error.message))
  .finally(() => {
    mongoose.disconnect();
    console.log('\nDB disconnected\n');
  });
