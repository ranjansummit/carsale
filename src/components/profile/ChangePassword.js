/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  BackHandler,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {changePassword, resetChangePassword} from '../../actions/ProfileAction';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import Spinner from '../common/Utility/Spiner';
import Icon from 'react-native-vector-icons/FontAwesome5';

let screenHeight = Dimensions.get('window').height;

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile_list: [],
      password: '',
      reType_password: '',
    };
    this.savePressed = this.savePressed.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.profile_details !== this.props.profile_details) {
  //     this.setState({
  //       profile_list: nextProps.profile_details,
  //     });
  //   }
  // }

  handleBackButtonClick() {
    Actions.profile();
    return true;
  }
  savePressed = (name, password, reType_password) => {
    console.log('pass', password);

    if (password.length === 0) {
      Alert.alert('Passwords cannot be empty');
    } else if (password.length < 6) {
      Alert.alert('Password must be at least six characters');
    } else if (password !== reType_password) {
      Alert.alert('New Password &  Confirm Password should be same');
    } else {
      this.props.changePassword(name, password, reType_password);
    }
  };
  passwordChangedAlert = () => {
    Alert.alert(
      'Success!',
      'Password Changed successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            Actions.profile();
            this.props.resetChangePassword();
          },
        },
      ],
      {cancelable: false},
    );
  };
  errorAlert = () => {
    Alert.alert(
      '',
      'Failed to change password',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetChangePassword();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.password_change_msg === 'Password Changed' ? (
          <View>{this.passwordChangedAlert()}</View>
        ) : this.props.password_change_msg ===
          'The mobile field is required.' ? (
          <View>{this.errorAlert()}</View>
        ) : null}
        <View style={styles.navbar}>
          <TouchableOpacity
            style={{
              // marginTop: 15
              marginTop: Platform.OS === 'ios' ? 28 : null,
              marginHorizontal: 10,
              flexDirection: 'row',
            }}
            onPress={() => {
              Actions.profile();
              // this.cancelPressed;
            }}>
            {/* <Text style={styles.text}> Cancel </Text> */}
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              // marginTop: 15
              marginTop: Platform.OS === 'ios' ? 28 : null,
              marginHorizontal: 10,
              flexDirection: 'row',
            }}
            onPress={() =>
              this.savePressed(
                this.props.profile_details.name,
                this.state.password,
                this.state.reType_password,
              )
            }>
            <Text style={styles.text}> Save Password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text
            style={{
              margin: 10,
              textAlign: 'center',
              color: Theme.colors.navyBlue,
              fontSize: 15,
            }}>
            Change Password
          </Text>
          <TextInput
            style={styles.textinput}
            secureTextEntry={true}
            value={this.state.password}
            placeholder="New Password"
            placeholderTextColor="grey"
            onChangeText={password => this.setState({password})}
          />
          <TextInput
            style={styles.textinput}
            secureTextEntry={true}
            value={this.state.reType_password}
            placeholder="New Password again"
            placeholderTextColor="grey"
            onChangeText={reType_password => this.setState({reType_password})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    flex: 0.9,
    alignItems: 'center',
    backgroundColor: Theme.colors.lightBlue,
  },
  textinput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 2,
    height: 50,
    marginRight: 5,
    marginLeft: 5,
    width: '100%',
  },
  navbar: {
    // // flex: 0.1,
    // flexDirection: 'row',
    // backgroundColor: Theme.colors.navyBlue,
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // height: screenHeight * 0.11,
    // paddingTop: 5,
    // paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? screenHeight * 0.11 : screenHeight * 0.09,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
const mapStateToProps = state => {
  console.log('profile detail in change pass', state.profile.profile_details);
  return {
    loading: state.profile.loading,
    profile_details: state.profile.profile_details,
    password_change_msg: state.profile.password_change,
    error: state.profile.password_change_error,
  };
};

export default connect(
  mapStateToProps,
  {changePassword, resetChangePassword},
)(ChangePassword);
