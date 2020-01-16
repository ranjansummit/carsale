import React, {Component} from 'react';
import {Picker, Text, View, StyleSheet} from 'react-native';
// import { Picker } from "native-base";
import axios from 'axios';
import {connect} from 'react-redux';
import {preloginsearch, modellist} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';

class BrandPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: -1,
      selectedBrand: '',
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }
  handleChangeOption(value) {
    this.setState({selectedId: value});
    console.log('brand id', value);
    var data = this.props.list;
    var brandName = data
      .filter(item => item.brand_id == value)
      .map(item => item.brand_name);
    console.log('unique brand', brandName);
    // this.setState({ selectedBrand: brandName }, () =>
    //   console.log("brand name", this.state.selectedBrand)
    // );
    // this.props.onUpdateBrand(value, this.state.selectedBrand);
    this.props.onUpdateBrand(value, brandName);
    var models = data
      .filter(item => item.brand_id == value)
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
      <View>
        <View style={styles.picker}>
          <Picker
            style={styles.input}
            selectedValue={this.state.selectedId}
            onValueChange={value => this.handleChangeOption(value)}
            {...this.props}
            // onValueChange={(item, index) => this.setState({ selected: item })}
            itemStyle={{fontSize: 20}}
            // prompt={"Select the Brand"}

            prompt={'select the brand'}>
            <Picker.Item
              label="e.g Yamaha, Honda"
              value={-1}
              color={Theme.colors.gray}
              fontSize={20}
            />
            {this.props.list.map((item, index) => {
              return (
                <Picker.Item
                  key={index}
                  label={item.brand_name}
                  value={item.brand_id}
                  color={Theme.colors.navyBlue}
                  fontSize={20}
                />
              );
            })}
          </Picker>
        </View>
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
)(BrandPicker);
