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

import {connect} from 'react-redux';
import Theme from '../../../common/Utility/Colors';

let screenHeight = Dimensions.get('window').height;

class NavBarCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.navbar}>
        <TouchableOpacity
          style={{
            // margin: 20,
            marginTop: 15,
            // marginBottom: 10,
            marginRight: 20,
            marginLeft: 10,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 10,
          }}
          onPress={() => {}}>
          <Text style={{color: 'white', fontSize: 16}}>Cancel</Text>
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
    paddingTop: 5,
    paddingBottom: 10,
    height: screenHeight * 0.1,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {},
)(NavBarCamera);
// export default NavBarComponent;
