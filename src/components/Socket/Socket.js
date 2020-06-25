//export const socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion
import React from 'react';

import io from 'socket.io-client/dist/socket.io';
 // note the /dist/ subdirectory (socket.io-client v.2.1.1)!
export const webSocketAdress = "f718f682ab8c"
export const socket = new WebSocket("http://f718f682ab8c.ngrok.io:3000");

export const connectionConfig = {

  /*jsonp: false,
  reconnection: true,
  reconnectionDelay: 100,
  reconnectionAttempts: 100000,
  transports: ['websocket']*/
}
//export const socket = io('http://25deea24db4e.ngrok.io:3000', connectionConfig);
  /*socket = io('http://25deea24db4e.ngrok.io:3000', {
  
});*/


//socket.on('error', console.error)
//socket.on('connect_error', console.error)

export const onOpen = () => {
  socket.onopen = () => {
    console.log('CONNECTED');
    const action = {type: 'LOADED_APP', value: true};
    dispatch(action);
  };
};

export const onClose = () => {
  socket.on('disconnect', () => console.log('deconnected'));
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
