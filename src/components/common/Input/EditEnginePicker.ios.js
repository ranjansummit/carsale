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
import {engine} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';

class EditEnginePickerIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.uniqueList.engine_capacity_id,
      // selectedLabel: props.uniqueList.engine_capacity,
      changed: false,
      engine_list: props.list,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentDidMount() {
    console.log('selected id', this.state.selectedId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.uniqueList !== this.props.uniqueList) {
      console.log('selected id in modelpicker', this.state.selectedId);
      this.setState(
        {
          selectedId: nextProps.uniqueList.engine_capacity_id,
        },
        () =>
          console.log('selected id in modelpicker 2nd', this.state.selectedId),
      );
    }
    if (nextProps.list !== this.props.list) {
      this.setState(
        {
          engine_list: nextProps.list,
        },
        () =>
          console.log(
            'selected id in enginepicker 2nd',
            this.state.engine_list,
          ),
      );
    }
  }
  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    var data = this.props.list;
    var capacity = data
      .filter(item => item.id === value)
      .map(item => item.capacity);
    console.log('unique capacity', capacity);
    this.props.onEditEngine(value, capacity);
    // console.log("capacity", value);
  }
  render() {
    return (
      <View style={styles.picker}>
        <Picker
          mode="dropdown"
          // iosIcon={<Icon name="arrow-down" />}
          // placeholder={this.state.selectedLabel}
          placeholder="e.g 150, 200"
          placeholderStyle={{color: Theme.colors.gray, fontSize: 20}}
          style={styles.input1}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          // onValueChange={this.onValueChange.bind(this)}
          textStyle={{color: Theme.colors.navyBlue, fontSize: 20}}
          itemTextStyle={{color: Theme.colors.navyBlue, fontSize: 20}}>
          <Picker.Item
            label="Select Engine"
            value=""
            color={Theme.colors.gray}
            fontSize={20}
          />
          {this.state.engine_list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.capacity}
                value={item.id}
                // color={Theme.colors.navyBlue}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // console.log("model name", state.prelogin.modelList);
  console.log('model sell list', state.login.sellDetails);
  return {
    list: state.prelogin.engineList,
    uniqueList: state.login.sellDetails,
    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(EditEnginePickerIOS);

//for android
{
  /* <Picker
style={styles.input}
selectedValue={
  // this.state.changed
  //   ? this.state.selectedId
  //   : this.props.uniqueList.map(item => item.engine_capacity_id)
  this.state.selectedId
}
onValueChange={value => this.handleChangeOption(value)}
{...this.props}>
{/* {this.props.uniqueList.map((item, index) => {
  return (
    <Picker.Item
      key={index}
      label={item.engine_capacity}
      value={item.engine_capacity_id}
      color={Theme.colors.navyBlue}
    />
  );
})} */
}
{
  /* <Picker.Item
  label={this.props.uniqueList.engine_capacity}
  value={this.props.uniqueList.engine_capacity_id}
  color={Theme.colors.navyBlue}
/>
{/* <Picker.Item label="e.g R15, Unicorn" value="0" color="black" /> */
}
// {this.props.list.map((item, index) => {
//   return (
//     <Picker.Item
//       key={index}
//       label={item.capacity}
//       value={item.id}
//       color={Theme.colors.navyBlue}
//     />
//   );
// })} */}
// </Picker> */}
