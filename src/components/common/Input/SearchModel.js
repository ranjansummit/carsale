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

class SearchModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: '',
    };
  }

  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   this.setState({selectedId: ''});
    // });
  }
  handleChangeOption(value) {
    this.setState({selectedId: value});
    console.log('model id', value);
    var data = this.props.list;
    var modelName = data
      .filter(item => item.model_id === value)
      .map(item => item.model_name);
    console.log('unique model', modelName);
    this.props.onSearchModel(value, modelName);

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
        <Picker
          style={styles.input1}
          selectedValue={this.state.selectedId}
          onValueChange={value => this.handleChangeOption(value)}
          {...this.props}
          textStyle={{color: 'black', fontSize: 20}}
          itemTextStyle={{color: 'black', fontSize: 20}}
          placeholder="Any"
          placeholderStyle={{color: 'black', fontSize: 20}}
          // prompt={'Select the Model'}
        >
          <Picker.Item label="Any" value="" />
          {this.props.list.map((item, index) => {
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
  // console.log("model name", state.prelogin.modelList);
  return {
    list: state.prelogin.modelList,
    // ? state.prelogin.modelList : []
  };
};
export default connect(
  mapStateToProps,
  {engine},
)(SearchModel);
