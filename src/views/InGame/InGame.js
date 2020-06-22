import {Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import React from 'react';
import style from './style';
import Modal from 'react-native-modal';
import ScanModal from '../../components/ScanModal/ScanModal';
import ClueModal from '../../components/ClueModal/ClueModal';
import InventoryModal from '../../components/InventoryModal/InventoryModal';
import Timer from '../../components/Timer/Timer';
import {connect} from 'react-redux';
import {
  playInventorySound,
  playScanSound,
  playClueSound,
  playDeleteSound,
} from '../../Sounds';

const TIMER_BASE = 500;

class InGame extends React.Component {
  constructor(props) {
    super(props);
    this.timerRef = React.createRef();

    this.state = {
      barcode: [(id = 0), (data = '')],
      scanActive: 0,
      isObjectToScan: 0,
      score: 0,
      increaseScore: 0,
      decreaseScore: 0,
      clue: false,
      clueTitle: '',
      clueMessage: '',
      clueImage: '',
      inventory: false,
      inventoryImages: [],
      scanVisible: false,
      scanImage: '',
      scanMessage: '',
      timer: TIMER_BASE,
      victory: false,
      goodObject: 0,
      badObject: 0,
      alreadyTaken: [],
    };
  }

  componentDidMount() {
    const actionScore = {type: 'SCORE', value: 0};
    const actionIncreaseScore = {
      type: 'INCREASE_SCORE',
      value: 0,
    };
    const actionDecreaseScore = {
      type: 'DECREASE_SCORE',
      value: 0,
    };
    this.props.dispatch(actionScore);
    this.props.dispatch(actionIncreaseScore);
    this.props.dispatch(actionDecreaseScore);
    const {navigate} = this.props.navigation;
    setInterval(() => {
      if (this.timerRef.current) {
        this.setState({timer: this.timerRef.current.timerToTime()});
        if (this.state.timer === '00:00' && !this.state.victory) {
          navigate('DefeatView');
        }
      }
    }, 1001);

    var socket = new WebSocket('wss://echo.websocket.org/'); // test de connexion

    // Change the websocket address with your ngrok link bellow
    // var socket = new WebSocket('ws://1cb93a5e.ngrok.io/:8080');

    let newPseudo = {command: 'pseudo', pseudo: 'Rom1du01'};
    let getList = {command: 'list'};
    let subscribeRoom = {command: 'subscribe', channel: 'toto'};
    let roomPlayers = {command: 'roomPlayers'};
    let sendMessage = {command: 'message', message: 'Coucou ca va ?'};
    let unsubscribeRoom = {command: 'unsubscribe'};

    socket.onopen = () => socket.send(JSON.stringify(getList));

    socket.onmessage = ({data}) => {
      console.log(data);

      // this.setState({echo: data});
    };
  }

  openScan = () => this.setState({scanVisible: true});
  closeScan = () => this.setState({scanVisible: false});
  isVisibleScan = () => this.state.scanVisible;

  openInventory = () => this.setState({inventory: true});
  closeInventory = () => this.setState({inventory: false});
  isVisibleInventory = () => this.state.inventory;

  openClue = () => {
    playClueSound();
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
    this.state.score -= 10;
    this.state.decreaseScore -= 10;
    const actionScore = {type: 'SCORE', value: this.state.score};
    const actionDecreaseScore = {
      type: 'DECREASE_SCORE',
      value: this.state.decreaseScore,
    };
    this.props.dispatch(actionScore);
    this.props.dispatch(actionDecreaseScore);
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

      let messageName = [
        'Carte mere',
        'Carte graphique',
        'Disque dur',
        'Alimentation',
        'Arduino',
        'LED',
        'Processeur',
        'RAM',
      ];

      if (this.props.mission === 'solaire') {
        messageName = [
          'Jupiter',
          'Mars',
          'Mercure',
          'Neptune',
          'Saturne',
          'Terre',
          'Uranus',
          'Venus',
          'Charon',
          'Eris',
          'Sedna',
        ];
      }

      const resultMessageName = messageName.find(
        element => `http://${element}` === newBarcode[data],
      );
      const resultImageName = resultMessageName?.toLowerCase();
      if (
        messageName &&
        messageName.find(element => `http://${element}` === newBarcode[data])
      ) {
        this.openScan();
        this.state.scanMessage = resultMessageName;
        console.log(this.state.scanMessage);
        this.state.scanImage = resultImageName.replace(/\s/g, '-');
      } else {
        Alert.alert('Rien à scanner ici !');
      }
    }
  };

  scanPushed = () => {
    playScanSound();
    this.setState({scanActive: 1});
    if (this.state.isObjectToScan === 0 && this.state.scanActive === 1) {
      Alert.alert('Rien à scanner ici !');
    }
  };

  incrementScore = value => {
    let newScore = this.state.score + value;
    const actionScore = {type: 'SCORE', value: newScore};
    if (value > 0) {
      this.state.increaseScore += value;
      const actionIncreaseScore = {
        type: 'INCREASE_SCORE',
        value: this.state.increaseScore,
      };
      this.props.dispatch(actionIncreaseScore);
    } else {
      this.state.decreaseScore += value;
      const actionDecreaseScore = {
        type: 'DECREASE_SCORE',
        value: this.state.decreaseScore,
      };
      this.props.dispatch(actionDecreaseScore);
    }
    this.props.dispatch(actionScore);
    this.setState({score: newScore});
  };

  backToHome = () => {
    const {navigate} = this.props.navigation;
    navigate('LoginView');
  };

  addToInventory() {
    const {navigate} = this.props.navigation;
    let goodObjects = [
      'carte-mere',
      'carte-graphique',
      'disque-dur',
      'alimentation',
      'processeur',
      'ram',
    ];
    if (this.props.mission === 'solaire') {
      goodObjects = [
        'jupiter',
        'mars',
        'mercure',
        'neptune',
        'saturne',
        'terre',
        'uranus',
        'venus',
      ];
    }
    return () => {
      playDeleteSound();
      if (
        this.state.inventoryImages.find(
          element => element === this.state.scanImage,
        ) === undefined
      ) {
        this.state.inventoryImages.push(this.state.scanImage);
        if (
          goodObjects &&
          goodObjects.find(element => element === this.state.scanImage) &&
          !this.state.alreadyTaken.find(
            element => element === this.state.scanImage,
          )
        ) {
          this.state.alreadyTaken.push(this.state.scanImage);
          this.incrementScore(50);
          this.state.goodObject += 1;
        } else if (
          !this.state.alreadyTaken.find(
            element => element === this.state.scanImage,
          )
        ) {
          this.state.alreadyTaken.push(this.state.scanImage);
          this.incrementScore(-75);
          this.state.badObject += 1;
        }
        this.closeScan();
      } else {
        Alert.alert('', 'Vous possédez déjà cet objet !');
      }

      if (
        this.props.mission === 'solaire' &&
        this.state.inventoryImages.includes(goodObjects[0]) &&
        this.state.inventoryImages.includes(goodObjects[1]) &&
        this.state.inventoryImages.includes(goodObjects[2]) &&
        this.state.inventoryImages.includes(goodObjects[3]) &&
        this.state.inventoryImages.includes(goodObjects[4]) &&
        this.state.inventoryImages.includes(goodObjects[5]) &&
        this.state.inventoryImages.includes(goodObjects[6]) &&
        this.state.inventoryImages.includes(goodObjects[7])
      ) {
        this.state.victory = true;
        navigate('VictoryView');
      } else if (
        this.state.inventoryImages.includes(goodObjects[0]) &&
        this.state.inventoryImages.includes(goodObjects[1]) &&
        this.state.inventoryImages.includes(goodObjects[2]) &&
        this.state.inventoryImages.includes(goodObjects[3]) &&
        this.state.inventoryImages.includes(goodObjects[4]) &&
        this.state.inventoryImages.includes(goodObjects[5])
      ) {
        this.state.victory = true;
        navigate('VictoryView');
      }
    };
  }

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
            <Text style={style.fontHeader}>{this.state.timer}</Text>
          </View>
          <Timer maxTime={TIMER_BASE} ref={this.timerRef} />
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
          <TouchableOpacity onPress={() => this.scanPushed()}>
            <Image
              style={[style.gamingButton, style.gamingButtonScan]}
              source={require('assets/images/scan-logo.png')}
            />
          </TouchableOpacity>
          {this.state.scanVisible && (
            <Modal testID={'modal'} isVisible={this.state.scanVisible}>
              <ScanModal
                onPress={() => {
                  playDeleteSound();
                  this.closeScan();
                }}
                onKeep={this.addToInventory()}
                image={this.state.scanImage}
                message={this.state.scanMessage}
              />
            </Modal>
          )}
          <TouchableOpacity
            onPress={() => {
              playInventorySound();
              this.openInventory();
            }}>
            <Image
              style={style.gamingButton}
              source={require('assets/images/inventory-logo.png')}
            />
          </TouchableOpacity>
          {this.state.inventory && (
            <Modal testID={'modal'} isVisible={this.state.inventory}>
              <InventoryModal
                onPress={this.closeInventory}
                images={this.state.inventoryImages}
              />
            </Modal>
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    score: state.score,
    increaseScore: state.increaseScore,
    decreaseScore: state.decreaseScore,
    mission: state.mission,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch: action => {
      dispatch(action);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InGame);
