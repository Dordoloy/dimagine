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
import {playGoSound} from '../../Sounds';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
  }
  togglePseudo = pseudo => {
    const action = {type: 'USER_PSEUDO', value: pseudo};
    this.props.dispatch(action);
  };

  render() {
    const {navigate} = this.props.navigation;
    const userPseudo = this.props.userPseudo;
    const mission = this.props.mission;

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
            <Text style={style.titleMission}>
              {mission === 'solaire'
                ? 'Mission "Système solaire"'
                : 'Mission "Pc"'}
            </Text>
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
                  onPress={() => {
                    playGoSound();
                    navigate('InGame');
                  }}>
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
    mission: state.mission,
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
