import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {connect} from 'react-redux';
import Spinner from '../../../common/Utility/Spiner';
import {RNCamera} from 'react-native-camera';
import {confirmQR} from '../../../../actions/CreditsAction';

let screenWidth = Dimensions.get('window').width;

class CreditPurchased extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.navyBlue,
    // padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  mid: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  midText1: {
    fontSize: 16,
    color: 'black',
    // textAlign: 'left',
  },
  midText2: {
    fontSize: 16,
    color: 'black',
    // textAlign: 'right',
  },
  lineStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 0.5,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {confirmQR},
)(CreditPurchased);
