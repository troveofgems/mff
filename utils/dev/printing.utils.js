const fs = require('fs');
//  PRINTS AN OBJECTS KEYS AND VALUES TO THE CONSOLE
////////////////////////////////////////////////////
const
  __constructMessage = (o, m, r, s) => `${m}\n${JSON.stringify(o, r, s)}`,
  __printMessage = (m, t) => console[t](m),
  __printLog = (logId, logData) => {
    let logName = `logs/${logId}.log`;
    fs.appendFileSync(logName, logData);
  };

const _sendToConsole = (o, m, t, r, s) => {
  let constructedMessageForConsole = __constructMessage(o, m, r, s);
  return __printMessage(constructedMessageForConsole, t);
};

const _writeToLog = (o, m, r, s, eid) => {
  let constructedMessageForConsole = __constructMessage(o, m, r, s);
  return __printLog(eid, constructedMessageForConsole);
};

module.exports = {
  sendToConsole: _sendToConsole,
  writeToLog: _writeToLog
};