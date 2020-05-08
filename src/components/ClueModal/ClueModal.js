import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
  title: string,
  image: string,
  message: string,
};

const ClueModal: React.FC<Props> = props => (
  <View style={style.content}>
    <TouchableOpacity
      testID={'close-button'}
      onPress={props.onPress}
      title="Close">
      <Text style={style.cross}>X</Text>
    </TouchableOpacity>
    <Image
      style={{width: 25, height: 25}}
      source={{
        uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${
          props.image
        }.png`,
      }}
    />
    <Text style={style.contentTitle}>{props.title}</Text>
    <Text style={style.clueText}>{props.message}</Text>
  </View>
);

export default ClueModal;
