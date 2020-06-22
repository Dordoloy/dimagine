export const socket = () => {
  const sock = new WebSocket('wss://echo.websocket.org/'); // test de connexion

  // Change the websocket address with your ngrok link bellow
  // var sock = new WebSocket('ws://1cb93a5e.ngrok.io/:8080');
  return sock;
};

export const onOpen = evt => {
  console.log('CONNECTED');
  doSend('WebSocket rocks');
};

export const onClose = evt => {
  socket.close();
  console.log('DISCONNECTED');
};

export const onMessage = evt => {
  console.log(evt.data);
  // socket.close();
};

export const onError = evt => {
  console.log(evt.data);
};

export const doSend = message => {
  console.log(message);
  var strToJson = JSON.stringify(message);
  console.log(message);

  socket.send(strToJson);
};

export const newPseudo = pseudoUser => {
  console.log('Pseudo user: ' + pseudoUser);
  let addUser = {command: 'pseudo', pseudo: pseudoUser};
  doSend(addUser);
};
