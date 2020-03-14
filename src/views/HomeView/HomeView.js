import { Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import React from 'react';
import style from './style';

const HomeView = ({ navigation }) => (
  
  <View style={style.mainContainer}>
    <RNCamera
      style={style.backgroundCamera}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission d\'utiliser la camera',
        message: 'L\'application necessite l\'autorisation de la camera',
        buttonPositive: 'Autoriser',
        buttonNegative: 'Refuser',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission d\'utiliser l\'enregistrement audio',
        message: 'L\'application necessite l\'autorisation de l\'enregistrement audio',
        buttonPositive: 'Autoriser',
        buttonNegative: 'Refuser',
      }}
      onGoogleVisionBarcodesDetected={({ barcodes }) => {
        console.log(barcodes);
      }}
    />
    <View style={style.goContainer}>
      <Image
        style={style.logoDimagine}
        source={require('assets/images/logo_title_vertical.png')}
      />
      <Text style={style.subTitle}>CHASSE AU TRESOR</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('HomeView')}>
        <Text style={style.buttonText}>GO</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default HomeView;
