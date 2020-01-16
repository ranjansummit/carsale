/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Rating, colors} from 'react-native-elements';
import {connect} from 'react-redux';
import {preloginlist, prelogindetails} from '../../../actions/PreLoginAction';
import {Actions} from 'react-native-router-flux';
import Spinner from '../../common/Utility/Spiner';
import {resetSearchList} from '../../../actions/VehicleAction';
// import IconColor from "../common/Button/IconColor";
import Theme from '../../common/Utility/Colors';
import StarRating from 'react-native-star-rating';
import styles from '../../common/Styles/listStyles';
class BuyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      price: this.props.list,
      isRefreshing: false,
    };
    this.renderFlatlistItem = this.renderFlatlistItem.bind(this);
    this.onImagePressed = this.onImagePressed.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    this.props.preloginlist();
  }

  onImagePressed = id => {
    var data = this.props.list;
    console.log('tala ko id', id);
    var detailList = data.filter(item => item.id === id);
    console.log('pre login detail list', detailList);
    this.props.prelogindetails(detailList);
    Actions.buydetails();
    // this.props.navigation.navigate("buydetails");
  };

  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  componentWillMount() {
    // Actions.refresh();
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

  handleBackButtonClick = () => {
    // BackHandler.exitApp(); // works best when the goBack is async
    return true;
  };
  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.resetSearchList();
    this.props.preloginlist();
    if (this.props.loading === false) {
      this.setState({isRefreshing: false});
    }
  }
  searchErrorAlert = () => {
    Alert.alert(
      '',
      'Search Failed',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetSearchList();
          },
        },
      ],
      {cancelable: false},
    );
  };
  renderFlatlistItem(item, index) {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <TouchableOpacity onPress={id => this.onImagePressed(item.id)}>
            <ImageBackground
              style={styles.img}
              source={{uri: item.front_side_image}}></ImageBackground>
          </TouchableOpacity>
          {item.is_sold === 'yes' ? (
            <Text
              style={{
                position: 'absolute',
                top: 10,
                left: -8,
                backgroundColor: 'pink',
                paddingVertical: 10,
                paddingHorizontal: 20,
                color: 'white',
                fontSize: 15,
                // fontFamily: 'Rooboto',
              }}>
              SOLD
            </Text>
          ) : (
            <View />
          )}
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
                fontSize: 15,
              }}>
              {item.brand_name} {item.model_name}
            </Text>

            {/* <Text
              style={{
                color: Theme.colors.navyBlue,
                fontWeight: "bold",
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                fontSize: 15
              }}
            >

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
              ratingColor={Theme.colors.navyBlue}
              borderColor={Theme.colors.navyBlue}
              type="custom"
              ratingCount={5}
              imageSize={12}
              readonly={true}
              startingValue={item.rating}
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

  render() {
    return (
      <View
        style={{
          flex: 1,
          // , padding: 5
        }}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.list ? (
          this.props.list.length === 0 ? (
            <Spinner />
          ) : null
        ) : null}
        {this.props.error === true ? (
          <View>{this.searchErrorAlert()}</View>
        ) : null}
        {this.props.search.length > 0 ? (
          <FlatList
            data={this.props.search}
            //  extraData={this.state}
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
            refreshing={this.state.isRefreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        ) : (
          <FlatList
            data={this.props.list}
            // data={this.state.details} //array of data to create list
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
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
//   }
// });

const mapStateToProps = state => {
  console.log('list', state.prelogin.preloginList);
  console.log('search', state.vehicle.searchList);
  return {
    list: state.prelogin.preloginList.data,
    // wishcount: state.prelogin.wish_count,
    loading: state.prelogin.loading,
    search: state.vehicle.pre_searchList,
    search_res: state.vehicle.pre_search_result,
    error: state.vehicle.search_error,
  };
};

export default connect(
  mapStateToProps,
  {preloginlist, prelogindetails, resetSearchList},
)(BuyList);
