const mongoose = require('mongoose');
module.exports.openDatabaseConnection = async () => {
  const {
    CONNECT_TO_LOCALLY_HOSTED_DB, LOCAL_MONGODB_URI, DATABASE_TYPE,
    CLOUD_MONGODB_URI, CLOUD_MONGODB_USR, CLOUD_MONGODB_PWD, CLOUD_MONGODB_DBN, CLOUD_MONGODB_PROTOCOL
  } = process.env;

  let dbConnection;

  if (CONNECT_TO_LOCALLY_HOSTED_DB === 'true') {
    dbConnection = await mongoose.connect(LOCAL_MONGODB_URI);
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Database Client Connected: ${dbConnection.connection.host}`.cyan.underline,
        DATABASE_TYPE.cyan.underline
      );
    }
  } else { // Connect To Cloud Instance
    const
      CLOUD_URI =
        `${CLOUD_MONGODB_PROTOCOL}${CLOUD_MONGODB_USR}:${CLOUD_MONGODB_PWD}${CLOUD_MONGODB_URI}${CLOUD_MONGODB_DBN}`;
    dbConnection = await mongoose.connect(CLOUD_URI);
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Database Client Connected: ${dbConnection.connection.host}`.cyan.underline,
        DATABASE_TYPE.cyan.underline
      );
    }
    return dbConnection;
  }
};