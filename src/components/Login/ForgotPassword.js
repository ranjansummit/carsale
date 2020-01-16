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
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {forgotPw, resetForgotPw, textSave} from '../../actions/ProfileAction';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import Spinner from '../common/Utility/Spiner';
import ErrorIcon from '../common/Utility/ErrorIcon';

let screenWidth = Dimensions.get('window').width;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      error: false,
    };
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
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        text: '',
      });
    });
  }
  handleBackButtonClick() {
    Actions.login();
    return true;
  }

  onSendCode = text => {
    this.props.textSave(text);
    console.log('text', text);
    if (text === '') {
      this.setState({error: true});
    } else if (isNaN(text)) {
      this.props.forgotPw(text, '0');
      console.log('email', text);
    } else {
      console.log('num', text);
      this.props.forgotPw('0', text);
    }
    // Actions.resetpw();
  };
  nextStep = () => {
    Actions.resetpw();
    this.props.resetForgotPw();
  };
  textError = () => {
    Alert.alert(
      '',
      'Enter your email address or mobile number .',
      [{text: 'OK', onPress: () => this.setState({error: false})}],
      {cancelable: false},
    );
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {this.props.loading ? <Spinner /> : null}
          {this.props.passwordReset === false ? (
            <View>{this.nextStep()}</View>
          ) : null}
          <Text style={styles.text}>
            Enter your Email Address {'\n'} Or {'\n'} Mobile Number{' '}
          </Text>
          <View>
            <TextInput
              style={styles.inputText}
              type="string"
              required
              placeholder="Email Address or Mobile Number"
              placeholderTextColor={Theme.colors.gray}
              onChangeText={text => this.setState({text, error: false})}
              value={this.state.text}
            />
            {Platform.OS == 'android' ? (
              <View style={styles.error}>
                {this.state.error ? <ErrorIcon /> : null}
              </View>
            ) : null}
          </View>
          {this.state.error ? (
            Platform.OS == 'android' ? (
              <View style={{justifyContent: 'flex-end', marginHorizontal: 20}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 3,
                    marginVertical: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 5,
                    borderTopColor: 'red',
                  }}>
                  Please provide your email address or mobile number
                </Text>
              </View>
            ) : (
              <View>{this.textError()}</View>
            )
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onSendCode(this.state.text)}>
            <Text style={styles.text1}>SEND CODE</Text>
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
  error: {
    position: 'absolute',
    top: 12,
    right: 30,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
const mapStateToProps = state => {
  return {
    loading: state.profile.loading,
    passwordReset: state.profile.passwordReset,
  };
};

export default connect(
  mapStateToProps,
  {forgotPw, resetForgotPw, textSave},
)(ForgotPassword);
