const
  bcrypt = require('bcryptjs'),
  userSeed = [
    {
      firstName: 'Dustin',
      lastName: 'Greco',
      email: 'dkgreco@thetroveofgems.tech',
      password: bcrypt.hashSync("0123456789", 10),
      isAppAdmin: true
    },
    {
      firstName: 'Jason',
      lastName: 'Smith',
      email: 'jsmith@gmail.com',
      password: bcrypt.hashSync("9876543210", 10)
    },
    {
      firstName: 'Cindy',
      lastName: 'Smatterling',
      email: 'smatterling@saveTheOceans.edu',
      password: bcrypt.hashSync("515959919", 10)
    }
];

module.exports = userSeed;