/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  // Picker,
  Text,
  View,
  StyleSheet,
  Platform,
  Picker,
} from 'react-native';
import {Picker as PickerIOS} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {preloginsearch, modellist} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';

class BrandPickerIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      selectedId: -1,
      // selectedId: null,
      selectedBrand: '',
      android: false,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }
  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   if (Platform.OS === 'android') {
    //     this.setState({android: 'true'}, () =>
    //       console.log('android', this.state.android),
    //     );
    //   } else {
    //     this.setState({android: 'false'});
    //   }
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
    this.props.onUpdateBrand(value, brandName);
    var models = data
      .filter(item => item.brand_id === value)
      .map(item => item.models)
      // .map(models => models.model_name))
      .reduce((a, b) => a.concat(b), []);

    this.props.modellist(models);
  }
  // onValueChange = value => {
  //   this.setState({
  //     selected: value,
  //   });
  // };
  componentDidMount() {
    this.props.preloginsearch();
  }

  render() {
    return (
      <View>
        <View style={styles.picker}>
          {/* {this.state.android ? (
            <Picker
              style={styles.input}
              selectedValue={this.state.selectedId}
              onValueChange={value => this.handleChangeOption(value)}
              {...this.props}
              // onValueChange={(item, index) => this.setState({ selected: item })}
              // eslint-disable-next-line react-native/no-inline-styles
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
          ) : ( */}
          <PickerIOS
            mode="dropdown"
            // iosIcon={<Icon name="arrow-down" />}
            placeholder="e.g Yamaha, Honda"
            placeholderStyle={{color: Theme.colors.gray, fontSize: 20}}
            // placeholderIconColor="#007aff"
            style={styles.input1}
            selectedValue={this.state.selectedId}
            onValueChange={value => this.handleChangeOption(value)}
            {...this.props}
            // onValueChange={this.onValueChange.bind(this)}
            textStyle={{color: Theme.colors.navyBlue, fontSize: 20}}
            itemTextStyle={{color: Theme.colors.navyBlue, fontSize: 20}}>
            {this.props.list.map((item, index) => {
              return (
                <PickerIOS.Item
                  key={index}
                  label={item.brand_name}
                  value={item.brand_id}
                />
              );
            })}
          </PickerIOS>
          {/* )} */}
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
    savedMsg1: state.vehicle.savedFromDevice,
    savedMsg2: state.vehicle.savedFromCam,
  };
};
export default connect(
  mapStateToProps,
  {preloginsearch, modellist},
)(BrandPickerIOS);
