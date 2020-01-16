import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
  Alert,
  FlatList,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {Rating, Avatar, CheckBox} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Theme from '../../common/Utility/Colors';
import {
  editVehicles,
  editCamVehicles,
  resetEditMsg,
} from '../../../actions/VehicleAction';
import {
  resetData,
  sellList,
  resetDetailList,
} from '../../../actions/LoginAction';
import {setImagesNull} from '../../../actions/ImageAction';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import Spinner from '../../common/Utility/Spiner';
import Storage from '../../storage/Storage';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class EditPreview extends Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
  constructor(props) {
    super(props);
    this.state = {
      login: 'true',
      clicked: false,
      buttonText: ' Request the seller info',
      buttonClicked: false,
      index: '',
      imgWidth: 0,
      imgHeight: 0,

      // editable price
      price: '',
      checked: false,
      publish: '',
      Alert_Visibility: false,
      msg: 'Please wait...',
      editMessage: null,
      // lastImg: props.uniqueList.map(item => item.front_side_image).toString(),
      firstImg: props.uniqueList.front_side_image,
      secondImg: props.uniqueList.back_side_image,
      thirdImg: props.uniqueList.right_side_image,
      fourthImg: props.uniqueList.left_side_image,
      profile_image: '',
    };
    this.editmsgAlert = this.editmsgAlert.bind(this);
  }

  componentDidMount() {
    Promise.resolve(Storage.getImage()).then(function(value) {
      console.log('profile image', value);
      if (value) {
        this.setState({profile_image: value});
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log('next props in edit preview', nextProps);
    if (nextProps.uniqueList !== this.props.uniqueList) {
      this.setState({
        firstImg: nextProps.uniqueList.front_side_image,
        secondImg: nextProps.uniqueList.back_side_image,
        thirdImg: nextProps.uniqueList.right_side_image,
        fourthImg: nextProps.uniqueList.left_side_image,
      });
    }
    if (nextProps.editMsg !== this.props.editMsg) {
      this.setState({editMessage: nextProps.editMsg}, () =>
        console.log('edited message', this.state.editMessage),
      );
    }
  }
  // handleImages() {
  //   if (this.props.cam_4 === "") {
  //     this.setState({ lastImg: this.props.left_side_image });
  //   } else {
  //     this.setState({ lastImg: this.props.camUri4 }, () =>
  //       console.log("last cam image", this.state.lastImg)
  //     );
  //   }
  // }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  componentDidUpdate() {
    this.viewPager.setPage(0);
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
      this.props.resetDetailList(),
    );
  }

  handleBackButtonClick() {
    Actions.edit3();
    // Actions.pop();
    // return true;
  }

  publishPressed = checked => {
    var id = this.props.uniqueList.id;
    this.setState({publish: '1'}, () => {
      if (checked === true) {
        if (this.props.cam_1 === '') {
          console.log('device');
          this.props.editVehicles(
            this.props.brand_id,
            this.props.model_id,
            this.props.engine_id,
            this.props.mileage,
            this.props.lot,
            this.props.odometer,
            this.props.price,
            this.props.rating,
            this.state.publish,
            this.props.front_side_image,
            this.props.imageType1,
            this.props.imageName1,
            this.props.left_side_image,
            this.props.imageType2,
            this.props.imageName2,
            this.props.right_side_image,
            this.props.imageType3,
            this.props.imageName3,
            this.props.back_side_image,
            this.props.imageType4,
            this.props.imageName4,
            id,
          );
          // Actions.sell();
          this.setState({Alert_Visibility: true});
        } else {
          console.log('camera');
          this.props.editCamVehicles(
            this.props.brand_id,
            this.props.model_id,
            this.props.engine_id,
            this.props.mileage,
            this.props.lot,
            this.props.odometer,
            this.props.price,
            this.props.rating,
            this.state.publish,
            this.props.camUri1,
            this.props.camData1,
            this.props.camUri2,
            this.props.camData2,
            this.props.camUri3,
            this.props.camData3,
            this.props.camUri4,
            this.props.camData4,
            id,
          );
          // Actions.sell();
          this.setState({Alert_Visibility: true});
        }
      } else {
        Alert.alert('Please check the terms and conditions.');
      }
    });
  };
  draftPressed = checked => {
    // var id = this.props.uniqueList.map(item => item.id).toString();
    var id = this.props.uniqueList.id;
    console.log('id', id);
    this.setState({publish: '0'}, () => {
      if (checked === true) {
        if (this.props.cam_1 === '') {
          console.log('device', id);
          this.props.editVehicles(
            this.props.brand_id,
            this.props.model_id,
            this.props.engine_id,
            this.props.mileage,
            this.props.lot,
            this.props.odometer,
            this.props.price,
            this.props.rating,
            this.state.publish,
            this.props.front_side_image,
            this.props.imageType1,
            this.props.imageName1,
            this.props.left_side_image,
            this.props.imageType2,
            this.props.imageName2,
            this.props.right_side_image,
            this.props.imageType3,
            this.props.imageName3,
            this.props.back_side_image,
            this.props.imageType4,
            this.props.imageName4,
            id,
          );
          // Actions.sell();
          this.setState({Alert_Visibility: true});
        } else {
          console.log('camera', id);
          this.props.editCamVehicles(
            this.props.brand_id,
            this.props.model_id,
            this.props.engine_id,
            this.props.mileage,
            this.props.lot,
            this.props.odometer,
            this.props.price,
            this.props.rating,
            this.state.publish,
            this.props.camUri1,
            this.props.camData1,
            this.props.camUri2,
            this.props.camData2,
            this.props.camUri3,
            this.props.camData3,
            this.props.camUri4,
            this.props.camData4,
            id,
          );
          this.setState({Alert_Visibility: true});
          // Actions.sell();
        }
      } else {
        Alert.alert('Please check the terms and conditions.');
      }
    });
  };
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        selectedDotStyle={{backgroundColor: Theme.colors.navyBlue}}
      />
    );
  }

  Show_Custom_Alert = visible => {
    this.setState({Alert_Visibility: visible});

    this.props.setImagesNull();
    Actions.sell();
  };

  // componentWillReceiveProps(nextProps) {
  //   console.log("next props", nextProps);
  //   // if (nextProps.cam_1 !== cam_1) {
  //   //   this.setState({ lastImg: nextProps.cam_1.uri });
  //   // }
  // }
  editmsgAlert = () => {
    console.log('edit success');
    Alert.alert(
      'Success!',
      'Successfully edited.',
      [
        {
          text: 'OK',
          onPress: () => {
            Actions.sell();
          },
        },
      ],
      {cancelable: false},
    );
    this.props.resetEditMsg();
  };
  rotateImage(orientation) {
    // let exifOrientation = this.props.cam_1.orientation;
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
    // Image.getSize(
    //   this.props.uniqueList.map(item => item.front_side_image),
    //   (width, height) => {
    //     // calculate image width and height
    //     const scaleFactor = width / screenWidth;
    //     const imageHeight = height / scaleFactor;
    //     this.setState({ imgWidth: screenWidth - 20, imgHeight: imageHeight });
    //   }
    // );

    let position = Animated.divide(this.scrollX, screenWidth);

    let devicephotos = [
      {uri: this.props.front_side_image},
      {uri: this.props.back_side_image},
      {uri: this.props.right_side_image},
      {uri: this.props.left_side_image},
    ];

    let camphotos = [
      {uri: this.props.camUri1},
      {uri: this.props.camUri2},
      {uri: this.props.camUri3},
      {uri: this.props.camUri4},
    ];

    return (
      <View style={{flex: 1}}>
        {console.log('edit vehicle', this.props.editResponse)}
        {this.props.loading ? <Spinner /> : null}
        {this.props.editResponse1 === false ? (
          <View>{this.editmsgAlert()}</View>
        ) : null}
        {this.props.editResponse2 === false ? (
          <View>{this.editmsgAlert()}</View>
        ) : null}
        {/* {this.state.editMessage === false?  <View>{this.editmsgAlert}</View> : null} */}
        <ScrollView style={{flex: 1}}>
          {/* <Modal
          style={{
            borderWidth: 1,
            borderColor: "#002248"
          }}
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={styles.Alert_Main_View}>
              {this.props.loading === true && this.props.saveMsg === "" ? (
                <View style={{ justifyContent: "center", margin: 5 }}>
                  <Text style={styles.Alert_Title}>Please wait..</Text>
                </View>
              ) : (
                <View style={{ justifyContent: "center", margin: 5 }}>
                  <Text style={styles.Alert_Title}>Edited successfully</Text>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  margin: 5
                }}
              >
                <TouchableOpacity
                  // style={styles.buttonStyle}
                  // activeOpacity={0.7}
                  onPress={() => {
                    this.Show_Custom_Alert(!this.state.Alert_Visibility);
                  }}
                >
                  <Text style={styles.TextStyle}> Ok </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal> */}
          <View>
            <View
              style={{
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 5,
              }}>
              <View
                style={{
                  paddingTop: 5,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                }}
              />
              {/* <ScrollView
              horizontal={true}
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { x: this.scrollX } } }
              ])}
              scrollEventThrottle={16}
            >
              
              
              {devicephotos.map((source, i) => {
                return (
                  <ImageBackground
                    key={i}
                    style={{
                      // height: this.state.imgHeight,
                      // width: this.state.imgWidth,
                      height: screenHeight / 2.5,
                      width: screenWidth - 10,
                      aspectRatio: 1.2
                    }}
                    source={source}
                    resizeMode="contain"
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        left: 120,
                        right: 120,
                        position: "absolute",
                        bottom: 15
                      }}
                    >
                      {devicephotos.map((_, i) => {
                        let opacity = position.interpolate({
                          inputRange: [i - 1, i, i + 1],
                          outputRange: [0.3, 1, 0.3],
                          extrapolate: "clamp"
                        });
                        return (
                          <Animated.View
                            key={i}
                            style={{
                              opacity,
                              height: 10,
                              width: 10,
                              backgroundColor: "#002248",
                              margin: 8,
                              borderRadius: 5
                            }}
                          />
                        );
                      })}
                    </View>
                  </ImageBackground>
                );
              })}
            </ScrollView> */}
              <IndicatorViewPager
                ref={viewPager => {
                  this.viewPager = viewPager;
                }}
                style={{height: screenHeight / 2.5}}
                indicator={this._renderDotIndicator()}
                initialPage={0}>
                <View key={i} backgroundColor={Theme.colors.navyBlue}>
                  {this.props.imageDetails1 === '' &&
                  this.props.cam_1 === '' ? (
                    <ImageBackground
                      source={{
                        // uri: this.props.uniqueList
                        //   .map(item => item.front_side_image)
                        //   .toString()
                        // uri: this.props.uniqueList.front_side_image
                        uri: this.state.firstImg,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  ) : this.props.imageDetails1 === '' ? (
                    <ImageBackground
                      source={{
                        uri: this.props.camUri1,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                        transform: [
                          {
                            rotate: this.rotateImage(
                              this.props.cam_1.orientation,
                            ),
                          },
                        ],
                      }}
                    />
                  ) : (
                    <ImageBackground
                      source={{
                        uri: this.props.front_side_image,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  )}
                </View>
                <View key={i} backgroundColor={Theme.colors.navyBlue}>
                  {this.props.imageDetails2 === '' &&
                  this.props.cam_2 === '' ? (
                    <ImageBackground
                      source={{
                        // uri: this.props.uniqueList
                        //   .map(item => item.back_side_image)
                        //   .toString()
                        // uri: this.props.uniqueList.back_side_image
                        uri: this.state.secondImg,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  ) : this.props.imageDetails2 === '' ? (
                    <ImageBackground
                      source={{
                        uri: this.props.camUri2,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                        transform: [
                          {
                            rotate: this.rotateImage(
                              this.props.cam_2.orientation,
                            ),
                          },
                        ],
                      }}
                    />
                  ) : (
                    <ImageBackground
                      source={{
                        uri: this.props.back_side_image,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  )}
                </View>
                <View key={i} backgroundColor={Theme.colors.navyBlue}>
                  {this.props.imageDetails3 === '' &&
                  this.props.cam_3 === '' ? (
                    <ImageBackground
                      source={{
                        // uri: this.props.uniqueList
                        //   .map(item => item.right_side_image)
                        //   .toString()
                        // uri: this.props.uniqueList.right_side_image
                        uri: this.state.thirdImg,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  ) : this.props.imageDetails3 === '' ? (
                    <ImageBackground
                      source={{
                        uri: this.props.camUri3,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                        transform: [
                          {
                            rotate: this.rotateImage(
                              this.props.cam_3.orientation,
                            ),
                          },
                        ],
                      }}
                    />
                  ) : (
                    <ImageBackground
                      source={{
                        uri: this.props.right_side_image,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  )}
                </View>
                <View key={i} backgroundColor={Theme.colors.navyBlue}>
                  {this.props.imageDetails4 === '' &&
                  this.props.cam_4 === '' ? (
                    <ImageBackground
                      source={{
                        // uri: this.props.uniqueList
                        //   .map(item => item.left_side_image)
                        //   .toString()
                        // uri: this.props.uniqueList.left_side_image
                        uri: this.state.fourthImg,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  ) : this.props.imageDetails4 === '' ? (
                    <ImageBackground
                      source={{
                        uri: this.props.camUri4,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                        transform: [
                          {
                            rotate: this.rotateImage(
                              this.props.cam_4.orientation,
                            ),
                          },
                        ],
                      }}
                    />
                  ) : (
                    <ImageBackground
                      source={{
                        uri: this.props.left_side_image,
                      }}
                      style={{
                        height: screenHeight / 2.5,
                        width: screenWidth,
                      }}
                    />
                  )}

                  {/* <ImageBackground
                  source={{
                    uri: this.state.lastImg
                  }}
                  style={{
                    height: screenHeight / 2.5,
                    width: screenWidth
                  }}
                /> */}
                </View>
              </IndicatorViewPager>
            </View>
            <View>
              <View style={styles.middle}>
                <View style={styles.left}>
                  <Text
                    style={{
                      color: '#002248',
                      fontWeight: 'bold',
                      padding: 5,
                      fontSize: 15,
                    }}>
                    {this.props.brand_name}
                  </Text>
                </View>
                <View style={styles.mid}>
                  <Text
                    style={{
                      color: '#002248',
                      padding: 5,
                      fontSize: 15,
                    }}>
                    {this.props.engine_capacity}cc
                  </Text>
                </View>
                <View style={styles.right}>
                  <Text style={{color: '#002248', padding: 5, fontSize: 15}}>
                    Condition
                  </Text>

                  {/* <Rating
                  style={{ padding: 10 }}
                  borderColor={"#002248"}
                  type="custom"
                  ratingCount={5}
                  imageSize={12}
                  startingValue={this.props.rating}
                  readonly={true}
                /> */}
                  <StarRating
                    containerStyle={{margin: 10}}
                    disabled={true}
                    emptyStar={require('../../../../images/star_lg_gray.png')}
                    fullStar={require('../../../../images/star_lg_blue.png')}
                    maxStars={5}
                    starSize={12}
                    rating={this.props.rating}
                  />
                </View>
              </View>
              <View style={styles.midLower}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.text}> Vehicle Lot</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: "flex-end"
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.text}>{this.props.lot}</Text>
                  </View>
                </View>
                <View style={styles.lineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.text}> Odometer</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: "flex-end"
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.text}>{this.props.odometer} KM</Text>
                  </View>
                </View>
                <View style={styles.lineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.text}> Mileage</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: "flex-end"
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.text}>{this.props.mileage} KM/L</Text>
                  </View>
                </View>
                <View style={styles.lineStyle} />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5,
                    marginRight: 5,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                    }}>
                    <Text style={styles.text}> Price</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      // justifyContent: "flex-end"
                      alignItems: 'flex-end',
                    }}>
                    <Text style={styles.text}>
                      Rs. {this.formatNumber(this.props.price)}
                    </Text>
                  </View>
                </View>
                {/* {item.seller_image == "" ? ( */}
                <View style={{alignItems: 'center', margin: 5}}>
                  <Avatar
                    size="large"
                    rounded
                    // source={require('../../../../images/blank.jpg')}
                    source={{uri: this.state.profile_image}}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <CheckBox
                    containerStyle={{
                      backgroundColor: "white",
                      borderColor: "white"
                    }}
                    center
                    size={25}
                    title={
                      <Text>
                        I accept the
                        <Text
                          style={{
                            textDecorationLine: "underline",
                            color: Theme.colors.navyBlue
                          }}
                          onPress={() => {
                            Actions.termsConditions();
                          }}
                        >
                          terms and conditions
                        </Text>
                      </Text>
                    }
                    checkedColor={Theme.colors.navyBlue}
                    checked={this.state.checked}
                    onPress={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                  /> */}
                  <Icon
                    style={{margin: 5}}
                    name={
                      this.state.checked
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                    }
                    color={Theme.colors.navyBlue}
                    size={20}
                    onPress={() =>
                      this.setState({checked: !this.state.checked})
                    }
                  />
                  <Text>
                    I accept the{' '}
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        color: Theme.colors.navyBlue,
                      }}
                      onPress={() => {
                        Actions.termsConditions();
                      }}>
                      terms and conditions
                    </Text>
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.publishButton}
                  onPress={() => this.publishPressed(this.state.checked)}>
                  <Text style={styles.text1}>PUBLISH</Text>
                </TouchableOpacity>
                {/* <Text style={{ margin: 10 }}>
                  1 credit will be used to inspect your bike physically.
                </Text>
                <Text style={{ margin: 10 }}>
                  Note: Our team will meet you within 24 hours to inspect your
                  bike.
                </Text> */}
                <Text style={{margin: 10}}>
                  You will use 1 credit to publish.{'\n'}
                  Important. Only bike price is editable after publishing.
                </Text>
                <TouchableOpacity
                  style={styles.draftButton}
                  onPress={() => this.draftPressed(this.state.checked)}>
                  <Text style={styles.text1}>SAVE AS DRAFT</Text>
                </TouchableOpacity>
                <Text style={{margin: 10, textAlign: 'center'}}>
                  Your ad will be saved so that you can publish it anytime.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgView: {
    height: screenHeight / 2.5,
    width: screenWidth,
    // justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10
  },
  middle: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  text: {
    color: 'gray',
    padding: 5,
    // margin: 5,
    fontSize: 18,
  },
  text1: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  buttonGroup: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  draftButton: {
    margin: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: Theme.colors.navyBlue,
  },
  publishButton: {
    margin: 10,
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  mid: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
  },
  midLower: {
    backgroundColor: 'white',
    marginTop: 5,
    padding: 10,
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

  Alert_Title: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
});

const mapStateToProps = state => {
  console.log('is edited', state.vehicle.editWithCam);
  // console.log("unique", state.vehicle.editWithDevice);
  return {
    //camera image details
    cam_1: state.image.image1,
    cam_2: state.image.image2,
    cam_3: state.image.image3,
    cam_4: state.image.image4,
    camData1: state.image.image1.base64,
    camData2: state.image.image2.base64,
    camData3: state.image.image3.base64,
    camData4: state.image.image4.base64,
    //cam uris
    camUri1: state.image.image1.uri,
    camUri2: state.image.image2.uri,
    camUri3: state.image.image3.uri,
    camUri4: state.image.image4.uri,
    //device image details
    imageType1: state.image.edit_device_image1.type,
    imageName1: state.image.edit_device_image1.name,
    imageType2: state.image.edit_device_image2.type,
    imageName2: state.image.edit_device_image2.name,
    imageType3: state.image.edit_device_image3.type,
    imageName3: state.image.edit_device_image3.name,
    imageType4: state.image.edit_device_image4.type,
    imageName4: state.image.edit_device_image4.name,
    //uris
    front_side_image: state.image.edit_device_image1.uri,
    back_side_image: state.image.edit_device_image2.uri,
    right_side_image: state.image.edit_device_image3.uri,
    left_side_image: state.image.edit_device_image4.uri,
    //device image details
    imageDetails1: state.image.edit_device_image1,
    imageDetails2: state.image.edit_device_image2,
    imageDetails3: state.image.edit_device_image3,
    imageDetails4: state.image.edit_device_image4,

    brand_name: state.login.edit_brandname,
    brand_id: state.login.edit_brandid,
    model_id: state.login.edit_modelid,
    model_name: state.login.edit_modelname,
    engine_capacity: state.login.edit_capacity,
    engine_id: state.login.edit_engineid,
    rating: state.login.edit_rating,
    lot: state.login.edit_lot,
    odometer: state.login.edit_odometer,
    mileage: state.login.edit_mileage,
    price: state.login.edit_price,
    uniqueList: state.login.sellDetails,
    isEdited: state.vehicle.editVal,

    // editResponse: state.vehicle.editFromDevice
    //   ? state.vehicle.editFromDevice
    //   : state.vehicle.editFromCam,
    editResponse1: state.vehicle.editWithDevice,
    editResponse2: state.vehicle.editWithCam,
    // editMsg: state.vehicle.editWithCam,
    loading: state.vehicle.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    editVehicles,
    editCamVehicles,
    resetData,
    sellList,
    setImagesNull,
    resetDetailList,
    resetEditMsg,
  },
)(EditPreview);
