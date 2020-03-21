import {Text, Image, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {RNCamera} from 'react-native-camera';

const LoginView = ({navigation}) => {
  const [value, onChangeText] = React.useState('');

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
          onPress={() => navigation.navigate('HomeView')}>
          <Image source={require('assets/images/back-button.png')} />
        </TouchableOpacity>
        <View style={style.centeredElements}>
          <Text style={style.titleMission}>Mission "Pc"</Text>
          <View style={style.modalChoosePseudo}>
            <Text style={style.modaltitle}>Choisir un pseudo</Text>
            <TextInput
              style={style.pseudoInput}
              onChangeText={pseudo => onChangeText(pseudo)}
              value={value}
            />
            <TouchableOpacity
              style={style.validateButton}
              onPress={() => navigation.navigate('InGame')}>
              <Text style={style.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={style.logoDimagine}
            source={require('assets/images/logo_title_vertical.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginView;
