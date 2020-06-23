import {Text, View} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  onPress: () => any,
};

const RulesModal: React.FC<Props> = props => (
  <View style={style.content}>
    <Text>Test</Text>
  </View>
);

export default RulesModal;
