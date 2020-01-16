import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import {
  firstAdd,
  sellList,
  firstEdit,
  logindetails,
} from '../../../actions/LoginAction';
import {connect} from 'react-redux';
import EditBrandPicker from '../../common/Input/EditBrandPicker.android';
import EditBrandPickerIOS from '../../common/Input/EditBrandPicker.ios';
import EditModelPicker from '../../common/Input/EditModelPicker.android';
import EditModelPickerIOS from '../../common/Input/EditModelPicker.ios';
import EditEnginePicker from '../../common/Input/EditEnginePicker.android';
import EditEnginePickerIOS from '../../common/Input/EditEnginePicker.ios';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Theme from '../../common/Utility/Colors';

class Edit1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      // brandIdSelected: "",
      // brandNameSelected: "",
      // modelIdSelected: "",
      // modelNameSelected: "",
      // engineIdSelected: "",
      // engineCapacitySelected: "",

      // mileage: "",
      // mileage: props.uniqueList.map(item => item.mileage).toString(),
      brandIdSelected: props.uniqueList.brand_id,
      brandNameSelected: props.uniqueList.brand_name,
      modelIdSelected: props.uniqueList.model_id,
      modelNameSelected: props.uniqueList.model_name,
      engineIdSelected: props.uniqueList.engine_capacity_id,
      engineCapacitySelected: props.uniqueList.engine_capacity,
      mileage: props.uniqueList.mileage,
      changeMileage: false,
    };
    this.onEditBrand = this.onEditBrand.bind(this);
    this.onEditModel = this.onEditModel.bind(this);
    this.onEditEngine = this.onEditEngine.bind(this);
    this.onNextPressed = this.onNextPressed.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('next props in first edit', nextProps);
    if (nextProps.uniqueList !== this.props.uniqueList) {
      this.setState({
        mileage: nextProps.uniqueList.mileage,
        brandIdSelected: nextProps.uniqueList.brand_id,
        brandNameSelected: nextProps.uniqueList.brand_name,
        modelIdSelected: nextProps.uniqueList.model_id,
        modelNameSelected: nextProps.uniqueList.model_name,
        engineIdSelected: nextProps.uniqueList.engine_capacity_id,
        engineCapacitySelected: nextProps.uniqueList.engine_capacity,
      });
    }
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    Actions.sell();
    // return true;
  }
  onEditBrand = (val, name) => {
    // console.log("id", val);
    // console.log("name", name);
    this.setState({brandIdSelected: val, brandNameSelected: name}, () =>
      console.log('brand', this.state.brandNameSelected),
    );
  };
  onEditModel = (val, name) => {
    this.setState({modelIdSelected: val, modelNameSelected: name}, () =>
      console.log('model', this.state.modelNameSelected),
    );
  };
  onEditEngine = (val, capacity) => {
    // console.log("engine there?", capacity);
    this.setState(
      {engineIdSelected: val, engineCapacitySelected: capacity},
      () => console.log('engine', this.state.engineCapacitySelected),
    );
  };
  getIndexFromData(id) {
    let bikeIndex = this.props.list.findIndex(function(data) {
      return data.id == id;
    });
    return bikeIndex;
  }
  onNextPressed = id =>
    // brandid,
    // brandname,
    // modelid,
    // modelname,
    // engineid,
    // capacity,
    // mileage
    {
      // console.log("edited mileage", mileage + brandid+ brand+name);

      // if (brandid === "" && modelid === "" && engineid === "" && mileage === "") {
      //   console.log("validate required");
      //   Alert.alert("Please fill out the above details");
      // } else if (modelid === "") {
      //   Alert.alert("Please fill model details");
      // } else if (engineid === "") {
      //   Alert.alert("Please fill engine details");
      // } else if (mileage === "") {
      //   Alert.alert("Please fill mileage details");
      // } else {
      // if (this.state.changeMileage === true) {
      //   console.log("after edit", this.state.brandIdSelected);
      //   console.log("mileage changed", this.state.mileage);
      //   this.props.firstEdit(
      //     this.state.brandIdSelected,
      //     this.state.brandNameSelected,
      //     this.state.modelIdSelected,
      //     this.state.modelNameSelected,
      //     this.state.engineIdSelected,
      //     this.state.engineCapacitySelected,
      //     this.state.mileage
      //   );
      //   Actions.edit2();
      // } else {
      //   // console.log(
      //   //   "not edited",
      //   //   this.props.uniqueList.map(item => item.mileage)
      //   // );
      //   this.props.firstEdit(
      //     this.state.brandIdSelected,
      //     this.state.brandNameSelected,
      //     this.state.modelIdSelected,
      //     this.state.modelNameSelected,
      //     this.state.engineIdSelected,
      //     this.state.engineCapacitySelected,
      //     this.props.uniqueList.map(item => item.mileage)
      //   );
      //   Actions.edit2();
      // }

      console.log('after edit', this.state.brandIdSelected);
      console.log('after edit', this.state.brandNameSelected);
      console.log('after edit', this.state.modelNameSelected);
      console.log('after edit', this.state.engineCapacitySelected);
      console.log('after edit', this.state.modelIdSelected);
      console.log('after edit', this.state.engineIdSelected);
      console.log('mileage changed', this.state.mileage);
      this.props.firstEdit(
        this.state.brandIdSelected,
        this.state.brandNameSelected,
        this.state.modelIdSelected,
        this.state.modelNameSelected,
        this.state.engineIdSelected,
        this.state.engineCapacitySelected,
        this.state.mileage,
      );
      Actions.edit2();
    };

  render() {
    const {
      brandIdSelected,
      brandNameSelected,
      modelIdSelected,
      modelNameSelected,
      engineIdSelected,
      engineCapacitySelected,
      mileage,
      list,
    } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}> Your bike brand </Text>
          {/* {Platform.OS === 'ios' ? (
            <EditBrandPickerIOS onEditBrand={this.onEditBrand} />
          ) : (
            <EditBrandPicker onEditBrand={this.onEditBrand} />
          )} */}
          <EditBrandPickerIOS onEditBrand={this.onEditBrand} />

          {/* <EditBrandPicker onEditBrand={this.onEditBrand} /> */}
          <Text style={styles.text}> Model of your bike </Text>
          {/* {Platform.OS === 'ios' ? (
            <EditModelPickerIOS onEditModel={this.onEditModel} />
          ) : (
            <EditModelPicker onEditModel={this.onEditModel} />
          )} */}
          <EditModelPickerIOS onEditModel={this.onEditModel} />

          {/* <EditModelPicker onEditModel={this.onEditModel} /> */}

          <Text style={styles.text}>Engine capacity in cc</Text>
          {/* {Platform.OS === 'ios' ? (
            <EditEnginePickerIOS onEditEngine={this.onEditEngine} />
          ) : (
            <EditEnginePicker onEditEngine={this.onEditEngine} />
          )} */}
          <EditEnginePickerIOS onEditEngine={this.onEditEngine} />

          {/* <EditEnginePicker onEditEngine={this.onEditEngine} /> */}

          <Text style={styles.text}>Approx. mileage per litre</Text>
          {/* {this.props.uniqueList.map((item, index) => {
            return ( */}
          <TextInput
            type="number"
            keyboardType="numeric"
            required
            name="mileage"
            placeholder="mileage"
            onChangeText={mileage =>
              this.setState({mileage, changeMileage: true})
            }
            value={this.state.mileage}
            // value={
            //   this.state.changeMileage ? this.state.mileage : item.mileage
            // }
            style={styles.inputText}
          />
          {/* );
          })} */}

          <TouchableOpacity
            style={{
              backgroundColor: Theme.colors.navyBlue,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: 'center',
              marginTop: 20,
            }}
            onPress={val =>
              this.onNextPressed(
                // brandIdSelected,
                // brandNameSelected,
                // modelIdSelected,
                // modelNameSelected,
                // engineIdSelected,
                // engineCapacitySelected,
                // mileage
                this.props.uniqueList.id,
              )
            }
            // onPress={this.onNextPressed}
          >
            <Text style={{color: 'white', fontSize: 20}}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log('list from index', state.login.detailList);
  return {
    error_msg: state.login.notify,
    list: state.login.sellList,
    uniqueList: state.login.sellDetails,
  };
};

export default connect(
  mapStateToProps,
  {firstAdd, sellList, firstEdit, logindetails},
)(Edit1);
