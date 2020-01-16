/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
  Alert,
  AlertIOS,
  Modal,
  Linking,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {getSellerInfo} from '../../../actions/LoginAction';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Spinner from '../../common/Utility/Spiner';
import Communications from 'react-native-communications';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Theme from '../../common/Utility/Colors';
import Geocoder from 'react-native-geocoder';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
const ASPECT_RATIO = screenWidth / screenHeight;

class SellerInfo extends Component {
  constructor() {
    super();
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      Alert_Visibility: false,
      Alert: false,
      subLocality: '',
      subAdminArea: '',
      latdeltaMin: '',
      latdeltaMax: '',
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      latDelta: '',
      // data: [this.props.list1]
    };
    this.onSMSPressed = this.onSMSPressed.bind(this);
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
  componentWillMount() {
    // if (Platform.OS === "android") {
    //   this.requestLocationPermission(); // function call
    // }
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    this.setState({Alert_Visibility: false});
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Actions.loggedinDetails();

    return true;
    // this.props.navigation.goBack(null);
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  onSMSPressed = () => {
    var number = this.props.list1.mobile;
    var num = number.toString();
    var sellername = this.props.list1.seller_name;
    var name = sellername.toString();
    console.log('seller name', name);
    Communications.textWithoutEncoding(
      num,
      'Hi ' +
        name +
        ',' +
        '\n' +
        ' I am interested in purchasing your bike so would like to take a closer look. Please arrange meet-up and call me. Thanks.',
    );
  };

  firstalert = () => {
    this.requestPhonePermission();
    // // if (Platform.OS === "android") {
    Alert.alert(
      'Contact Seller',
      'Are you sure you want to call ' + this.props.list1.seller_name + '?',
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
              var number = this.props.list1.mobile;
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
  getInitials = function(name) {
    console.log('name', name);

    var str = 'Steven Pandey';
    console.log('string', str);
    var matches = name.match(/\b(\w)/g);
    var acronym = matches.join('');

    console.log('initials', acronym);
    return acronym;
  };
  render() {
    let location = {
      lat: this.props.list1.latitude,
      lng: this.props.list1.longitude,
      // lat: 27.583331,
      // lng: 85.249999,
    };

    Geocoder.geocodePosition(location).then(response => {
      console.log('NY:', response);
      // this.setState({
      //   latdeltaMin: response[0].position.lat,
      //   latdeltaMax: response[7].position.lat,

      //   latDelta: this.state.latdeltaMax - this.state.latdeltaMin,
      //   region: {
      //     latitude: this.props.list1.latitude,
      //     longitude: this.props.list1.longitude,
      //     latitudeDelta: this.state.latDelta,
      //     longitudeDelta: this.state.latDelta * ASPECT_RATIO
      //   }
      // });
      var locality = response[0].subLocality;
      var area = response[0].subAdminArea;
      if (locality == null && area == null) {
        this.setState({subLocality: this.props.list1.location});
      } else {
        this.setState({subLocality: locality, subAdminArea: area}, () =>
          console.log('sublocality', this.state.subLocality),
        );
      }
    });
    // Promise.resolve(
    //   Geocoder.geocodePosition(location).then(function(value) {
    //     console.log("address", value[0]);
    //     subLocality = value[0].subLocality;
    //     var subAdminArea = value[0].subAdminArea;

    //     console.log("address", subLocality);
    //     console.log("address1", subAdminArea);
    //   })
    // );
    // onRegionChange = region => {
    //   this.setState({region: region});
    // };
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <ScrollView>
            {/* {this.props.list.map(item => ( */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 5,
                marginRight: 5,
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <Text style={styles.text}> Vehicle Lot</Text>
                <Text style={styles.text}> Odometer </Text>
                <Text style={styles.text}> Mileage </Text>
              </View>

              {this.props.list.map(item => {
                return (
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      // justifyContent: "flex-end"
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.text}> {item.lot}</Text>
                    <Text style={styles.text}> {item.odometer} KM</Text>
                    <Text style={styles.text}> {item.mileage} KM/L</Text>
                  </View>
                );
              })}
            </View>
            {/* ))} */}
            <View style={styles.lineStyle} />
            <View style={{marginTop: 30}}>
              {this.props.list1.seller_image === '' ? (
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    size="large"
                    rounded
                    // source={require('../../../../images/blank.jpg')}
                    title={this.getInitials(this.props.list1.seller_name)}
                  />
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Avatar
                    size="large"
                    rounded
                    source={{uri: this.props.list1.seller_image}}
                  />
                </View>
              )}
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                  marginLeft: 20,
                  marginRight: 20,
                }}>
                <Text
                  style={{
                    color: Theme.colors.navyBlue,
                    fontWeight: 'bold',
                    // padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  {this.props.list1.seller_name}
                </Text>
              </View>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <Text
                  style={{
                    color: Theme.colors.navyBlue,
                    // padding: 5,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  {/* {this.state.subLocality === '' &&
                  this.state.subAdminArea === ''
                    ? this.props.list1.location
                    : (this.state.subLocality, this.state.subAdminArea)} */}
                  {this.state.subLocality}
                  {/* , {this.state.subAdminArea} */}
                </Text>
              </View>
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Text
                  style={{
                    color: Theme.colors.navyBlue,
                    // padding: 5,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  {this.props.list1.bike_name} @
                </Text>
              </View>
              <View style={{alignItems: 'center', marginBottom: 10}}>
                <Text
                  style={{
                    color: Theme.colors.navyBlue,
                    // padding: 5,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  Rs. {this.formatNumber(this.props.list1.price)}
                </Text>
              </View>
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: Theme.colors.lightGreen,
                  padding: 15,
                  flex: 1,
                  justifyContent: 'flex-start',
                  marginRight: 2,
                }}
                onPress={this.onSMSPressed}>
                <Text style={styles.text1}> SMS Now </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: Theme.colors.bluishGreen,
                  padding: 15,
                  flex: 1,
                  justifyContent: 'flex-end',
                  marginLeft: 2,
                }}
                // onPress={this.onCallPressed}
                // onPress={val => {
                //   this.Show_Alert(true);
                // }}
                onPress={this.firstalert}>
                <Text style={styles.text1}>Call Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.lineStyle} />

            <View
              style={{marginLeft: 10, marginRight: 10, flexDirection: 'row'}}>
              {/* <Image
              source={require("../../../images/forgot_password.png")}
              style={{ width: 20, height: 20, marginRight: 2 }}
              resizeMode="contain"
            /> */}
              <Image
                source={require('../../../../images/ic_phone.png')}
                style={{width: 20, height: 20, marginRight: 2}}
                resizeMode="contain"
              />
              <Text style={{fontSize: 15}}>+977{this.props.list1.mobile}</Text>
            </View>
            <View style={styles.lineStyle} />
            <View style={styles.mapContainer}>
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                  latitude: this.props.list1.latitude,
                  longitude: this.props.list1.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                  // latitudeDelta: this.state.latDelta,
                  // longitudeDelta: this.state.latDelta * ASPECT_RATIO
                }}
                // region={this.state.region}
                // onRegionChange={this.onRegionChange}
                zoomEnabled={true}>
                <MapView.Marker
                  coordinate={{
                    latitude: this.props.list1.latitude,
                    longitude: this.props.list1.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                    // latitudeDelta: this.state.latDelta,
                    // longitudeDelta: this.state.latDelta * ASPECT_RATIO
                  }}
                  // coordinate={this.state.region}
                  title="Seller Detail"
                  // description={marker.description}
                />
              </MapView>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Theme.colors.black,
    padding: 10,
    fontSize: 18,
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: Theme.colors.fadedBlack,
    margin: 10,
  },
  buttoncontainer: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },

  Alert_Main_View: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'white',
    height: 100,
    width: '80%',
    borderWidth: 1,
    borderColor: Theme.colors.fadedBlack,
    borderRadius: 5,
  },
  Alert_Main_View1: {
    padding: 5,
    backgroundColor: 'white',
    height: 150,
    width: '80%',
    borderWidth: 1,
    borderColor: Theme.colors.fadedBlack,
    borderRadius: 5,
  },
  Alert_Title: {
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  TextStyle: {
    textAlign: 'center',
    color: Theme.colors.navyBlue,
    marginLeft: 5,
    marginTop: 10,
    fontSize: 15,
  },
  mapContainer: {
    height: 200,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 20,
  },
  map: {
    height: 200,
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 20,
  },
});

const mapStateToProps = state => {
  console.log('seller list details', state.login.sellerInfo);
  console.log('seller list details', state.login.detailList);

  return {
    loading: state.login.loading,
    list: state.login.detailList,
    list1: state.login.sellerInfo,
  };
};

export default connect(
  mapStateToProps,
  {getSellerInfo},
)(SellerInfo);
