import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import style from './style';
import {RNCamera} from 'react-native-camera';
import {connect} from 'react-redux';
import {getList, subscribeRoom} from '_components/Socket/Socket';

class RoomList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: ['Room-1', 'Room-2', 'Room-3'],
      roomName: '',
      test: 'test1',
    };
  }

  componentDidMount() {
    this.refreshRooms();
  }

  refreshRooms = () => {
    // TODO : Parse Json
    let allRoomsString = getList();
    let allRooms = [];
    if (allRoomsString != undefined) {
      allRooms = allRoomsString.split(' ');
    }
    // allRooms = JSON.parse(allRoomsString);
    // console.log(typeof allRoomsString);
    // console.log(allRoomsString);
    // console.log(allRooms);
    // this.setState({rooms: allRooms});
  };

  updateNameRoom = name => {
    this.setState({roomName: name});
  };

  createRoom = () => {
    subscribeRoom(this.state.roomName);

    const {navigate} = this.props.navigation;
    navigate('InGame');
  };

  enterInRoom = room => {
    this.setState({roomName: room});
    setTimeout(() => {
      subscribeRoom(this.state.roomName);

      const {navigate} = this.props.navigation;
      navigate('InGame');
    }, 20);
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={style.mainContainer}>
        <RNCamera
          style={style.backgroundCamera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission d'utiliser la camera",
            message: "L'application necessite l'autorisation de la camera",
            buttonPositive: 'Autoriser',
            buttonNegative: 'Refuser',
          }}
        />
        <View style={style.goContainer}>
          <TouchableOpacity
            style={style.backButton}
            onPress={() => navigate('LoginView')}>
            <Image source={require('assets/images/back-button.png')} />
          </TouchableOpacity>

          <View style={[style.centeredElements, style.spaceBetween]}>
            <View style={[style.centeredElements, style.listRoomContainer]}>
              <Text style={style.titleMission}>Liste des rooms</Text>

              <View style={style.listRoom}>
                {this.state.rooms.map(room => {
                  return (
                    <TouchableOpacity
                      style={style.roomDivBtn}
                      onPress={() => this.enterInRoom(room)}>
                      <Text style={style.roomBtn}>{room}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View style={[style.centeredElements, style.createRoom]}>
              <Text style={style.titleMission}>Créer une room</Text>
              <View style={style.modalChoosePseudo}>
                <TextInput
                  style={style.pseudoInput}
                  onChangeText={nameRoom => this.updateNameRoom(nameRoom)}
                  value={this.state.roomName}
                />
                {this.state.roomName !== '' ? (
                  <TouchableOpacity
                    style={style.validateButton}
                    onPress={() => this.createRoom()}>
                    <Text style={style.buttonText}>Créer</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[style.validateButton, style.validateButtonDisabled]}
                    onPress={() =>
                      Alert.alert('Alerte', 'Veuillez entrer un nom de room')
                    }>
                    <Text
                      style={[style.buttonText, style.validateButtonDisabled]}>
                      Créer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // userPseudo: state.userPseudo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => {
      dispatch(action);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoomList);
