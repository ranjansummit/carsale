import React, {Component} from 'react';
import {Picker, Text, View} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import {engine} from '../../../actions/PreLoginAction';
import styles from './styles';
import Theme from '../Utility/Colors';
class ModelPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: -1,
    };
  }
  handleChangeOption(value) {
    this.setState({selectedId: value});
    console.log('model id', value);
    var data = this.props.list;
    var modelName = data
      .filter(item => item.model_id == value)
      .map(item => item.model_name);
    console.log('unique model', modelName);
    this.props.onUpdateModel(value, modelName);

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
        <Picker
          style={styles.input}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          prompt={'Select the Model'}>
          <Picker.Item label="e.g R15, Unicorn" value={-1} color="#808080" />
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
  return {
    list: state.prelogin.modelList,
    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(ModelPicker);
