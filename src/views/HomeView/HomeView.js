import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';
import {connect} from 'react-redux';
import {
  onOpen,
  getList,
  subscribeRoom,
  doMessage,
} from '_components/Socket/Socket';

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pseudoUser: '',
    };
  }

  clickGo = () => {
    onOpen();
    getList();
    subscribeRoom('testroom');
    doMessage('coucou les amigos');
    const {navigate} = this.props.navigation;
    navigate('LoginView');
  };

  render() {
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
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={style.goContainer}>
          <Image
            style={style.logoDimagine}
            source={require('assets/images/logo_title_vertical.png')}
          />
          <Text style={style.subTitle}>CHASSE AU TRESOR</Text>
          <TouchableOpacity style={style.button} onPress={() => this.clickGo()}>
            <Text style={style.buttonText}>GO</Text>
          </TouchableOpacity>
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
)(HomeView);
