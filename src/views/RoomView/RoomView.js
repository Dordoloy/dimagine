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
import {getRoomPlayers, unsubscribeRoom} from '_components/Socket/Socket';

class RoomView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      refreshUsers: '',
    };
  }

  ready = () => {
    this.stopRefreshUser();
    const {navigate} = this.props.navigation;
    navigate('InGame');
  };

  componentDidMount() {
    this.refreshUser();
  }

  refreshUser = () => {
    this.setState({refreshUsers: setInterval(this.updateUserList, 1000)});
  };

  updateUserList() {
    let promise = getRoomPlayers();

    promise.then(value => {
      const usersString = value.data;
      const userList = usersString.split(' ');
      const userListFiltered = userList.filter(item => item);

      // TODO : Fix problem to set state
      // this.setState({users: userListFiltered});
    });
  }

  stopRefreshUser() {
    clearInterval(this.state.refreshUsers);
  }

  backButton() {
    this.stopRefreshUser();
    const {navigate} = this.props.navigation;

    unsubscribeRoom();
    navigate('LoginView');
  }

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
            onPress={() => this.backButton()}>
            <Image source={require('assets/images/back-button.png')} />
          </TouchableOpacity>

          <View style={[style.centeredElements, style.spaceBetween]}>
            <View style={[style.centeredElements, style.listRoomContainer]}>
              <Text style={style.titleMission}>Joueurs</Text>
            </View>
            <View style={[style.centeredElements, style.createRoom]}>
              <TouchableOpacity
                style={style.validateButton}
                onPress={() => this.ready()}>
                <Text style={style.buttonText}>Je suis prêt !</Text>
              </TouchableOpacity>
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
)(RoomView);
