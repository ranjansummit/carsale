/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Alert,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  getProfile,
  saveUserImage,
  resetUserProfile,
  // editName
  changePassword,
  resetChangePassword,
} from '../../actions/ProfileAction';
import {resetData} from '../../actions/LoginAction';
import Theme from '../common/Utility/Colors';
import {Avatar} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Spinner from '../common/Utility/Spiner';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage from '../storage/Storage';
import {Actions} from 'react-native-router-flux';
import {resetProfile} from '../../actions/ProfileAction';
//not finished yet

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_list: props.profile_details,
      profile_image: props.profile_image,
      profile_name: props.profile_name,
      profile_email: props.profile_email,
      profile_number: props.profile_number,
      profile_listings: props.profile_listings,
      profile_credits: props.profile_credits,
      profile_purchase_credits: props.profile_purchase_credits,
      profileChosed: false,
      profile_name_changed: false,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getProfile();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_details !== this.props.profile_details) {
      this.setState(
        {
          profile_list: nextProps.profile_details,
          profile_image: nextProps.profile_image,
          profile_name: nextProps.profile_name,
          profile_email: nextProps.profile_email,
          profile_number: nextProps.profile_number,
          profile_listings: nextProps.profile_listings,
          profile_credits: nextProps.profile_credits,
          profile_purchase_credits: nextProps.profile_purchase_credits,
        },
        () => console.log('profile image', this.state.profile_image),
      );
    }
  }

  async chooseFromLibrary() {
    this.setState({profileChosed: true});
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Camera Roll permission',
          message:
            'Bhatbhate App needs access to your camera roll ' +
            'so you can choose pictures from camera roll.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera roll');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo library');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {
          uri: response.uri,
          isStatic: true,
          type: response.type,
          name: response.fileName,
          data: response.data,
        };

        this.setState(
          {
            profile_image: source.uri,
          },
          () => this.props.saveUserImage(source),
        );
      }
    });
  }
  // performTimeConsumingTask = async ms => {
  //   return new Promise(resolve =>
  //     setTimeout(() => {
  //       resolve('result');
  //     }, ms),
  //   );
  // };

  // async
  onLogout = () => {
    Storage.logout();
    this.props.resetProfile();
    //loginlist reset
    // this.props.resetData();
    // this.props.getProfile();
    Actions.buyl();
  };
  getInitials = function(name) {
    // console.log('name', name);

    // var str = 'Shreejala Tuladhar';
    var str = name;
    console.log('string', str);
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');

    console.log('initials', acronym);
    return acronym;
  };
  userImageSaved = () => {
    Alert.alert(
      'Success!',
      'Image successfully updated.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.getProfile();
            this.props.resetUserProfile();
          },
        },
      ],
      {cancelable: false},
    );
  };
  userImageSaveFailed = () => {
    Alert.alert(
      'Failed!',
      'Failed to change your profile image',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.getProfile();
            this.props.resetUserProfile();
          },
        },
      ],
      {cancelable: false},
    );
  };
  editName = (profile_name, profile_name_changed) => {
    // this.props.editName(profile_name)
    if (profile_name_changed === true) {
      this.props.changePassword(profile_name, '', '');
    }
  };
  nameChangeAlert = () => {
    Alert.alert(
      'Success!',
      'Profile name edited successfully',
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
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.profile_saved === false ? (
          <View>{this.userImageSaved()}</View>
        ) : null}
        {this.props.profile_save_failed === true ? (
          <View>{this.userImageSaveFailed()}</View>
        ) : null}
        {this.props.password_change_msg === 'Profile edited' ? (
          <View>{this.nameChangeAlert()}</View>
        ) : null}
        <ScrollView>
          <View style={{alignItems: 'center', margin: 5}}>
            {/* {console.log('profile image??', this.state.profile_image)} */}
            {/* {this.state.profile_image === '' ? (
              this.state.profileChosed ? (
                <Avatar
                  size="large"
                  rounded
                  source={this.state.profile_image}
                />
              ) : (
                <Avatar
                  size="large"
                  rounded
                  title={this.getInitials(this.state.profile_list.name)}
                />
              )
            ) : this.state.profileChosed ? (
              <Avatar size="large" rounded source={this.state.profile_image} />
            ) : (
              <Avatar
                size="large"
                rounded
                source={{uri: this.state.profile_image}}
              />
            )} */}
            {this.state.profile_image !== '' ? (
              <Avatar
                size="large"
                rounded
                source={{uri: this.state.profile_image}}
                onPress={() => {
                  this.chooseFromLibrary();
                }}
              />
            ) : (
              <Avatar
                size="large"
                rounded
                title={this.getInitials(this.state.profile_name)}
                onPress={() => {
                  this.chooseFromLibrary();
                }}
              />
            )}
          </View>
          <Text
            style={{margin: 10, textAlign: 'center'}}
            onPress={() => {
              this.chooseFromLibrary();
            }}>
            Change Profile Photo
          </Text>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 5,
              marginBottom: 5,
            }}>
            <View
              style={{
                justifyContent: 'flex-start',
                flexDirection: 'row',
                flex: 0.9,
              }}>
              <Image
                source={require('../../../images/ic_user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  padding: 5,
                  marginRight: 5,
                }}
              />
              {/* <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                {this.state.profile_list.name}
              </Text> */}
              <TextInput
                style={{
                  paddingLeft: 5,
                  // fontSize: 0.04 * screenWidth,
                  fontSize: 18,
                  color: 'black',
                  width: '70%',
                  height: 40,
                }}
                value={this.state.profile_name}
                type="string"
                required
                onChangeText={profile_name =>
                  this.setState({profile_name, profile_name_changed: true})
                }
              />
            </View>
            <View style={{justifyContent: 'flex-end', flex: 0.1}}>
              <TouchableOpacity>
                <Icon
                  style={{
                    padding: 5,
                  }}
                  name={'edit'}
                  size={20}
                  onPress={() =>
                    this.editName(
                      this.state.profile_name,
                      this.state.profile_name_changed,
                    )
                  }
                  // onPress={() =>
                  //   this.oneditPrice(
                  //     this.props.list.id,
                  //     this.state.price,
                  //   )
                  // }
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../images/ic_email.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                padding: 5,
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: 'black',
              }}>
              {this.state.profile_email}
            </Text>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Image
              source={require('../../../images/ic_phone.png')}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                padding: 5,
              }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                color: 'black',
              }}>
              +977 {this.state.profile_number}
            </Text>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{flex: 2, justifyContent: 'flex-start'}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                Number of Purchases
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                {this.state.profile_purchase_credits}
              </Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{flex: 2, justifyContent: 'flex-start'}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                Available Credits
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                {this.state.profile_credits}
              </Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{flex: 2, justifyContent: 'flex-start'}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                Number of Listings
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 10}}>
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 18,
                  color: 'black',
                }}>
                {this.state.profile_listings}
              </Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <TouchableOpacity
            style={styles.button}
            // onPress={() =>
            //   this.onSubmit(
            //     this.state.profile_list.name,
            //     this.state.profile_list.email,
            //     this.state.text
            //   )
            // }
            onPress={() => this.onLogout()}>
            <Text style={styles.buttontext}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
    // margin: 5
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    padding: 10,
  },
  lineStyle: {
    // paddingLeft: 10,
    // paddingRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
  buttontext: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#F7003C',
    padding: 5,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

const mapStateToProps = state => {
  console.log('profile image', state.profile.profile_image);
  console.log('profile info', state.profile.profile_details);
  console.log('profile credits', state.profile.profile_credits);
  return {
    loading: state.profile.loading,
    profile_details: state.profile.profile_details,
    profile_image: state.profile.profile_image,
    profile_name: state.profile.profile_name,
    profile_email: state.profile.profile_email,
    profile_number: state.profile.profile_number,
    profile_purchase_credits: state.profile.profile_purchase_credits,
    profile_credits: state.profile.profile_credits,
    profile_listings: state.profile.profile_listings,
    profile_saved: state.profile.profile_saved,
    profile_save_failed: state.profile_save_failed,
    password_change_msg: state.profile.password_change,
    error: state.profile.password_change_error,
  };
};

export default connect(
  mapStateToProps,
  {
    getProfile,
    saveUserImage,
    resetUserProfile,
    changePassword,
    resetChangePassword,
    resetProfile,
    resetData,
  },
)(Profile);
