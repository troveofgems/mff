//  PRINTS AN OBJECTS KEYS AND VALUES TO THE CONSOLE
////////////////////////////////////////////////////
const
  __constructMessage = (o, m, r, s) => `${m}\n${JSON.stringify(o, r, s)}`,
  __printMessage = (m, t) => console[t](m);

const _sendToConsole = (o, m, t, r, s) => {
  let constructedMessageForConsole = __constructMessage(o, m, r, s);
  return __printMessage(constructedMessageForConsole, t);
};

module.exports = {
  sendToConsole: _sendToConsole
};