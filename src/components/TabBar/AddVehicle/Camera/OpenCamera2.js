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
  BackHandler,
} from 'react-native';
import Camera from 'react-native-camera';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import {resetButtons} from '../../../../actions/LoginAction';

import {
  saveImage1,
  saveImage2,
  saveImage3,
  saveImage4,
} from '../../../../actions/ImageAction';
import {connect} from 'react-redux';
import Theme from '../../../common/Utility/Colors';

const {FlashMode: CameraFlashModes, Type: CameraTypes} = RNCamera.Constants;

let screenHeight = Dimensions.get('window').height;
let screenWidth = Dimensions.get('window').width;

class OpenCamera2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData2: '', // start the back camera by default
      clicked: false,
      appState: AppState.currentState,
      cameraStatus: false,

      // secondimageselected: props.second
    };

    this.setCameraType = this.setCameraType.bind(this);
  }
  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     this.handleBackButtonClick
  //   );
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     "hardwareBackPress",
  //     this.handleBackButtonClick
  //   );
  // }

  // handleBackButtonClick() {
  //   // if (this.props.editval === true) {
  //   //   Actions.edit3();
  //   // } else {
  //   //   Actions.add2();
  //   // }
  //   Actions.add2();
  //   // return true;
  // }
  componentWillReceiveProps(nextProps) {
    console.log('will receive props');

    // if (nextProps.status1 !== this.props.status1) {
    //   console.log("will receive props next");
    //   this.setState({ cameraStatus: true });
    // }
    if (nextProps.status2 !== this.props.status2) {
      console.log('will receive props next');
      this.setState({cameraStatus: true});
    }

    this.props.resetButtons();
  }

  componentDidMount() {
    this.setState({cameraStatus: true}, () =>
      console.log('camera status', this.state.cameraStatus),
    );
  }
  componentWillUnmount() {
    // this.pausePreview();
  }
  setCameraType = afterClick => {
    this.setState({clicked: !afterClick}, () =>
      console.log('after click', this.state.clicked),
    );
  };

  takePicture = async function() {
    // console.log(this.camera);
    if (this.camera) {
      try {
        const options = {
          quality: 0.5,
          base64: true,
          // forceUpOrientation: true
          exif: true,
        };
        const data = await this.camera.takePictureAsync(options);
        // console.log("camera image 2", data);
        console.log('image file', data.uri);
        let source = {
          uri: data.uri,
          base64: data.base64,
          height: data.height,
          width: data.width,
          orientation: data.exif.Orientation,
        };
        let uri = data.uri;

        // if (this.state.secondimageselected == true) {
        this.setState(
          {
            imageData2: source,
            // cameraStatus: !this.state.cameraStatus
          },
          () => {
            this.props.saveImage2(this.state.imageData2);
          },
        );

        // }
      } catch (e) {
        console.log(e);
      }
    }
  };

  goBack() {
    console.log('firstimageselected', this.state.secondimageselected);
    this.setState(
      {
        imageData2: '',
        cameraStatus: false,
      },
      () => console.log('camera status on 2nd imd', this.state.cameraStatus),
    );
    if (this.props.editval === true) {
      // Actions.pop();
      return Actions.edit3();
    } else {
      // Actions.pop();
      return Actions.add2();
    }
  }

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
        {/* <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Theme.colors.navyBlue,
              textAlign: "center"
            }}
          >
            Place your bike or part of it in the frame below and click the
            camera
          </Text>
        </View> */}
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
            <Text style={{color: 'white', fontSize: 16}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {this.state.cameraStatus ? (
          this.state.imageData2 === '' ? (
            <View
              style={{
                flex: 1,
              }}>
              {/* MainCamera */}
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={this.state.clicked ? CameraTypes.front : CameraTypes.back}
                flashMode={CameraFlashModes.off}
                // aspect={Camera.Constants.Aspect.fit}
                orientation={RNCamera.Constants.Orientation.portrait}
                // flashMode={CameraFlashModes.FlashMode.on}
                // flashMode={flashMode}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 500,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    marginTop: 20,
                    color: Theme.colors.navyBlue,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  Place your bike or part of it in the frame below and click the
                  camera
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <Image
                style={styles.preview}
                source={{uri: this.state.imageData2.uri}}
                // height={250}
                // width={200}
              />
              {/* {this.setState({
        // secondimageselected: false,
        imageUri2: ""
      })} */}
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
    // height: screenHeight - 400,
    // width: screenWidth,
    // // flex: 0.6,
    // justifyContent: "center",
    // alignItems: "center",
    // marginBottom: 20,
    // marginTop: 20
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
  console.log('second button selected', state.login.secondImage);
  console.log('cam status 2', state.login.camStatus2);
  return {
    loading: state.login.loading,
    second: state.login.secondImage,
    addval: state.vehicle.addVal,
    editval: state.vehicle.editVal,
    status1: state.login.camStatus1,
    status2: state.login.camStatus2,
    status3: state.login.camStatus3,
    status4: state.login.camStatus4,
  };
};

export default connect(
  mapStateToProps,
  {saveImage1, saveImage2, saveImage3, saveImage4, resetButtons},
)(OpenCamera2);
