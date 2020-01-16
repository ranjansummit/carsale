import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
// import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {preloginsearch, modellist} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';
class EditBrandPicker extends Component {
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

  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    console.log('brand id', value);
    var data = this.props.list;
    var brandName = data
      .filter(item => item.brand_id == value)
      .map(item => item.brand_name);
    console.log('unique brand', brandName);
    this.props.onEditBrand(value, brandName);

    var models = data
      .filter(item => item.brand_id == value)
      .map(item => item.models)
      // .map(models => models.model_name))
      .reduce((a, b) => a.concat(b), []);

    this.props.modellist(models);
  }
  render() {
    return (
      <View style={styles.picker}>
        <Picker
          style={styles.input}
          selectedValue={
            // this.state.changed
            //   ? this.state.selectedId
            //   : this.props.uniqueList.map(item => item.brand_id)
            this.state.selectedId
          }
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}>
          {/* {this.props.uniqueList.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.brand_name}
                value={item.brand_id}
                color={Theme.colors.navyBlue}
              />
            );
          })} */}
          {/* <Picker.Item
            key={-1}
            label={this.props.uniqueList.brand_name}
            value={this.props.uniqueList.brand_id}
            color={Theme.colors.navyBlue}
          /> */}
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
)(EditBrandPicker);
