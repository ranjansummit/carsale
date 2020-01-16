import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {preloginlist} from '../../../actions/PreLoginAction';
import {connect} from 'react-redux';

class IconColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      //   data: this.props.wishcount
    };
  }
  buttonClicked = () => {
    const newState = !this.state.toggle;
    this.setState({toggle: newState});
  };
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          onPress={() => this.buttonClicked()}
          name={this.state.toggle ? 'heart' : 'heart-o'}
          color={this.state.toggle ? 'red' : 'gray'}
          size={30}
          style={{marginBottom: 10, marginTop: 20}}
          borderColor="red"
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('testcount', state.prelogin.like);
  return {
    data: state.prelogin.preloginList.data,
  };
};

export default connect(
  mapStateToProps,
  {preloginlist},
)(IconColor);

// export default IconColor;
