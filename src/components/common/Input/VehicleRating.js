/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {prelogindetails} from '../../../actions/PreLoginAction';

class VehicleRating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 5,
        }}>
        <Text style={{color: '#002248', padding: 5, fontSize: 15}}>
          Condition
        </Text>
        {this.props.list.map(item => (
          <Rating
            borderColor={'#002248'}
            type="custom"
            ratingCount={5}
            imageSize={12}
            startingValue={item.rating}
          />
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log("rating", state.prelogin.rating);
  return {
    list: state.prelogin.preloginDetails,
  };
};
export default connect(
  mapStateToProps,
  {prelogindetails},
)(VehicleRating);
