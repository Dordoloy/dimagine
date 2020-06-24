import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cross: {
    fontSize: 30,
    color: 'red',
    marginLeft: 260,
    marginTop: -10,
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '100%',
    width: '100%',
  },
  contentTitle: {
    width: '100%',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    marginTop: -20,
    marginBottom: 12,
    color: 'orange',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  inventoryCase: {
    flexDirection: 'row',
    width: 150,
    overflow: 'hidden',
    justifyContent: 'center',
    marginBottom: 2,
  },
  objectImages: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  crossObject: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 40,
    height: 40,
    borderRadius: 50,
    paddingLeft: 10,
  },
  containerInventory: {
    width: 300,
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  containeritems: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  useItem: {
    position: 'absolute',
    top: '40%',
    zIndex: 2000,
  },
  useItemText: {
    borderRadius: 10,
    padding: 5,
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
