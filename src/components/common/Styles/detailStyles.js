/* eslint-disable no-undef */
import {StyleSheet, Dimensions} from 'react-native';
import Theme from '../Utility/Colors';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
    marginTop: 5,
  },
  imgView: {
    height: screenHeight / 2.5,
    width: screenWidth,
    // justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10
  },
  middle: {
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  left: {
    flex: 2,
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  mid: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    flex: 2,
    justifyContent: 'flex-end',
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Theme.colors.black,
    padding: 5,
    // margin: 5,
    fontSize: 18,
  },
  button: {
    width: screenWidth - 30,
    alignItems: 'center',
    backgroundColor: Theme.colors.red,
    margin: 5,
    padding: 15,
  },
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: Theme.colors.fadedBlack,
    margin: 10,
  },
  midLower: {
    backgroundColor: 'white',
    marginTop: 5,
    padding: 10,
  },
  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white',
    height: 100,
    width: '80%',
    borderWidth: 1,
    borderColor: Theme.colors.fadedBlack,
    borderRadius: 5,
  },

  Alert_Title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
});
