/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

import Theme from '../../common/Utility/Colors';

class AboutUsClass extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text
          style={{
            fontSize: 15,
            // fontFamily: 'Roboto-Regular'
          }}>
          BhatBhate lets you easily buy or sell a used bike all from one place.
          We are here to make the used bikes buying and selling process simple,
          transparent and personalized.
          {'\n'} {'\n'}
          Buying a used bike has never been easier or safe. BhatBhate screens
          every bike for fraud and helps buyers avoid scams.
          {'\n'} {'\n'}
          Sellers set their own prices and each bike price is negotiable.
          BhatBhate makes shopping for used bike simple, easy and safe.
          {'\n'} {'\n'}
          BhatBhate is the best used bike marketplace that allows you to shop
          with peace of mind, find the bike you want, and contact your seller
          directly.
          {'\n'} {'\n'}
          Browse verified used bikes for sale:
          {'\n'} {'\n'}
          Scroll through thousands of used bikes or refine your search by year,
          price range, bike model and condition. View high resolution photos
          from Sellers
          {'\n'}
          Buy a quality used bike and save more:
          {'\n'}
          Contact the owner or dealer directly from the app. Find the best local
          used bike deals. All your information is encrypted with bank level
          security.
          {'\n'} {'\n'}
          Selling your bike?
          {'\n'}
          Our app makes it easy to list and sell your bike, on a minimal fee.
          Our picture guide shows you how to take pictures of your bike. Set
          your own price and add your bike's features. Receive inqures from
          buyers and schedule test rides. Quickly close the sale without hassle.
          Shop now and find your perfect bike today!
        </Text>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: Theme.colors.gray,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              color: Theme.colors.navyBlue,
              fontWeight: 'bold',
              // fontFamily: 'Roboto-Regular',
            }}>
            VERSION
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
  },
});

const mapStateToProps = state => {
  return {};
};
export default connect(
  mapStateToProps,
  {},
)(AboutUsClass);
