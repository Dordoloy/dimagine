import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  backgroundCamera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  defeatContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timesUp: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 40,
    marginBottom: 20,
  },
  modalChoosePseudo: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '80%',
    height: '45%',
    borderRadius: 15,
  },
  modalLine: {
    width: '100%',
    textAlign: 'center',
    fontSize: 25,
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  modalTitle: {
    marginTop: 30,
  },
  positivePoints: {
    color: 'green',
  },
  negativePoints: {
    color: 'red',
  },
  totalScore: {
    fontSize: 25,
    marginTop: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 50,
    borderRadius: 50,
    width: 250,
  },
  buttonText: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
