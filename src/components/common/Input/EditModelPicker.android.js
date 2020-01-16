import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
// import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import {engine} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';
import {Spinner} from '../../common/Utility/Spiner';

class EditModelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.uniqueList.model_id,
      changed: false,
    };
    this.handleChangeOption = this.handleChangeOption.bind(this);
  }
  handleChangeOption(value) {
    this.setState({selectedId: value, changed: true});
    console.log('model id', value);
    var data = this.props.list;
    var modelName = data
      .filter(item => item.model_id == value)
      .map(item => item.model_name);
    console.log('unique model', modelName);
    this.props.onEditModel(value, modelName);

    var engines = data
      .filter(item => item.model_id == value)
      .map(item => item.engines)
      .reduce((a, b) => a.concat(b), []);

    console.log('engine listing', engines);
    this.props.engine(engines);
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
            //   : this.props.uniqueList.map(item => item.model_id)
            this.state.selectedId
          }
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}>
          {/* {this.props.uniqueList.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.model_name}
                value={item.model_id}
                color={Theme.colors.navyBlue}
              />
            );
          })} */}
          {/* <Picker.Item
            key={-2}
            label={this.props.uniqueList.model_name}
            value={this.props.uniqueList.model_id}
            color={Theme.colors.navyBlue}
          /> */}
          {/* <Picker.Item label="e.g R15, Unicorn" value="0" color="black" /> */}
          {this.props.list.map((item, index) => {
            return (
              <Picker.Item
                key={index}
                label={item.model_name}
                value={item.model_id}
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
    list: state.prelogin.modelList,
    uniqueList: state.login.sellDetails,
    loading: state.prelogin.loading,

    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(EditModelPicker);
