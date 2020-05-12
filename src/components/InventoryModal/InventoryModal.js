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
    {props.images.map((element, key) => {
      return (
        <View style={style.inventoryCase}>
          <TouchableOpacity
            testID={'close-button'}
            onPress={() => {
              props.images.splice(key, 1);
            }}
            title="Close">
            <Text style={style.crossObject}>X</Text>
          </TouchableOpacity>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${
                props.images[key]
              }.png`,
            }}
          />
        </View>
      );
    })}
  </View>
);

export default InventoryModal;
