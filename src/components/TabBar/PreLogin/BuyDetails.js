/* eslint-disable no-unused-vars */
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
  FlatList,
  Animated,
} from 'react-native';
import {Avatar, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Theme from '../../common/Utility/Colors';
import Spinner from '../../common/Utility/Spiner';
import ImageComponent from './ImageComponent';
import StarRating from 'react-native-star-rating';
import styles from '../../common/Styles/detailStyles';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class BuyDetails extends Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
  constructor() {
    super();
    this.state = {
      login: 'true',
      toggle: false,
      imgWidth: 0,
      imgHeight: 0,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  buttonPressed() {
    Actions.login();
    // this.props.navigation.navigate("login");
  }

  // componentWillMount() {
  //   BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     this.handleBackButtonClick
  //   );
  // }
  componentWillMount() {
    Actions.refresh();
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
    Actions.buyl();
    this.forceUpdate();
    // this.props.navigation.goBack(null);
  }

  // componentWillReceiveProps() {
  //   this.forceUpdate();
  // }

  renderFlatlistItem(item, index) {
    // Image.getSize(item.front_side_image, (width, height) => {
    //   // calculate image width and height
    //   const scaleFactor = width / screenWidth;
    //   const imageHeight = height / scaleFactor;
    //   this.setState(
    //     { imgWidth: screenWidth - 20, imgHeight: imageHeight },
    //     () => console.log(this.state.imgWidth)
    //   );
    // });
    // const { imgWidth, imgHeight } = this.state;
    // let position = Animated.divide(this.scrollX, screenWidth);
    // let photos = [
    //   { uri: item.front_side_image },
    //   { uri: item.back_side_image },
    //   { uri: item.right_side_image },
    //   { uri: item.left_side_image }
    // ];
    return (
      <View>
        <ImageComponent />
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
            {item.seller_image === '' ? (
              <View style={{alignItems: 'center', margin: 5}}>
                <Avatar
                  size="large"
                  rounded
                  source={require('../../../../images/blank.jpg')}
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
            <View style={{alignItems: 'center', margin: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={id => this.buttonPressed()}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 15,
                  }}>
                  Login to view the seller information
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
      // // <View style={{ flex: 1 }}>
      // //   <View style={styles.body}>
      // //     <Swiper loop={false}>
      // //       <View style={styles.slide}>
      // //         <Image style={styles.image} source={{ uri: this.props.img1 }} />
      // //       </View>
      // //       <View style={styles.slide}>
      // //         <Image style={styles.image} source={{ uri: this.props.img2 }} />
      // //       </View>
      // //       <View style={styles.slide}>
      // //         <Image style={styles.image} source={{ uri: this.props.img3 }} />
      // //       </View>
      // //       <View style={styles.slide}>
      // //         <Image style={styles.image} source={{ uri: this.props.img4 }} />
      // //       </View>
      // //     </Swiper>
      // //   </View>
      // //   <View style={styles.body}>
      // //     <ScrollView>
      // //       <View style={styles.middle}>
      // //         <Text
      // //           style={{
      // //             color: "#002248",
      // //             fontWeight: "bold",
      // //             padding: 5,
      // //             fontSize: 15
      // //           }}
      // //         >
      // //           {this.props.model}
      // //         </Text>
      // //         <Text
      // //           style={{
      // //             color: "#002248",
      // //             padding: 5,
      // //             fontSize: 15
      // //           }}
      // //         >
      // //           {this.props.engine_capacity}cc
      // //         </Text>
      // //         <VehicleRating />
      // //       </View>
      // //       <View style={styles.lower}>
      // //         <View
      // //           style={{
      // //             flexDirection: "column",
      // //             flex: 1
      // //           }}
      // //         >
      // //           <Text style={styles.text}> Vehicle Lot</Text>
      // //           <Text style={styles.text}> Odometer</Text>
      // //           <Text style={styles.text}> Mileage</Text>
      // //           <Text style={styles.text}> Price</Text>
      // //         </View>
      // //         <View
      // //           style={{
      // //             flexDirection: "column",
      // //             flex: 1
      // //           }}
      // //         >
      // //           <Text style={styles.text}> {this.props.lot}</Text>
      // //           <Text style={styles.text}> {this.props.odometer}</Text>
      // //           <Text style={styles.text}> {this.props.mileage}</Text>
      // //           <Text style={styles.text}>
      // //             {" "}
      // //             Rs. {this.formatNumber(this.props.price)}
      // //           </Text>
      // //         </View>
      // //       </View>

      // //       <View style={styles.footer}>
      // //         <TouchableOpacity
      // //           style={styles.button}
      // //           onPress={this.buttonPressed}
      // //         >
      // //           <Text style={{ color: "white" }}>
      // //             Login to request the seller information
      // //           </Text>
      // //         </TouchableOpacity>
      // //       </View>
      // //     </ScrollView>
      // //   </View>
      // // </View>

      // <ScrollView>
      //   <ScrollView
      //     horizontal
      //     showsHorizontalScrollIndicator={false}
      //     pagingEnabled
      //     contentContainerStylestyle={{ alignItems: "center" }}
      //   >
      //     <View
      //       style={{
      //         height: screenHeight / 3,
      //         width: screenWidth,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         backgroundColor: "white",
      //         padding: 10
      //       }}
      //     >
      //       <Image
      //         style={{
      //           height: "100%",
      //           width: screenWidth,
      //           aspectRatio: 1.3
      //         }}
      //         resizeMode={"contain"}
      //         source={{ uri: this.props.img1 }}
      //       />
      //     </View>
      //     <View
      //       style={{
      //         height: screenHeight / 3,
      //         width: screenWidth,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         backgroundColor: "white",
      //         padding: 10
      //       }}
      //     >
      //       <Image
      //         style={{
      //           height: "100%",
      //           width: screenWidth,
      //           aspectRatio: 1.3
      //         }}
      //         resizeMode={"contain"}
      //         source={{ uri: this.props.img2 }}
      //       />
      //     </View>
      //     <View
      //       style={{
      //         height: screenHeight / 3,
      //         width: screenWidth,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         backgroundColor: "white",
      //         padding: 10
      //       }}
      //     >
      //       <Image
      //         style={{
      //           height: "100%",
      //           width: screenWidth,
      //           aspectRatio: 1.3
      //         }}
      //         resizeMode={"contain"}
      //         source={{ uri: this.props.img3 }}
      //       />
      //     </View>
      //     <View
      //       style={{
      //         height: screenHeight / 3,
      //         width: screenWidth,
      //         justifyContent: "center",
      //         alignItems: "center",
      //         backgroundColor: "white",
      //         padding: 10
      //       }}
      //     >
      //       <Image
      //         style={{
      //           height: "100%",
      //           width: screenWidth,
      //           aspectRatio: 1.3
      //         }}
      //         resizeMode={"contain"}
      //         source={{ uri: this.props.img4 }}
      //       />
      //     </View>
      //   </ScrollView>
      //   <View style={{ backgroundColor: "white", margin: 5 }}>
      //     <View style={styles.middle}>
      //       <Text
      //         style={{
      //           color: "#002248",
      //           fontWeight: "bold",
      //           padding: 5,
      //           fontSize: 15
      //         }}
      //       >
      //         {this.props.model}
      //       </Text>
      //       <Text
      //         style={{
      //           color: "#002248",
      //           padding: 5,
      //           fontSize: 15
      //         }}
      //       >
      //         {this.props.engine_capacity}cc
      //       </Text>
      //       <VehicleRating />
      //     </View>
      //     <View style={{ flexDirection: "row", padding: 10, marginLeft: 10 }}>
      //       <View
      //         style={{
      //           flexDirection: "column",
      //           flex: 1
      //         }}
      //       >
      //         <Text style={styles.text}> Vehicle Lot</Text>
      //         <Text style={styles.text}> Odometer</Text>
      //         <Text style={styles.text}> Mileage</Text>
      //       </View>
      //       <View
      //         style={{
      //           flexDirection: "column",
      //           flex: 1
      //         }}
      //       >
      //         <Text style={styles.text}> {this.props.lot}</Text>
      //         <Text style={styles.text}> {this.props.odometer}</Text>
      //         <Text style={styles.text}> {this.props.mileage}</Text>
      //       </View>
      //     </View>
      //     <View style={styles.lineStyle} />
      //     <View style={{ flexDirection: "row", padding: 10, marginLeft: 10 }}>
      //       <Text
      //         style={{
      //           flex: 1,
      //           color: "gray",
      //           padding: 5,
      //           margin: 5,
      //           fontSize: 18
      //         }}
      //       >
      //         Price
      //       </Text>
      //       <Text
      //         style={{
      //           flex: 1,
      //           color: "gray",
      //           padding: 5,
      //           margin: 5,
      //           fontSize: 18
      //         }}
      //       >
      //         {/* Rs. {this.formatNumber(this.props.price)} */}
      //         {this.props.price}
      //       </Text>
      //     </View>
      //     <View style={{ alignItems: "center", margin: 5 }}>
      //       <Avatar large rounded source={{ uri: this.props.seller_image }} />
      //     </View>
      //     <View style={{ alignItems: "center", margin: 10 }}>
      //       <TouchableOpacity
      //         style={styles.button}
      //         // onPress={this.buttonPressed(this.props.vehicle_id)}
      //         onPress={id => this.buttonPressed(this.props.vehicle_id)}
      //       >
      //         <Text
      //           style={{ color: "white", textAlign: "center", fontSize: 15 }}
      //         >
      //           Login to request the seller information
      //         </Text>
      //       </TouchableOpacity>
      //     </View>
      //   </View>
      // </ScrollView>
      <View style={styles.mainContainer}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <FlatList
            extraData={this.state}
            data={this.props.list}
            // data={this.state.details} //array of data to create list
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
          />
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   // slide: {
//   //   height: screenHeight / 3,
//   //   width: screenWidth,
//   //   justifyContent: "space-evenly",
//   //   alignItems: "center",
//   //   backgroundColor: "white",
//   //   padding: 10
//   // },
//   mainContainer: {
//     flex: 1,
//     backgroundColor: Theme.colors.lightBlue
//   },
//   imgView: {
//     height: screenHeight / 2.5,
//     width: screenWidth,
//     // justifyContent: "space-evenly",
//     alignItems: "center",
//     backgroundColor: "white"
//     // padding: 10
//   },
//   middle: {
//     marginBottom: 5,
//     marginLeft: 10,
//     marginRight: 10,
//     flexDirection: "row",
//     backgroundColor: "white",
//     justifyContent: "space-evenly"
//   },
//   left: {
//     flex: 2,
//     justifyContent: "flex-start",
//     marginLeft: 5
//   },
//   mid: {
//     flex: 1,
//     justifyContent: "center",
//     marginRight: 8
//   },
//   right: {
//     flex: 2,
//     justifyContent: "flex-end",
//     marginRight: 5,
//     alignItems: "center",
//     flexDirection: "row"
//   },
//   text: {
//     color: Theme.colors.black,
//     padding: 5,
//     // margin: 5,
//     fontSize: 18
//   },
//   button: {
//     width: screenWidth - 30,
//     alignItems: "center",
//     backgroundColor: Theme.colors.red,
//     margin: 5,
//     padding: 15
//   },
//   lineStyle: {
//     paddingLeft: 10,
//     paddingRight: 10,
//     borderWidth: 0.5,
//     borderColor: Theme.colors.fadedBlack,
//     margin: 10
//   },
//   midLower: {
//     backgroundColor: "white",
//     marginTop: 5,
//     padding: 5
//   }
// });

const mapStateToProps = state => {
  console.log('list', state.prelogin.preloginDetails);
  return {
    list: state.prelogin.preloginDetails,
    loading: state.prelogin.loading,
  };
};

export default connect(
  mapStateToProps,
  {},
)(BuyDetails);
