import {Text, TouchableOpacity, View, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';

const HomeView = ({navigation}) => (
  <View style={style.container}>
    <RNCamera
      style={style.preview}
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
      {/*<Text style={style.titleDIM}>DIMAGINE </Text>*/}
      <Image
        style={style.titleDIM}
        source={require('../../../assets/logo_haut_sans_fond.png')}
      />
      <Text style={style.subTitleDIM}>CHASSE AU TRESOR </Text>
      <TouchableOpacity
        style={style.goBtn}
        onPress={() => navigation.navigate('HomeView')}>
        <Text style={style.goButtonText}>GO</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default HomeView;
