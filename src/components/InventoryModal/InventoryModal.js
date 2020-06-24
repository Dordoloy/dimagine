import {Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';
import {playDeleteSound, playTaserSound} from '../../Sounds';

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
    <Text style={style.contentTitle}>Inventaire</Text>
    <View style={style.containerInventory}>
      <View style={style.containeritems}>
        {props.images.map((element, key) => {
          if (element === 'taser') {
            return (
              <View style={style.inventoryCase}>
                <Image
                  style={style.objectImages}
                  source={{
                    uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${
                      props.images[key]
                    }.png`,
                  }}
                />
                <TouchableOpacity
                  testID={'close-button'}
                  onPress={() => {
                    playDeleteSound();
                    props.images.splice(key, 1);
                  }}
                  title="Close">
                  <Text style={style.crossObject}>X</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={style.useItem}
                  testID={'close-button'}
                  onPress={() => {
                    playTaserSound();
                    props.images.splice(key, 1);
                    console.log('Use');
                  }}
                  title="Close">
                  <Text style={style.useItemText}>Utiliser</Text>
                </TouchableOpacity>
              </View>
            );
          } else {
            return (
              <View style={style.inventoryCase}>
                <Image
                  style={style.objectImages}
                  source={{
                    uri: `https://raw.githubusercontent.com/Dordoloy/dimagine/master/src/assets/images/${
                      props.images[key]
                    }.png`,
                  }}
                />
                <TouchableOpacity
                  testID={'close-button'}
                  onPress={() => {
                    playDeleteSound();
                    props.images.splice(key, 1);
                  }}
                  title="Close">
                  <Text style={style.crossObject}>X</Text>
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>
    </View>
  </View>
);

export default InventoryModal;
