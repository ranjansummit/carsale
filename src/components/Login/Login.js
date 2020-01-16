/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorIcon from '../common/Utility/ErrorIcon';
import {userLogin, resetLoginInfo} from '../../actions/LoginAction';
import {connect} from 'react-redux';
import Spinner from '../common/Utility/Spiner';
import Constant from '../constant/Constant';
import axios from 'axios';
import {PreloginApi} from '../../services/Api';
import Storage from '../storage/Storage';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
// import { LoginButton, AccessToken } from 'react-native-fbsdk';
// import FBLogin from './FBLogin';
// import {connect} from 'react-redux';
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      value: '',
      logedin: '',
      error1: false,
      error2: false,
      onChangeEmail: null,
      onChangePassword: null,
    };
    this.fbLogin = this.fbLogin.bind(this);

    // if(this.state.logedin=="1"){

    //   Actions.buy();
    // }
  }
  fbLogin = () => {
    console.log('fblogin');
    // return Actions.fbLogin();
  };
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        email: '',
        password: '',
        value: '',
        logedin: '',
        error1: false,
        error2: false,
      });
    });
  }
  loginSuceess = () => {
    this.props.resetLoginInfo();
  };

  emailError = () => {
    Alert.alert(
      'Login Failed',
      'Invalid email address.',
      [{text: 'OK', onPress: () => this.props.resetLoginInfo()}],
      {cancelable: false},
    );
  };
  passwordError = () => {
    Alert.alert(
      'Login Failed',
      'Invalid password.',
      [{text: 'OK', onPress: () => this.props.resetLoginInfo()}],
      {cancelable: false},
    );
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {this.props.loading ? <Spinner /> : null}
          {this.props.login_info_error === false ? (
            <View>{this.loginSuceess()}</View>
          ) : null}
          <View style={styles.rowtext}>
            <Text style={styles.text}>bhatbhate</Text>
            <Text style={styles.textnet}>.net</Text>
          </View>

          <View style={{marginLeft: 25, marginRight: 25, marginTop: 20}}>
            <Icon.Button
              name="facebook"
              backgroundColor="#012D6C"
              style={{
                padding: 10,
                marginLeft: 5,
                // justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  // alignSelf: 'center',
                  marginLeft: screenWidth * 0.1,
                }}
                onPress={() => this.fbLogin()}>
                Login with FACEBOOK
              </Text>
            </Icon.Button>
          </View>
          <Text
            style={{
              color: '#012D6C',
              marginTop: 15,
              textAlign: 'center',
              fontSize: 20,
            }}>
            or
          </Text>
          <View style={{color: 'red'}}>
            <TextInput
              placeholder="Email address"
              autoCapitalize="none"
              style={{
                height: 45,
                marginLeft: 25,
                marginRight: 25,
                marginTop: 20,
                backgroundColor: '#ffffffff',
                fontSize: 18,
                padding: 5,
                color: Theme.colors.navyBlue,
              }}
              onChangeText={email =>
                this.setState({email, error1: false, onChangeEmail: true})
              }
              value={this.state.email}
            />
            <View style={styles.error}>
              {this.state.onChangeEmail ? null : this.state.error1 ||
                this.props.error === 'Invalid email address.' ? (
                <ErrorIcon />
              ) : null}
            </View>

            {this.state.onChangeEmail ? (
              <View style={{marginBottom: 20}} />
            ) : this.props.error === 'Invalid email address.' ? (
              Platform.OS == 'android' ? (
                <View
                  style={{
                    marginLeft: 180,
                    marginRight: 25,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'white',
                      backgroundColor: 'black',
                      fontSize: 15,
                      padding: 2,
                      // marginBottom: 10,
                      borderTopColor: 'red',
                      borderTopWidth: 3,
                    }}>
                    Invalid email address.
                  </Text>
                </View>
              ) : (
                <View style={{marginBottom: 20}}>{this.emailError()}</View>
              )
            ) : (
              <View style={{marginBottom: 20}} />
            )}
            {/* {Platform.OS == 'android' ? (
              this.props.error === 'Invalid email address.' ? (
                <View
                  style={{
                    marginLeft: 180,
                    marginRight: 25,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'white',
                      backgroundColor: 'black',
                      fontSize: 15,
                      padding: 2,
                    }}>
                    Invalid email address.
                  </Text>
                </View>
              ) : this.props.error === 'Invalid password.' ? (
                <View
                  style={{
                    marginLeft: 180,
                    marginRight: 25,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'white',
                      backgroundColor: 'black',
                      fontSize: 15,
                      padding: 2,
                    }}>
                    Invalid password.
                  </Text>
                </View>
              ) : null
            ) : this.props.error === 'Invalid email address.' ? (
              <View>{this.emailError()}</View>
            ) : this.props.error === 'Invalid password.' ? (
              <View>{this.passwordError()}</View>
            ) : null} */}
          </View>
          <View style={{marginTop: 5}}>
            {this.state.onChangePassword ? (
              <View />
            ) : this.props.error === 'Invalid password.' ? (
              Platform.OS == 'android' ? (
                <View
                  style={{
                    marginLeft: 200,
                    marginRight: 25,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'white',
                      backgroundColor: 'black',
                      fontSize: 15,
                      padding: 2,
                      borderBottomColor: 'red',
                      borderBottomWidth: 3,
                    }}>
                    Invalid password.
                  </Text>
                </View>
              ) : (
                <View>{this.passwordError()}</View>
              )
            ) : null}

            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={true}
              style={{
                height: 45,
                marginLeft: 25,
                marginRight: 25,
                // marginTop: 20,
                backgroundColor: '#ffffffff',
                fontSize: 18,
                padding: 5,
                color: Theme.colors.navyBlue,
              }}
              onChangeText={password =>
                this.setState({password, error2: false, onChangePassword: true})
              }
              value={this.state.password}
            />
            <View style={styles.error}>
              {this.state.onChangePassword ? null : this.state.error2 ||
                this.props.error === 'Invalid password.' ? (
                <ErrorIcon />
              ) : null}
            </View>
          </View>
          {/* <TouchableOpacity style= {{backgroundColor:"#FF0000"}}> <Text style={{color:"white",fontSize:25}}>Login</Text>
  </TouchableOpacity> */}

          <TouchableOpacity
            onPress={this.login.bind(
              this,
              this.state.email,
              this.state.password,
            )}
            style={{
              // alignItems: 'center',
              backgroundColor: '#FF0000',
              padding: 10,
              marginTop: 20,
              marginLeft: 25,
              marginRight: 25,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 25,
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={{
                backgroundColor: '#a2b0db',
                flexDirection: 'row',
                padding: 10,
                width: screenWidth * 0.4,
                justifyContent: 'center',
              }}
              onPress={this.onCreateAccount}>
              <Image
                source={require('../../../images/create_account.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 5,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: '#616F9B',
                  textAlign: 'center',
                  alignSelf: 'center',
                  paddingRight: 5,
                  // fontSize: 12,
                }}>
                Create Account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#a2b0db',
                flexDirection: 'row',
                padding: 10,
                width: screenWidth * 0.4,
                justifyContent: 'center',
                // justifyContent: 'flex-end',
                // marginLeft: 10,
              }}
              onPress={this.forgotPassword}>
              <Image
                source={require('../../../images/forgot_password.png')}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 2,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />

              <Text
                style={{
                  color: '#616F9B',
                  textAlign: 'center',
                  alignSelf: 'center',

                  paddingRight: 5,
                  // fontSize: 12,
                }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1}}>
            <Image
              source={require('../../../images/image_login_background.png')}
              style={{flex: 1, width: screenWidth, height: 380}}
              resizeMode="stretch"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  login(username, password) {
    this.setState({onChangeEmail: false, onChangePassword: false});
    let reg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s+)?$/;
    if (reg.test(username) === false) {
      this.setState({error1: true});
    } else if (password.length === 0) {
      this.setState({error2: true});
    } else {
      let formdata = new FormData();
      formdata.append('client_id', Constant.ClientID);
      formdata.append('client_secret', Constant.ClientSecret);
      formdata.append('email', username);
      formdata.append('facebook', 0);
      formdata.append('password', password);
      var tokentype = '';
      var bearer = '';
      console.log('formdata', formdata);
      this.props.userLogin(formdata);
      // PreloginApi.post(Constant.GetTokenURL, formdata)
      //   .then(response => {
      //     //  const value2= response.data.data
      //     var strr = response.data.data;

      //     // this.setState({value:response.data})
      //     console.log('testing man loginresp', strr);

      //     Storage.settokenType(strr.token_type);
      //     Storage.savebearer(strr.access_token);
      //     Storage.setLogedin('1');
      //     Storage.setemail(strr.email);
      //     Storage.setImage(strr.image);
      //     Storage.setname(strr.name);
      //     Storage.setMobile(strr.mobile);

      //     // uncomment later
      //     Storage.setCredit(strr.available_credit);
      //     Storage.setfacebook(strr.facebook);
      //     Storage.setMode(strr.promotion_mode);
      //     //  uncomment later

      //     // Actions.popTo(buyl());

      //     // Storage.retrieveSessionToken().then

      //     // below method can be used for data retrieving

      //     Promise.resolve(Storage.getLoggedin()).then(function(value) {
      //       console.log('rantest valuesss', value);
      //       if (value === '1') {
      //         return Actions.loggedinBuy();
      //       }
      //     });
      //   })
      //   .catch(error => {
      //     console.log('error', error);
      //     this.state.loggedin = '0';
      //     Alert.alert(
      //       'Login Failed',
      //       'Something went wrong with login. Please Try again with correct username and password.',
      //       [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      //       {cancelable: false},
      //     );
      //   });
    }
  }

  onCreateAccount() {
    Actions.createAcc();
  }
  forgotPassword() {
    Actions.forgotPw();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1E5F2',
  },
  rowtext: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  buttoncontainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
  },

  text: {
    color: '#012D6C',
    fontSize: 20,
    fontWeight: 'bold',
    //  justifyContent:"center",
  },
  textnet: {
    color: '#012D6C',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,

    //  justifyContent:"center",
  },
  text1: {
    color: 'white',
    fontSize: 20,
  },
  textheader: {
    color: '#FFF8DC',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textbody: {
    fontSize: 17,
  },
  error: {
    position: 'absolute',
    top: 10,
    right: 30,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});

const mapStateToProps = state => {
  console.log('login info', state.login.login_info);
  return {
    loading: state.login.loading,
    error: state.login.error,
    login_info_error: state.login.login_info,
  };
};

export default connect(
  mapStateToProps,
  {
    userLogin,
    resetLoginInfo,
  },
)(Login);
