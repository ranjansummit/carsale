import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {Avatar} from 'react-native-elements';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {connect} from 'react-redux';
// import Geolocation from '@react-native-community/geolocation';
import {getShops} from '../../../../actions/CreditsAction';
import Storage from '../../../storage/Storage';
import Communications from 'react-native-communications';
import Spinner from '../../../common/Utility/Spiner';
// import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {getProfile} from '../../../../actions/ProfileAction';

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = 0.00421;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class PayCash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      Alert_Visibility: true,
      shops: props.shop_data,
      Shop_Info_Visibility: false,
      uniqueShopInfo: [],
    };
  }

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.PERMISSIONS.ACCESS_FINE_LOCATION,
        //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Location permission',
          message:
            'Bhatbhate App needs access to your location ' +
            'so you can locate shops to buy credit.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location access granted');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async requestPhonePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
        console.log('Is granted');
      } else {
        console.log('Is denied');
      }
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    this.requestLocationPermission();
    this.props.getProfile();

    // Storage.getLatitude('latitude').then(latitude => {
    //   this.setState(
    //     {
    //       latitude,
    //     },
    //     () => console.log('latitude', this.state.latitude),
    //   );
    // });
    // Storage.getLongitude('longitude').then(longitude => {
    //   this.setState(
    //     {
    //       longitude,
    //     },
    //     () => console.log('longitude', this.state.longitude),
    //   );
    // });
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({Alert_Visibility: true});
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.shop_data !== this.props.shop_data) {
      this.setState({shops: nextProps.shop_data});
    }
    if (nextProps.profile_details !== null) {
      if (nextProps.profile_details !== this.props.profile_details) {
        this.setState({
          latitude: nextProps.profile_details.latitude,
          longitude: nextProps.profile_details.longitude,
        });
      }
    }
  }
  okPressed(visible) {
    this.setState({
      Alert_Visibility: visible,
    });
    this.props.getShops('27.6507525', '85.3039354');
    // Geolocation.getCurrentPosition(info => {
    //   console.log('info', info);
    //   if (info) {
    //     this.setState(
    //       {
    //         latitude: info.coords.latitude,
    //         longitude: info.coords.longitude,
    //       },
    //       () => {
    //         console.log('latitude', this.state.latitude);
    //         this.props.getShops(this.state.latitude, this.state.longitude);
    //       },
    //     );
    //   }
    // });
  }
  setMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  onSMSPressed = (number, name) => {
    var num = number.toString();
    var seller_name = name.toString();
    console.log('seller name', seller_name);
    Communications.textWithoutEncoding(
      num,
      'Hi ' +
        seller_name +
        ',' +
        '\n' +
        ' I am interested in purchasing your bike so would like to take a closer look. Please arrange meet-up and call me. Thanks.',
    );
  };
  callNow = number => {
    this.requestPhonePermission();
    // // if (Platform.OS === "android") {
    Alert.alert(
      'Contact Seller',
      'Are you sure you want to call ' + number + '?',
      [
        {
          //  this is for commit
          text: 'Yes',
          onPress: () =>
            // this.secondAlert
            {
              // Alert.alert(
              //   '',
              //   'Call  +977' + this.props.list1.mobile,
              //   [
              //     {
              //       text: 'Call',
              //       onPress: () =>
              //         // this.onCallPressed
              //         {
              var num = number.toString();
              if (Platform.OS === 'ios') {
                Communications.phonecall(num, true);
              } else {
                RNImmediatePhoneCall.immediatePhoneCall(num);
              }
              //         },
              //     },
              //     {
              //       text: 'Cancel',
              //       onPress: () => console.log('Cancel Pressed'),
              //       style: 'cancel',
              //     },
              //   ],
              //   {cancelable: false},
              // );
            },
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
    // } else {
    // AlertIOS.alert(
    //   "Contact Seller",
    //   "Are you sure you want to call " + this.props.list1.seller_name + "?",
    //   [
    //     {
    //       text: "Yes",
    //       onPress: () =>
    //       // this.secondAlert
    //       {
    //         AlertIOS.alert(
    //           "",
    //           "Call  +977" + this.props.list1.mobile,
    //           [
    //             {
    //               text: "Call",
    //               onPress: () =>
    //               // this.onCallPressed
    //               {
    //                 var number = this.props.list1.mobile;
    //                 var num = number.toString();
    //                 RNImmediatePhoneCall.immediatePhoneCall(num);
    //               }
    //             },
    //             {
    //               text: "Cancel",
    //               onPress: () => console.log("Cancel Pressed"),
    //               style: "cancel"
    //             }
    //           ],
    //           { cancelable: false }
    //         );
    //       }
    //     },
    //     {
    //       text: "No",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     }
    //   ],
    //   { cancelable: false }
    // );
    // }
  };
  onShopinfoPressed = id => {
    this.setState({Shop_Info_Visibility: true});
    var data = this.state.shops;
    console.log('tala ko id', id);
    var uniqueShopInfo = data.filter(item => item.id === id);
    this.setState({uniqueShopInfo}, () =>
      console.log('unique seller information', this.state.uniqueShopInfo),
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading ? <Spinner /> : null}
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
                Please locate the seller on the map, click to connect.
              </Text>
              <TouchableOpacity
                style={styles.buttonStyle}
                // activeOpacity={0.7}
                onPress={() => {
                  this.okPressed(!this.state.Alert_Visibility);
                  // this.Show_Custom_Alert(!this.state.Alert_Visibility);
                }}>
                <Text style={styles.TextStyle}> OK </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {this.state.uniqueShopInfo.map(modal => (
          <Modal
            key={modal.id}
            style={{borderWidth: 1, borderColor: '#002248'}}
            visible={this.state.Shop_Info_Visibility}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.Shop_Info_Visibility);
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 9999,
              }}>
              <View style={styles.shop_modal_view}>
                <View style={styles.modalNavBar}>
                  <Text style={styles.sellerModalTitle}>Seller Info</Text>
                  <Text
                    style={styles.sellerModalTitle}
                    onPress={() =>
                      this.setState({Shop_Info_Visibility: false})
                    }>
                    X
                  </Text>
                </View>
                <View style={{alignItems: 'center', margin: 10}}>
                  <Avatar size="large" rounded source={{uri: modal.image}} />
                  <Text
                    style={{
                      fontSize: 18,
                      color: Theme.colors.navyBlue,
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {modal.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Theme.colors.navyBlue,
                      textAlign: 'center',
                    }}>
                    {modal.location}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'black',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    {/* {'\n'} */}
                    is selling Credits for Bhatbhate {'\n'} Contact them below
                    to meet up* {'\n'} Scan the QR code on their mobile to
                    transfer first, then pay cash. Pay Rs. 500 for each (1)
                    credit Only!
                  </Text>
                  <View style={{flexDirection: 'row', height: 50, margin: 10}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Theme.colors.red,
                        padding: 15,
                        flex: 1,
                        justifyContent: 'flex-start',
                      }}
                      onPress={() =>
                        this.onSMSPressed(modal.mobile, modal.name)
                      }>
                      <Text style={styles.buttonText}> SMS Now </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Theme.colors.bluishGreen,
                        padding: 15,
                        flex: 1,
                        justifyContent: 'flex-end',
                      }}
                      // onPress={this.onCallPressed}
                      // onPress={val => {
                      //   this.Show_Alert(true);
                      // }}
                      onPress={() => this.callNow(modal.mobile)}>
                      <Text style={styles.buttonText}>Call Now</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={require('../../../../../images/ic_phone.png')}
                      style={{width: 20, height: 20, marginRight: 2}}
                      resizeMode="contain"
                    />
                    <Text style={{fontSize: 12}}>+977{modal.mobile}</Text>
                  </View>
                  <View style={styles.lineStyle} />
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      textAlign: 'center',
                      marginHorizontal: 10,
                      marginBottom: 10,
                    }}>
                    *By connecting with Seller on Bhatbhate, you agree and
                    understand that Bhatbhate APP is NOT involved in any part of
                    transaction, as it is only platform to share information.
                    You agree to Bhatbhate's{' '}
                    <Text
                      style={{
                        fontSize: 12,
                        textDecorationLine: 'underline',
                        color: Theme.colors.navyBlue,
                      }}
                      onPress={() => {
                        Actions.termsConditions();
                        this.setState({Shop_Info_Visibility: false});
                      }}>
                      Terms & Conditions.
                    </Text>{' '}
                    You are directly contacting the person who has posted the
                    advertisement, and agree not to hold Bhatbhate APP
                    responsible for any part of negotiations and sale of the
                    vehicles with the seller.
                  </Text>
                </View>
              </View>
            </View>
          </Modal>
        ))}
        {this.state.shops ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={this.setMapRegion()}>
            {this.state.shops.map(marker => (
              <MapView.Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                // title="This is a title"
                // description="This is a description"
                onPress={() => {
                  this.onShopinfoPressed(marker.id);
                }}></MapView.Marker>
            ))}
            {/* <MapView.Callout>
       <View style={{backgroundColor: Theme.colors.lightBlue}}>
         <Text>This is a plain view</Text>
       </View>
     </MapView.Callout> */}
          </MapView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Alert_Main_View: {
    padding: 5,
    backgroundColor: Theme.colors.lightBlue,
    // height: 200,
    // width: '90%',
    height: 'auto',
    width: 'auto',
    borderWidth: 1,
    borderColor: '#fff',
    margin: 10,
    // borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 0.05 * screenWidth,
    color: Theme.colors.navyBlue,
    textAlign: 'center',
    padding: 20,
    // height: "28%"
  },
  TextStyle: {
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: Theme.colors.red,
    margin: 30,
    height: 50,
    justifyContent: 'center',
  },
  shop_modal_view: {
    backgroundColor: Theme.colors.lightBlue,
    // height: screenHeight * 0.8,
    // width: '90%',
    height: 'auto',
    width: 'auto',
    flexDirection: 'column',
    margin: 8,
  },
  modalNavBar: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    height: screenHeight * 0.06,
  },
  sellerModalTitle: {
    fontSize: 0.05 * screenWidth,
    color: 'white',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  lineStyle: {
    width: screenWidth * 0.8,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
  },
});

const mapStateToProps = state => {
  console.log('shop data', state.credit.shop_data);
  console.log('profile info', state.profile.profile_details);

  return {
    loading: state.credit.loading,
    login_data: state.login.login_data,
    shop_data: state.credit.shop_data,
    profile_details: state.profile.profile_details,
  };
};

export default connect(
  mapStateToProps,
  {getShops, getProfile},
)(PayCash);
