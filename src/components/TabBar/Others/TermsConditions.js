/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  // WebView,
  BackHandler,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {WebView} from 'react-native-webview';

export class TermsConditions extends Component {
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
    // Actions.loggedinDetails();
    return true;
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'http://bhatbhate.net/terms-and-condition',
        }}
      />
    );
  }
}
