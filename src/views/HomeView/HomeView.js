import {Text, TouchableOpacity, View, Image, Switch} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React, {useState} from 'react';
import style from './style';

export default function HomeView({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate('LoginView')}>
          <Text style={style.buttonText}>GO</Text>
        </TouchableOpacity>
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
      </View>
    </View>
  );
}

// export default HomeView;
