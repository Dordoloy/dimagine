import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
  images: [],
};

const InventoryModal: React.FC<Props> = props => (
  <View style={style.content}>
    <TouchableOpacity
      testID={'close-button'}
      onPress={props.onPress}
      title="Close">
      <Text style={style.cross}>X</Text>
    </TouchableOpacity>
    {/*<Image*/}
    {/*  style={{width: 25, height: 25}}*/}
    {/*  source={{*/}
    {/*    uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${*/}
    {/*      props.image*/}
    {/*    }.png`,*/}
    {/*  }}*/}
    {/*/>*/}
    <Image
      style={{width: 100, height: 100}}
      source={{
        uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/carte-mere.png`,
      }}
    />
    <Image
      style={{width: 100, height: 100}}
      source={{
        uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/carte-graphique.png`,
      }}
    />
  </View>
);

export default InventoryModal;
