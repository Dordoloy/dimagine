import {Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';
import Modal from 'react-native-modal';
import ScanModal from '../../components/ScanModal/ScanModal';
import ClueModal from '../../components/ClueModal/ClueModal';

class InGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: [(id = 0), (data = '')],
      scanActive: 0,
      isObjectToScan: 0,
      score: 0,
      clue: false,
      clueTitle: '',
      clueMessage: '',
      clueImage: '',
      visible: false,
      image: '',
      massage: '',
    };
  }

  componentDidMount() {
    // var socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion
    var socket = new WebSocket('ws://ad109ac7.ngrok.io/:8080');

    socket.onopen = () => socket.send('Connexion OK');

    socket.onmessage = ({data}) => {
      console.log(data);

      //   this.setState({echo: data});
    };
  }

  open = () => this.setState({visible: true});
  close = () => this.setState({visible: false});
  isVisible = () => this.state.visible;

  openClue = () => {
    const clueTypeList = ['object', 'position'];
    const clueType = clueTypeList[Math.floor(Math.random() * 2)];
    const clueMessageListObject = [
      "Indice sur l'objet carte mère",
      "Indice sur l'objet carte graphique",
    ];
    const clueMessageListPosition = [
      'Indice sur la position de la carte mère',
      'Indice sur la position de la carte graphique',
    ];
    this.setState({
      clue: true,
      clueTitle:
        clueType === 'object' ? "Indice sur l'objet" : 'indice sur la position',
      clueMessage:
        clueType === 'object'
          ? clueMessageListObject[Math.floor(Math.random() * 2)]
          : clueMessageListPosition[Math.floor(Math.random() * 2)],
      clueImage: clueType === 'object' ? 'object-logo' : 'position-logo',
    });
  };
  closeClue = () => this.setState({clue: false});
  isVisibleClue = () => this.state.clue;

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

      const messageName = ['Carte mere', 'Carte graphique'];
      const resultMessageName = messageName.find(
        element => `http://${element}` === newBarcode[data],
      );
      const resultImageName = resultMessageName?.toLowerCase();
      if (
        messageName &&
        messageName.find(element => `http://${element}` === newBarcode[data])
      ) {
        this.open();
        this.state.message = resultMessageName;
        this.state.image = resultImageName.replace(/\s/g, '-');
      } else {
        Alert.alert('Rien à scanner ici !');
      }
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
          <TouchableOpacity onPress={() => this.openClue()}>
            <Image
              style={style.gamingButton}
              source={require('assets/images/indice-logo.png')}
            />
          </TouchableOpacity>
          {this.state.clue && (
            <Modal testID={'modal'} isVisible={this.state.clue}>
              <ClueModal
                onPress={this.closeClue}
                title={this.state.clueTitle}
                message={this.state.clueMessage}
                image={this.state.clueImage}
              />
            </Modal>
          )}
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
          {this.state.visible && (
            <Modal testID={'modal'} isVisible={this.state.visible}>
              <ScanModal
                onPress={this.close}
                image={this.state.image}
                message={this.state.message}
              />
            </Modal>
          )}
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
