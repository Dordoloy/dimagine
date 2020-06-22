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
import {addPseudo} from '_components/Socket/Socket';

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pseudoUser: '',
    };
  }

  togglePseudo = pseudo => {
    this.setState({pseudoUser: pseudo});
    const action = {type: 'USER_PSEUDO', value: pseudo};
    this.props.dispatch(action);
  };

  loginUser = () => {
    const {navigate} = this.props.navigation;
    addPseudo(this.state.pseudoUser);
    navigate('InGame');
  };

  render() {
    const {navigate} = this.props.navigation;
    const userPseudo = this.props.userPseudo;

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
            onPress={() => navigate('HomeView')}>
            <Image source={require('assets/images/back-button.png')} />
          </TouchableOpacity>
          <View style={style.centeredElements}>
            <Text style={style.titleMission}>Mission "Pc"</Text>
            <View style={style.modalChoosePseudo}>
              <Text style={style.modaltitle}>Choisir un pseudo</Text>
              <TextInput
                style={style.pseudoInput}
                onChangeText={pseudo => this.togglePseudo(pseudo)}
                value={userPseudo}
              />
              {userPseudo !== '' ? (
                <TouchableOpacity
                  style={style.validateButton}
                  onPress={() => this.loginUser()}>
                  <Text style={style.buttonText}>Valider</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[style.validateButton, style.validateButtonDisabled]}
                  onPress={() =>
                    Alert.alert('Alerte', 'Veuillez entrer un pseudo')
                  }>
                  <Text
                    style={[style.buttonText, style.validateButtonDisabled]}>
                    Valider
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Image
              style={style.logoDimagine}
              source={require('assets/images/logo_title_vertical.png')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPseudo: state.userPseudo,
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
)(LoginView);
