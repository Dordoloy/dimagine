import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
	flexDirection: 'column',
	maxHeight:"100%",
	flexWrap:"wrap"
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
  header: {
	  display:"flex",
	  flexDirection:"column",
	  width:"100%",
  },
  playingHeader: {
	  backgroundColor: "rgba(255,253,253,0.7)",
	  display: "flex",
	  flexDirection: "row",
	  justifyContent:"space-between",
	  alignItems:"center",
	  paddingTop:20,
	  paddingBottom:20,
	  paddingLeft:20,
	  paddingRight:20,
  },
  backButton: {
	  color: "#2E2E2E",
	  fontSize:20,
	  fontWeight:"bold"
  },
  score: {
	  display: "flex",
	  flexDirection:"column",
	  alignItems:"center"
  },
  fontHeader: {
	//   fontFamily:"Roboto",
	fontSize:20,
	fontWeight:"bold"
  },
  timerbarFull:{
	  width: "100%",
	height: 20,
	backgroundColor:"#C4C4C4",
	position:"relative"
  },
  timerbar:{
	  position:"absolute",
	  top:0,
	  left:0,
	  backgroundColor: "#FF901D",
	  height: "100%",
	  width:"70%"
  },
  playingButtons: {
	  position:"absolute",
	  bottom:0,
	  width: "100%",
	  display: "flex", 
	  flexDirection: "row",
	  justifyContent: "space-around",
	  alignItems: "center",
	  paddingBottom: 30
  },
  gamingButton: {
	  width: 60,
	  height: 60
  },
  gamingButtonScan: {
	  width: 100, 
	  height: 100
  }


});
