/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';

import {Rating, Avatar} from 'react-native-elements';

import {Actions} from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import {
  publishVehicle,
  removeDraft,
  editPrice,
  resetRemoveVehicle,
  resetEditPriceMsg,
  markAsSold,
} from '../../../actions/VehicleAction';
import Theme from '../../common/Utility/Colors';
import Spinner from '../../common/Utility/Spiner';
import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class SellDetails extends Component {
  // scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
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

      changed: false,
      data: props.list,
      // mileage: "",
      capacity: '',
      price: props.list.price.toString(),
      // price: props.list.price
    };
    this.onPublish = this.onPublish.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.alertMsg = this.alertMsg.bind(this);
    this.onSoldPressed = this.onSoldPressed.bind(this);
  }
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
        // data: nextProps.list,
        // price: nextProps.list.price.toString()
        price: nextProps.list.price.toString(),
      });
    }
    if (nextProps.editedPrice !== this.props.editedPrice) {
      this.setState(
        {
          price:
            // this.formatNumber(nextProps.editedPrice.toString())
            nextProps.editedPrice.toString(),
        },
        () => console.log(' price after edit', this.state.price),
      );
    }
  }
  componentDidUpdate() {}

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
    Actions.sell();
  }

  onPublish = id => {
    console.log('publish id', id);
    this.props.publishVehicle(id);
  };

  removePressed = vehicle_id => {
    this.props.removeDraft(vehicle_id);
    // if (this.props.loading) {
    //   Alert.alert("please wait");
    // } else {
    //   Alert.alert(this.props.removeMsg);
    //   Actions.sell();
    // }
  };
  onSoldPressed = vehicle_id => {
    console.log('sold');
    this.props.markAsSold(vehicle_id);
  };
  oneditPrice = (id, price) => {
    console.log('id for price edit', id);
    console.log('price', price);
    this.props.editPrice(id, price);
  };

  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        selectedDotStyle={{backgroundColor: Theme.colors.navyBlue}}
      />
    );
  }
  alertMsg = () => {
    Alert.alert(
      'Success!',
      'Successfully deleted.',
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
    this.props.resetRemoveVehicle();
  };
  editPriceMsg() {
    Alert.alert(
      'Success!',
      'Successfully edited.',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('price edited');
          },
        },
      ],
      {cancelable: false},
    );
    this.props.resetEditPriceMsg();
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
  render() {
    // if (this.viewPager) {
    //   this.viewPager.setPage(0);
    // }

    let photos = [
      {uri: this.props.list.front_side_image},
      {uri: this.props.list.back_side_image},
      {uri: this.props.list.right_side_image},
      {uri: this.props.list.left_side_image},
      ,
    ];

    return (
      <View style={{flex: 1}}>
        {this.props.loader ? <Spinner /> : null}
        {this.props.removeMsg === 'Successfully deleted.' ? (
          <View>{this.alertMsg()}</View>
        ) : null}
        {this.props.priceEditMsg === false ? (
          <View>{this.editPriceMsg()}</View>
        ) : null}
        <ScrollView>
          {/* <View style={{ flex: 1 }}> */}
          <View style={{marginTop: 10}}>
            <View
            // style={{
            //   paddingTop: 10,
            //   paddingLeft: 10,
            //   paddingRight: 10,
            //   paddingBottom: 5
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
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  );
                })}
              </IndicatorViewPager>
            </View>
            <View style={styles.middle}>
              <View style={styles.left}>
                <Text
                  style={{
                    color: '#002248',
                    fontWeight: 'bold',
                    padding: 5,
                    fontSize: 15,
                  }}>
                  {this.props.list.model_name}
                </Text>
              </View>
              <View style={styles.mid}>
                <Text
                  style={{
                    color: '#002248',
                    padding: 5,
                    fontSize: 15,
                  }}>
                  {this.props.list.engine_capacity}cc
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
                  starSize={10}
                  rating={this.props.list.rating}
                  // selectedStar={(rating) => this.onStarRatingPress(rating)}
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
                    flex: 2,
                    // justifyContent: "flex-end"
                    alignItems: 'flex-end',
                  }}>
                  <Text style={styles.text}> {this.props.list.lot}</Text>
                  <Text style={styles.text}>
                    {' '}
                    {this.props.list.odometer} KM
                  </Text>
                  <Text style={styles.text}>
                    {' '}
                    {this.props.list.mileage} KM/L
                  </Text>
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
                  <Text style={{fontSize: 18, padding: 5, color: 'red'}}>
                    Price
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  {this.props.list.publish === 0 ? (
                    <Text style={{fontSize: 18, padding: 5, color: 'red'}}>
                      Rs. {this.formatNumber(this.props.list.price)}
                    </Text>
                  ) : (
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <Text style={{color: 'red', fontSize: 18, padding: 5}}>
                        Rs.
                      </Text>
                      <TextInput
                        style={{color: 'red', fontSize: 18, padding: 5}}
                        keyboardType="numeric"
                        type="string"
                        required
                        name="price"
                        onChangeText={price => {
                          this.setState({price, changePrice: true}, () =>
                            console.log('price on change', this.state.price),
                          );
                        }}
                        value={this.state.price}
                      />
                      <TouchableOpacity>
                        <Icon
                          style={{
                            paddingTop: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginRight: 5,
                          }}
                          name={'edit'}
                          size={20}
                          // onPress={() => this.editPrice(item.id, this.state.price)}
                          onPress={() =>
                            this.oneditPrice(
                              this.props.list.id,
                              this.state.price,
                            )
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>

            {/* <View style={{ alignItems: "center", margin: 10 }}>
            <Text
              style={{
                color: "gray",
                fontSize: 15,
                textAlign: "center"
              }}
            >
              By below, you agree and understand that BhatBhate APP is NOT
              involved in any part of the transaction, as it is only platform to
              share information.{"\n"} You agree to BhatBhate's
              <Text
                style={{
                  fontSize: 15,
                  textDecorationLine: "underline",
                  color: Theme.colors.navyBlue
                }}
                onPress={() => {
                  Actions.termsConditions();
                }}
              >
                Terms & Conditions.
              </Text>
              {"\n"} You are directly contacting the person who has posted the
              advertisement, and agree not to hold BhatBhate APP responsible for
              any part of the negotiations or sale of the vehicle with the
              seller.
            </Text>
          </View> */}
            <View style={{backgroundColor: 'white'}}>
              <View style={{alignItems: 'center', margin: 10}}>
                <Text
                  style={{
                    color: 'gray',
                    padding: 5,
                    fontSize: 15,
                    textAlign: 'center',
                  }}>
                  {this.props.list.seller_name}
                </Text>
              </View>
              {this.props.list.seller_image === '' ? (
                <View style={{alignItems: 'center', margin: 10}}>
                  <Avatar
                    size="large"
                    rounded
                    // source={require('../../../../images/blank.jpg')}
                    title={this.getInitials(this.props.list.seller_name)}
                  />
                </View>
              ) : (
                <View style={{alignItems: 'center', margin: 10}}>
                  <Avatar
                    size="large"
                    rounded
                    source={{uri: this.props.list.seller_image}}
                  />
                </View>
              )}
              {this.props.list.publish === 0 ? (
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    flexDirection: 'row',
                    // justifyContent: "space-evenly",
                    // alignItems: "center",
                  }}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      flex: 1,
                      marginRight: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => this.removePressed(this.props.list.id)}>
                      <Text style={styles.text1}>Remove from draft</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'green',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.publishButton}
                      // onPress={() => this.onPublish(item.id)}
                    >
                      <Text style={styles.text1}>PUBLISH</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    padding: 5,
                    flexDirection: 'row',
                    // justifyContent: "space-evenly",
                    // alignItems: "center",
                  }}>
                  <View
                    style={{
                      backgroundColor: 'red',
                      flex: 1,
                      marginRight: 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => this.removePressed(this.props.list.id)}>
                      <Text style={styles.text2}>Remove from Listing</Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'green',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {this.props.list.is_sold === 'yes' ? (
                      <TouchableOpacity
                        style={styles.soldButton}
                        // onPress={() => this.onPublish(item.id)}
                      >
                        <Text style={styles.text2}>ALREADY SOLD</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.soldButton}
                        onPress={() => this.onSoldPressed(this.props.list.id)}>
                        <Text style={styles.text2}>Mark as Sold</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 20,
                  }}>
                  Important. Only price is editable after publishing.
                </Text>
              </View>
            </View>
          </View>
          {/* </View> */}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    height: screenHeight / 3,
    width: screenWidth,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  imgView: {
    height: screenHeight / 2.5,
    width: screenWidth,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  middle: {
    paddingVertical: 5,
    marginTop: 5,
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
    fontSize: 18,
  },
  text1: {
    color: 'white',
    fontSize: 15,
    padding: 15,
    textAlign: 'center',
  },
  text2: {
    color: 'white',
    fontSize: 15,
    paddingVertical: 12,
    // paddingHorizontal: 5,
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
  editButton: {
    width: 200,
    justifyContent: 'center',
    backgroundColor: '#F7003C',
    margin: 5,
  },
  publishButton: {
    width: screenWidth / 2.5,
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
    flex: 2,
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  mid: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  right: {
    flex: 2,
    justifyContent: 'flex-end',
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },

  midLower: {
    backgroundColor: 'white',
    marginTop: 5,
    padding: 5,
  },
  removeButton: {
    width: screenWidth / 2.5,
    justifyContent: 'center',
    backgroundColor: Theme.colors.red,
  },
  soldButton: {
    width: screenWidth / 2.5,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

const mapStateToProps = state => {
  console.log('login list details', state.login.sellDetails);
  console.log('edit price message', state.vehicle.editpricemsg);
  console.log('price after edit', state.vehicle.editprice);
  return {
    error_msg: state.login.notify,
    list: state.login.sellDetails,
    loading: state.login.loading,
    removeMsg: state.vehicle.removeVehicle,
    editedPrice: state.vehicle.editprice,
    loader: state.vehicle.loading,
    priceEditMsg: state.vehicle.editpricemsg,
    markedSold: state.vehicle.sold,
  };
};

export default connect(
  mapStateToProps,
  {
    publishVehicle,
    removeDraft,
    editPrice,
    resetRemoveVehicle,
    resetEditPriceMsg,
    markAsSold,
  },
)(SellDetails);
