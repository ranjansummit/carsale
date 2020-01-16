import {StyleSheet} from 'react-native';
import Theme from '../../common/Utility/Colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Theme.colors.lightBlue,
    justifyContent: 'space-evenly',
  },
  text: {
    paddingBottom: 10,
    paddingTop: 10,
    color: Theme.colors.navyBlue,
    fontSize: 20,
    // fontFamily: 'Qanelas-SemiBold',
    marginTop: 10,
    marginBottom: 10,
  },
  inputText: {
    padding: 5,
    height: 50,
    flex: 10,
    borderWidth: 1,
    fontSize: 20,
    color: Theme.colors.navyBlue,
    // borderColor: "rgba(0, 0, 0, 0.1)",
    borderColor: '#808080',
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
});
