/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//import Button from '../common/Button/Button'
import {loginlist} from '../../actions/LoginAction';
import {resetSearchList} from '../../actions/VehicleAction';
import {Actions} from 'react-native-router-flux';
import Storage from '../storage/Storage';
import {connect} from 'react-redux';
import Theme from '../common/Utility/Colors';

let screenHeight = Dimensions.get('window').height;

class NavBarSell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // like: props.wishCount
      like: '',
      editmsg: '',
      searchIconChange: 'white',
    };
    this.likePressed = this.likePressed.bind(this);
    this.searchPressed = this.searchPressed.bind(this);
  }
  likePressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.like();
      }
    });
  };
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {
    if (nextProps.wishCount !== this.props.wishCount) {
      this.setState({like: nextProps.wishCount});
    }

    // if (nextProps.editMsg !== this.props.editMsg) {
    //   this.setState({
    //     editmsg: nextProps.editMsg,
    //     like: nextProps.wishCount++
    //   });
    // }
  }
  searchPressed = () => {
    this.props.resetSearchList();
    // Actions.searchSell();
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      console.log('rantest valuesss', value);
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.searchSell();
      }
    });
  };
  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={{
            // // margin: 20,
            // marginTop: Platform.OS === 'ios' ? 28 : 15,
            // // marginBottom: 10,
            // marginRight: 20,
            // marginLeft: 20,
            // flexDirection: 'row',
            marginTop: Platform.OS === 'ios' ? 28 : null,
            marginHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            this.searchPressed();
          }}>
          <Icon
            name={'search'}
            color={this.props.search_msg === false ? Theme.colors.red : 'white'}
            size={25}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // // margin: 20,
            // marginTop: Platform.OS === 'ios' ? 28 : 15,
            // // marginBottom: 10,
            // marginRight: 20,
            // marginLeft: 20,
            // flexDirection: 'row',
            marginTop: Platform.OS === 'ios' ? 28 : null,
            marginHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => this.likePressed()}>
          <Icon name={'heart'} color={Theme.colors.red} size={25} />
          {this.props.wishCount > 0 ? (
            <Text
              style={{
                fontSize: 10,
                color: 'white',
                marginTop: 15,
                marginLeft: 0.5,
              }}>
              {this.props.wishCount}
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navbar: {
    // flexDirection: 'row',
    // backgroundColor: Theme.colors.navyBlue,
    // justifyContent: 'flex-end',
    // // alignItems: 'center',
    // paddingTop: 5,
    // paddingBottom: 10,
    // height: screenHeight * 0.09,
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? screenHeight * 0.11 : screenHeight * 0.09,
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
});

const mapStateToProps = state => {
  console.log('get wish count sell', state.login.wishList_count);
  console.log('icon color for oqn search', state.vehicle.own_search_result);
  return {
    wishCount: state.login.wishList_count,
    loading: state.login.loading,
    add_wish: state.login.addwish,
    remove_wish: state.login.removewish,
    search: state.vehicle.searchList,
    search_msg: state.vehicle.own_search_result,
  };
};

export default connect(
  mapStateToProps,
  {loginlist, resetSearchList},
)(NavBarSell);
// export default NavBarComponent;
