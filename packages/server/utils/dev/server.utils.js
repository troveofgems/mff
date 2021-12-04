const crypto = require("crypto");

module.exports.terminateAllConnections = httpExpressServer => {
  let allConnectionsTerminatedSuccessfully = false;
  console.warn('SIGTERM received: Closing HTTP Server');
  console.error('Please Close The DB Connection...'); // Expand On Code Here
  httpExpressServer.close(() => console.log('Graceful Server Shutdown'));
  if (allConnectionsTerminatedSuccessfully) {
    process.exit(0);
  }
  console.error('Not all connections were closed successfully...');
  process.exit(1);//
};

module.exports.insecurelyGenerateSessionToken = () => {
  const sessionToken =
    crypto
      .randomBytes(parseInt(process.env.IES_RANDOM_BYTE_SIZE) || 32)
      .toString('hex');

  console.error('!!!!!!!!!!!!!! YOU HAVE FORGOTTEN TO SET A SECRET TOKEN FOR EXPRESS SESSION.');
  console.error('!!!!!!!!!!!!!! GENERATING A RANDOM 32 CHAR SESSION STRING...');
  console.error(`!!!!!!!!!!!!!! GENERATED SECRET FOR TOKEN:\n\t${sessionToken}`);
  console.error('!!!!!!!!!!!!!! PLEASE CONFIGURE < SESSION_META_SECRET > IN THE [README.md] FILE ASAP!!');

  return sessionToken;
};