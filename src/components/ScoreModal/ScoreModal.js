import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
  goodObjects: number,
  badObjects: number,
  missingObjects: number,
};

const ScoreModal: React.FC<Props> = props => (
  <View style={style.content}>
    <TouchableOpacity
      testID={'close-button'}
      onPress={props.onPress}
      title="Close">
      <Text style={style.cross}>X</Text>
    </TouchableOpacity>
    <Text style={style.contentTitle}>Vos objets</Text>
    <Text style={style.scoreText}>- Bons objets : {props.goodObjects}</Text>
    <Text style={style.scoreText}>- Mauvais objets : {props.badObjects}</Text>
    <Text style={style.scoreText}>
      - Objets manquant : {props.missingObjects}
    </Text>
  </View>
);

export default ScoreModal;
