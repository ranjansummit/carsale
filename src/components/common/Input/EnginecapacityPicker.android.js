import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import styles from './styles';
import Theme from '../Utility/Colors';

class EnginecapacityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: -1,
    };
  }
  handleChangeOption(value) {
    this.setState({selectedId: value});
    var data = this.props.list;
    var capacity = data
      .filter(item => item.id == value)
      .map(item => item.capacity);
    console.log('unique capacity', capacity);
    this.props.onUpdateEngine(value, capacity);
    // console.log("capacity", value);
  }
  render() {
    return (
      <View style={styles.picker}>
        <Picker
          style={styles.input}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          prompt={'Select the Engine cc'}>
          <Picker.Item label="e.g 150, 200" value={-1} color="#808080" />
          {this.props.list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.capacity}
                cc
                value={item.id}
                color={Theme.colors.navyBlue}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('engine capacity', state.prelogin.engineList);
  return {
    list: state.prelogin.engineList,
    // ? state.prelogin.engineList : []
  };
};
export default connect(
  mapStateToProps,
  {},
)(EnginecapacityPicker);
