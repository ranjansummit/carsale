/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Slider,
  Dimensions,
  // Picker,
  BackHandler,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from 'native-base';
import StarRating from 'react-native-star-rating';
import {Rating, CheckBox} from 'react-native-elements';
import SearchBrand from '../common/Input/SearchBrand';
import SearchModel from '../common/Input/SearchModel';
import {Actions} from 'react-native-router-flux';
import Storage from '../storage/Storage';
import Theme from '../common/Utility/Colors';
import {searchOwnVehicle, resetSearchList} from '../../actions/VehicleAction';
import {connect} from 'react-redux';
import Spinner from '../common/Utility/Spiner';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

let screenWidth = Dimensions.get('window').width;

class SearchSell extends Component {
  constructor() {
    super();
    this.state = {
      selected_order: 'newest',
      brandSelected: '',
      modelSelected: '',
      sliderValue: 0.0,
      onchange: false,
      rating: 0.0,
      checked: true,
      search_message: null,
    };
    this.onSearchBrand = this.onSearchBrand.bind(this);
    this.searchlist = this.searchlist.bind(this);
    this.alertSearch = this.alertSearch.bind(this);
    this.onSearchPressed = this.onSearchPressed.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.search_msg !== this.props.search_msg) {
      this.setState({search_message: nextProps.search_msg}, () => {
        console.log('search message', this.state.search_message);
      });
      this.setState(
        {
          selected_order: 'newest',
          brandSelected: '',
          modelSelected: '',
          sliderValue: 0.0,
          rating: 0.0,
        },
        () => console.log('order selected', this.state.selected_order),
      );
    }
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
  }

  handleBackButtonClick() {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.buyl();
      } else {
        return Actions.loggedinBuy();
      }
    });
  }

  onSearchBrand = (val, brandname) => {
    console.log('brand', val);
    console.log('brand name', brandname);
    this.setState({brandSelected: brandname}, () =>
      console.log('brand name selected', this.state.brandSelected),
    );
  };
  onSearchModel = (val, name) => {
    this.setState({modelSelected: name}, () =>
      console.log('model name selected', this.state.modelSelected),
    );
  };

  checkPressed = checked => {
    this.setState({checked: true, rating: 0.0}, () =>
      console.log('checked status', this.state.checked),
    );
  };
  ratingCompleted(rating) {
    this.setState({rating: rating, checked: false}, () =>
      console.log('rating', this.state.rating),
    );
  }
  handleChangeOption(value) {
    this.setState({selected_order: value}, () =>
      console.log('order', this.state.selected_order),
    );
  }
  onSearchPressed = () => {
    // console.log("price", price);
    console.log('rating on press', this.state.rating);
    if (this.state.sliderValue === 0.0) {
      let price = '';
      this.props.searchOwnVehicle(
        this.state.brandSelected,
        this.state.modelSelected,
        price,
        this.state.rating,
        this.state.selected_order,
      );
    } else {
      let price = this.state.sliderValue * 100000;
      this.props.searchOwnVehicle(
        this.state.brandSelected,
        this.state.modelSelected,
        price,
        this.state.rating,
        this.state.selected_order,
      );
    }
  };
  searchlist = () => {
    // this.setState({
    //   selected_order: "",
    //   brandSelected: "",
    //   modelSelected: "",
    //   sliderValue: 0.0,
    //   rating: 0.0,
    //   checked: true
    // });
    Actions.sell();
  };
  alertSearch = () => {
    // this.props.resetSearchList();
    // this.setState({
    //   selected_order: "",
    //   brandSelected: "",
    //   modelSelected: "",
    //   sliderValue: 0.0,
    //   rating: 0.0,
    //   checked: true
    // });
    Alert.alert(
      '',
      'No bikes found',
      [
        {
          text: 'OK',
          onPress: () => {
            // console.log("ok pressed");
            Actions.sell();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading ? <Spinner /> : null}

        {/* {this.props.search ? (
          this.props.search.error === false ? (
            this.props.search.data.length > 0 ? (
              <View>{this.searchlist()}</View>
            ) : (
              <View>{this.alertSearch()}</View>
            )
          ) : null
        ) : null} */}
        {this.state.search_message === false ? (
          this.props.search.length === 0 ? (
            <View>{this.alertSearch()}</View>
          ) : (
            <View>{this.searchlist()}</View>
          )
        ) : null}
        <ScrollView>
          <View style={styles.container}>
            {/* <View style={{ justifyContent: "space-evenly" }}> */}
            <Text style={styles.text1}> Brand </Text>
            <SearchBrand onSearchBrand={this.onSearchBrand} />
            <Text style={styles.text1}> Model </Text>
            <SearchModel onSearchModel={this.onSearchModel} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.text1}>Price</Text>
              {this.state.sliderValue === 0 ? (
                <Text style={styles.text2}>Any</Text>
              ) : this.state.sliderValue === 10 ? (
                <Text style={styles.text2}>
                  {'<'} {this.state.sliderValue} {'+'} Lakh
                </Text>
              ) : (
                <Text style={styles.text2}>
                  {'<'} {this.state.sliderValue} Lakh
                </Text>
              )}
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'flex-start'}}>
                <Text style={styles.text}> Any </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.text}> 5 Lakh </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.text}>10 {'+'} LAKH</Text>
                {/* <Text
                style={{
                  // lineHeight: 13,
                  fontSize: 15,
                  marginBottom: 6
                }}
              >
                +
              </Text>
              <Text style={styles.text}>LAKH</Text> */}
              </View>
            </View>
            <Slider
              style={{color: Theme.colors.navyBlue, marginBottom: 5}}
              // value={this.state.price}
              maximumTrackTintColor={Theme.colors.navyBlue}
              minimumTrackTintColor={Theme.colors.navyBlue}
              thumbTintColor={Theme.colors.navyBlue}
              onValueChange={value =>
                this.setState({sliderValue: value, onchange: true})
              }
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={this.state.sliderValue}
            />
            <Text style={styles.text1}> Sort By : </Text>
            <View
              style={{
                height: 50,
                flex: 9,
                borderWidth: 1,
                // borderColor: 'rgba(0, 0, 0, 0.1)',
                borderColor: Theme.colors.gray,
                borderRadius: 5,
                margin: 5,
                // justifyContent: 'center',
                // alignItems: 'center',
              }}>
              <Picker
                style={{
                  backgroundColor: Theme.colors.lightBlue,
                  width: '100%',
                  borderWidth: 0,
                  borderRadius: 5,
                  height: '100%',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}
                selectedValue={this.state.selected_order}
                // onValueChange={(value, itemIndex) =>
                //   this.setState({ selected_order: value }, () =>
                //     console.log("selected order", this.state.selected_order)
                //   )
                // }
                onValueChange={value => this.handleChangeOption(value)}
                placeholder="Date (Newest)"
                placeholderStyle={{color: 'black', fontSize: 20}}>
                <Picker.Item label="Date (Oldest)" value="old" color="black" />
                <Picker.Item
                  label="Date (Newest)"
                  value="newest"
                  color="black"
                />
                <Picker.Item
                  label="Price (High to Low)"
                  value="desc"
                  color="black"
                />
                <Picker.Item
                  label="Price (Low to high)"
                  value="asc"
                  color="black"
                />
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <View style={{flex: 2, justifyContent: 'flex-start'}}>
                <Text style={styles.text1}>Condition</Text>
              </View>
              {/* <CheckBox
                containerStyle={{
                  backgroundColor: Theme.colors.lightBlue,
                  borderColor: Theme.colors.lightBlue
                }}
                center
                size={25}
                textStyle={{ color: Theme.colors.navyBlue, fontWeight: "bold" }}
                title={<Text>Any</Text>}
                checkedColor={Theme.colors.navyBlue}
                checked={this.state.checked}
                // onPress={() => this.setState({ checked: !this.state.checked })}
                onPress={() => this.checkPressed(this.state.checked)}
              /> */}
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  flexDirection: 'row',
                }}>
                <Icon
                  style={{margin: 5}}
                  name={
                    this.state.checked
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  color={Theme.colors.navyBlue}
                  size={20}
                  onPress={() => this.checkPressed(this.state.checked)}
                />
                <Text
                  style={{
                    color: Theme.colors.navyBlue,
                    fontWeight: 'bold',
                    margin: 5,
                  }}>
                  Any
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 4,
                marginRight: 4,
                marginTop: 5,
                marginBottom: 5,
              }}>
              <StarRating
                containerStyle={{margin: 2}}
                disabled={false}
                // emptyStar={"star-o"}
                // fullStar={"star"}
                emptyStar={require('../../../images/star_lg_gray.png')}
                fullStar={require('../../../images/star_lg_blue.png')}
                maxStars={5}
                starSize={25}
                rating={this.state.rating}
                // rating={this.state.checked? }
                selectedStar={rating => this.ratingCompleted(rating)}
                // fullStarColor={Theme.colors.navyBlue}
                // emptyStarColor={Theme.colors.navyBlue}
              />
            </View>
            <View style={{alignItems: 'center', margin: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.onSearchPressed()}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  Search
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 10,
    backgroundColor: Theme.colors.lightBlue,
    justifyContent: 'space-between',
  },
  text: {
    color: 'gray',
    fontSize: 20,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  text1: {
    color: Theme.colors.navyBlue,
    // fontFamily: 'Qanelas-SemiBold',
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10,
  },
  text2: {
    color: Theme.colors.navyBlue,
    fontSize: 15,
    margin: 5,
  },
  button: {
    width: screenWidth - 30,
    alignItems: 'center',
    backgroundColor: 'green',
    margin: 5,
    padding: 10,
  },
});

const mapStateToProps = state => {
  console.log('search list', state.vehicle.searchList);
  console.log('search result', state.vehicle.own_search_result);
  // console.log("edit success response", state.vehicle.editFromCam);
  return {
    search: state.vehicle.searchList,
    search_msg: state.vehicle.own_search_result,
    loading: state.vehicle.loading,
  };
};

export default connect(
  mapStateToProps,
  {searchOwnVehicle, resetSearchList},
)(SearchSell);
// export default Search;
