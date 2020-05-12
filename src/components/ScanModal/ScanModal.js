import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
  onKeep: () => any,
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
        id={'throw-button'}
        onPress={props.onPress}
        title="Close"
        style={style.buttons}>
        <Text>Jeter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        id={'keep-button'}
        onPress={props.onKeep}
        title="Close"
        style={style.buttons}>
        <Text>Garder</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default ScanModal;
