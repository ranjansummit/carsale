/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  // Picker,
  Text,
  View,
} from 'react-native';
import {Icon, Picker} from 'native-base';
import axios from 'axios';
import {connect} from 'react-redux';
import {engine} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';

class EditModelPickerIOS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.uniqueList.model_id,
      selectedLabel: props.uniqueList.model_name,
      changed: false,
      model_list: props.list,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uniqueList !== this.props.uniqueList) {
      console.log('selected id in modelpicker', this.state.selectedId);
      this.setState({selectedId: nextProps.uniqueList.model_id}, () =>
        console.log('selected id in modelpicker 2nd', this.state.selectedId),
      );
    }
    if (nextProps.list !== this.props.list) {
      this.setState({model_list: nextProps.list}, () =>
        console.log('selected id in modelpicker 2nd', this.state.model_list),
      );
    }
  }
  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    console.log('model id', value);
    var data = this.props.list;
    var modelName = data
      .filter(item => item.model_id === value)
      .map(item => item.model_name);
    console.log('unique model', modelName);
    this.props.onEditModel(value, modelName);

    var engines = data
      .filter(item => item.model_id === value)
      .map(item => item.engines)
      .reduce((a, b) => a.concat(b), []);

    console.log('engine listing', engines);
    this.props.engine(engines);
  }

  render() {
    return (
      <View style={styles.picker}>
        {console.log('model name', this.state.selectedId)}
        <Picker
          mode="dropdown"
          // iosIcon={<Icon name="arrow-down" />}
          // placeholder={this.state.selectedLabel}
          placeholder="e.g R15, Unicorn"
          placeholderStyle={{color: Theme.colors.gray, fontSize: 20}}
          // placeholderIconColor="#007aff"
          style={styles.input1}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          // onValueChange={this.onValueChange.bind(this)}
          textStyle={{color: Theme.colors.navyBlue, fontSize: 20}}
          itemTextStyle={{color: Theme.colors.navyBlue, fontSize: 20}}>
          {this.state.model_list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.model_name}
                value={item.model_id}
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
  console.log('model name', state.prelogin.modelList);
  console.log('model sell list', state.login.sellDetails);
  return {
    list: state.prelogin.modelList,
    uniqueList: state.login.sellDetails,
    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(EditModelPickerIOS);

//for android
{
  /* <Picker
style={styles.input}
selectedValue={
  // this.state.changed
  //   ? this.state.selectedId
  //   : this.props.uniqueList.map(item => item.model_id)
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
      label={item.model_name}
      value={item.model_id}
      color={Theme.colors.navyBlue}
    />
  );
})} */
}
{
  /* <Picker.Item
  label={this.props.uniqueList.model_name}
  value={this.props.uniqueList.model_id}
  color={Theme.colors.navyBlue}
/> */
}
{
  /* <Picker.Item label="e.g R15, Unicorn" value="0" color="black" /> */
}
// {this.props.list.map((item, index) => {
//   return (
//     <Picker.Item
//       key={index}
//       label={item.model_name}
//       value={item.model_id}
//       color={Theme.colors.navyBlue}
//     />
//   );
// })}
// </Picker>
