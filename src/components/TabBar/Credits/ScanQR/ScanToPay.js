import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {connect} from 'react-redux';
import Spinner from '../../../common/Utility/Spiner';
import {RNCamera} from 'react-native-camera';
import {confirmQR, resetConfirmCode} from '../../../../actions/CreditsAction';
import Icon from 'react-native-vector-icons/FontAwesome5';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class ScanToPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraStatus: false,
      qr_code: '',
      id: '',
      seller_name: '',
      seller_location: '',
      credit: '',
      rate: '',
      amount: '',
      data: null,
      confirm_QR: false,
      successModal: false,
    };
    this.barcodeCodes = [];
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      // if (this.camera) {
      this.setState({
        cameraStatus: true,
        qr_code: '',
        id: '',
        seller_name: '',
        seller_location: '',
        credit: '',
        rate: '',
        amount: '',
        data: null,
        confirm_QR: false,
        successModal: false,
      });
      // }
    });
  }

  onBarCodeRead = scanResult => {
    // console.log('scan type', scanResult.type);
    // console.log('scan result', scanResult.data);
    let data = JSON.parse(scanResult.data);
    console.log('data', data);
    if (data) {
      this.setState(
        {
          qr_code: data.code,
          id: data.codeId,
          seller_name: data.sellerName,
          credit: data.creditQuantity,
          rate: data.rate,
          amount: data.totalAmount,
          cameraStatus: false,
          confirm_QR: true,
        },
        () => {
          console.log('qr code', this.state.qr_code);
          console.log('id', this.state.id);
        },
      );
    }
  };
  purchaseSuccessAlert = () => {
    this.setState({successModal: true});
    this.props.resetConfirmCode();
  };
  purchaseFailureAlert = () => {
    // this.props.resetConfirmCode();
    Alert.alert(
      'Failed!',
      'Failed to match qr',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetConfirmCode();
          },
        },
      ],
      {cancelable: false},
    );
  };

  cancelPressed = () => {
    this.setState({cameraStatus: false});
    Actions.credits();
  };

  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // handleBackButtonClick() {
  //   Actions.credits();
  //   return true;
  // }
  render() {
    return (
      // <View style={styles.container}>
      //   {this.props.loading ? <Spinner /> : null}
      //   {this.props.confirm_qr_res === false ? (
      //     <View>{this.purchaseSuccessAlert()}</View>
      //   ) : null}
      //   {this.props.confirm_qr_error === true ? (
      //     <View>{this.purchaseFailureAlert()}</View>
      //   ) : null}
      //   <Modal
      //     style={{borderWidth: 1, borderColor: '#002248'}}
      //     visible={this.state.successModal}
      //     transparent={true}
      //     animationType={'fade'}
      //     onRequestClose={() => {
      //       this.Show_Custom_Alert(!this.state.successModal);
      //     }}>
      //     <View
      //       style={{
      //         flex: 1,
      //         backgroundColor: Theme.colors.navyBlue,
      //         paddingTop: '10%',
      //         paddingHorizontal: '5%',
      //       }}>
      //       <View style={{flex: 0.1}}>
      //         <TouchableOpacity
      //           onPress={() => {
      //             this.setState({
      //               successModal: false,
      //               qr_code: '',
      //               id: '',
      //               seller_name: '',
      //               seller_location: '',
      //               credit: '',
      //               rate: '',
      //               amount: '',
      //               data: null,
      //               confirm_QR: false,
      //             });
      //             Actions.credits();
      //           }}>
      //           <Text style={{color: 'white', textAlign: 'right'}}>
      //             {' '}
      //             Cancel{' '}
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //       <View
      //         style={{
      //           flex: 0.8,
      //         }}>
      //         <ImageBackground
      //           style={{
      //             height: 250,
      //             width: 250,
      //             alignSelf: 'center',
      //             justifyContent: 'center',
      //           }}
      //           source={require('../../../../../images/ic_credit_large.png')}>
      //           <Text
      //             style={{
      //               fontSize: 30,
      //               fontWeight: 'bold',
      //               color: 'white',
      //               textAlign: 'center',
      //             }}>
      //             {this.state.credit}
      //             {'\n'} credits
      //           </Text>
      //         </ImageBackground>
      //         <Text
      //           style={{
      //             color: 'white',
      //             fontSize: 16,
      //             textAlign: 'center',
      //             marginVertical: 20,
      //           }}>
      //           Congratulations{'\n'} {'\n'}You have purchased
      //           {this.state.credit} credits.
      //         </Text>
      //         <View style={styles.lineStyleWhite} />
      //         <View style={styles.mid}>
      //           <Text style={styles.midTextWhite}>Credit Rate</Text>
      //           <Text style={styles.midTextWhite}>Rs. {this.state.rate}</Text>
      //         </View>
      //         <View style={styles.lineStyleWhite} />
      //         <View style={styles.mid}>
      //           <Text style={styles.midTextWhite}>Total Amount</Text>
      //           <Text style={styles.midTextWhite}>Rs. {this.state.amount}</Text>
      //         </View>
      //         <View style={styles.lineStyleWhite} />
      //       </View>
      //       <View style={{flex: 0.1}}>
      //         <Text style={{color: 'white', textAlign: 'center'}}>
      //           Please check your email for transaction receipt
      //         </Text>
      //       </View>
      //     </View>
      //   </Modal>
      //   {this.state.confirm_QR ? (
      //     <View style={{flex: 1, padding: 5}}>
      //       <View style={{flex: 1, alignItems: 'center', marginVertical: 20}}>
      //         <Text
      //           style={{
      //             fontSize: 16,
      //             color: 'black',
      //             textAlign: 'center',
      //             margin: 5,
      //           }}>
      //           You are purchasing {this.state.credit} credits from
      //         </Text>
      //       </View>
      //       <View style={{flex: 2}}>
      //         <Text
      //           style={{
      //             fontSize: 18,
      //             fontWeight: 'bold',
      //             color: 'black',
      //             textAlign: 'center',
      //             marginVertical: 10,
      //           }}>
      //           {this.state.seller_name}
      //           {/* Shreejala Tuladhar */}
      //         </Text>
      //         <View style={styles.lineStyle} />
      //         <View style={styles.mid}>
      //           <Text style={styles.midText}>Credit Quantity</Text>
      //           <Text style={styles.midText}>{this.state.credit}</Text>
      //         </View>
      //         <View style={styles.lineStyle} />
      //         <View style={styles.mid}>
      //           <Text style={styles.midText}>Rate</Text>
      //           <Text style={styles.midText}>Rs. {this.state.rate}</Text>
      //         </View>
      //         <View style={styles.lineStyle} />
      //         <View style={styles.mid}>
      //           <Text style={styles.midText}>Total Amount</Text>
      //           <Text style={styles.midText}>Rs. {this.state.amount}</Text>
      //         </View>
      //       </View>
      //       <View style={{flex: 1, justifyContent: 'center'}}>
      //         <TouchableOpacity
      //           style={{
      //             padding: 10,
      //             backgroundColor: Theme.colors.red,
      //             width: screenWidth * 0.8,
      //             alignSelf: 'center',
      //             position: 'absolute',
      //             bottom: 10,
      //           }}
      //           onPress={() => {
      //             this.props.confirmQR(this.state.qr_code, this.state.id);
      //           }}>
      //           <Text
      //             style={{
      //               fontSize: 20,
      //               color: 'white',
      //               textAlign: 'center',
      //               fontWeight: 'bold',
      //             }}>
      //             PROCEED
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //   ) : (
      //     <ScrollView contentContainerStyle={{padding: 5}}>
      //       {/* <View style={{padding: 5, flex: 1, justifyContent: 'center'}}> */}
      //       <Text style={styles.text}>
      //         Use your phone camera to scan QR Code and pay the seller on
      //         confirmation of code transfer.
      //       </Text>
      //       {/* </View> */}
      //       <View
      //       // style={{flex: 2}}
      //       >
      //         {this.state.cameraStatus === true ? (
      //           <RNCamera
      //             style={{
      //               height: screenHeight * 0.3,
      //               width: screenWidth * 0.8,
      //               alignSelf: 'center',
      //             }}
      //             flashMode={RNCamera.Constants.FlashMode.on}
      //             barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      //             onBarCodeRead={this.onBarCodeRead.bind(this)}
      //             ref={cam => (this.camera = cam)}
      //           />
      //         ) : null}
      //       </View>
      //       <View
      //         style={{
      //           // flex: 1,
      //           justifyContent: 'center',
      //         }}>
      //         <Text style={styles.text}>OR</Text>
      //         <TouchableOpacity
      //           style={{
      //             padding: 10,
      //             backgroundColor: Theme.colors.navyBlue,
      //             width: screenWidth * 0.8,
      //             alignSelf: 'center',
      //           }}
      //           onPress={
      //             () => Actions.enterCode()
      //             // this.setState({successModal: true})
      //           }>
      //           <Text
      //             style={{
      //               fontSize: 20,
      //               color: 'white',
      //               textAlign: 'center',
      //               fontWeight: 'bold',
      //             }}>
      //             Enter code manually
      //           </Text>
      //         </TouchableOpacity>
      //       </View>
      //     </ScrollView>
      //   )}
      // </View>
      <View style={{flex: 1}}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={{
              // // margin: 20,
              // marginTop: 15,
              // // marginBottom: 10,
              // marginRight: 20,
              // marginLeft: 10,
              // flexDirection: 'row',
              // position: 'absolute',
              // bottom: 10,
              marginTop: Platform.OS === 'ios' ? 28 : null,
              marginHorizontal: 10,
              flexDirection: 'row',
            }}
            onPress={() => {
              // this.setState({cameraStatus: false});
              this.cancelPressed();
            }}>
            {/* <Text style={{color: 'white', fontSize: 16}}>Cancel</Text> */}
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>
        </View>
        {this.props.loading ? <Spinner /> : null}
        {this.props.confirm_qr_res === false ? (
          <View>{this.purchaseSuccessAlert()}</View>
        ) : null}
        {this.props.confirm_qr_error === true ? (
          <View>{this.purchaseFailureAlert()}</View>
        ) : null}
        <Modal
          style={{borderWidth: 1, borderColor: '#002248'}}
          visible={this.state.successModal}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.successModal);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              paddingTop: '10%',
              paddingHorizontal: '5%',
            }}>
            <View style={{flex: 0.1}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    successModal: false,
                    qr_code: '',
                    id: '',
                    seller_name: '',
                    seller_location: '',
                    credit: '',
                    rate: '',
                    amount: '',
                    data: null,
                    confirm_QR: false,
                  });
                  Actions.credits();
                }}>
                <Text style={{color: 'white', textAlign: 'right'}}>
                  {' '}
                  Cancel{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.8,
              }}>
              <ImageBackground
                style={{
                  height: 250,
                  width: 250,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                source={require('../../../../../images/ic_credit_large.png')}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {this.state.credit}
                  {'\n'} credits
                </Text>
              </ImageBackground>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                Congratulations{'\n'} {'\n'}You have purchased
                {this.state.credit} credits.
              </Text>
              <View style={styles.lineStyleWhite} />
              <View style={styles.mid}>
                <Text style={styles.midTextWhite}>Credit Rate</Text>
                <Text style={styles.midTextWhite}>Rs. {this.state.rate}</Text>
              </View>
              <View style={styles.lineStyleWhite} />
              <View style={styles.mid}>
                <Text style={styles.midTextWhite}>Total Amount</Text>
                <Text style={styles.midTextWhite}>Rs. {this.state.amount}</Text>
              </View>
              <View style={styles.lineStyleWhite} />
            </View>
            <View style={{flex: 0.1}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Please check your email for transaction receipt
              </Text>
            </View>
          </View>
        </Modal>
        {this.state.confirm_QR ? (
          <View style={{flex: 1, padding: 5}}>
            <View style={{flex: 1, alignItems: 'center', marginVertical: 20}}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  textAlign: 'center',
                  margin: 5,
                }}>
                You are purchasing {this.state.credit} credits from
              </Text>
            </View>
            <View style={{flex: 2}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                  marginVertical: 10,
                }}>
                {this.state.seller_name}
                {/* Shreejala Tuladhar */}
              </Text>
              <View style={styles.lineStyle} />
              <View style={styles.mid}>
                <Text style={styles.midText}>Credit Quantity</Text>
                <Text style={styles.midText}>{this.state.credit}</Text>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.mid}>
                <Text style={styles.midText}>Rate</Text>
                <Text style={styles.midText}>Rs. {this.state.rate}</Text>
              </View>
              <View style={styles.lineStyle} />
              <View style={styles.mid}>
                <Text style={styles.midText}>Total Amount</Text>
                <Text style={styles.midText}>Rs. {this.state.amount}</Text>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Theme.colors.red,
                  width: screenWidth * 0.8,
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 10,
                }}
                onPress={() => {
                  this.props.confirmQR(this.state.qr_code, this.state.id);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  PROCEED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{height: 80, backgroundColor: 'white'}}>
              <Text style={styles.text}>
                Use your phone camera to scan QR Code and pay the seller on
                confirmation of code transfer.
              </Text>
            </View>
            {this.state.cameraStatus ? (
              <View
                style={{
                  height: screenHeight * 0.3,
                  width: screenWidth * 0.6,
                  alignSelf: 'center',
                }}>
                <RNCamera
                  style={{
                    // flex: 1,
                    height: screenHeight * 0.3,
                    width: screenWidth * 0.5,
                    alignSelf: 'center',
                    // justifyContent: 'center',
                    // marginTop: 20,
                  }}
                  flashMode={RNCamera.Constants.FlashMode.on}
                  barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
                  ref={cam => (this.camera = cam)}
                />
              </View>
            ) : null}
            <View
              style={{
                marginVertical: 50,
                justifyContent: 'center',
              }}>
              <Text style={styles.text}>OR</Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: Theme.colors.navyBlue,
                  width: screenWidth * 0.8,
                  alignSelf: 'center',
                  marginTop: 30,
                }}
                onPress={
                  () => Actions.enterCode()
                  // this.setState({successModal: true})
                }>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Enter code manually
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
  },
  navbar: {
    // flex: 0.1,
    // flexDirection: 'row',
    // backgroundColor: Theme.colors.navyBlue,
    // paddingTop: 5,
    // paddingBottom: 10,
    // height: screenHeight * 0.1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? screenHeight * 0.11 : screenHeight * 0.09,
  },
  text: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  mid: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  midText: {
    fontSize: 16,
    color: 'black',
    // textAlign: 'left',
  },
  midTextWhite: {
    fontSize: 16,
    color: 'white',
  },
  lineStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
  lineStyleWhite: {
    borderWidth: 0.5,
    borderColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    loading: state.credit.loading,
    confirm_qr_res: state.credit.confrim_QR_result,
    confirm_qr_error: state.credit.confirm_qr_error,
  };
};

export default connect(
  mapStateToProps,
  {confirmQR, resetConfirmCode},
)(ScanToPay);
