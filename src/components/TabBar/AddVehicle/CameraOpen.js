import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import Camera from "react-native-camera";
import { RNCamera } from "react-native-camera";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import {
  saveImage1,
  saveImage2,
  saveImage3,
  saveImage4
} from "../../../actions/LoginAction";
import { connect } from "react-redux";
import Add2 from "./Add2";
const { FlashMode: CameraFlashModes, Type: CameraTypes } = RNCamera.Constants;

class OpenCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUri1: "",
      imageUri2: "",
      imageUri3: "",
      imageUri4: "",
      // start the back camera by default
      clicked: false,

      // firstimageselected: props.first,
      // secondimageselected: props.second,
      // thirdimageselected: props.third,
      // fourthimageselected: props.fourth
      firstimageselected: false,
      secondimageselected: false,
      thirdimageselected: false,
      fourthimageselected: false
    };

    this.setCameraType = this.setCameraType.bind(this);
    // this.onUpdate = this.onUpdate.bind(this);
    // this.Show_Custom_Alert= this.Show_Custom_Alert.bind(this);
  }
  componentDidMount() {
    console.log("check at first  camopen", this.state.secondimageselected);
  }
  setCameraType = afterClick => {
    this.setState({ clicked: !afterClick }, () =>
      console.log("after click", this.state.clicked)
    );
  };
  // takePicture() {
  //   this.camera
  //     .capture()
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err));
  // }
  takePicture = async function() {
    // console.log(this.camera);
    if (this.camera) {
      try {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);

        console.log("image file", data.uri);

        if (this.state.firstimageselected == true) {
          this.setState({ imageUri1: data.uri }, () => {
            this.props.saveImage1(this.state.imageUri1);
          });
        } else if (this.state.secondimageselected == true) {
          console.log("error");
          this.setState({ imageUri2: data.uri }, () => {
            this.props.saveImage2(this.state.imageUri2);
          });
        } else if (this.state.thirdimageselected == true) {
          this.setState({ imageUri3: data.uri }, () => {
            this.props.saveImage3(this.state.imageUri3);
          });
        } else if (this.state.fourthimageselected == true) {
          this.setState({ imageUri4: data.uri }, () => {
            this.props.saveImage4(this.state.imageUri4);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  goBack() {
    console.log("firstimageselected", this.state.secondimageselected);
    return Actions.add2();
  }

  render() {
    // const { clicked, imageUri1, imageUri2, imageUri3, imageUri4 } = this.state;
    return (
      <View style={styles.container}>
        {this.state.imageUri1 == "" &&
        this.state.imageUri2 == "" &&
        this.state.imageUri3 == "" &&
        this.state.imageUri4 == "" ? (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={this.state.clicked ? CameraTypes.front : CameraTypes.back}
            // flashMode={CameraFlashModes.FlashMode.on}
            // flashMode={flashMode}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel"
            }}
          />
        ) : this.state.imageUri1 != "" ? (
          <View>
            <Image
              style={styles.preview}
              source={{ uri: this.state.imageUri1 }}
              // height={250}
              // width={200}
            />
            {this.setState({
              firstimageselected: false,
              imageUri1: ""
            })}
            {this.goBack()}
          </View>
        ) : this.state.imageUri2 != "" ? (
          <View>
            <Image
              style={styles.preview}
              source={{ uri: this.state.imageUri2 }}
              // height={250}
              // width={200}
            />
            {this.setState({
              secondimageselected: false,
              imageUri2: ""
            })}
            {this.goBack()}
          </View>
        ) : this.state.imageUri3 != "" ? (
          <View>
            <Image
              style={styles.preview}
              source={{ uri: this.state.imageUri3 }}
              // height={250}
              // width={200}
            />
            {this.setState({
              thirdimageselected: false,
              imageUri3: ""
            })}
            {this.goBack()}
          </View>
        ) : (
          <View>
            <Image
              style={styles.preview}
              source={{ uri: this.state.imageUri4 }}
              // height={250}
              // width={200}
            />
            {this.setState({
              fourthimageselected: false,
              imageUri4: ""
            })}
            {this.goBack()}
          </View>
        )}

        <View
          style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}
        >
          <TouchableOpacity
            onPress={() => this.setCameraType(this.state.clicked)}
            style={styles.capture}
          >
            <Icon
              name={"md-reverse-camera"}
              // color={"white"}
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <Icon name={"md-camera"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      // <View style={styles.container}>
      //   <Camera
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
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

const mapStateToProps = state => {
  console.log("first button selected", state.login.firstImage);
  return {
    loading: state.login.loading,
    first: state.login.firstImage,
    second: state.login.secondImage,
    third: state.login.thirdImage,
    fourth: state.login.fourthImage
  };
};

export default connect(
  mapStateToProps,
  { saveImage1, saveImage2, saveImage3, saveImage4 }
)(OpenCamera);
// export default OpenCamera;
