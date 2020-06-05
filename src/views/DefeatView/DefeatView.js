import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {RNCamera} from 'react-native-camera';
import Timer from '../../components/Timer/Timer';

class DefeatView extends React.Component {
  constructor(props) {
    super(props);
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
        <View style={style.defeatContainer}>
          <Text style={style.timesUp}>Temps écoulé !</Text>
          <Timer maxTime={0} />
          <Text style={style.title}>DEFAITE</Text>
          <View style={style.modalChoosePseudo}>
            <Text style={[style.modalTitle, style.modalLine]}>Score</Text>
            <Text style={[style.positivePoints, style.modalLine]}>+ 150</Text>
            <Text style={[style.negativePoints, style.modalLine]}>- 150</Text>
            <Text style={style.totalScore}>Total: 0</Text>
          </View>

          <TouchableOpacity
            style={style.button}
            onPress={() => navigate('HomeView')}>
            <Text style={style.buttonText}>Rejouer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DefeatView;
