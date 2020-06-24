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
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    marginTop: 20,
    marginLeft: 20,
  },
  centeredElements: {
    alignItems: 'center',
    width: '100%',
  },
  titleMission: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    backgroundColor: 'white',
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 50,
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
    borderRadius: 15,
    padding: 10,
    width: '100%',
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
  listRoomContainer: {
    marginTop: 20,
  },
  listRoom: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  spaceBetween: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '90%',
  },
  createRoom: {
    width: '100%',
    marginBottom: 50,
  },
  roomDivBtn: {
    width: '100%',
  },
  roomBtn: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  userList: {
    display: 'flex',
    flexDirection: 'row',
  },
  user: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
  },
});
