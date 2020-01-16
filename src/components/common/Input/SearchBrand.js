/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  // Picker,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Picker} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {preloginsearch, modellist} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';
class SearchBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: '',
      selectedBrand: '',
      selectedforEdit: this.props.selllist,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.setState({selectedId: ''});
    // });
  }
  handleChangeOption(value) {
    this.setState({selectedId: value});
    console.log('brand id', value);
    var data = this.props.list;
    var brandName = data
      .filter(item => item.brand_id === value)
      .map(item => item.brand_name);
    console.log('unique brand', brandName);
    // this.setState({ selectedBrand: brandName }, () =>
    //   console.log("brand name", this.state.selectedBrand)
    // );
    // this.props.onUpdateBrand(value, this.state.selectedBrand);
    this.props.onSearchBrand(value, brandName);
    var models = data
      .filter(item => item.brand_id === value)
      .map(item => item.models)
      // .map(models => models.model_name))
      .reduce((a, b) => a.concat(b), []);

    this.props.modellist(models);
  }

  componentDidMount() {
    this.props.preloginsearch();
  }

  render() {
    return (
      <View style={styles.picker}>
        <Picker
          style={styles.input1}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          // onValueChange={(item, index) => this.setState({ selected: item })}
          textStyle={{color: 'black', fontSize: 20}}
          itemTextStyle={{color: 'black', fontSize: 20}}
          placeholder="Any"
          placeholderStyle={{color: 'black', fontSize: 20}}>
          <Picker.Item
            label="Any"
            value=""
            color={Theme.colors.gray}
            fontSize={20}
          />
          {this.props.list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.brand_name}
                value={item.brand_id}
                // color={Theme.colors.navyBlue}
                // fontSize={20}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.prelogin.brandList,
    //  ? state.prelogin.brandList : []
    selllist: state.login.sellList,
  };
};
export default connect(
  mapStateToProps,
  {preloginsearch, modellist},
)(SearchBrand);
