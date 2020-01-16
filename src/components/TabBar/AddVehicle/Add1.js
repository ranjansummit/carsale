import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Rating} from 'react-native-elements';
import {secondAdd} from '../../../actions/LoginAction';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Theme from '../../common/Utility/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Add1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      lot: '',
      odometer: '',
      price: '',
      rating: 0.0,
      error1: false,
      error2: false,
      error3: false,
      error4: false,
    };
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.onNextPressed = this.onNextPressed.bind(this);
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
    Actions.addvehicle();
    return true;
  }
  onNextPressed = (lot, odometer, price, rating) => {
    console.log('compo 2nd', rating);
    if (lot.length === 0) {
      this.setState({error1: true});
    } else if (odometer.length === 0) {
      this.setState({error2: true});
    } else if (price.length === 0) {
      this.setState({error3: true});
    } else if (rating === 0.0) {
      Alert.alert(
        '',
        'Please rate your bike out of 5 according to the condition of your bike',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      this.props.secondAdd(lot, odometer, price, rating);
      Actions.add2();
    }
  };
  ratingCompleted(rating) {
    // console.log("on finish", rating);
    this.setState({rating: rating});
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}>Vehicle registration Lot</Text>
            <View>
              <View>
                <TextInput
                  style={styles.inputText}
                  type="string"
                  required
                  name="lot"
                  placeholder="e.g Ba 46 pa"
                  placeholderTextColor="#808080"
                  // onChange={this.handleLot.bind(this)}
                  onChangeText={lot => this.setState({lot, error1: false})}
                  value={this.state.lot}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error1 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {this.state.error1 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Please provide your vehicle lot
                </Text>
              </View>
            ) : null}
            <Text style={styles.text}>Total odometer readings in ktm</Text>
            <View>
              <View>
                <TextInput
                  style={styles.inputText}
                  type="number"
                  keyboardType="numeric"
                  required
                  name="odometer"
                  placeholder="e.g 20000"
                  placeholderTextColor="#808080"
                  // onChange={this.handleOdometer.bind(this)}
                  onChangeText={odometer =>
                    this.setState({odometer, error2: false})
                  }
                  value={this.state.odometer}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error2 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {this.state.error2 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 2,
                    marginLeft: '30%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Please provide odometer reading
                </Text>
              </View>
            ) : null}
            <Text style={styles.text}>Your selling price in NRs</Text>
            <View>
              <View>
                <TextInput
                  style={styles.inputText}
                  type="number"
                  keyboardType="numeric"
                  required
                  name="price"
                  placeholder="e.g 150000"
                  placeholderTextColor="#808080"
                  // onChange={this.handlePrice.bind(this)}
                  onChangeText={price => this.setState({price, error3: false})}
                  value={this.state.price}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error3 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {this.state.error3 ? (
              <View style={{justifyContent: 'flex-end', marginRight: 5}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 2,
                    marginLeft: '40%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Please provide your price
                </Text>
              </View>
            ) : null}
            <Text style={styles.text}>Rate your bike's condition</Text>

            {/* <Rating
            style={{
              alignItems: "center",
              // borderColor: "#002248",
              paddingTop: 10,
              paddingBottom: 30
            }}
            type="custom"
            ratingCount={5}
            ratingImage={require("../../../../images/star_lg_gray.png")}
           
            // borderColor={Theme.colors.navyBlue}
            startingValue={0}
            onFinishRating={this.ratingCompleted}
            imageSize={30}
          /> */}
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
                emptyStar={require('../../../../images/star_lg_gray.png')}
                fullStar={require('../../../../images/star_lg_blue.png')}
                maxStars={5}
                starSize={25}
                rating={this.state.rating}
                selectedStar={rating => this.ratingCompleted(rating)}
                // fullStarColor={Theme.colors.navyBlue}
                // emptyStarColor={Theme.colors.navyBlue}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: Theme.colors.navyBlue,
                marginTop: 30,
                paddingTop: 15,
                paddingBottom: 10,
                alignItems: 'center',
              }}
              onPress={val =>
                this.onNextPressed(
                  this.state.lot,
                  this.state.odometer,
                  this.state.price,
                  this.state.rating,
                )
              }>
              <Text style={{color: 'white', fontSize: 20}}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  // console.log("save brand", state.login.brand);
  return {
    error_msg: state.login.notify,
    list: state.login.detailList,
  };
};

export default connect(
  mapStateToProps,
  {secondAdd},
)(Add1);

// export default Add1;
