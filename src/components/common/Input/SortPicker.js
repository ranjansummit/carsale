/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {preloginsearch, modellist} from '../../../actions/PreLoginAction';
import styles from './styles';
class SortPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  //   componentDidMount() {
  //     this.props.preloginsearch();
  //   }

  render() {
    return (
      <View style={styles.picker}>
        <Picker
          style={styles.input}
          selectedValue={this.state.selected}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({selected: itemValue})
          }>
          <Picker.Item label="Data(Oldest)" value="old" />
          <Picker.Item label="Data(Newest)" value="new" />
          <Picker.Item label="Price(High to Low)" value="desc" />
          <Picker.Item label="Price(Low to high)" value="asc" />
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log("brandlist", state.prelogin.brandList);
  return {
    list: state.prelogin.brandList,
    //  ? state.prelogin.brandList : []
  };
};
export default connect(
  mapStateToProps,
  {preloginsearch, modellist},
)(SortPicker);
