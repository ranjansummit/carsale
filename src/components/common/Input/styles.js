/* eslint-disable no-undef */
import {StyleSheet} from 'react-native';
import Theme from '../Utility/Colors';

export default (styles = StyleSheet.create({
  picker: {
    height: 50,
    flex: 9,
    borderWidth: 1,
    // borderColor: "rgba(0, 0, 0, 0.1)",
    borderColor: Theme.colors.gray,
    borderRadius: 5,
    margin: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    // backgroundColor: "white",
    backgroundColor: Theme.colors.lightBlue,
    borderColor: Theme.colors.gray,
    width: '100%',
    borderWidth: 0,
    borderRadius: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input1: {
    backgroundColor: Theme.colors.lightBlue,
    // borderColor: Theme.colors.gray,
    width: '100%',
    borderWidth: 0,
    borderRadius: 5,
    height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  error: {
    position: 'absolute',
    top: 0,
    left: 300,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
