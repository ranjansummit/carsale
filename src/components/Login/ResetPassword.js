/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {resetPassword, resetPasswordReset} from '../../actions/ProfileAction';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import Spinner from '../common/Utility/Spiner';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      password: '',
      confirm_password: '',
    };
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        code: '',
        password: '',
        confirm_password: '',
      });
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Actions.login();
    return true;
  }
  // reset password if forgot
  onresetPw = (text, code, password, confirm_password) => {
    if (isNaN(text)) {
      this.props.resetPassword(text, '0', code, password, confirm_password);
      console.log('email', text);
    } else {
      console.log('num', text);
      this.props.resetPassword('0', text, code, password, confirm_password);
    }
  };
  resetSuccess = () => {
    console.log('success');
    // Actions.login();
    Alert.alert(
      'Success!',
      'Password has been successfully reset.',
      [
        {
          text: 'OK',
          onPress: () => {
            Actions.login();
          },
        },
      ],
      {cancelable: false},
    );
    this.props.resetPasswordReset();
  };
  resetFailure = () => {
    console.log('failed');
    // Actions.login();
    Alert.alert(
      'Failed!',
      this.props.resetResponseFailure.message,
      [
        {
          text: 'OK',
          onPress: () => {
            // Actions.login();
          },
        },
      ],
      {cancelable: false},
    );
    this.props.resetPasswordReset();
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {this.props.loading ? <Spinner /> : null}
          {this.props.resetResponse === false ? (
            <View>{this.resetSuccess()}</View>
          ) : null}
          {this.props.resetResponseFailure ? (
            this.props.resetResponseFailure.error === true ? (
              <View>{this.resetFailure()}</View>
            ) : null
          ) : null}
          <TextInput
            style={styles.inputText}
            type="string"
            required
            placeholder="Reset code from Email or Mobile"
            placeholderTextColor={Theme.colors.gray}
            onChangeText={code => this.setState({code})}
            value={this.state.text}
          />
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            type="string"
            required
            placeholder="New Password"
            placeholderTextColor={Theme.colors.gray}
            onChangeText={password => this.setState({password})}
            value={this.state.text}
          />
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            type="string"
            required
            placeholder="Confirm Password"
            placeholderTextColor={Theme.colors.gray}
            onChangeText={confirm_password => this.setState({confirm_password})}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.onresetPw(
                this.props.text,
                this.state.code,
                this.state.password,
                this.state.confirm_password,
              )
            }>
            <Text style={styles.text1}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Theme.colors.lightBlue,
  },
  text1: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: Theme.colors.black,
    textAlign: 'center',
  },
  inputText: {
    padding: 10,
    height: 65,
    // flex: 10,
    fontSize: 18,
    color: Theme.colors.navyBlue,
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: Theme.colors.red,
    padding: 10,
    marginTop: 30,
    marginHorizontal: 20,
    height: 65,
  },
});
const mapStateToProps = state => {
  console.log('text maybe email or mobile', state.profile.text);
  console.log('reset response', state.profile.resetPassword);
  console.log('reset pw error message', state.profile.resetPassword_error);
  return {
    loading: state.profile.loading,
    text: state.profile.text,
    resetResponse: state.profile.resetPassword,
    resetResponseFailure: state.profile.resetPassword_error,
  };
};

export default connect(
  mapStateToProps,
  {resetPassword, resetPasswordReset},
)(ResetPassword);
