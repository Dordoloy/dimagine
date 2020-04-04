import {Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';

class InGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: [(id = 0), (data = '')],
      scanActive: 0,
      isObjectToScan: 0,
      score: 0,
    };
  }

  barcodeRecognized = ({barcodes}) => {
    if (this.state.scanActive === 1) {
      this.setState({scanActive: 0});
      let newBarcode = [];

      barcodes.forEach(barcode => {
        newBarcode[data] = barcode.data;
        newBarcode[id] = 5;

        console.log(newBarcode);

        // TODO : Problem to save newBarcode data on state
        this.setState({barcode: newBarcode});

        // TODO : Send the tag informations to the websocket and display the received information
      });

      Alert.alert(
        'Composant trouvé !',
        newBarcode[data],
        [
          {
            text: 'Fermer',
            onPress: () => console.log('Non ajouté'),
            style: 'cancel',
          },
          {
            text: "Ajouter à l'inventaire",
            onPress: () => console.log("Item ajouté dans l'inventaire"),
            // TODO : Add item in inventory
          },
        ],
        {cancelable: false},
      );
    }
  };

  scanPushed = () => {
    this.setState({scanActive: 1});
    if (this.state.isObjectToScan === 0 && this.state.scanActive === 1) {
      Alert.alert('Rien à scanner ici !');
    }
  };

  incrementScore = value => {
    let newScore = this.state.score + value;
    this.setState({score: newScore});
  };

  backToHome = () => {
    const {navigate} = this.props.navigation;
    navigate('LoginView');
  };

  render() {
    return (
      <View style={style.mainContainer}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={style.backgroundCamera}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: "Permission d'utiliser la camera",
            message: "L'application necessite l'autorisation de la camera",
            buttonPositive: 'Autoriser',
            buttonNegative: 'Refuser',
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission d'utiliser l'enregistrement audio",
            message:
              "L'application necessite l'autorisation de l'enregistrement audio",
            buttonPositive: 'Autoriser',
            buttonNegative: 'Refuser',
          }}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        />
        <View style={style.header}>
          <View style={style.playingHeader}>
            <TouchableOpacity onPress={() => this.backToHome()}>
              <Image source={require('assets/images/back-button.png')} />
            </TouchableOpacity>
            <View style={style.score}>
              <Text style={style.fontHeader}>SCORE</Text>
              <Text style={style.fontHeader}>{this.state.score}</Text>
            </View>
            <Text style={style.fontHeader}>30'</Text>
          </View>
          <View style={style.timerbarFull}>
            <View style={style.timerbar} />
          </View>
        </View>
        <View style={style.playingButtons}>
          <TouchableOpacity
            onPress={() => Alert.alert('Indice', 'Donner un indice')}>
            <Image
              style={style.gamingButton}
              source={require('assets/images/indice-logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [
              // Alert.alert(
              //   'Scan',
              //   'Scan un objet. Test incrémentation du score a chaque clic',
              // ),
              this.incrementScore(5),
              this.scanPushed(),
            ]}>
            <Image
              style={[style.gamingButton, style.gamingButtonScan]}
              source={require('assets/images/scan-logo.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Inventaire', "Ouvre l'inventaire")}>
            <Image
              style={style.gamingButton}
              source={require('assets/images/inventory-logo.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default InGame;
