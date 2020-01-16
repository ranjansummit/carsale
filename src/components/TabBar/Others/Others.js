/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {loginlist} from '../../../actions/LoginAction';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage from '../../storage/Storage';
import Theme from '../../common/Utility/Colors';

class Others extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }
  profilePressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.profile();
      }
    });
  };
  wishPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.like();
      }
    });
  };
  transactionPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.transactionList();
      }
    });
  };
  onHelpPressed = () => {
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      if (value === '0') {
        return Actions.login();
      } else {
        return Actions.helpFeedback();
      }
    });
  };
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.profilePressed()}>
          <Text style={styles.text}>My Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
          }}
          onPress={() => this.wishPressed()}>
          <Text style={styles.text}>My Wishlist </Text>
          {this.props.wishCount > 0 ? (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 18,
                marginLeft: 2,
              }}>
              <Icon name={'heart'} color={Theme.colors.red} size={25} />
              <Text
                style={{
                  fontSize: 10,
                  color: 'white',
                  marginTop: 20,
                  marginLeft: 0.5,
                }}>
                {this.props.wishCount}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.transactionPressed()}>
          <Text style={styles.text}>Transaction History </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.about_us();
          }}>
          <Text style={styles.text}>About Us </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Actions.termsConditions();
          }}>
          <Text style={styles.text}>T&Cs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.onHelpPressed();
          }}>
          <Text style={styles.text}>Help & FeedBack</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'center',
    // paddingTop: 50,
    // paddingRight: 20,
    paddingLeft: 10,
    // paddingBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
});

const mapStateToProps = state => {
  console.log('get wish count', state.login.wishList_count);
  return {
    wishCount: state.login.wishList_count,
    loading: state.login.loading,
  };
};
export default connect(
  mapStateToProps,
  {loginlist},
)(Others);
