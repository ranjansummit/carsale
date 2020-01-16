import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import React, {Component} from 'react';
//import Button from '../common/Button/Button'
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Theme from '../../common/Utility/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';

let screenHeight = Dimensions.get('window').height;

class NavBarAddVehicle extends Component {
  constructor(props) {
    super(props);
    this.previewPressed = this.previewPressed.bind(this);
    // this.cencelPressed = this.cancelPressed.bind(this);
  }

  previewPressed() {
    if (
      (this.props.cam1 &&
        this.props.cam2 &&
        this.props.cam3 &&
        this.props.cam4) === '' &&
      (this.props.front_side_image &&
        this.props.back_side_image &&
        this.props.right_side_image &&
        this.props.left_side_image) !== ''
    ) {
      Actions.preview();
    } else if (
      (this.props.front_side_image &&
        this.props.back_side_image &&
        this.props.right_side_image &&
        this.props.left_side_image) === '' &&
      (this.props.cam1 &&
        this.props.cam2 &&
        this.props.cam3 &&
        this.props.cam4) !== ''
    ) {
      Actions.preview();
    } else {
      // Actions.preview();
      Alert.alert(
        '',
        'Please select 4 photos',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={{
            marginTop: Platform.OS === 'ios' ? 28 : null,
            marginHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={() => {
            Actions.add1();
            // this.cancelPressed;
          }}>
          {/* <Text style={styles.text}> Cancel </Text> */}
          <Icon name="arrow-left" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: Platform.OS === 'ios' ? 28 : null,
            marginHorizontal: 10,
            flexDirection: 'row',
          }}
          onPress={
            this.previewPressed
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
          <Text style={styles.text}> Preview </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navbar: {
    // flexDirection: 'row',
    // backgroundColor: Theme.colors.navyBlue,
    // justifyContent: 'space-between',
    // // alignItems: 'center',
    // paddingTop: 5,
    // paddingBottom: 10,
    // height: screenHeight * 0.1,
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
});

const mapStateToProps = state => {
  console.log('edit clicked', state.vehicle.editVal);
  return {
    front_side_image: state.image.device_image1,
    back_side_image: state.image.device_image2,
    right_side_image: state.image.device_image3,
    left_side_image: state.image.device_image4,

    cam1: state.image.image1,
    cam2: state.image.image2,
    cam3: state.image.image3,
    cam4: state.image.image4,
    brand_name: state.login.brandname,
    engine_capacity: state.login.capacity,
    rating: state.login.rating,
    lot: state.login.lot,
    odometer: state.login.odometer,
    mileage: state.login.mileage,
    price: state.login.price,
    editValue: state.vehicle.editVal,
  };
};

export default connect(
  mapStateToProps,
  {},
)(NavBarAddVehicle);
// export default NavBarAddVehicle;
