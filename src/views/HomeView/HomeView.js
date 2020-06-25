import {Text, TouchableOpacity, View, Image, Switch} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import style from './style';
import {connect} from 'react-redux';
import {playGoSound, playRetrySound, playSwitchSound} from '../../Sounds';
import {
  socket,
  onOpen,
  getList,
  subscribeRoom,
  doMessage,
} from '_components/Socket/Socket';
import RulesModal from '../../components/RulesModal/RulesModal';

function HomeView({navigation, dispatch}) {
  const [isLoaded, setIsLoaded] = useState(false);
  socket.onOpen = () => {
    console.log('CONNECTED');
    setIsLoaded(previousState => !previousState);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    playSwitchSound();
    setIsEnabled(previousState => !previousState);
    const mission = {type: 'MISSION', value: isEnabled ? 'pc' : 'solaire'};
    dispatch(mission);
  };

  const [isRules, setIsRules] = useState(false);
  const toggleRules = () => {
    playRetrySound();
    setIsRules(previousState => !previousState);
    console.log(isRules);
  };

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
        {isRules ? (
          <TouchableOpacity
            style={style.rules}
            onPress={() => {
              toggleRules();
            }}>
            <Text style={style.buttonTextRulesCross}>X</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={style.rules}
            onPress={() => {
              toggleRules();
            }}>
            <Text style={style.buttonTextRules}>?</Text>
          </TouchableOpacity>
        )}

        {isRules && (
          <RulesModal
            message={
              isEnabled
                ? 'Trouver toutes les planètes du système solaire !'
                : "Trouver tout les composants d'un ordinateur !"
            }
          />
        )}
        <Image
          style={style.logoDimagine}
          source={require('assets/images/logo_title_vertical.png')}
        />
        <Text style={style.subTitle}>CHASSE AU TRESOR</Text>
        <Switch
          style={style.switchMission}
          trackColor={{false: '#ffffff', true: '#ffffff'}}
          thumbColor={isEnabled ? '#FF901D' : '#FF901D'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={style.switchText}>
          {isEnabled ? 'Mission "Système solaire"' : 'Mission "PC"'}
        </Text>
        <Text>{isLoaded}</Text>

        {isLoaded === false && (
          <View>
            <ActivityIndicator size="large" color="#ffa500" />
            <Text style={style.buttonText}>Chargement</Text>
          </View>
        )}
        {isLoaded === true && (
          <TouchableOpacity
            style={style.button}
            onPress={() => {
              playGoSound();
              navigation.navigate('LoginView');
            }}>
            <Text style={style.buttonText}>GO</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => {
      dispatch(action);
    },
  };
};

export default connect(mapDispatchToProps)(HomeView);
