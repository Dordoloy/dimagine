import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {RNCamera} from 'react-native-camera';
import Timer from '../../components/Timer/Timer';
import {connect} from 'react-redux';
import {playRetrySound} from '../../Sounds';

class VictoryView extends React.Component {
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
          <Text style={style.timesUp} />
          <Timer maxTime={0} />
          <Text style={style.title}>VICTOIRE</Text>
          <View style={style.modalChoosePseudo}>
            <Text style={[style.modalTitle, style.modalLine]}>Score</Text>
            <Text style={[style.positivePoints, style.modalLine]}>
              {+this.props.increaseScore}
            </Text>
            <Text style={[style.negativePoints, style.modalLine]}>
              {this.props.decreaseScore}
            </Text>
            <Text style={style.totalScore}>Total: {this.props.score}</Text>
          </View>

          <TouchableOpacity
            style={style.button}
            onPress={() => {
              playRetrySound();
              navigate('HomeView');
            }}>
            <Text style={style.buttonText}>Rejouer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.score,
    increaseScore: state.increaseScore,
    decreaseScore: state.decreaseScore,
  };
};

export default connect(mapStateToProps)(VictoryView);
