/* eslint-disable no-unused-vars */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
  Alert,
  Animated,
  FlatList,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Rating} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {
  removeWish,
  addWish,
  notifySeller,
  getSellerInfo,
  resetDetailList,
  resetWishMsg,
  resetWish,
} from '../../actions/LoginAction';
import VehicleRating from '../common/Input/VehicleRating';
import {Actions} from 'react-native-router-flux';
import Theme from '../common/Utility/Colors';
import axios from 'axios';
import {LoginApi} from '../../services/Api';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import Spinner from '../common/Utility/Spiner';
import styles from '../common/Styles/detailStyles';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class LikeDetails extends Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView

  constructor() {
    super();
    this.state = {
      login: 'true',
      clicked: false,
      clickedId: '',
      Alert_Visibility: false,
      buttonText: ' Request the seller info',
      buttonClicked: false,
      index: '',
      imgWidth: 0,
      imgHeight: 0,
      removeMessage: '',
    };
    this.buttonPressed = this.buttonPressed.bind(this);
    this.onIconPressed = this.onIconPressed.bind(this);
    this.onContactInfo = this.onContactInfo.bind(this);
    this.removeMsgAlert = this.removeMsgAlert.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  buttonPressed = vehicle_id => {
    this.props.notifySeller(vehicle_id);

    this.setState({buttonText: 'Contact already made'});
    this.setState({buttonClicked: true});
    // Alert.alert(
    //   "Seller will be notified of your interest to purchase this bike."
    // );
  };

  onIconPressed = v_id => {
    this.setState({clicked: true, clickedId: v_id}, () =>
      console.log('clicked id', this.state.clickedId),
    );
    // this.setState({Alert_Visibility: true}, () =>
    //   console.log(this.state.Alert_Visibility),
    // );
    this.props.removeWish(v_id);
  };
  Show_Custom_Alert = visible => {
    this.setState({Alert_Visibility: visible});
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      if (this.viewPager) {
        this.viewPager.setPage(0);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.remove_result !== this.props.remove_result) {
      this.setState({removeMessage: nextProps.remove_result});
    }
  }

  componentDidUpdate() {
    // this.viewPager.setPage(0);
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
    this.focusListener.remove();
  }
  handleBackButtonClick() {
    return Actions.like();
  }
  onContactInfo = id => {
    this.props.getSellerInfo(id);
    Actions.sellerInfo();
    // this.props.navigation.navigate("sellerInfo");
  };
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        selectedDotStyle={{backgroundColor: Theme.colors.navyBlue}}
      />
    );
  }
  removeMsgAlert = () => {
    // console.log('remove alert msg');
    // Alert.alert(
    //   'Success Message!',
    //   'Removed from wishlist.',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         console.log('go to like');
    //         Actions.like();
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
    // this.props.resetWishMsg();
    console.log('go to like page');
    Actions.like();
    //reset wish message "Removed from wishlist"
    this.props.resetWish();
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
  renderFlatlistItem(item, index) {
    // if (this.viewPager) {
    //   this.viewPager.setPage(0);
    // }
    Image.getSize(item.front_side_image, (width, height) => {
      // calculate image width and height
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      this.setState({imgWidth: screenWidth - 20, imgHeight: imageHeight});
    });
    const {imgWidth, imgHeight} = this.state;
    let position = Animated.divide(this.scrollX, screenWidth);
    let photos = [
      {uri: item.front_side_image},
      {uri: item.back_side_image},
      {uri: item.right_side_image},
      {uri: item.left_side_image},
      ,
    ];
    return (
      <View style={{marginTop: 5}}>
        <View
        // style={{
        //   paddingTop: 10,
        //   paddingLeft: 10,
        //   paddingRight: 10,
        //   paddingBottom: 5
        // }}
        >
          {/* <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollX } } }
            ])}
            scrollEventThrottle={16}
          >
            {photos.map((source, i) => {
              return (
                <ImageBackground
                  key={i}
                  style={{
                    height: this.state.imgHeight,
                    width: this.state.imgWidth,
                    aspectRatio: 1.2
                  }}
                  source={source}
                >
                  <TouchableOpacity
                    onPress={() => this.onIconPressed(item.id)}
                    style={{ position: "absolute", top: 10, right: 10 }}
                  >
                    <Icon name={"heart"} size={25} color={Theme.colors.red} />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      left: 120,
                      right: 120,
                      position: "absolute",
                      bottom: 20
                    }}
                  >
                    {photos.map((_, i) => {
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
                            backgroundColor: Theme.colors.navyBlue,
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
            {photos.map((source, i) => {
              return (
                <View
                  key={i}
                  // backgroundColor={Theme.colors.navyBlue}
                >
                  <ImageBackground
                    source={source}
                    style={{
                      height: screenHeight / 2.5,
                      // width: screenWidth
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  />
                </View>
              );
            })}
          </IndicatorViewPager>
        </View>

        <TouchableOpacity
          onPress={() => this.onIconPressed(item.id)}
          style={{position: 'absolute', top: 15, right: 25}}>
          <Icon name={'heart'} size={25} color={Theme.colors.red} />
        </TouchableOpacity>
        <View>
          <View style={styles.middle}>
            <View style={styles.left}>
              <Text
                style={{
                  color: Theme.colors.navyBlue,
                  fontWeight: 'bold',
                  padding: 5,
                  fontSize: 15,
                }}>
                {item.model_name}
              </Text>
            </View>
            <View style={styles.mid}>
              <Text
                style={{
                  color: Theme.colors.navyBlue,
                  padding: 5,
                  fontSize: 15,
                }}>
                {item.engine_capacity}cc
              </Text>
            </View>
            <View style={styles.right}>
              <Text
                style={{
                  color: Theme.colors.navyBlue,
                  paddingTop: 5,
                  paddingLeft: 5,
                  paddingBottom: 5,
                  fontSize: 15,
                }}>
                Condition
              </Text>

              {/* <Rating
                style={{ padding: 10 }}
                borderColor={Theme.colors.navyBlue}
                ratingColor={Theme.colors.navyBlue}
                type="custom"
                ratingCount={5}
                imageSize={12}
                startingValue={item.rating}
              /> */}
              <StarRating
                containerStyle={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  marginLeft: 2,
                }}
                disabled={true}
                emptyStar={'star-o'}
                fullStar={'star'}
                maxStars={5}
                starSize={10}
                rating={item.rating}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                fullStarColor={Theme.colors.navyBlue}
                emptyStarColor={Theme.colors.navyBlue}
              />
              {/* <VehicleRating /> */}
            </View>
          </View>
          <View style={styles.midLower}>
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
                <Text
                  style={{padding: 5, color: Theme.colors.red, fontSize: 18}}>
                  Price
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  // justifyContent: "flex-end"
                  alignItems: 'flex-end',
                }}>
                <Text
                  style={{padding: 5, fontSize: 18, color: Theme.colors.red}}>
                  Rs. {this.formatNumber(item.price)}
                </Text>
              </View>
            </View>
            <View style={{alignItems: 'center', margin: 10}}>
              <Text
                style={{
                  color: Theme.colors.black,
                  padding: 5,
                  fontSize: 15,
                  textAlign: 'center',
                }}>
                {item.seller_name}
              </Text>
            </View>
            {item.seller_image === '' ? (
              <View style={{alignItems: 'center', margin: 5}}>
                <Avatar
                  size="large"
                  rounded
                  // source={require('../../../images/blank.jpg')}
                  title={this.getInitials(item.seller_name)}
                />
              </View>
            ) : (
              <View style={{alignItems: 'center', margin: 5}}>
                <Avatar
                  size="large"
                  rounded
                  source={{uri: item.seller_image}}
                />
              </View>
            )}

            <View
              style={{
                marginTop: 20,
                // marginRight: 5,
                // marginLeft: 5,
                marginBottom: 10,
              }}>
              <Text style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
                By below, you agree and understand that BhatBhate APP is NOT
                involved in any part of the transaction, as it is only platform
                to share information. {'\n'}You agree to BhatBhate's
                {/* <Text> {"  "}</Text> */}
                <Text
                  style={{
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    color: Theme.colors.navyBlue,
                  }}
                  onPress={() => {
                    Actions.termsConditions();
                  }}>
                  Terms & Conditions.
                </Text>
                {'\n'}You are directly contacting the person who has posted the
                advertisement, and agree not to hold BhatBhate APP responsible
                for any part of the negotiations or sale of the vehicle with the
                seller.
              </Text>
            </View>
            <View style={{alignItems: 'center', margin: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.onContactInfo(item.id)}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Show Contact info
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.remove_result_msg === 'Removed from wishlist' ? (
          // console.log("removed message")
          <View>{this.removeMsgAlert()}</View>
        ) : null}
        <FlatList
          // extraData={this.state}
          data={this.props.list}
          extraData={this.props.list}
          // data={this.state.details} //array of data to create list
          keyExtractor={(item, index) => item.id + item.lot}
          renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('login list details', state.login.detailList);
  console.log('resmove res', state.login.removewish_msg);
  return {
    error_msg: state.login.notify,
    list: state.login.detailList,
    remove_result: state.login.removewish,
    remove_result_msg: state.login.removewish_msg,
    loading: state.login.loading,
  };
};

export default connect(
  mapStateToProps,
  {
    removeWish,
    addWish,
    notifySeller,
    getSellerInfo,
    resetDetailList,
    resetWishMsg,
    resetWish,
  },
)(LikeDetails);
