import {connect} from 'react-redux';

// export const socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion

const socketAdress = 'f718f682ab8c.ngrok.io';
const webSocketAdress = 'wss://' + socketAdress + '/:8080';

export const socket = new WebSocket(webSocketAdress); // ngrok connexion

export const onOpen = () => {
  socket.onopen = () => {
    console.log('CONNECTED');
    const action = {type: 'LOADED_APP', value: true};
    // dispatch(action);
  };
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

// const mapStateToProps = state => {
//   return {
//     loaded: state.loaded,
//   };
// };
// const mapDispatchToProps = dispatch => {
//   return {
//     dispatch: action => {
//       dispatch(action);
//     },
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(onOpen);
