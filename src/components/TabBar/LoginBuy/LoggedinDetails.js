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
  FlatList,
  Animated,
  Navigator,
  BackAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar, Rating} from 'react-native-elements';

import {connect} from 'react-redux';
import {
  notifySeller,
  removeWish,
  addWish,
  getSellerInfo,
  resetData,
  resetDetailList,
  loginlist,
  resetWishMsg,
} from '../../../actions/LoginAction';
// import VehicleRating from "../common/Input/VehicleRating";
import {Actions} from 'react-native-router-flux';
// import Actions from "react-native-router-flux";
import Theme from '../../common/Utility/Colors';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import StarRating from 'react-native-star-rating';
import styles from '../../common/Styles/detailStyles';
import {withNavigationFocus} from 'react-navigation';
import Spinner from '../../common/Utility/Spiner';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class LoggedinDetails extends Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
  constructor(props) {
    super(props);
    this.state = {
      login: 'true',
      clicked: false,
      buttonText: ' Request the seller info',
      buttonActivity: false,
      clickedId: '',
      reqButton: false,
      index: '',
      imgWidth: 0,
      imgHeight: 0,
      data: props.list,

      hearto: 'heart-o',
    };
    this.buttonPressed = this.buttonPressed.bind(this);
    // this.onIconPressed = this.onIconPressed.bind(this);
    this.onContactInfo = this.onContactInfo.bind(this);
  }

  componentDidUpdate() {}
  componentDidMount() {
    // this.viewPager.setPage(0);
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      if (this.viewPager) {
        this.viewPager.setPage(0);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState({
        data: nextProps.list,
      });
    }
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  buttonPressed = v_id => {
    this.props.notifySeller(v_id);
    this.setState({
      clickedId: v_id,
      reqButton: true,
      buttonText: 'Contact already made',
    });
    this.setState({buttonActivity: true});
    // Alert.alert(
    //   "Seller will be notified of your interest to purchase this bike."
    // );
  };

  onIconChange = v_id => {
    this.setState({clicked: true, clickedId: v_id, hearto: 'heart'}, () => {
      console.log('clicked id', this.state.clickedId);
      console.log('icon', this.state.hearto);
    });
    this.props.addWish(v_id);
    var itemIndex = null;

    this.state.data.filter(function(item, index) {
      if (item['id'] == v_id) {
        itemIndex = index;
        console.log('index----' + index);
      }
    });
    this.state.data[itemIndex].is_wishlist = 1;
  };
  onIconChange1 = v_id => {
    this.setState({clicked: true, clickedId: v_id}, () =>
      console.log('clicked id', this.state.clickedId),
    );
    this.props.removeWish(v_id);
    var itemIndex = null;

    this.state.data.filter(function(item, index) {
      if (item['id'] == v_id) {
        itemIndex = index;
        console.log('index----' + index);
      }
    });
    this.state.data[itemIndex].is_wishlist = 0;
    // this.setState({ wish: "0" });
  };
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
    // Actions.pop();
    Actions.loggedinBuy();
  }

  onContactInfo = id => {
    this.props.getSellerInfo(id);
    Actions.sellerInfo();
  };
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        selectedDotStyle={{backgroundColor: Theme.colors.navyBlue}}
      />
    );
  }
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

    // Image.getSize(item.back_side_image, (width, height) => {
    //   // calculate image width and height
    //   const scaleFactor = width / screenWidth;
    //   const imageHeight = height / scaleFactor;
    //   this.setState({ imgWidth: screenWidth - 20, imgHeight: imageHeight });
    // });
    // // const { imgWidth, imgHeight } = this.state;
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
        //   // paddingTop: 10,
        //   // paddingLeft: 10,
        //   // paddingRight: 10,
        //   // paddingBottom: 5

        // }}
        >
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
                      marginRight: 10,
                      marginLeft: 10,
                    }}
                  />
                </View>
              );
            })}
          </IndicatorViewPager>

          {item.is_wishlist === 0 ? (
            <TouchableOpacity
              onPress={() => this.onIconChange(item.id)}
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
              }}>
              {console.log('id from flatlist', item.id)}
              <Icon
                name={
                  // this.props.add_wish === false ? 'heart' :
                  'heart-o'
                }
                size={25}
                color={'red'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.onIconChange1(item.id)}
              style={{
                position: 'absolute',
                top: 15,
                right: 20,
              }}>
              <Icon
                name={
                  // this.props.remove_wish === false ? 'heart-o' :
                  'heart'
                }
                size={25}
                color={'red'}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* <ViewPager style={{ height: screenHeight / 2.5 }} initialPage={0}>
            {photos.map((source, i) => {
              return (
                <View key={i} backgroundColor="white">
                  <ImageBackground
                    source={source}
                    style={{
                      height: screenHeight / 2.5,
                      width: screenWidth
                    }}
                  >
                    {item.is_wishlist === 0 ? (
                      <TouchableOpacity
                        onPress={() => this.onIconChange(item.id)}
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 20
                        }}
                      >
                        <Icon
                          name={
                            this.state.clicked &&
                            this.state.clickedId === item.id
                              ? "heart"
                              : "heart-o"
                            // this.state.hearto
                          }
                          size={25}
                          color={"red"}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.onIconChange1(item.id)}
                        style={{ position: "absolute", top: 10, right: 15 }}
                      >
                        <Icon
                          name={
                            // this.state.clicked && this.state.clickedId === item.id
                            //   ? "heart-o"
                            //   : "heart"
                            this.state.heart
                          }
                          size={25}
                          color={"red"}
                        />
                      </TouchableOpacity>
                    )}
                  </ImageBackground>
                </View>
              );
            })}
          </ViewPager> */}
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
                ratingColor={Theme.colors.navyBlue}
                borderColor={Theme.colors.navyBlue}
                type="custom"
                ratingCount={5}
                imageSize={12}
                startingValue={item.rating}
                readonly={true}
              /> */}
              <StarRating
                containerStyle={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginRight: 10,
                  marginLeft: 2,
                }}
                disabled={true}
                emptyStar={require('../../../../images/star_lg_gray.png')}
                fullStar={require('../../../../images/star_lg_blue.png')}
                maxStars={5}
                starSize={12}
                rating={item.rating}
                // selectedStar={(rating) => this.onStarRatingPress(rating)}
                // fullStarColor={Theme.colors.navyBlue}
                // emptyStarColor={Theme.colors.navyBlue}
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
                  // source={require('../../../../images/blank.jpg')}
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
            {/* <View style={{ alignItems: "center", margin: 10 }}>
              {item.request_seller == 1 ? (
                <TouchableOpacity style={styles.button} disabled={true}>
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15
                    }}
                  >
                    Contact already made
                  </Text>
                </TouchableOpacity>
              ) : this.state.clickedId == item.id && this.state.reqButton ? (
                <TouchableOpacity
                  style={styles.button}
                  onPress={id => this.buttonPressed(item.lot, item.id)}
                  disabled={this.state.buttonActivity}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15
                    }}
                  >
                    {this.state.buttonText}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={id => this.buttonPressed(item.lot, item.id)}
                  disabled={this.state.buttonActivity}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15
                    }}
                  >
                    {this.state.buttonText}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text
                style={{ color: "gray", textAlign: "center", fontSize: 15 }}
              >
                You will be provided with seller information once your request
                is accepted.
              </Text>
            </View> */}
            <View
              style={{
                marginTop: 20,
                // marginRight: 5,
                // marginLeft: 5,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: 0.04 * screenWidth,
                  textAlign: 'center',
                  margin: screenWidth * 0.01,
                }}>
                By connecting below, you agree and understand that BhatBhate APP
                is NOT involved in any part of the transaction, as it is only
                platform to share information. You agree to BhatBhate's {'\n'}
                <Text
                  style={{
                    fontSize: 0.04 * screenWidth,
                    textDecorationLine: 'underline',
                    color: Theme.colors.navyBlue,
                  }}
                  onPress={() => {
                    Actions.termsConditions();
                  }}>
                  Terms & Conditions.
                </Text>{' '}
                You are directly contacting the person who has posted the
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
    // let photos = [
    //   { uri: this.props.list.front_side_image },
    //   { uri: this.props.list.back_side_image },
    //   { uri: this.props.list.right_side_image },
    //   { uri: this.props.list.left_side_image }
    // ];
    return (
      <View style={styles.mainContainer}>
        {this.props.loading ? <Spinner /> : null}
        <FlatList
          data={this.state.data} //array of data to create list
          extraData={this.state}
          keyExtractor={(item, index) => item.id + item.lot}
          renderItem={({item, index}) => this.renderFlatlistItem(item, index)}>
          <TouchableOpacity>
            <Icon name={'heart'} size={20} color={'red'} />
          </TouchableOpacity>
        </FlatList>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('login list details', state.login.detailList);
  return {
    error_msg: state.login.notify,
    list: state.login.detailList,
    loading: state.login.loading,
    add_wish: state.login.addwish,
    remove_wish: state.login.removewish,
  };
};

export default connect(
  mapStateToProps,
  {
    notifySeller,
    removeWish,
    addWish,
    getSellerInfo,
    resetData,
    resetDetailList,
    loginlist,
    resetWishMsg,
  },
)(LoggedinDetails);
