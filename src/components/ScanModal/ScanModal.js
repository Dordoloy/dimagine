import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
  image: string,
  message: string,
};

const ScanModal: React.FC<Props> = props => (
  <View style={style.content}>
    <Text style={style.contentTitle}>Composant trouvé !</Text>
    <Text>{props.message}</Text>
    <Image
      source={{
        uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${
          props.image
        }.png`,
      }}
      style={{width: 100, height: 100}}
    />
    <View style={style.buttonsContainer}>
      <TouchableOpacity
        testID={'close-button'}
        onPress={props.onPress}
        title="Close"
        style={style.buttons}>
        <Text>Jeter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID={'close-button'}
        onPress={props.onPress}
        title="Close"
        style={style.buttons}>
        {/*// TODO : Add item in inventory*/}
        <Text>Garder</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ScanModal;
