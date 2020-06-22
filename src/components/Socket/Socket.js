const socketAdress = 'fddd7d9bcc38.ngrok.io';
const webSocketAdress = 'wss://' + socketAdress + '/:8080';
export const socket = new WebSocket(webSocketAdress); // ngrok connexion
// export const socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion

export const onOpen = () => {
  console.log('CONNECTEDDDD');
  socket.onopen = () => socket.send('CONNECTED');
};

export const onClose = () => {
  socket.close();
  console.log('DISCONNECTED');
};

export const onMessage = event => {
  console.log(event);
};

export const onError = event => {
  console.log(event);
};

export const onSend = message => {
  var strToJson = JSON.stringify(message);
  // console.log(strToJson);

  socket.send(strToJson);

  socket.onmessage = () => socket.send(strToJson);

  socket.onmessage = ({data}) => {
    console.log(data);
  };
};

export const addPseudo = pseudoUser => {
  let newPseudo = {command: 'pseudo', pseudo: pseudoUser};
  onSend(newPseudo);
};

export const getList = () => {
  const getList = {command: 'list'};
  onSend(getList);
};

export const getRoomPlayers = () => {
  const roomPlayers = {command: 'roomPlayers'};
  onSend(roomPlayers);
};

export const unsubscribeRoom = () => {
  const unsubscribeRoom = {command: 'unsubscribe'};
  onSend(unsubscribeRoom);
};

export const doMessage = message => {
  let sendMessage = {command: 'message', message: message};
  onSend(sendMessage);
};

export const subscribeRoom = room => {
  let subscribeRoom = {command: 'subscribe', channel: room};
  onSend(subscribeRoom);
};
