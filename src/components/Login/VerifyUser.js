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
} from 'react-native';
import {connect} from 'react-redux';
import {
  verification,
  resend_verification,
  resetError,
} from '../../actions/ProfileAction';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorIcon from '../common/Utility/ErrorIcon';
import Spinner from '../common/Utility/Spiner';

class VerifyUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
    this.onResendCode = this.onResendCode.bind(this);
    this.verifyPressed = this.verifyPressed.bind(this);
    this.errorAlert = this.errorAlert.bind(this);
    this.verifyCodeSent = this.verifyCodeSent.bind(this);
    this.verificationSuccess = this.verificationSuccess.bind(this);
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

  handleBackButtonClick() {
    Actions.createAcc();
    return true;
  }
  verifyPressed = (code, email, mobile) => {
    this.props.verification(code, email, mobile);
    // this.props.verification(code, "cam@gmail.com", "9845123568");
  };
  errorAlert = () => {
    Alert.alert(
      '',
      this.props.not_sent_msg,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetError();
          },
        },
      ],
      {cancelable: false},
    );
  };

  onResendCode = (email, mobile) => {
    this.props.resend_verification(email, mobile);
    // this.props.resend_verification("s.tuladhar@andmine.com", "9813176904");
  };
  verifyCodeSent = () => {
    console.log('where lost??');
    Alert.alert(
      '',
      'Verification code sent successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetError();
          },
        },
      ],
      {cancelable: false},
    );
  };
  verificationSuccess = () => {
    Alert.alert(
      'Verified Successfully.',
      'Please go to login and enter your email and password.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetError();
            Actions.login();
            this.props.resetError();
          },
        },
      ],
      {cancelable: false},
    );
  };
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        code: '',
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        {console.log('error msg', this.props.resend_code_error)}
        {this.props.resend_code_msg ===
        'Verification code sent successfully' ? (
          <View>{this.verifyCodeSent()}</View>
        ) : null}
        {this.props.sent_code_success_error === false ? (
          <View>{this.verificationSuccess()}</View>
        ) : null}
        {this.props.not_sent === true ? <View>{this.errorAlert()}</View> : null}
        <View>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Enter the verification code sent
            {'\n'} in your mobile number
            {'\n'} and email address.
          </Text>
          <TextInput
            style={styles.inputText}
            type="string"
            placeholder="Verification Code"
            placeholderTextColor={Theme.colors.fadedBlack}
            onChangeText={code => this.setState({code})}
            value={this.state.code}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.verifyPressed(
                this.state.code,
                this.props.registered_userData.email,
                this.props.registered_userData.mobile,
              );
            }}>
            <Text style={styles.text}>VERIFY</Text>
          </TouchableOpacity>
          <Text
            style={{fontSize: 15, textAlign: 'center', marginTop: 30}}
            onPress={() => {
              this.onResendCode(
                this.props.registered_userData.email,
                this.props.registered_userData.mobile,
              );
            }}>
            Resend verification code
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.colors.lightBlue,
  },
  inputText: {
    padding: 10,
    height: 40,
    fontSize: 18,
    color: Theme.colors.navyBlue,
    backgroundColor: 'white',
    margin: 10,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: Theme.colors.red,
    padding: 10,
    margin: 10,
    height: 40,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  error: {
    position: 'absolute',
    top: 0,
    left: 290,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = state => {
  return {
    mobile: state.profile.mobile,
    email: state.profile.email,
    error: state.profile.error,
    registered_userData: state.profile.registered_userData,
    //resend code
    resend_code_error: state.profile.resend_code_error,
    resend_code_msg: state.profile.resend_code_msg,
    resend_fail: state.profile.resend_fail,
    //verification response
    sent_code_success: state.profile.verify_success_msg,
    sent_code_success_error: state.profile.verify_success_error,
    not_sent: state.profile.verify_error,
    not_sent_msg: state.profile.verify_error_msg,
  };
};

export default connect(
  mapStateToProps,
  {verification, resend_verification, resetError},
)(VerifyUser);
