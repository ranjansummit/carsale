import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Theme from '../common/Utility/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={{marginTop: 50, marginBottom: 10}}
          onPress={() => {
            Actions.profile();
            // this.cancelPressed;
          }}>
          {/* <Text style={styles.text}> Cancel </Text> */}
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 50, marginBottom: 10}}
          onPress={
            this.savePressed
            // (this.props.front_side_image,
            // this.props.back_side_image,
            // this.props.right_side_image,
            // this.props.left_side_image,
            // this.props.brand_name,
            // this.props.engine_capacity,
            // this.props.rating,
            // this.props.lot,
            // this.props.odometer,
            // this.props.mileage,
            // this.props.price)
          }>
          <Text style={styles.text}> Save </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navbar: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: Theme.colors.navyBlue,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {},
)(NavBar);
// export default NavBarAddVehicle;
