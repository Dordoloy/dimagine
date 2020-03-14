import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
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
  logoDimagine: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 50,
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    width: 200,
    // top: '20%',
  },
  buttonText: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  subTitle: {
    fontSize: 30
  },
  list: {
	  backgroundColor: 'rgba(0,0,0,0.2)',
	  color: 'black',
	  width: '100%'
  }
});
