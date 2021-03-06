import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
// import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {engine} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';
import {Spinner} from '../../common/Utility/Spiner';

class EditEnginePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.uniqueList.engine_capacity_id,
      changed: false,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }
  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    var data = this.props.list;
    var capacity = data
      .filter(item => item.id == value)
      .map(item => item.capacity);
    console.log('unique capacity', capacity);
    this.props.onEditEngine(value, capacity);
    // console.log("capacity", value);
  }
  render() {
    return (
      <View style={styles.picker}>
        {this.props.loading ? <Spinner /> : null}
        <Picker
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
          })} */}
          {/* <Picker.Item
            key={-3}
            label={this.props.uniqueList.engine_capacity}
            value={this.props.uniqueList.engine_capacity_id}
            color={Theme.colors.navyBlue}
          /> */}
          {/* <Picker.Item label="e.g R15, Unicorn" value="0" color="black" /> */}
          {this.props.list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.capacity}
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
  // console.log("model name", state.prelogin.modelList);
  console.log('model sell list', state.login.sellDetails);
  return {
    list: state.prelogin.engineList,
    uniqueList: state.login.sellDetails,
    loading: state.prelogin.loading,
    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(EditEnginePicker);
