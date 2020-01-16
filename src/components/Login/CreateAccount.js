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
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  registerUser,
  resetError,
  saveMobile,
} from '../../actions/ProfileAction';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorIcon from '../common/Utility/ErrorIcon';
import Spinner from '../common/Utility/Spiner';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      mobile_number: '',
      password: '',
      confirm_password: '',
      checked: false,
      error1: false,
      error2: false,
      error3: false,
      error4: false,
      error5: false,
      password_error: '',
      confirm_password_error: '',
    };
    this.emailAlert = this.emailAlert.bind(this);
    this.mobileAlert = this.mobileAlert.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        name: '',
        email: '',
        mobile_number: '',
        password: '',
        confirm_password: '',
        checked: false,
        error1: false,
        error2: false,
        error3: false,
        error4: false,
        error5: false,
      });
    });
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    // Actions.addvehicle();
    Actions.login();
    return true;
  }

  onRegister = (name, email, number, password, confirm_password, checked) => {
    console.log('password', password);
    console.log('confirm_password', confirm_password);
    console.log('checked', checked);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let reg1 = /^[1-9]{1}[0-9]{9}$/;
    if (name.length === 0) {
      this.setState({error1: true}, () => console.log('error1'));
    } else if (reg.test(email) === false) {
      this.setState({error2: true}, () => console.log('error2'));
    } else if (number.length !== 10 && reg1.test(number) === false) {
      this.setState({error3: true}, () => console.log('error3'));
    } else if (password === '') {
      this.setState({error4: true, password_error: 'Enter password'}, () =>
        console.log('error4'),
      );
    } else if (password.length !== '' && password.length < 6) {
      // if (password.length < 6) {
      this.setState(
        {
          error4: true,
          password_error: 'Password length should be at least 6 characters.',
        },
        () => console.log('error5'),
      );
      // }
    } else if (confirm_password === '') {
      this.setState(
        {error5: true, confirm_password_error: 'Enter password'},
        () => console.log('error6'),
      );
    }
    // else if (confirm_password !== '') {
    //   if (confirm_password < 6) {
    //     this.setState(
    //       {
    //         error5: true,
    //         confirm_password_error:
    //           'Password length should be at least 6 characters.',
    //       },
    //       () => console.log('error7'),
    //     );
    //   }
    //   else if (confirm_password !== password) {
    //     this.setState(
    //       {error5: true, confirm_password_error: 'Password not matched.'},
    //       () => console.log('error8'),
    //     );
    //   }
    // }
    else if (confirm_password !== '' && password !== confirm_password) {
      this.setState(
        {error5: true, confirm_password_error: 'Password not matched.'},
        () => console.log('error7'),
      );
    } else if (checked === false) {
      Alert.alert('', 'You are required to accept terms and conditions.');
    } else {
      console.log('success');
      this.props.registerUser(name, email, number, password, confirm_password);
      this.props.saveMobile(email, number);
      // Actions.verifyUser();
    }
  };
  emailAlert = () => {
    Alert.alert(
      '',
      'This email has already been taken, Please login or go to forgot password section.',
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

  mobileAlert = () => {
    Alert.alert(
      '',
      'This mobile has already been taken, Please login or go to forgot password section.',
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

  successAlert = () => {
    Alert.alert(
      'Account created successfully.',
      'Verification code sent to your mobile number',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetError();
            Actions.verifyUser();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          {this.props.loading ? <Spinner /> : null}
          {this.props.error ? (
            this.props.error.email ? (
              <View>{this.emailAlert()}</View>
            ) : this.props.error.mobile ? (
              <View>{this.mobileAlert()}</View>
            ) : null
          ) : null}
          {this.props.reg_success === false ? (
            <View>{this.successAlert()}</View>
          ) : null}
          <View style={styles.container}>
            <View>
              <View>
                <TextInput
                  style={styles.inputText}
                  type="string"
                  required
                  placeholder="Full Name"
                  placeholderTextColor={Theme.colors.navyBlue}
                  onChangeText={name => this.setState({name, error1: false})}
                  value={this.state.name}
                />
              </View>
              <View style={styles.error}>
                {this.state.error1 ? <ErrorIcon /> : null}
              </View>
            </View>
            {this.state.error1 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 5,
                    borderTopColor: 'red',
                  }}>
                  Please provide your name
                </Text>
              </View>
            ) : null}
            <View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  style={styles.inputText}
                  type="string"
                  placeholder="Email Address"
                  placeholderTextColor={Theme.colors.navyBlue}
                  onChangeText={email => this.setState({email, error2: false})}
                  value={this.state.email}
                />
              </View>
              <View style={styles.error}>
                {this.state.error2 ? <ErrorIcon /> : null}
              </View>
            </View>
            {this.state.error2 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Invalid email
                </Text>
              </View>
            ) : null}
            <View>
              <View
                style={{
                  height: 65,
                  marginTop: 15,
                  marginLeft: 5,
                  marginRight: 5,
                  // backgroundColor: "red",
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    marginRight: 3,
                    flex: 0.2,
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    padding: 10,
                    // justifyContent: "center",
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../images/flag_nepal.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      padding: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: Theme.colors.navyBlue,
                    }}>
                    +977
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.8,
                    backgroundColor: 'red',
                    justifyContent: 'flex-start',
                  }}>
                  <TextInput
                    autoCapitalize="none"
                    style={{
                      height: 65,
                      backgroundColor: 'white',
                      padding: 10,
                      fontSize: 18,
                      color: Theme.colors.navyBlue,
                    }}
                    type="string"
                    keyboardType="numeric"
                    required
                    placeholder="Mobile Number"
                    placeholderTextColor={Theme.colors.navyBlue}
                    onChangeText={mobile_number =>
                      this.setState({mobile_number, error3: false})
                    }
                    value={this.state.mobile_number}
                  />
                </View>
              </View>
              <View style={styles.error}>
                {this.state.error3 ? <ErrorIcon /> : null}
              </View>
            </View>
            {this.state.error3 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 2,
                    marginBottom: 2,
                    marginTop: 2,

                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Invalid mobile number.
                </Text>
              </View>
            ) : null}
            <View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  style={styles.inputText}
                  type="string"
                  secureTextEntry={true}
                  required
                  placeholder="Password"
                  placeholderTextColor={Theme.colors.navyBlue}
                  onChangeText={password =>
                    this.setState({password, error4: false})
                  }
                  value={this.state.password}
                />
              </View>
              <View style={styles.error}>
                {this.state.error4 ? <ErrorIcon /> : null}
              </View>
            </View>
            {this.state.error4 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  {this.state.password_error}
                </Text>
              </View>
            ) : null}
            <View>
              <View>
                <TextInput
                  autoCapitalize="none"
                  style={styles.inputText}
                  type="string"
                  secureTextEntry={true}
                  required
                  placeholder="Confirm Password"
                  placeholderTextColor={Theme.colors.navyBlue}
                  onChangeText={confirm_password =>
                    this.setState({confirm_password, error5: false})
                  }
                  value={this.state.confirm_password}
                />
              </View>
              <View style={styles.error}>
                {this.state.error5 ? <ErrorIcon /> : null}
              </View>
            </View>
            {this.state.error5 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 0.04 * screenWidth,
                    textAlign: 'center',
                    padding: 2,
                    marginTop: 2,
                    marginBottom: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  {this.state.confirm_password_error}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 10,
                // justifyContent: "center",
                // alignItems: "center"
              }}>
              <Icon
                style={{margin: 5}}
                name={
                  this.state.checked
                    ? 'checkbox-marked'
                    : 'checkbox-blank-outline'
                }
                color={Theme.colors.navyBlue}
                size={20}
                onPress={() => this.setState({checked: !this.state.checked})}
              />
              <Text style={{margin: 5}}>
                I accept the
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: Theme.colors.navyBlue,
                  }}
                  onPress={() => {
                    Actions.termsConditions();
                  }}>
                  {' '}
                  terms and conditions
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.onRegister(
                  this.state.name,
                  this.state.email,
                  this.state.mobile_number,
                  this.state.password,
                  this.state.confirm_password,
                  this.state.checked,
                )
              }>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: Theme.colors.lightBlue,
  },
  inputText: {
    padding: 10,
    height: 65,
    flex: 10,
    // borderWidth: 1,
    fontSize: 18,
    color: Theme.colors.navyBlue,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    // marginBottom: 12
  },
  button: {
    justifyContent: 'center',
    backgroundColor: Theme.colors.red,
    padding: 10,
    margin: 10,
    height: 65,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
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
  console.log('error', state.profile.error);
  return {
    error: state.profile.error,
    reg_success: state.profile.register_msg,
    loading: state.profile.loading,
  };
};

export default connect(
  mapStateToProps,
  {registerUser, resetError, saveMobile},
)(CreateAccount);
