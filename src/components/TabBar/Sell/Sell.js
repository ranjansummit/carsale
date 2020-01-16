import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  Alert,
} from 'react-native';
import Spinner from '../../common/Utility/Spiner';
import {Actions} from 'react-native-router-flux';
import {
  sellList,
  logindetails,
  selldetails,
  resetDetailList,
  resetData,
  loginlist,
  resetCamStatus,
} from '../../../actions/LoginAction';
import {
  publishVehicle,
  editButtonClicked,
  addButtonClicked,
  resetSearchList,
  resetAddClicked,
  resetEditClicked,
  resetSavedMsg,
  resetPublish,
} from '../../../actions/VehicleAction';
import {setImagesNull} from '../../../actions/ImageAction';
import {
  preloginsearch,
  modellist,
  engine,
} from '../../../actions/PreLoginAction';
import {Rating} from 'react-native-elements';
import Storage from '../../storage/Storage';
import {connect} from 'react-redux';
import axios from 'axios';
import {LoginApi} from '../../../services/Api';
import Theme from '../../common/Utility/Colors';
import StarRating from 'react-native-star-rating';

let screenWidth = Dimensions.get('window').width;
class Sell extends Component {
  constructor(props) {
    super(props);
    this.offset = 0;
    this.limit = 50;
    this.state = {
      data: [],
      editClicked: false,
      addClicked: false,
      formData: [],
      isRefreshing: false, //for pull to refresh
    };
    this.renderFlatlistItem = this.renderFlatlistItem.bind(this);
    this.onPublish = this.onPublish.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onImagePressed = this.onImagePressed.bind(this);
    // this.fetchUser = this.fetchUser.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    // this.renderFooter = this.renderFooter.bind(this);
  }
  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.sellList();
    });
    this.props.preloginsearch();
    // this.fetchUser(this.offset, this.limit);
    // this.setState({ loading: true });
    // LoginApi.get("v1/vehicles/filter/sell", {
    //   params: {
    //     offset: this.offset,
    //     limit: this.limit
    //   }
    // })
    //   .then(res => {
    //     let data = res.data.data;

    //     this.setState({ loading: false, data: data }, () =>
    //       console.log("direct list", this.state.data)
    //     );
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, error: "Something just went wrong" });
    //   });
  }
  fetchUser(offset, limit) {
    //stackexchange User API url
    this.setState({loading: true});
    LoginApi.get('v1/vehicles/filter/sell', {
      params: {
        offset: offset,
        limit: limit,
      },
    })
      .then(res => {
        console.log('response.data', res.data.data);
        let response_data = res.data.data;
        let data = this.state.data;
        const listData = [...response_data, ...data];
        this.setState(
          {data: listData, loading: false},
          // , () =>
          // console.log("direct list", this.state.data)
        );
      })
      .catch(error => {
        this.setState({loading: false, error: 'Something just went wrong'});
      });
  }
  componentWillReceiveProps(nextProps) {
    console.log('next props ', nextProps);
    if (nextProps.list !== this.props.list) {
      this.setState({data: nextProps.list}, () =>
        console.log('data', this.state.data),
      );
    }
    // if (nextProps.savedMsg1 !== this.props.saveMsg1) {
    //   this.props.sellList();
    // }
    // if (nextProps.savedMsg2 !== this.props.saveMsg2) {
    //   this.props.sellList();
    // }
    // if (nextProps.editResponse1 !== this.props.editResponse1) {
    //   this.props.sellList();
    // }
    // if (nextProps.editResponse2 !== this.props.editResponse2) {
    //   this.props.sellList();
    // }
    if (nextProps.saveMsg !== this.props.saveMsg) {
      this.props.sellList();
      this.props.resetSavedMsg();
    }
    if (nextProps.editMsg !== this.props.editMsg) {
      this.props.sellList();
    }
    if (nextProps.removeMsg !== this.props.removeMsg) {
      this.props.sellList();
    }
    if (nextProps.priceEditMsg !== this.props.priceEditMsg) {
      this.props.sellList();
    }
  }
  formatNumber(num) {
    // console.log("num", num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
  onImagePressed = id => {
    // var data = this.props.list;
    // var detailList = data.filter(item => item.id === id);
    const detailList = this.state.data[this.getIndexFromData(id)];
    // this.props.logindetails(detailList);
    this.props.selldetails(detailList);
    Actions.sellDetails();
  };
  onPublish = id => {
    console.log('publish id', id);
    this.props.publishVehicle(id);
  };
  onAdd = val => {
    this.setState({addClicked: true, editClicked: false}, () => {
      console.log('added', this.state.addClicked);
      console.log('edit', this.state.editClicked);
      this.props.addButtonClicked(this.state.addClicked);
    });
    this.props.setImagesNull();
    // this.props.resetCamStatus();
    this.props.resetEditClicked();
    Actions.addvehicle();
  };
  getIndexFromData(id) {
    let bikeIndex = this.state.data.findIndex(function(data) {
      return data.id == id;
    });
    return bikeIndex;
  }

  onEdit = (id, brandId, modelId) => {
    this.setState({editClicked: true, addClicked: false}, () => {
      console.log('edited', this.state.editClicked);
      console.log('add clicked', this.state.addClicked);
      this.props.editButtonClicked(this.state.editClicked);
    });

    var data = this.props.list;
    // var detailList = data.filter(item => item.id === id);
    // this.props.logindetails(detailList);
    var detailList = this.state.data[this.getIndexFromData(id)];
    console.log('detail list', detailList);
    this.props.selldetails(detailList);
    this.props.setImagesNull();
    // this.props.resetCamStatus();
    this.props.resetAddClicked();
    Actions.edit1();

    console.log('model_id', modelId);
    console.log('brand_id', brandId);
    var models = this.props.preLoginBrand
      .filter(item => item.brand_id === brandId)
      .map(item => item.models)
      // .map(models => models.model_name))
      .reduce((a, b) => a.concat(b), []);

    this.props.modellist(models);

    var engines = models
      .filter(item => item.model_id === modelId)
      .map(item => item.engines)
      .reduce((a, b) => a.concat(b), []);

    console.log('engine listing', engines);
    this.props.engine(engines);
  };

  renderFlatlistItem(item, index) {
    return (
      <View style={styles.container}>
        <View style={styles.upper}>
          <TouchableOpacity onPress={id => this.onImagePressed(item.id)}>
            <ImageBackground
              style={styles.img}
              source={{uri: item.front_side_image}}
            />
          </TouchableOpacity>
          {item.publish == '0' ? (
            <Text
              style={{
                position: 'absolute',
                top: 10,
                left: -10,
                backgroundColor: '#002248',
                padding: 10,
                color: 'white',
                fontSize: 15,
              }}>
              Draft
            </Text>
          ) : (
            <View />
          )}
          <Text
            style={{
              position: 'absolute',
              // top: 200,
              bottom: 10,
              left: -10,
              backgroundColor: Theme.colors.red,
              paddingVertical: 6,
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
              top: 170,
              left: -10,
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
                // padding: 1,
                // margin: 2
              }}>
              Rs. {this.formatNumber(item.price)}
            </Text>
          </View> */}
          {/* {item.wish_count == "0" && item.buyer_count == "0" ? (
            <View />
          ) : item.wish_count == "0" && item.buyer_count == "1" ? (
            <Text
              style={{
                position: "absolute",
                bottom: 60,
                left: -10,
                backgroundColor: "#002248",
                padding: 10,
                color: "white",
                fontSize: 15
              }}
            >
              {item.buyer_count} buyer interested
            </Text>
          ) : item.wish_count == "0" && item.buyer_count >= "1" ? (
            <Text
              style={{
                position: "absolute",
                bottom: 60,
                left: -10,
                backgroundColor: "#002248",
                padding: 10,
                color: "white",
                fontSize: 15
              }}
            >
              {item.buyer_count} buyers interested
            </Text>
          ) : item.wish_count >= "0" && item.buyer_count == "0" ? (
            <Text
              style={{
                position: "absolute",
                bottom: 60,
                right: 300,
                backgroundColor: "#002248",
                padding: 10,
                color: "white",
                fontSize: 10
              }}
            >
              <Icon name="heart" size={20} color="red" />
              {item.wish_count}
            </Text>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  position: "absolute",
                  bottom: 60,
                  right: 300,
                  backgroundColor: "#002248",
                  padding: 10,
                  color: "white",
                  fontSize: 10
                }}
              >
                <Icon name="heart" size={20} color="red" />
                {item.wish_count}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  bottom: 60,
                  right: 220,
                  backgroundColor: "#002248",
                  padding: 10,
                  color: "white",
                  fontSize: 15
                }}
              >
                {item.buyer_count} buyers
              </Text>
            </View>
          )} */}
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
                {item.model_name}
              </Text> */}
          </View>
          <View style={styles.right}>
            <Text
              style={{
                color: '#002248',
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
              emptyStar={require('../../../../images/star_lg_gray.png')}
              fullStar={require('../../../../images/star_lg_blue.png')}
              maxStars={5}
              starSize={12}
              rating={item.rating}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
        </View>
        {item.publish == '0' ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                this.onEdit(item.id, item.brand_id, item.model_id)
              }>
              <Text style={styles.text}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.publishButton}
              onPress={() => this.onPublish(item.id)}>
              <Text style={styles.text}>PUBLISH</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  // renderFooter = () => {
  //   if (!this.state.loading) return null;
  //   return <Spinner />;
  // };
  handleLoadMore = () => {
    // if (!this.state.loading) {
    //   this.page = this.page + 1; // increase page by 1
    //   this.offset = this.offset + 5;
    //   this.limit = this.limit + 5;
    //   this.fetchUser(this.offset, this.limit); // method for API call
    // }
    // alert('You have reached the end of the list');
  };
  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.resetSearchList();
    this.props.sellList();
    if (this.props.loading === false) {
      this.setState({isRefreshing: false});
    }
    // LoginApi.get("v1/vehicles/filter/sell", {
    //   params: {
    //     offset: 0,
    //     limit: 50
    //   }
    // })
    //   .then(res => {
    //     let data = res.data.data;
    //     this.setState({ isRefreshing: false, data: data }); // false isRefreshing flag for disable pull to refresh indicator, and clear all data and store only first page data
    //   })
    //   .catch(error => {
    //     this.setState({
    //       isRefreshing: false,
    //       error: "Something just went wrong"
    //     }); // false isRefreshing flag for disable pull to refresh
    //   });
  }
  createToastMessageSuccess() {
    Alert.alert('Edited successfully');
    this.onRefresh;
  }
  publishedAlert = () => {
    Alert.alert(
      'Success!',
      'Successfully added.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.sellList();
            this.props.resetPublish();
          },
        },
      ],
      {cancelable: false},
    );
  };
  publishFailureAlert = () => {
    Alert.alert(
      '',
      'You don’t have any credit to sell this bike - You can save as a draft. Please click Credits below to buy a credit to publish and sell your bike.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetPublish();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading2 ? <Spinner /> : null}
        {this.props.loading ? <Spinner /> : null}
        <View style={styles.container}>
          <View style={{flex: 0.1, marginBottom: 10}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onAdd()}>
              <Text style={styles.text}>ADD BIKE</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.9}}>
            {/* {this.props.loading ? (
            <Spinner />
          ) : this.props.list === [] ? (
            <Text> You have no listing right now </Text>
          ) */}

            {this.props.published === 'Published successfully' ? (
              <View>{this.publishedAlert()}</View>
            ) : null}
            {this.props.error ===
            'You don’t have any credit to sell this bike - You can save as a draft. Please click Credits below to buy a credit to publish and sell your bike.' ? (
              <View>{this.publishFailureAlert()}</View>
            ) : null}
            {!this.props.list ? (
              <Text style={{fontSize: 20, color: 'black'}}>
                You have no listing right now.
              </Text>
            ) : null}
            {this.props.search.length > 0 ? (
              <FlatList
                data={this.props.search}
                // extraData={this.state}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                keyExtractor={(item, index) => item.id + item.lot}
                renderItem={({item, index}) =>
                  this.renderFlatlistItem(item, index)
                }
                // ListFooterComponent={this.renderFooter.bind(this)}
                onEndReachedThreshold={0.4}
                onEndReached={this.handleLoadMore.bind(this)}
              />
            ) : (
              <FlatList
                data={this.state.data}
                extraData={this.state.data}
                // data={this.props.list}
                // extraData={this.props.list}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                keyExtractor={(item, index) => item.id + item.lot}
                renderItem={({item, index}) =>
                  this.renderFlatlistItem(item, index)
                }
                // ListFooterComponent={this.renderFooter.bind(this)}
                onEndReachedThreshold={0.4}
                onEndReached={this.handleLoadMore.bind(this)}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,

    margin: 5,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#F7003C',
    padding: 5,
  },
  editButton: {
    width: screenWidth / 3,
    justifyContent: 'center',
    backgroundColor: '#F7003C',
    // marginLeft: 8
  },
  publishButton: {
    width: screenWidth / 3,
    justifyContent: 'center',
    backgroundColor: 'green',
    // marginRight: 8
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  text1: {
    color: '#002248',
    fontSize: 20,
    padding: 30,
    textAlign: 'center',
  },
  upper: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: '100%',
    width: '100%',
    aspectRatio: 1.5,
  },
  lower: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonGroup: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  left: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => {
  console.log('pre login bike', state.prelogin.preloginList);
  console.log('sell list', state.login.sellList);
  console.log('search list', state.vehicle.searchList);

  return {
    list: state.login.sellList,
    published: state.vehicle.publish_msg,
    published_error: state.vehicle.publish,
    loading: state.login.loading,
    loading2: state.vehicle.loading,
    // savedMsg1: state.vehicle.savedFromDevice,
    // savedMsg2: state.vehicle.savedFromCam,
    saveMsg: state.vehicle.savedFromDevice
      ? state.vehicle.savedFromDevice
      : state.vehicle.savedFromCam,
    editMsg: state.vehicle.editWithCam
      ? state.vehicle.editWithCam
      : state.vehicle.editWithDevice,
    // editResponse1: state.vehicle.editWithDevice,
    // editResponse2: state.vehicle.editWithCam,
    removeMsg: state.vehicle.removeVehicle,
    search: state.vehicle.searchList,
    own_search_res: state.vehicle.own_search_result,
    priceEditMsg: state.vehicle.editpricemsg,
    preLoginBrand: state.prelogin.brandList,
    error: state.vehicle.error,
  };
};

export default connect(
  mapStateToProps,
  {
    loginlist,
    sellList,
    logindetails,
    selldetails,
    publishVehicle,
    editButtonClicked,
    addButtonClicked,
    resetDetailList,
    resetData,
    setImagesNull,
    resetCamStatus,
    resetSearchList,
    resetAddClicked,
    resetEditClicked,
    resetSavedMsg,
    resetPublish,
    preloginsearch,
    modellist,
    engine,
  },
)(Sell);
