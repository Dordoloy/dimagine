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
  playWinSound,
  playThrowSound,
  playModalSound,
} from '../../Sounds';
import ScoreModal from '../../components/ScoreModal/ScoreModal';

const TIMER_BASE = 500;

class InGame extends React.Component {
  constructor(props) {
    super(props);
    this.timerRef = React.createRef();

    this.state = {
      barcode: [(id = 0), (data = '')],
      scanActive: 0,
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
      scoreModalVisible: false,
      timer: TIMER_BASE,
      victory: false,
      goodObject: 0,
      oldGoodObjects: 0,
      goodInventory: [],
      badObject: 0,
      badObjects:
        this.props.mission === 'solaire'
          ? ['Sedna', 'Eris', 'Charon']
          : ['Arduino', 'LED'],
      badInventory: [],
      alreadyTaken: [],
      countInventoryValidate: 0,
    };
  }

  componentDidMount() {
    this.incrementScore(TIMER_BASE);
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
        if (!this.state.victory) {
          this.setState({timer: this.timerRef.current.timerToTime()});
          this.incrementScore(-1);
        }
        if (this.state.timer === '00:00' && !this.state.victory) {
          navigate('DefeatView');
        }
      }
    }, 1001);
  }

  openScan = () => this.setState({scanVisible: true});
  closeScan = () => this.setState({scanVisible: false});
  isVisibleScan = () => this.state.scanVisible;

  openScore = () => {
    this.state.scoreModalVisible = true;
  };
  closeScore = () => this.setState({scoreModalVisible: false});
  isVisibleScore = () => this.state.scoreModalVisible;

  openInventory = () => this.setState({inventory: true});
  closeInventory = () => {
    playModalSound();
    this.setState({inventory: false});
  };
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
  closeClue = () => {
    playModalSound();
    this.setState({clue: false});
  };
  isVisibleClue = () => this.state.clue;

  barcodeRecognized = ({barcodes}) => {
    if (this.state.scanActive === 1) {
      this.setState({scanActive: 0});
      let newBarcode = [];

      barcodes.forEach(barcode => {
        newBarcode[data] = barcode.data;
        newBarcode[id] = 5;

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
        'Taser',
        'NfcScanBorne',
      ];

      let badMessageName = ['Arduino', 'LED', 'Taser', 'NfcScanBorne'];

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
          'Taser',
          'NfcScanBorne',
        ];

        badMessageName = ['Sedna', 'Eris', 'Charon', 'Taser', 'NfcScanBorne'];
      }

      const resultMessageName = messageName.find(
        element => `http://${element}` === newBarcode[data],
      );
      const resultImageName = resultMessageName?.toLowerCase();
      if (resultImageName === 'nfcscanborne') {
        let addPoint =
          50 *
          (this.state.goodInventory.length -
            (this.state.countInventoryValidate !== 0
              ? this.oldGoodObjects
              : 0));
        let removePoint =
          15 *
          (this.state.badInventory.length +
            (messageName.length -
              badMessageName.length -
              this.state.goodInventory.length));

        this.oldGoodObjects = this.state.goodInventory.length;
        this.state.countInventoryValidate += 1;
        this.incrementScore(addPoint);
        this.incrementScore(-removePoint);
        const {navigate} = this.props.navigation;
        if (
          this.state.goodInventory.length ===
            messageName.length - badMessageName.length &&
          this.state.badInventory.length === 0
        ) {
          this.state.victory = true;
          playWinSound();
          navigate('VictoryView');
        }
        if (!this.state.victory) {
          this.openScore();
        }
      } else if (
        messageName &&
        messageName.find(element => `http://${element}` === newBarcode[data])
      ) {
        this.openScan();
        this.state.scanMessage = resultMessageName;
        this.state.scanImage = resultImageName.replace(/\s/g, '-');
      }
    }
  };

  scanPushed = () => {
    playScanSound();
    this.state.scanActive = 1;

    setTimeout(() => {
      this.setState({scanActive: 0});
    }, 300);
  };

  incrementScore = value => {
    let newScore = this.state.score + value;
    this.state.score += value;
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
          goodObjects.find(element => element === this.state.scanImage)
        ) {
          this.state.goodInventory.push(this.state.scanImage);
          if (
            !this.state.alreadyTaken.find(
              element => element === this.state.scanImage,
            )
          ) {
            this.state.alreadyTaken.push(this.state.scanImage);
            this.state.goodObject += 1;
          }
        } else if (this.state.scanImage === 'taser') {
          console.log('taser');
        } else {
          this.state.badInventory.push(this.state.scanImage);
          if (
            !this.state.alreadyTaken.find(
              element => element === this.state.scanImage,
            )
          ) {
            this.state.alreadyTaken.push(this.state.scanImage);
            this.state.badObject += 1;
          }
        }
        this.closeScan();
      } else {
        Alert.alert('', 'Vous possédez déjà cet objet !');
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
                  playThrowSound();
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
                goodInventory={this.state.goodInventory}
                badInventory={this.state.badInventory}
              />
            </Modal>
          )}
          {this.state.scoreModalVisible && (
            <Modal testID={'modal'} isVisible={this.state.scoreModalVisible}>
              <ScoreModal
                onPress={this.closeScore}
                goodObjects={this.state.goodInventory.length}
                badObjects={this.state.badInventory.length}
                missingObjects={
                  this.props.mission === 'solaire'
                    ? 8 - this.state.goodInventory.length
                    : 6 - this.state.goodInventory.length
                }
                BadObjectslist={this.state.badObjects}
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
