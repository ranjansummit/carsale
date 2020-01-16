/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  BackHandler,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
import {Rating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import {
  getwish,
  removeWish,
  logindetails,
  resetData,
  resetWishMsg,
  resetWish,
  loginlist,
} from '../../actions/LoginAction';
import StarRating from 'react-native-star-rating';
import {removedFromLike} from '../../actions/LikeAction';
import {connect} from 'react-redux';
import Storage from '../storage/Storage';
import Spinner from '../common/Utility/Spiner';
import Theme from '../common/Utility/Colors';
import LoggedinBuy from '../TabBar/LoginBuy/LoggedinBuy';
import styles from '../common/Styles/listStyles';

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      like: 'heart',
      clickedId: '',
      Alert_Visibility: false,

      data: [],
      isRefreshing: false,
    };
    this.renderFlatlistItem = this.renderFlatlistItem.bind(this);
    this.onIconPressed = this.onIconPressed.bind(this);
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getwish();
    });
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log('next props ', nextProps);
    if (nextProps.wish_list !== this.props.wish_list) {
      this.setState({data: nextProps.wish_list}, () =>
        console.log('data', this.state.data),
      );
    }
    if (nextProps.add_wish !== this.props.add_wish) {
      this.props.getwish();
      // this.props.resetWishMsg();
    }
    if (nextProps.removeMsg !== this.props.removeMsg) {
      console.log('there??');
      this.props.getwish();
      // this.props.resetWishMsg();
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.buyl();
      } else {
        // this.props.resetData();
        return Actions.loggedinBuy();
      }
    });
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  onIconPressed = (v_id, clicked) => {
    this.setState({clickedId: v_id, clicked}, () =>
      console.log('clicked id', this.state.clickedId),
    );
    this.props.removeWish(v_id);
  };

  Show_Custom_Alert = visible => {
    this.setState({Alert_Visibility: visible});
    // this.props.removedFromLike(this.props.removeMsg);
  };

  onImagePressed = id => {
    var data = this.props.wish_list;
    var detailList = data.filter(item => item.id === id);
    console.log('detail list', detailList);
    this.props.logindetails(detailList);
    Actions.likeDetails();
  };
  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.getwish();
    if (this.props.loading === false) {
      this.setState({isRefreshing: false});
    }
  }
  removeAlert = v_id => {
    // var id = v_id;
    // Alert.alert(
    //   'Success',
    //   'Removed from wishlist.',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //

    //         // Actions.like();
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
    const filteredData = this.state.data.filter(item => item.id !== v_id);
    this.setState({data: filteredData}, () =>
      console.log('data', this.state.data),
    );
    this.props.resetWishMsg();
    this.setState({clicked: false});
  };
  listNull = () => {
    Alert.alert(
      '',
      'Your wish list is empty.',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('ok pressed!');
            Actions.loggedinBuy();
            // this.props.resetWish();
          },
        },
      ],
      {cancelable: false},
    );
  };

  reCallWish = () => {
    this.props.getwish();
  };
  renderFlatlistItem(item, index) {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <TouchableOpacity onPress={id => this.onImagePressed(item.id)}>
            <ImageBackground
              style={styles.img}
              source={{uri: item.front_side_image}}>
              <TouchableOpacity
                onPress={() => this.onIconPressed(item.id, !this.state.clicked)}
                style={{position: 'absolute', top: 10, right: 15}}>
                <Icon name={'heart'} size={25} color={'red'} />
              </TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
          {item.is_sold == 'yes' ? (
            <Text
              style={{
                position: 'absolute',
                // fontFamily: 'Roboto-Regular',
                top: 10,
                left: -8,
                backgroundColor: 'pink',
                padding: 10,
                color: 'white',
                fontSize: 15,
              }}>
              SOLD
            </Text>
          ) : null}
          {/* <Text
            style={{
              fontWeight: "bold",
              backgroundColor: "red",
              color: "white",
              position: "absolute",
              bottom: 10,
              left: -10,
              padding: 10,
              fontSize: 15
            }}
          >
            Rs. {this.formatNumber(item.price)}
          </Text> */}
          <Text
            style={{
              position: 'absolute',
              // top: 200,
              bottom: 10,
              left: -8,
              backgroundColor: Theme.colors.red,
              paddingVertical: 8,
              paddingHorizontal: 15,
              color: 'white',
              fontSize: 15,
              width: 200,
              textAlign: 'center',
              // fontFamily: 'Rooboto',
            }}>
            Rs. {this.formatNumber(item.price)}
          </Text>
          {/* <View
            style={{
              position: 'absolute',
              // top: 180,
              // left: -8,
              // right: 150,
              // bottom: 10,
              top: 190,
              left: -8,
              right: 150,
              bottom: 10,
              // flex: 1,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 15,
              }}>
              Rs. {this.formatNumber(item.price)}
            </Text>
          </View> */}
        </View>
        <View style={styles.lower}>
          <View style={styles.left}>
            <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                // marginRight: 2.5,
                fontSize: 18,
                // fontFamily: 'Roboto',
              }}>
              {item.brand_name} {item.model_name}
            </Text>
            {/* <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: 'bold',
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                fontSize: 15,
              }}>
              {item.model_name}
            </Text> */}
          </View>
          <View style={styles.right}>
            <Text
              style={{
                color: Theme.colors.navyBlue,
                marginBottom: 5,
                marginTop: 5,
                fontSize: 15,
              }}>
              Condition
            </Text>
            {/* <Rating
              style={{ margin: 10 }}
              borderColor={Theme.colors.navyBlue}
              ratingColor={Theme.colors.navyBlue}
              type="custom"
              ratingCount={5}
              imageSize={12}
              startingValue={item.rating}
            /> */}
            <StarRating
              containerStyle={{
                marginLeft: 2,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              disabled={false}
              emptyStar={'star-o'}
              fullStar={'star'}
              maxStars={5}
              starSize={10}
              rating={item.rating}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              fullStarColor={Theme.colors.navyBlue}
              emptyStarColor={Theme.colors.navyBlue}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          // paddingTop: 5,
          // paddingLeft: 5,
          // paddingRight: 5,
          backgroundColor: Theme.colors.lightBlue,
        }}>
        {this.props.loading ? <Spinner /> : null}
        {/* {this.props.removeMsg === false || this.props.add_wish === false ? (
          <View>{this.reCallWish()}</View>
        ) : null} */}
        {this.props.removeMsg === false && this.state.clicked ? (
          <View>{this.removeAlert(this.state.clickedId)}</View>
        ) : null}

        {/* {this.props.wish_list.length === 0 && !this.props.loading ? (
          <View>{this.listNull()}</View>
        ) : null} */}
        <FlatList
          // extraData={this.state}
          // data={this.props.wish_list} //array of data to create list
          data={this.state.data}
          extraData={this.state}
          keyExtractor={(item, index) => item.id + item.lot}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.props.isRefreshing}
          //     onRefresh={this.onRefresh.bind(this)}
          //   />
          // }
          renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: "space-between",
//     padding: 10
//   },
//   // button: {
//   //   justifyContent: "center",
//   //   backgroundColor: "#F7003C",
//   //   padding: 5
//   // },
//   // text: {
//   //   color: "white",
//   //   fontSize: 20,
//   //   padding: 10,
//   //   textAlign: "center"
//   // },
//   // text1: {
//   //   color: "#002248",
//   //   fontSize: 20,
//   //   padding: 30,
//   //   textAlign: "center"
//   // },
//   upper: {
//     flex: 3,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   img: {
//     height: "100%",
//     width: "100%",
//     aspectRatio: 1.5
//   },
//   lower: {
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "white",
//     alignItems: "center"
//   },
//   left: {
//     flex: 2,
//     flexDirection: "row",
//     justifyContent: "flex-start"
//   },
//   right: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end"
//   },
//   Alert_Main_View: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 5,
//     backgroundColor: "white",
//     height: 100,
//     width: "80%",
//     borderWidth: 1,
//     borderColor: Theme.colors.fadedBlack,
//     borderRadius: 5
//   },

//   Alert_Title: {
//     fontSize: 15,
//     textAlign: "center",
//     padding: 5
//   }
// });

const mapStateToProps = state => {
  // console.log("get wish", state.login.wishList);
  console.log('remove success', state.login.removewish);
  return {
    wish_list: state.login.wishList,
    loading: state.login.loading,
    removeMsg: state.login.removewish,
    add_wish: state.login.addwish,
  };
};

export default connect(
  mapStateToProps,
  {
    getwish,
    removeWish,
    logindetails,
    resetData,
    removedFromLike,
    resetWishMsg,
    resetWish,
    loginlist,
  },
)(Like);
