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

class EditBrandPickerIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.uniqueList.brand_id,
      changed: false,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentDidMount() {
    this.props.preloginsearch();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uniqueList !== this.props.uniqueList) {
      this.setState({selectedId: nextProps.uniqueList.brand_id});
    }
  }
  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    console.log('brand id', value);
    var data = this.props.list;
    var brandName = data
      .filter(item => item.brand_id === value)
      .map(item => item.brand_name);
    console.log('unique brand', brandName);
    this.props.onEditBrand(value, brandName);

    var models = data
      .filter(item => item.brand_id === value)
      .map(item => item.models)
      // .map(models => models.model_name))
      .reduce((a, b) => a.concat(b), []);

    this.props.modellist(models);
  }
  render() {
    return (
      <View style={styles.picker}>
        {console.log('brand name', this.state.selectedId)}
        <Picker
          mode="dropdown"
          // iosIcon={<Icon name="arrow-down" />}
          placeholder="e.g Yamaha, Honda"
          placeholderStyle={{color: Theme.colors.gray, fontSize: 20}}
          style={styles.input1}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          // onValueChange={this.onValueChange.bind(this)}
          textStyle={{color: Theme.colors.navyBlue, fontSize: 20}}
          itemTextStyle={{color: Theme.colors.navyBlue, fontSize: 20}}>
          {this.props.list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.brand_name}
                value={item.brand_id}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('edit sell list ', state.login.sellDetails);
  return {
    list: state.prelogin.brandList,
    //  ? state.prelogin.brandList : []

    uniqueList: state.login.sellDetails,
  };
};
export default connect(
  mapStateToProps,
  {preloginsearch, modellist},
)(EditBrandPickerIOS);

//picker for android
{
  /* <Picker
style={styles.input}
selectedValue={
  // this.state.changed
  //   ? this.state.selectedId
  //   : this.props.uniqueList.map(item => item.brand_id)
  this.state.selectedId
}
onValueChange={value => this.handleChangeOption(value)}
{...this.props}> */
}
{
  /* {this.props.uniqueList.map((item, index) => {
  return (
    <Picker.Item
      key={index}
      label={item.brand_name}
      value={item.brand_id}
      color={Theme.colors.navyBlue}
    />
  );
})} */
}
{
  /* <Picker.Item
  label={this.props.uniqueList.brand_name}
  value={this.props.uniqueList.brand_id}
  color={Theme.colors.navyBlue}
/>
{this.props.list.map((item, index) => {
  return (
    <Picker.Item
      key={index}
      label={item.brand_name}
      value={item.brand_id}
      color={Theme.colors.navyBlue}
    />
  );
})}
</Picker> */
}
