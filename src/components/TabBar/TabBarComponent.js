/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import Storage from '../storage/Storage';
import Theme from '../common/Utility/Colors';
import {resetDetailList} from '../../actions/LoginAction';
import {resetSearchList} from '../../actions/VehicleAction';
import {connect} from 'react-redux';
import {getProfile} from '../../actions/ProfileAction';

let screenWidth = Dimensions.get('window').width;
class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // textColor: "white",
      btn1: true,
      btn2: false,
      btn3: false,
      btn4: false,
      credits: props.profile_credits,
      // profile_list: props.profile_details,
      profile_list: [],
    };
  }
  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.props.getProfile();
    // });

    Storage.getLoggedin('logedin').then(logedin => {
      if (logedin === '0') {
        this.setState(
          {credits: null},
          console.log('credits before login', this.state.credits),
        );
      } else {
        // Storage.getCredits('credits').then(credits => {
        //   this.setState(
        //     {
        //       credits,
        //     },
        //     () => console.log('credits', this.state.credits),
        //   );
        // });
        this.props.getProfile();
        // if (
        //   this.state.profile_list &&
        //   this.state.profile_list.available_credit
        // ) {
        //   this.setState(
        //     {credits: this.state.profile_list.available_credit},
        //     () => console.log('credits after login', this.state.credits),
        //   );
        // }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_details !== this.props.profile_details) {
      this.setState({
        profile_list: nextProps.profile_details,
      });
    }
    if (nextProps.profile_credits !== this.props.profile_credits) {
      this.setState({credits: nextProps.profile_credits}, () =>
        console.log('next props credits', this.state.credits),
      );
    }
  }

  sellPressed = () => {
    this.setState(
      {
        btn1: false,
        btn2: true,
        btn3: false,
        btn4: false,
      },
      () => console.log('btn2', this.state.btn2),
    );
    this.props.resetSearchList();
    this.props.resetDetailList();
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.loginfirst();
      } else {
        return Actions.sell();
      }
    });
  };
  buyPressed = () => {
    this.setState(
      {
        btn1: true,
        btn2: false,
        btn3: false,
        btn4: false,
      },
      () => console.log('btn1', this.state.btn1),
    );
    this.props.resetSearchList();
    // this.props.resetDetailList();
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.buyl();
      } else {
        return Actions.loggedinBuy();
      }
    });
  };
  render() {
    return (
      <View style={styles.tabbar}>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Theme.colors.navyBlue,
          }}
          onPress={this.buyPressed}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: this.state.btn1 ? Theme.colors.red : 'white',
                textAlign: 'center',
                fontSize: 18,
                // fontWeight: "bold"
              }}
              // onPress={this.buyPressed}
            >
              Buy
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Theme.colors.navyBlue,
          }}
          onPress={this.sellPressed}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              borderLeftColor: 'white',
              borderLeftWidth: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: this.state.btn2 ? Theme.colors.red : 'white',
                textAlign: 'center',
                fontSize: 18,
                // fontWeight: "bold"
              }}

              // onPress={this.sellPressed}
            >
              Sell
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Theme.colors.navyBlue,
          }}
          onPress={() => {
            this.setState({
              btn1: false,
              btn2: false,
              btn3: true,
              btn4: false,
            });
            Actions.credits();
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              borderLeftColor: 'white',
              borderLeftWidth: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: this.state.btn3 ? Theme.colors.red : 'white',
                textAlign: 'center',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              Credits
            </Text>
            {this.state.credits !== null ? (
              <Text
                style={{
                  backgroundColor: Theme.colors.red,
                  borderRadius: 10,
                  paddingHorizontal: 3,
                  paddingVertical: 2,
                  fontSize: 0.03 * screenWidth,
                  color: 'white',
                  marginBottom: 30,
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {this.state.credits}
              </Text>
            ) : //   {/* <View
            //   style={{
            //     height: 20,
            //     width: 20,
            //     backgroundColor: 'red',
            //     borderRadius: 10,
            //     marginTop: 2,
            //   }}> */}
            // {/* </View> */}
            null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: Theme.colors.navyBlue,
          }}
          onPress={() => {
            this.setState({
              btn1: false,
              btn2: false,
              btn3: false,
              btn4: true,
            });
            Actions.others();
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              borderLeftColor: 'white',
              borderLeftWidth: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: this.state.btn4 ? Theme.colors.red : 'white',
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 10,
              }}>
              ...
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tabbar: {
    flex: 0.1,
    flexDirection: 'row',
    margin: 1,
  },
});

const mapStateToProps = state => {
  console.log('profile details', state.profile.profile_details);
  console.log('profile credits', state.profile.profile_credits);
  return {
    search: state.vehicle.searchList,
    loading: state.vehicle.loading,
    loader: state.login.loading,
    own_search_res: state.vehicle.own_search_result,
    search_res: state.vehicle.search_result,
    profile_details: state.profile.profile_details
      ? state.profile.profile_details
      : [],
    profile_credits: state.profile.profile_credits,
  };
};

export default connect(
  mapStateToProps,
  {resetSearchList, resetDetailList, getProfile},
)(TabBarComponent);
