import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';

const HomeView = ({navigation}) => (
  <View style={style.mainContainer}>
    <RNCamera
      style={style.backgroundCamera}
      type={RNCamera.Constants.Type.back}
      flashMode={RNCamera.Constants.FlashMode.on}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio recording',
        message: 'We need your permission to use your audio',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
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
      <TouchableOpacity
        style={style.button}
        onPress={() => navigation.navigate('HomeView')}>
        <Text style={style.buttonText}>GO</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default HomeView;
