/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, Button, BackHandler} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Storage from '../storage/Storage';
// import { ButtonGroup } from 'react-native-elements';

class Notification extends Component {
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
    // Actions.loggedinBuy();
    // return true;
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Button title="All" color="#002248" />
          <Button title="Buy" color="#002248" />
          <Button title="Sell" color="#002248" />
          <Button title="Credits" color="#002248" />
        </View>
        <View style={{flex: 4, flexDirection: 'column'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default Notification;
