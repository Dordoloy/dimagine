import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    //flex: 1,
  },
  backgroundCamera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  goContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: 'flex',
    flexDirection: 'column',
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20,
  },
  centeredElements: {
    alignItems: 'center',
  },
  titleMission: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  modalChoosePseudo: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: '45%',
    borderRadius: 15,
  },
  modaltitle: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 30,
  },
  pseudoInput: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    width: 200,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
  },
  validateButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    width: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  validateButtonDisabled: {
    color: 'grey',
  },
  buttonText: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoDimagine: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 25,
  },
});
