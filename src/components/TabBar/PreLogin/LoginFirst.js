import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

class LoginFirst extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text1}>
          You need to login before listing bike. Click below to login.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.login();
          }}>
          <Text style={styles.text}>Login now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#002248',
    padding: 5,
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
});

export default LoginFirst;
