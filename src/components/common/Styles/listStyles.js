// * eslint-disable no-undef */
import {StyleSheet} from 'react-native';
import Theme from '../Utility/Colors';

export default styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    margin: 5,
    justifyContent: 'space-evenly',
    backgroundColor: Theme.colors.lightBlue,
  },
  upper: {
    flex: 3,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    aspectRatio: 1.5,
  },
  lower: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  left: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
