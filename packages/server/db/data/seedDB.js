const
  mongoose = require('mongoose'),
  colors = require('colors'),
  productSeed = require('./seeds/product.seed'),
  userSeed = require('./seeds/user.seed'),
  Order = require('../models/Order'),
  Product = require('../models/Product'),
  User = require('../models/Users'),
  { openDatabaseConnection } = require('../../config/db/index');

openDatabaseConnection();

const handleErrors = (msg, err) => {
  console.error(msg, err);
  return process.exit(1);
};

const wipeDB = async () => {
  try {
    await Order.deleteMany();
    console.log('Orders Cleared...');
    await Product.deleteMany();
    console.log('Products Cleared...');
    await User.deleteMany();
    console.log('Users Cleared...');
    process.exit(0);
  } catch(err) {
    return handleErrors('wipeDB() Failure: ', err);
  }
};

const seedDatabase = async () => {
  try {
    const createdUsers = await User.insertMany(userSeed);
    console.log('Created Users: ', createdUsers);
    const adminId = createdUsers[0]._id;
    const sampleProducts = productSeed.map(product => {
      return {...product, user: adminId}
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported...');
    process.exit(0);
  } catch (err) {
    handleErrors('importData() Failure', err);
  }
};

if (process.argv[2] === '-d') {
  return wipeDB();
} else if (process.argv[2] === '-i') {
  return seedDatabase();
}

console.log('Called SeedDB.js', process.env.CONNECT_TO_LOCALLY_HOSTED_DB);