import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 280,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: 'orange',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 50,
    width: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
