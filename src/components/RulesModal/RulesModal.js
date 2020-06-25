import {Text, View} from 'react-native';
import React from 'react';
import style from './style';

type Props = {
  message: string,
};

const RulesModal: React.FC<Props> = props => (
  <View style={style.content}>
    <Text style={style.contentTitle}>Règles</Text>
    <Text style={style.contentTextList}>Bienvenue aventurier !</Text>
    <Text style={style.contentTextList}>Ton objectif sera le suivant :</Text>
    <Text style={style.rulesText}>{props.message}</Text>
    <Text style={style.contentText}>
      Mais attention à ne pas scanner les mauvais objets au risque de perdre des
      points !
    </Text>
    <Text style={style.rulesText}>
      Pour que votre score change, il faut aller valider votre inventaire à la
      borne.
    </Text>
    <Text style={style.rulesText}>
      Voici comment gagner et perdre des points :
    </Text>
    <Text style={style.rulesTextList}>- Scanner un bon objet : +50 points</Text>
    <Text style={style.contentTextList}>
      - Scanner un mauvais objet : -15 points
    </Text>
    <Text style={style.contentTextList}>
      - Il manque X bons objets : -15*X points
    </Text>
    <Text style={style.contentTextList2}>- Ouvrir un indice : -10 points</Text>
    <Text style={style.rulesText}>
      La partie se termine lorsque tout les bons objets sont trouvés ou que le
      temps imparti est terminé.
    </Text>
  </View>
);

export default RulesModal;
