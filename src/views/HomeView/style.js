import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  goContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  goBtn: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
    width: 200,
    top: '20%',
    left: '22%',
  },
  goButtonText: {
    color: '#ffa500',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleDIM: {
    width: 150,
    height: 150,
    left: '30%',
  },
  subTitleDIM: {
    fontSize: 30,
    left: '10%',
  },
});
