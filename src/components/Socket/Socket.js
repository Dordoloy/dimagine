// export const socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion
import openSocket from 'socket.io-client';
const socketAdress = '3cdc30f37b38.ngrok.io';
const webSocketAdress = 'wss://' + socketAdress + '/:8080';

export const socket = new WebSocket(webSocketAdress); // ngrok connexion


export const onOpen = () => {
  socket = io.connect(webSocketAdress, {
    transport: ['websocket'],
    reconnectionAttempts: 3
  });

  state = {
    connected: false
  };

  componentDidMount() {
    this.onConnectSocket();
  }

  onConnectSocket = () => {
    if(this.socket) {
      this.socket.on('connect', () => {
        this.socket.emit('CONNECTED');

        this.setState({
          connected: true
        });
      });
    }
  }
}
/*
export const onOpen = () => {
  socket.onopen = () => {
    console.log('CONNECTED');
    const action = {type: 'LOADED_APP', value: true};
    // dispatch(action);
  };
};*/

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
  socket.send(strToJson);

  const promise = new Promise((resolve, reject) => {
    socket.onmessage = ({data}) => {
      resolve({data});
    };
  });

  return promise;
};

export const addPseudo = pseudoUser => {
  let cleanPseudoUser = pseudoUser;
  cleanPseudoUser = cleanPseudoUser.replace(/[^\w\s]/gi, '');
  cleanPseudoUser = cleanPseudoUser.replace(/\s/g, '-');
  let newPseudo = {command: 'pseudo', pseudo: cleanPseudoUser};
  onSend(newPseudo);
};

export const getList = () => {
  const getList = {command: 'list'};
  onSend(getList);
};

export const getRoomPlayers = () => {
  const roomPlayers = {command: 'roomPlayers'};

  let promise = onSend(roomPlayers);
  return promise;
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
