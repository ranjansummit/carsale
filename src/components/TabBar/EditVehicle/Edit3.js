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
  deviceImgEdit1,
  deviceImgEdit2,
  deviceImgEdit3,
  deviceImgEdit4,
} from '../../../actions/ImageAction';
import Theme from '../../common/Utility/Colors';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class Edit3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Alert_Visibility: false,

      firstimageselected: false,
      camStatus1: 0,
      secondimageselected: false,
      camStatus2: 0,

      thirdimageselected: false,
      camStatus3: 0,

      fourthimageselected: false,
      camStatus4: 0,

      //default image before choosing from gallery or device
      firstView: props.uniqueList.front_side_image,
      secondView: props.uniqueList.back_side_image,
      thirdView: props.uniqueList.right_side_image,
      fourthView: props.uniqueList.left_side_image,

      // for 1st image
      imageSource1: '',
      name1: '',

      //for 2nd image
      imageSource2: '',
      name2: '',

      //for 3rd image
      imageSource3: '',
      name3: '',

      //for fourth image
      imageSource4: '',
      name4: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props in third edit', nextProps);
    if (nextProps.uniqueList !== this.props.uniqueList) {
      this.setState({
        firstView: nextProps.uniqueList.front_side_image,
        secondView: nextProps.uniqueList.back_side_image,
        thirdView: nextProps.uniqueList.right_side_image,
        fourthView: nextProps.uniqueList.left_side_image,
      });
    }
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
    Actions.edit2();
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
    } else if (this.state.secondimageselected) {
      console.log('second selected');
      Actions.openCam2();
    } else if (this.state.thirdimageselected) {
      console.log('third selected');
      Actions.openCam3();
    } else if (this.state.fourthimageselected) {
      console.log('fourth selected');
      Actions.openCam4();
    } else {
      null;
    }
  };
  performTimeConsumingTask = async ms => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, ms),
    );
  };
  async getPhotosFromGallery() {
    this.setState({Alert_Visibility: false});
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
    const data = await this.performTimeConsumingTask(2000);
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
                name1: response.fileName,
                firstimageselected: false,
              },
              () => {
                this.props.deviceImgEdit1(this.state.imageSource1);
                console.log('saved device image', this.state.imageSource1);
              },
            );
          } else if (this.state.secondimageselected) {
            this.setState(
              {imageSource2: source, secondimageselected: false},
              () => this.props.deviceImgEdit2(this.state.imageSource2),
            );
          } else if (this.state.thirdimageselected) {
            this.setState(
              {imageSource3: source, thirdimageselected: false},
              () => this.props.deviceImgEdit3(this.state.imageSource3),
            );
          } else if (this.state.fourthimageselected) {
            this.setState(
              {imageSource4: source, fourthimageselected: false},
              () => this.props.deviceImgEdit4(this.state.imageSource4),
            );
          }

          // console.log("image1", this.state.imageSource1);

          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };

          // this.setState({

          //   ImageSource: source
          // });
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
        <View style={{flex: 0.2, justifyContent: 'center'}}>
          <Text style={styles.text}>
            Almost done. Tap to add photos of various parts of your bike.
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.imageBox1}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.item}
              onPress={val => {
                this.Show_Custom_Alert(true);
                this.setState(
                  {
                    firstimageselected: true,
                    // camStatus1: !this.state.camStatus1
                    camStatus1: this.state.camStatus1 + 1,
                  },
                  () => {
                    console.log('1st button');
                    this.props.firstimage(
                      this.state.firstimageselected,
                      this.state.camStatus1,
                    );
                  },
                );
              }}>
              {this.props.front_side_image == '' &&
              this.state.imageSource1 == '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  resizeMode="contain"
                  source={{
                    // uri: item.front_side_image
                    uri: this.state.firstView,
                  }}
                />
              ) : this.state.imageSource1 != '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  // style={styles.img}
                  resizeMode={'contain'}
                  // source={{ uri: this.state.imageSource1 }}
                  source={this.state.imageSource1}
                />
              ) : (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
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
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.item}
              onPress={val => {
                console.log('first close?', this.state.firstimageselected);
                this.setState({firstimageselected: false}, () =>
                  console.log('first close?', this.state.firstimageselected),
                );
                this.Show_Custom_Alert(true);
                this.setState(
                  {
                    secondimageselected: true,
                    camStatus2: this.state.camStatus2 + 1,
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
              {this.props.back_side_image == '' &&
              this.state.imageSource2 == '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: this.state.secondView,
                  }}
                />
              ) : this.state.imageSource2 != '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  // style={styles.img}
                  resizeMode={'contain'}
                  // source={{ uri: this.state.imageSource1 }}
                  source={this.state.imageSource2}
                />
              ) : (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
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
            </TouchableOpacity>
          </View>
          <View style={styles.imageBox1}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.item}
              onPress={() => {
                console.log('second close?', this.state.secondimageselected);
                this.setState({secondimageselected: false}, () =>
                  console.log('second close?', this.state.secondimageselected),
                );
                this.Show_Custom_Alert(true);

                this.setState(
                  {
                    thirdimageselected: true,
                    camStatus3: this.state.camStatus3 + 1,
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
              {this.props.right_side_image == '' &&
              this.state.imageSource3 == '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: this.state.thirdView,
                  }}
                />
              ) : this.state.imageSource3 != '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  // style={styles.img}
                  resizeMode={'contain'}
                  // source={{ uri: this.state.imageSource1 }}
                  source={this.state.imageSource3}
                />
              ) : (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
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
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.item}
              onPress={() => {
                console.log('third close?', this.state.thirdimageselected);
                this.setState({thirdimageselected: false}, () =>
                  console.log('second close?', this.state.thirdimageselected),
                );

                this.Show_Custom_Alert(true);
                this.setState(
                  {
                    fourthimageselected: true,
                    camStatus4: this.state.camStatus4 + 1,
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
              {this.props.left_side_image == '' &&
              this.state.imageSource4 == '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  resizeMode="contain"
                  source={{
                    uri: this.state.fourthView,
                  }}
                />
              ) : this.state.imageSource4 != '' ? (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
                  }}
                  // style={styles.img}
                  resizeMode={'contain'}
                  // source={{ uri: this.state.imageSource1 }}
                  source={this.state.imageSource4}
                />
              ) : (
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    aspectRatio: 1.1,
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 20,
    // backgroundColor: "white"
  },
  imageContainer: {
    flex: 0.8,
    justifyContent: 'center',
  },
  imageBox1: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    margin: 2,
  },
  text: {
    color: Theme.colors.navyBlue,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    // fontFamily: 'Qanelas-SemiBold',
  },
  Alert_Main_View: {
    padding: 10,
    backgroundColor: 'white',
    width: '85%',
    height: 'auto',
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
  console.log('saved image', state.image.image1);
  return {
    front_side_image: state.image.image1,
    back_side_image: state.image.image2,
    right_side_image: state.image.image3,
    left_side_image: state.image.image4,
    uniqueList: state.login.sellDetails,
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
    deviceImgEdit1,
    deviceImgEdit2,
    deviceImgEdit3,
    deviceImgEdit4,
  },
)(Edit3);

// export default Add2;
