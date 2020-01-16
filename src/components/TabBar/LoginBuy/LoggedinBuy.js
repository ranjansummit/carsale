import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  FlatList,
  Image,
  ImageBackground,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {connect} from 'react-redux';
import {
  loginlist,
  logindetails,
  addWish,
  removeWish,
  getSellerInfo,
  resetData,
  resetDetailList,
  setInitialPage,
  resetWishMsg,
  getAppSettings,
} from '../../../actions/LoginAction';
import {resetSearchList} from '../../../actions/VehicleAction';
import {Actions} from 'react-native-router-flux';
import Spinner from '../../common/Utility/Spiner';
import Theme from '../../common/Utility/Colors';
import styles from '../../common/Styles/listStyles';

class LoggedinBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      post: [],
      loader: false,
      clickedId: '',
      Alert_Visibility: false,
      isRefreshing: false,
      refreshAlert: null,
      offset: 0,
      limit: 5,
      wishIcon: false,
    };

    this.renderFlatlistItem = this.renderFlatlistItem.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.LoadingIndicator = this.LoadingIndicator.bind(this);
    this.wishIconChange = this.wishIconChange.bind(this);
    // this.onIconAdd = this.onIconAdd.bind(this);
    // this.onIconRemove = this.onIconRemove.bind(this);
    this.onAddedWishlist = this.onAddedWishlist.bind(this);
    this.onRemovedWishlist = this.onRemovedWishlist.bind(this);
    this.onImagePressed = this.onImagePressed.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    // this.props.loginlist(this.state.offset, this.state.limit);
    this.props.loginlist();
    this.props.getAppSettings();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState(
        {
          post: nextProps.list,
        },
        () => console.log('next props list', this.state.post),
      );
    }
  }
  getIndexFromData(id) {
    let bikeIndex = this.state.post.findIndex(function(data) {
      return data.id == id;
    });
    return bikeIndex;
  }
  onImagePressed = id => {
    var data = this.state.post;
    console.log('tala ko id', id);
    var detailList = data.filter(item => item.id === id);
    this.props.logindetails(detailList);
    Actions.loggedinDetails();
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
  }

  handleBackButtonClick() {
    // Actions.pop();
    return true;
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  Show_Custom_Alert = visible => {
    this.setState({Alert_Visibility: visible});
  };

  wishIconChange = (v_id, wishIcon) => {
    this.setState({clickedId: v_id, clicked: true}, () =>
      console.log('clicked id', this.state.clickedId),
    );
    if (wishIcon === false) {
      this.setState({Alert_Visibility: true}, () =>
        console.log(this.state.Alert_Visibility),
      );
      this.props.addWish(v_id);
    } else {
      this.setState({Alert_Visibility: true}, () =>
        console.log(this.state.Alert_Visibility),
      );
      this.props.removeWish(v_id);
    }
  };

  onAddedWishlist = vid => {
    // this.Show_Custom_Alert(!this.state.Alert_Visibility);
    // var itemIndex = null;
    // this.state.post.filter(function(item, index) {
    //   if (item['id'] == vid) {
    //     itemIndex = index;
    //     console.log('index----' + index);
    //   }
    // });
    var itemIndex = this.getIndexFromData(vid);
    console.log('item index', itemIndex);
    this.state.post[itemIndex].is_wishlist = 1;
    console.log(this.state.post[itemIndex]);
    Alert.alert(
      'Success!',
      'Added to wishlist',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetWishMsg();
          },
        },
      ],
      {cancelable: false},
    );
    this.setState({clicked: false});
    //  id line flatlist item  - on icon change ma pass garne - tala model ma pathauna mildaina - tei vara state ma halne - jaba ok click hunxa tyo id sanga purai list ko item kun ho nikalera tyo item ko chai iswishlist change garne
  };

  onRemovedWishlist = vid => {
    // this.Show_Custom_Alert(!this.state.Alert_Visibility);
    // var itemIndex = null;

    // this.state.post.filter(function(item, index) {
    //   if (item['id'] == vid) {
    //     itemIndex = index;
    //     console.log('index----' + index);
    //   }
    // });
    var itemIndex = this.getIndexFromData(vid);
    this.state.post[itemIndex].is_wishlist = 0;
    Alert.alert(
      'Success!',
      'Removed from wishlist.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetWishMsg();
          },
        },
      ],
      {cancelable: false},
    );
    this.setState({clicked: false});
  };
  onWishListStateChange(vid, stateType) {}
  renderFlatlistItem(item, index) {
    // const {clicked} = this.state;
    // const wish = item.is_wishlist;
    // console.log("wish", wish);
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <TouchableOpacity onPress={id => this.onImagePressed(item.id)}>
            <ImageBackground
              style={styles.img}
              source={{uri: item.front_side_image}}>
              {item.is_wishlist === 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    // this.onIconAdd(item.id, this.state.wishIcon)
                    this.wishIconChange(item.id, this.state.wishIcon)
                  }
                  style={{position: 'absolute', top: 10, right: 15}}>
                  <Icon
                    name={
                      'heart-o'
                      // this.state.clicked && this.state.clickedId === item.id
                      //   ? 'heart'
                      //   : 'heart-o'
                    }
                    size={25}
                    color={'red'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    // this.onIconRemove(item.id, !this.state.wishIcon)
                    this.wishIconChange(item.id, !this.state.wishIcon)
                  }
                  style={{position: 'absolute', top: 10, right: 15}}>
                  <Icon
                    name={
                      // this.state.clicked && this.state.clickedId === item.id
                      //   ? 'heart-o'
                      'heart'
                    }
                    size={25}
                    color={'red'}
                  />
                </TouchableOpacity>
              )}
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
                fontFamily: 'Roboto-Regular',
                // padding: 1,
                // margin: 2
              }}>
              Rs. {this.formatNumber(item.price)}
            </Text>
          </View> */}
        </View>
        <View style={styles.lower}>
          <View style={styles.left}>
            {/* <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: "bold",
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                marginRight: 2.5,
                fontSize: 15,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.brand_name}
            </Text>
            <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: "bold",
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                fontSize: 15,
                fontFamily: "Roboto-Regular"
              }}
            >
              {item.model_name}
            </Text> */}
            <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: 'bold',
                marginTop: 5,
                marginBottom: 5,
                marginLeft: 5,
                // marginRight: 2.5,
                fontSize: 15,
              }}>
              {item.brand_name} {item.model_name}
            </Text>
          </View>
          <View style={styles.right}>
            <Text
              style={{
                color: Theme.colors.navyBlue,
                marginBottom: 5,
                marginTop: 5,
                fontSize: 15,
                // fontFamily: 'Roboto-Regular',
              }}>
              Condition
            </Text>
            {/* <Rating
              style={{ margin: 10 }}
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
                marginLeft: 2,
                marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
              }}
              disabled={true}
              // emptyStar={"star-o"}
              // fullStar={"star"}
              emptyStar={require('../../../../images/star_lg_gray.png')}
              fullStar={require('../../../../images/star_lg_blue.png')}
              maxStars={5}
              starSize={12}
              rating={item.rating}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              // fullStarColor={Theme.colors.navyBlue}
              // emptyStarColor={Theme.colors.navyBlue}
            />
          </View>
        </View>
      </View>
    );
  }
  onEndReached(offset, limit) {
    this.setState({offset: offset + 5, limit: limit + 5, loader: true}, () =>
      console.log('loader on end', this.state.loader),
    );
    this.props.loginlist(this.state.offset, this.state.limit);
  }
  LoadingIndicator() {
    if (this.state.loader === true) {
      console.log('loader');
      <ActivityIndicator size={'large'} animating={true} />;
    }
  }
  onRefresh() {
    this.setState(
      {isRefreshing: true, offset: 0, limit: 5, refreshAlert: true},
      () => console.log('refresh', this.state.offset),
    );
    // this.props.resetData();
    this.props.resetSearchList();
    this.props.loginlist(this.state.offset, this.state.limit);
    if (this.props.loading === false) {
      this.setState({isRefreshing: false}, () => {
        this.setState({refreshAlert: false});
      });
    }
  }
  updateAlert = () => {
    Alert.alert(
      '',
      'Bikelist updated',
      [
        {
          text: 'OK',
          onPress: () => {
            this.setState({refreshAlert: null});
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.colors.lightBlue,
        }}>
        {this.props.loading ? <Spinner /> : null}
        {/* {this.state.refreshAlert === false ? (
          <View>{this.updateAlert()}</View>
        ) : null} */}
        {this.props.add_wish === false && this.state.clicked ? (
          <View>{this.onAddedWishlist(this.state.clickedId)}</View>
        ) : null}
        {this.props.remove_wish === false && this.state.clicked ? (
          <View>{this.onRemovedWishlist(this.state.clickedId)}</View>
        ) : null}
        {this.props.list ? (
          this.props.list.length === 0 ? (
            <Spinner />
          ) : null
        ) : null}
        {this.props.search.length > 0 ? (
          <FlatList
            // extraData={this.props.list}
            // data={this.props.list}
            data={this.props.search}
            //  extraData={this.state}
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
            // onEndReached={() => {
            //   this.onEndReached(this.state.offset, this.state.limit);
            // }}
            // onEndReachedThreshold={0.5}
            // ListFooterComponent={this.LoadingIndicator()}
            // initialNumToRender={5}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        ) : (
          <FlatList
            // extraData={this.props.list}
            // data={this.props.list}
            data={this.state.post}
            extraData={this.state}
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
            onEndReached={() => {
              this.onEndReached(this.state.offset, this.state.limit);
            }}
            onEndReachedThreshold={0.7}
            ListFooterComponent={this.LoadingIndicator()}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     flex: 1,
//     justifyContent: "space-evenly",
//     backgroundColor: Theme.colors.lightBlue
//   },
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
  console.log('login list', state.login.loginList);
  console.log('removed wish', state.login.removewish);
  console.log('addded wish', state.login.addwish);
  return {
    // list: state.login.loginList.data,
    list: state.login.loginList,

    likeMsg: state.like.removefromlike,
    add_wish: state.login.addwish,
    remove_wish: state.login.removewish,
    removewish_msg: state.login.removewish_msg,
    loading: state.login.loading,
    search: state.vehicle.searchList,
    search_res: state.vehicle.search_result,
  };
};

export default connect(
  mapStateToProps,
  {
    loginlist,
    logindetails,
    addWish,
    removeWish,
    getSellerInfo,
    resetData,
    resetDetailList,
    setInitialPage,
    resetSearchList,
    resetWishMsg,
    getAppSettings,
  },
)(LoggedinBuy);
