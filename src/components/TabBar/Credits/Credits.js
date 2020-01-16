import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {loginlist} from '../../../actions/LoginAction';
import {useCoupon, resetUseCoupon} from '../../../actions/CreditsAction';
import Theme from '../../common/Utility/Colors';
import Storage from '../../storage/Storage';
import {connect} from 'react-redux';
import Spinner from '../../common/Utility/Spiner';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alert_Visibility: false,
      Coupon_Alert_visibility: false,
      loginVal: '',
      coupon_code: '',
      credits: '',
    };
    this.esewaPressed = this.esewaPressed.bind(this);
  }

  componentDidMount() {
    this.props.loginlist();
  }
  esewaPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.esewa();
      }
    });
  };
  cashPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        // return this.setState({Alert_Visibility: true});
        return Actions.payCash();
      }
    });
  };
  scanQRPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.scanToPay();
      }
    });
  };
  sellCredit = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.genQR();
      }
    });
  };
  couponCode = () => {
    Storage.getLoggedin('login').then(value => {
      this.setState({loginVal: value}, () => {
        // console.log('loginVal', this.state.loginVal);
        if (this.state.loginVal === '0') {
          return Actions.login();
        } else {
          this.setState({Coupon_Alert_visibility: true});
        }
      });
    });
  };
  useNowPressed = coupon_code => {
    this.setState({Coupon_Alert_visibility: false});
    this.props.useCoupon(coupon_code);
    this.setState({coupon_code: ''});
  };
  couponSuccessAlert = success => {
    Alert.alert(
      'Success!',
      success,
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetUseCoupon();
          },
        },
      ],
      {cancelable: false},
    );
  };
  couponFailureAlert = fail => {
    Alert.alert(
      'Failure!',
      fail + ' Try Again',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetUseCoupon();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.use_coupon_success === false ? (
          <View>
            {this.couponSuccessAlert(this.props.use_coupon_success_msg)}
          </View>
        ) : null}
        {this.props.use_coupon_error === true ? (
          <View>
            {this.couponFailureAlert(this.props.use_coupon_error_msg)}
          </View>
        ) : null}
        <Modal
          style={{borderWidth: 1, borderColor: '#002248'}}
          visible={this.state.Coupon_Alert_visibility}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Coupon_Alert_visibility);
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={styles.mainAlertView}>
              <Text style={styles.Alert_Title}>
                Please enter valid coupon code below.
              </Text>
              <TextInput
                style={styles.inputText}
                type="string"
                required
                name="coupon_code"
                placeholder="valid coupon code"
                placeholderTextColor="black"
                onChangeText={coupon_code => this.setState({coupon_code})}
                value={this.state.coupon_code}
              />
              <View style={styles.lineStyle} />
              <TouchableOpacity
                onPress={() => this.useNowPressed(this.state.coupon_code)}>
                <Text
                  style={{
                    fontSize: 15,
                    color: Theme.colors.navyBlue,
                    textAlign: 'center',
                  }}>
                  Use now
                </Text>
              </TouchableOpacity>
              <View style={styles.lineStyle} />

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    Coupon_Alert_visibility: false,
                    coupon_code: '',
                  });
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}>
                  No, I'll use later
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.body}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 50,
                marginTop: 5,
              }}>
              Credits
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
                marginTop: 5,
              }}>
              A fast and easy way to sell one or thousands of bikes.
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 15,
                marginTop: 5,
              }}>
              To list a single bike purchase 1 credit.
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 15,
                marginTop: 5,
              }}>
              {/* List your bike using credits. */}
              Select the way to purchase your credit(s) below
            </Text>
          </View>
          <View style={styles.body1}>
            <TouchableOpacity
              style={{
                // alignItems: 'center',
                backgroundColor: '#F7003C',
                padding: 15,
              }}
              onPress={() => {
                this.esewaPressed();
              }}>
              <Text style={styles.text}>Pay eSewa Rs. 450 each </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                // alignItems: 'center',
                backgroundColor: '#00AF9D',
                padding: 15,
                marginTop: 10,
              }}
              onPress={() => {
                this.cashPressed();
              }}>
              <Text style={styles.text}>Pay Cash Rs. 500 each </Text>
            </TouchableOpacity>
            <Modal
              style={{borderWidth: 1, borderColor: '#002248'}}
              visible={this.state.Alert_Visibility}
              transparent={true}
              animationType={'fade'}
              onRequestClose={() => {
                this.Show_Custom_Alert(!this.state.Alert_Visibility);
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.Alert_Main_View}>
                  <Text style={styles.Alert_Title}>
                    Loading closest credit stores to you
                  </Text>
                </View>
              </View>
            </Modal>
            <TouchableOpacity
              style={{
                // alignItems: 'center',
                backgroundColor: '#58517E',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() => {
                this.scanQRPressed();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../../images/ic_qr_code.png')}
                  resizeMode="contain"
                  style={{
                    width: 35,
                    height: 30,
                    marginLeft: 2,
                    marginRight: 2,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
                <View style={{justifyContent: 'flex-start'}}>
                  <Text style={styles.text1}>Scan QR code </Text>
                  <Text style={styles.text2}> to accept credit </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // alignItems: 'center',
                backgroundColor: '#58517E',
                padding: 10,
                marginTop: 10,
              }}
              onPress={() => {
                this.sellCredit();
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../../images/ic_sell_credit_label.png')}
                  resizeMode="contain"
                  style={{
                    width: 35,
                    height: 30,
                    marginLeft: 2,
                    marginRight: 2,
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                />
                <View style={{justifyContent: 'flex-start'}}>
                  <Text style={styles.text1}>Sell credit to a user </Text>
                  <Text style={styles.text2}>You have (14) credits </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                // alignItems: 'center',
                backgroundColor: '#58517E',
                padding: 15,
                marginTop: 10,
              }}
              onPress={() => {
                this.couponCode();
              }}>
              <Text style={styles.text}>Do you have coupon code?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.navyBlue,
    // padding: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 30,
  },
  body1: {
    flex: 2,
    padding: 30,
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text1: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  text2: {
    color: 'white',
    fontSize: 15,
    marginRight: 5,
  },
  Alert_Main_View: {
    padding: 5,
    backgroundColor: Theme.colors.lightBlue,
    height: 30,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    margin: 10,
    // borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    padding: 10,
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  mainAlertView: {
    padding: 8,
    backgroundColor: Theme.colors.lightBlue,
    // height: screenHeight * 0.4,
    // width: '90%',
    height: 'auto',
    width: 'auto',
    borderWidth: 1,
    flexDirection: 'column',
  },
  inputText: {
    padding: 5,
    height: 40,
    width: screenWidth * 0.7,
    borderWidth: 1,
    fontSize: 0.04 * screenWidth,
    color: 'black',
    borderColor: 'white',
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Theme.colors.navyBlue,
    marginVertical: 15,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.credit.loading,
    use_coupon_success: state.credit.coupon_code_success,
    use_coupon_success_msg: state.credit.coupon_code_success_msg,
    use_coupon_error: state.credit.coupon_code_error,
    use_coupon_error_msg: state.credit.coupon_code_error_msg,
  };
};

export default connect(
  mapStateToProps,
  {loginlist, useCoupon, resetUseCoupon},
)(Credits);
