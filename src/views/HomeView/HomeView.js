import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import {ActivityIndicator} from 'react-native';

import style from './style';
import {connect} from 'react-redux';
import {
  socket,
  onOpen,
  getList,
  subscribeRoom,
  doMessage,
} from '_components/Socket/Socket';

class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.test();
    socket.onopen = () => {
      console.log('CONNECTED');
      this.setState({loaded: true});
    };
  }

  clickGo = () => {
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
          <Text>{this.state.loaded}</Text>

          {this.state.loaded === false && (
            <View>
              <ActivityIndicator size="large" color="#ffa500" />
              <Text style={style.buttonText}>Chargement</Text>
            </View>
          )}
          {this.state.loaded === true && (
            <TouchableOpacity
              style={style.button}
              onPress={() => this.clickGo()}>
              <Text style={style.buttonText}>GO</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    // loaded: state.loaded,
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
