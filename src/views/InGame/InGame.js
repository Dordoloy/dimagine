import { Text, TouchableOpacity, View, Image, FlatList, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import React from 'react';
import style from './style';

class InGame extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			barcode: [
				id = 0,
				data = "",
			],
		}
	}

	barcodeRecognized = ({ barcodes }) => {
		let newBarcode = []

		barcodes.forEach(barcode => {
			
			newBarcode[data] = barcode.data
			newBarcode[id] = 5

			console.log(newBarcode)

			// TODO : Problem to save newBarcode data on state
			this.setState({ barcode: newBarcode })

			// TODO : Send the tag informations to the websocket and display the received information
		})

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
					text: 'Ajouter à l\'inventaire',
					onPress: () => console.log('Item ajouté dans l\'inventaire')
					// TODO : Add item in inventory
				},
			],
			{ cancelable: false },
		);
	}

	render() {
		return (
			<View style={style.mainContainer}>
				<RNCamera
					ref={ref => {
						this.camera = ref
					}}
					style={style.backgroundCamera}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					androidCameraPermissionOptions={{
						title: 'Permission d\'utiliser la camera',
						message: 'L\'application necessite l\'autorisation de la camera',
						buttonPositive: 'Autoriser',
						buttonNegative: 'Refuser',
					}}
					androidRecordAudioPermissionOptions={{
						title: 'Permission d\'utiliser l\'enregistrement audio',
						message: 'L\'application necessite l\'autorisation de l\'enregistrement audio',
						buttonPositive: 'Autoriser',
						buttonNegative: 'Refuser',
					}}
					onGoogleVisionBarcodesDetected={this.barcodeRecognized}
				/>
				<View style={style.goContainer}>
					<Text style={style.subTitle}>InGame View</Text>
					<FlatList
						style={style.list}
						data={this.state.barcode, this.state.barcode}
						// keyExtractor={({ barcode }) => barcode[id].toString()}
						renderItem={({ barcode }) => <Text> {barcode}</Text>}
					/>
				</View>
			</View>
		)
	}
}

export default InGame;
