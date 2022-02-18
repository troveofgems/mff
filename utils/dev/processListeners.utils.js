const {PROCESS_SIGTERM} = require("../../constants/process.constants");
const {terminateAllConnections} = require("./server.utils");

module.exports.attachCleanupProcessListeners = openServers => {
  // Gracefully Shutdown Express Server
  process.on(PROCESS_SIGTERM, () => {
    console.warn('SIGTERM Received, GraceShutdown: Express Server.');
    terminateAllConnections(openServers.expressServer);
  });

  // Handle Unhandled Promise Rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error('unhandledRejection Received, GraceShutdown: Express Server.');
    terminateAllConnections(openServers.expressServer);
  });
};