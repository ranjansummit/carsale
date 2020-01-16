import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
//import Button from '../common/Button/Button'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Theme from '../../common/Utility/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

let screenHeight = Dimensions.get('window').height;

const NavBarEditVehicle = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={{
          marginTop: Platform.OS === 'ios' ? 28 : null,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}
        onPress={() => Actions.edit2()}>
        {/* <Text style={styles.text}> Cancel </Text> */}
        <Icon name="arrow-left" size={25} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginTop: Platform.OS === 'ios' ? 28 : null,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}
        onPress={() => Actions.editPreview()}>
        <Text style={styles.text}> Preview </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  navbar: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? screenHeight * 0.11 : screenHeight * 0.09,
  },

  text: {
    color: 'white',
    fontSize: 18,
  },
};

export default NavBarEditVehicle;
