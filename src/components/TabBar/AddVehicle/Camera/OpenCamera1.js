import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  AppState,
  View,
  Image,
  Platform,
  BackHandler,
} from 'react-native';
import Camera from 'react-native-camera';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
// import {
//   saveImage1,
//   saveImage2,
//   saveImage3,
//   saveImage4
// } from "../../../../actions/LoginAction";
import {firstimage, resetButtons} from '../../../../actions/LoginAction';
import {
  saveImage1,
  saveImage2,
  saveImage3,
  saveImage4,
} from '../../../../actions/ImageAction';
import {connect} from 'react-redux';
import Theme from '../../../common/Utility/Colors';

const {
  FlashMode: CameraFlashModes,
  Type: CameraTypes,
  Orientation: CameraOrientation,
} = RNCamera.Constants;
//  MainCamera.Constants;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const DESIRED_RATIO = '16:9';
class OpenCamera1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData1: '',
      // imageUri1: "",
      // start the back camera by default
      clicked: false,
      cameraStatus: false,
      ratio: undefined,
      remountCamera: false,
      orientation: '',
      // secondimageselected: props.second
    };
    this.setCameraType = this.setCameraType.bind(this);
  }

  // handleBackButtonClick() {
  //   // if (this.props.editval === true) {
  //   //   Actions.edit3();
  //   // } else {
  //   //   Actions.add2();
  //   // }
  //   // console.log("edit val", val);
  //   Actions.add2();
  //   // return true;
  // }

  componentWillReceiveProps(nextProps) {
    console.log('will receive props');

    if (nextProps.status1 !== this.props.status1) {
      console.log('will receive props next');
      this.setState({cameraStatus: true});
    }
    // if (nextProps.status2 !== this.props.status2) {
    //   console.log("will receive props next");
    //   this.setState({ cameraStatus: true });
    // }
    // if (nextProps.status3 !== this.props.status3) {
    //   console.log("will receive props next");
    //   this.setState({ cameraStatus: true });
    // }
    // if (nextProps.status4 !== this.props.status4) {
    //   console.log("will receive props next");
    //   this.setState({ cameraStatus: true });
    // }
    this.props.resetButtons();
  }
  componentDidMount() {
    this.setState({cameraStatus: true}, () =>
      console.log('camera status', this.state.cameraStatus),
    );
  }
  componentWillUnmount() {
    // this.pausePreview();
    // if (this.props.editval === true) {
    //   return Actions.edit3();
    // } else {
    //   return Actions.add2();
    // }
  }
  setCameraType = afterClick => {
    this.setState({clicked: !afterClick}, () =>
      console.log('after click', this.state.clicked),
    );
  };

  takePicture = async function() {
    if (this.camera) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          orientation: 'portrait',
          exif: true,
        };
        const data = await this.camera.takePictureAsync(options);
        console.log('image file', data);
        let source = {
          uri: data.uri,
          base64: data.base64,
          height: data.height,
          width: data.width,
          orientation: data.exif.Orientation,
        };
        let uri = data.uri;
        this.setState(
          {
            imageData1: source,
            // , imageUri1: uri
            // cameraStatus: false
          },
          () => {
            this.props.saveImage1(this.state.imageData1);
          },
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  goBack() {
    this.camera.pausePreview();
    this.setState(
      {
        imageData1: '',
        cameraStatus: false,
        // cameraStatus: !this.state.cameraStatus
        // , imageUri1: ""
      },
      () => console.log('camera status on back', this.state.cameraStatus),
    );

    if (this.props.editval === true) {
      // Actions.pop();
      return Actions.edit3();
    } else {
      // Actions.pop();
      return Actions.add2();
    }
  }
  // takePicture() {
  //   this.camera
  //     .capture()
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err));
  // }
  // componentDidUpdate() {
  //   if (this.state.remountCamera) {
  //     setTimeout(() => {
  //       this.setState({ remountCamera: false });
  //     }, 500);
  //   }
  // }

  // async getCameraRatio() {
  //   if (!this.state.ratio && this.camera) {
  //     const ratios = await this.camera.getSupportedRatiosAsync();
  //     this.setState({
  //       ratio: ratios[ratios.length - 1],
  //       remountCamera: true
  //     });
  //   }
  // }
  cancelPressed = () => {
    this.setState({cameraStatus: false});
    if (this.props.editval === true) {
      // Actions.pop();
      return Actions.edit3();
    } else {
      // Actions.pop();
      return Actions.add2();
    }
  };
  render() {
    // const { clicked, imageUri1, imageUri2, imageUri3, imageUri4 } = this.state;
    return (
      <View style={styles.container}>
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
            <Text style={{color: 'white', fontSize: 18}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {this.state.cameraStatus ? (
          this.state.imageData1 === '' ? (
            <View style={{flex: 1}}>
              {/* MainCamera */}
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                // type={Camera.Constats.Type.back}
                type={this.state.clicked ? CameraTypes.front : CameraTypes.back}
                orientation={RNCamera.Constants.Orientation.portrait}
                // flashMode={CameraFlashModes.FlashMode.on}
                // flashMode={flashMode}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                captureAudio={false}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}>
                <Text
                  style={{
                    margin: 10,
                    color: 'white',
                    fontSize: 15,
                    textAlign: 'center',
                    // fontFamily: "Qanelas-SemiBold"
                  }}>
                  Try to line up your bike with the watermark so your first
                  image stands out!
                </Text>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 20,
                    left: 5,
                    right: 5,
                    bottom: 20,
                  }}>
                  <Image
                    source={require('../../../../../images/bike2.png')}
                    style={{
                      height: 290,
                      width: 440,
                      aspectRatio: 1.2,
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (
            // <Camera
            //     ref={cam => {
            //       this.camera = cam;
            //     }}
            //     style={styles.preview}
            //     type={Camera.Constats.Type.back}
            //     aspect={Camera.constants.Aspect.fill}
            //   >
            //     <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
            //       [CAPTURE]
            //     </Text>
            //   </Camera>
            // this.state.imageUri1 != "" ?
            <View>
              <Image
                style={styles.preview}
                source={{uri: this.state.imageData1.uri}}
                // height={250}
                // width={200}
              />
              {this.goBack()}
            </View>
          )
        ) : null}

        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => this.setCameraType(this.state.clicked)}
            style={styles.capture}>
            <Icon
              name={'md-reverse-camera'}
              // color={"white"}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Icon name={'md-camera'} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

const mapStateToProps = state => {
  console.log('first button selected', state.login.firstImage);

  return {
    loading: state.login.loading,
    first: state.login.firstImage,
    second: state.login.secongImage,
    addval: state.vehicle.addVal,
    editval: state.vehicle.editVal,
    camImage: state.image.image1,
    status1: state.login.camStatus1,
    status2: state.login.camStatus2,
    status3: state.login.camStatus3,
    status4: state.login.camStatus4,
  };
};

export default connect(
  mapStateToProps,
  {saveImage1, saveImage2, saveImage3, saveImage4, firstimage, resetButtons},
)(OpenCamera1);
// export default OpenCamera;
