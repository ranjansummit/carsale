import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Modal,
  Alert,
  Dimensions,
  Image,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import {
  //take photo button selected
  firstimage,
  secondimage,
  thirdimage,
  fourthimage,
} from '../../../actions/LoginAction';
import {
  //save gallery images
  deviceImg1,
  deviceImg2,
  deviceImg3,
  deviceImg4,
} from '../../../actions/ImageAction';
import NavBarAddVehicle from './NavBarAddVehicle';
import Theme from '../../common/Utility/Colors';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class Add2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alert_Visibility: false,

      firstimageselected: false,
      secondimageselected: false,
      thirdimageselected: false,
      fourthimageselected: false,

      //device images
      // for 1st image
      imageSource1: '',

      //for 2nd image
      imageSource2: '',

      //for 3rd image
      imageSource3: '',

      //for fourth image
      imageSource4: '',
      camStatus1: false,
      camStatus2: false,
      camStatus3: false,
      camStatus4: false,
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
  performTimeConsumingTask = async ms => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, ms),
    );
  };
  handleBackButtonClick() {
    Actions.add1();
    return true;
  }
  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }
  cancelPressed(visible) {
    this.setState({
      Alert_Visibility: visible,
      firstimageselected: false,
      secondimageselected: false,
      thirdimageselected: false,
      fourthimageselected: false,
    });
  }

  takePhoto = invisible => {
    this.setState({Alert_Visibility: invisible});
    if (this.state.firstimageselected) {
      Actions.openCam1();
      this.setState({firstimageselected: false});
    } else if (this.state.secondimageselected) {
      Actions.openCam2();
      this.setState({secondimageselected: false});
    } else if (this.state.thirdimageselected) {
      Actions.openCam3();
      this.setState({thirdimageselected: false});
    } else if (this.state.fourthimageselected) {
      Actions.openCam4();
      this.setState({fourthimageselected: false});
    } else {
      null;
    }
  };

  async getPhotosFromGallery() {
    this.setState({Alert_Visibility: false});
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,

      // storageOptions: {
      //   skipBackup: true,
      // },
    };
    console.log('get photos');

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
    const data = await this.performTimeConsumingTask(1000);
    if (data !== null) {
      ImagePicker.launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled photo library');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('reached in response ');

          // let source = { uri: "data:image/jpeg;base64," + response.data };

          // if (Platform.OS === 'android') {
          //   source = {uri: response.uri, isStatic: true};
          // } else {
          //   source = {uri: response.uri.replace('file://', ''), isStatic: true};
          // }

          let source = {
            uri: response.uri,
            isStatic: true,
            type: response.type,
            name: response.fileName,
            data: response.data,
          };

          if (this.state.firstimageselected) {
            this.setState(
              {
                imageSource1: source,
                firstimageselected: false,
              },
              () => {
                this.props.deviceImg1(this.state.imageSource1);
                console.log('saved device image', this.state.imageSource1);
              },
            );
          } else if (this.state.secondimageselected) {
            this.setState(
              {imageSource2: source, secondimageselected: false},
              () => {
                this.props.deviceImg2(this.state.imageSource2);
                console.log('saved device image 2', this.state.imageSource2);
              },
            );
          } else if (this.state.thirdimageselected) {
            this.setState(
              {imageSource3: source, thirdimageselected: false},
              () => this.props.deviceImg3(this.state.imageSource3),
            );
          } else if (this.state.fourthimageselected) {
            this.setState(
              {imageSource4: source, fourthimageselected: false},
              () => this.props.deviceImg4(this.state.imageSource4),
            );
          }
        }
      });
    }
  }
  rotateImage(orientation) {
    // let exifOrientation = this.props.front_side_image.orientation;
    console.log('orientation', orientation);
    let exifOrientation = orientation;
    let degRotation;
    switch (exifOrientation) {
      case 3:
        degRotation = '180deg';
        break;
      case 4:
        degRotation = '180deg';
        break;
      case 5:
        degRotation = '90deg';
        break;
      case 6:
        degRotation = '90deg';
        break;
      case 7:
        degRotation = '270deg';
        break;
      case 8:
        degRotation = '270deg';
        break;
      default:
        degRotation = '0deg';
    }
    console.log('degRotation', degRotation);
    return degRotation;
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
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
                backgroundColor: 'rgba(0,0,0,0.3)',
                zIndex: 9999,
              }}>
              <View style={styles.Alert_Main_View}>
                <Text style={styles.Alert_Title}>Add Photo!</Text>
                <TouchableOpacity
                  // style={styles.buttonStyle}
                  onPress={() => this.takePhoto(!this.state.Alert_Visibility)}
                  // activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> Take Photo </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.getPhotosFromGallery()}

                  // activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> Choose from Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // style={styles.buttonStyle}
                  // activeOpacity={0.7}
                  onPress={() => {
                    this.cancelPressed(!this.state.Alert_Visibility);
                    // this.Show_Custom_Alert(!this.state.Alert_Visibility);
                  }}>
                  <Text style={styles.TextStyle}> Cancel </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.text}>
              Almost done. Tap to add photos of various parts of your bike.
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              marginBottom: 5,
              flexDirection: 'row',
              // backgroundColor: "yellow",
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <View
              style={{
                flex: 1,
                marginLeft: 0.5,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                // title="first image"
                ref={button => {
                  this.myButton1 = button;
                }}
                style={{padding: 5}}
                onPress={val => {
                  this.Show_Custom_Alert(true);
                  this.setState(
                    // { firstimageselected: !this.state.firstimageselected },
                    {
                      firstimageselected: true,
                      camStatus1: !this.state.camStatus1,
                    },
                    () => {
                      console.log('1st button');
                      // this.props.firstimage(this.state.firstimageselected);
                      this.props.firstimage(
                        this.state.firstimageselected,
                        this.state.camStatus1,
                      );
                    },
                  );
                  // this.setState({ firstimageselected: false });
                }}>
                {this.props.front_side_image === '' &&
                this.state.imageSource1 === '' ? (
                  <Image
                    style={{
                      height: 150,
                      width: 130,
                      aspectRatio: 1,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={require('../../../../images/bike2.png')}
                  />
                ) : this.state.imageSource1 != '' ? (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    // source={{ uri: this.state.imageSource1 }}
                    source={this.state.imageSource1}
                  />
                ) : (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                      transform: [
                        {
                          rotate: this.rotateImage(
                            this.props.front_side_image.orientation,
                          ),
                        },
                      ],
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={{uri: this.props.front_side_image.uri}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 0.5,
                marginRight: 0.5,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                // title="second image"
                ref={button => {
                  this.myButton2 = button;
                }}
                style={{padding: 5}}
                onPress={val => {
                  // console.log("first close?", this.state.firstimageselected);
                  this.setState({firstimageselected: false}, () =>
                    console.log('first close?', this.state.firstimageselected),
                  );
                  this.Show_Custom_Alert(true);
                  this.setState(
                    // { secondimageselected: !this.state.secondimageselected },
                    {
                      secondimageselected: true,
                      camStatus2: !this.state.camStatus2,
                    },
                    () => {
                      console.log(
                        'second button',
                        this.state.secondimageselected,
                      );
                      this.props.secondimage(
                        this.state.secondimageselected,
                        this.state.camStatus2,
                      );
                    },
                  );
                  // this.setState({ secondimageselected: false });
                }}>
                {/* <Button
              title="image 2"
              style={{ padding: 5 }}
              onPress={() => this.Show_Custom_Alert(true)}
            > */}
                {this.props.back_side_image === '' &&
                this.state.imageSource2 === '' ? (
                  <Image
                    style={{
                      height: 150,
                      width: 130,
                      aspectRatio: 1,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={require('../../../../images/bike2.png')}
                  />
                ) : this.state.imageSource2 != '' ? (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    // source={{ uri: this.state.imageSource2 }}
                    source={this.state.imageSource2}
                  />
                ) : (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                      marginRight: 2,
                      transform: [
                        {
                          rotate: this.rotateImage(
                            this.props.back_side_image.orientation,
                          ),
                        },
                      ],
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={{uri: this.props.back_side_image.uri}}
                  />
                )}
                {/* </Button> */}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              marginBottom: 5,
              flexDirection: 'row',
              // backgroundColor: "yellow",
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <View
              style={{
                flex: 1,
                marginLeft: 0.5,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                // title="third image"
                // ref={button => {
                //   this.myButton3 = button;
                // }}
                style={{padding: 5}}
                onPress={() => {
                  console.log('second close?', this.state.secondimageselected);
                  this.setState({secondimageselected: false}, () =>
                    console.log(
                      'second close?',
                      this.state.secondimageselected,
                    ),
                  );
                  this.Show_Custom_Alert(true);

                  this.setState(
                    // { thirdimageselected: !this.state.thirdimageselected },
                    {
                      thirdimageselected: true,
                      camStatus3: !this.state.camStatus3,
                    },
                    () => {
                      console.log('3rd button');
                      this.props.thirdimage(
                        this.state.thirdimageselected,
                        this.state.camStatus3,
                      );
                    },
                  );
                  // this.setState({ thirdimageselected: false });
                }}>
                {this.props.right_side_image === '' &&
                this.state.imageSource3 === '' ? (
                  <Image
                    style={{
                      height: 150,
                      width: 130,
                      aspectRatio: 1,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={require('../../../../images/bike2.png')}
                  />
                ) : this.state.imageSource3 != '' ? (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    // source={{ uri: this.state.imageSource3 }}
                    source={this.state.imageSource3}
                  />
                ) : (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                      transform: [
                        {
                          rotate: this.rotateImage(
                            this.props.right_side_image.orientation,
                          ),
                        },
                      ],
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={{uri: this.props.right_side_image.uri}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 0.5,
                marginRight: 0.5,
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                // title="fourth image"
                // ref={button => {
                //   this.myButton4 = button;
                // }}
                style={{padding: 5}}
                onPress={() => {
                  console.log('third close?', this.state.thirdimageselected);
                  this.setState({thirdimageselected: false}, () =>
                    console.log('second close?', this.state.thirdimageselected),
                  );

                  this.Show_Custom_Alert(true);
                  this.setState(
                    // { fourthimageselected: !this.state.fourthimageselected },
                    {
                      fourthimageselected: true,
                      camStatus4: !this.state.camStatus4,
                    },
                    () => {
                      console.log('fourth button');
                      this.props.fourthimage(
                        this.state.fourthimageselected,
                        this.state.camStatus4,
                      );
                    },
                  );
                  // this.setState({ fourthimageselected: false });
                }}>
                {this.props.left_side_image === '' &&
                this.state.imageSource4 === '' ? (
                  <Image
                    style={{
                      height: 150,
                      width: 130,
                      aspectRatio: 1,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={require('../../../../images/bike2.png')}
                  />
                ) : this.state.imageSource4 != '' ? (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    // source={{ uri: this.state.imageSource4 }}
                    source={this.state.imageSource4}
                  />
                ) : (
                  <Image
                    style={{
                      height: 160,
                      width: 140,
                      aspectRatio: 1,
                      alignItems: 'center',
                      padding: 2,
                      marginRight: 2,
                      transform: [
                        {
                          rotate: this.rotateImage(
                            this.props.left_side_image.orientation,
                          ),
                        },
                      ],
                    }}
                    // style={styles.img}
                    resizeMode={'contain'}
                    source={{uri: this.props.left_side_image.uri}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    padding: 10,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  // navbar: {
  //   flex: 0.1,
  //   backgroundColor: "#002248",
  //   flexDirection: "row",
  //   padding: 10
  // },
  // touchText: {
  //   color: "white",
  //   fontSize: 15
  // },
  // body: {
  //   flex: 0.9,
  //   padding: 10,
  //   marginBottom: 5,
  //   justifyContent: "space-between"
  // },
  text: {
    color: Theme.colors.navyBlue,
    // fontFamily: 'Qanelas-SemiBold',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  Alert_Main_View: {
    padding: 10,
    backgroundColor: 'white',
    // height: 200,
    width: '85%',
    height: 'auto',
    // width: 'auto',
    borderWidth: 1,
    borderColor: '#fff',
  },

  Alert_Title: {
    fontSize: 0.05 * screenWidth,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#0E113D',
    marginTop: 10,
    marginBottom: 5,
  },

  TextStyle: {
    color: '#0E113D',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    fontSize: 0.05 * screenWidth,
  },
});

const mapStateToProps = state => {
  console.log('saved image', state.image.image4);
  return {
    // front_side_image: state.login.image1,
    // back_side_image: state.login.image2,
    // right_side_image: state.login.image3,
    // left_side_image: state.login.image4,
    front_side_image: state.image.image1,
    back_side_image: state.image.image2,
    right_side_image: state.image.image3,
    left_side_image: state.image.image4,
    loading: state.login.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    firstimage,
    secondimage,
    thirdimage,
    fourthimage,
    deviceImg1,
    deviceImg2,
    deviceImg3,
    deviceImg4,
  },
)(Add2);

// export default Add2;

//orientation for ios
// if (metadataOrientation == 6) {
//   rotatedCGImage = [self newCGImageRotatedByAngle:cgImage angle:270];
//   rotated = true;
// } else if (metadataOrientation == 3) {
//   rotatedCGImage = [self newCGImageRotatedByAngle:cgImage angle:180];
//   rotated = true;}
