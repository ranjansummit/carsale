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
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {firstAdd} from '../../../actions/LoginAction';
import {connect} from 'react-redux';
import BrandPicker from '../../common/Input/BrandPicker.android';
import BrandPickerIOS from '../../common/Input/BrandPicker.ios';
import ModelPicker from '../../common/Input/ModelPicker.android';
import ModelPickerIOS from '../../common/Input/ModelPicker.ios';
import EnginecapacityPicker from '../../common/Input/EnginecapacityPicker.android';
import EnginecapacityPickerIOS from '../../common/Input/EnginecapacityPicker.ios';
import {Actions} from 'react-native-router-flux';
import styles from './styles';
import Theme from '../../common/Utility/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

class AddVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      brandIdSelected: '',
      brandNameSelected: '',
      modelIdSelected: '',
      modelNameSelected: '',
      engineIdSelected: '',
      engineCapacitySelected: '',
      mileage: '',
      error1: false,
      error2: false,
      error3: false,
      error4: false,
    };
    this.onUpdateBrand = this.onUpdateBrand.bind(this);
    this.onUpdateModel = this.onUpdateModel.bind(this);
    this.onUpdateEngine = this.onUpdateEngine.bind(this);
    this.onNextPressed = this.onNextPressed.bind(this);
  }

  componentDidMount() {
    // const {navigation} = this.props;
    // this.focusListener = navigation.addListener('didFocus', () => {
    //   console.log('here');
    //   this.setState({
    //     brandIdSelected: '',
    //     brandNameSelected: '',
    //     modelIdSelected: '',
    //     modelNameSelected: '',
    //     engineIdSelected: '',
    //     engineCapacitySelected: '',
    //     mileage: '',
    //     error1: false,
    //     error2: false,
    //     error3: false,
    //     error4: false,
    //   });
    // });
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
    return true;
  }
  onUpdateBrand = (val, name) => {
    console.log('brand', name);
    console.log('brand id', val);
    this.setState({brandIdSelected: val, brandNameSelected: name}, () => {
      console.log('selected brand', this.state.brandNameSelected);

      if (this.state.brandIdSelected !== -1) {
        this.setState({error1: false});
      }
    });
  };
  onUpdateModel = (val, name) => {
    console.log('model', name);
    this.setState({modelIdSelected: val, modelNameSelected: name}, () => {
      if (this.state.modelIdSelected !== -1) {
        this.setState({error2: false});
      }
    });
  };
  onUpdateEngine = (val, capacity) => {
    console.log('engine there?', capacity);
    this.setState(
      {engineIdSelected: val, engineCapacitySelected: capacity},
      () => {
        if (this.state.engineIdSelected !== -1) {
          this.setState({error3: false});
        }
      },
      // ,
      // () => console.log("engine", this.state.engineCapacitySelected)
    );
  };
  onNextPressed = (
    brandid,
    brandname,
    modelid,
    modelname,
    engineid,
    capacity,
    mileage,
  ) => {
    console.log('compo', brandid);
    if (brandid === -1 || brandid === '') {
      console.log('error');
      this.setState({error1: true, error4: false});
    } else if (modelid === -1 || modelid === '') {
      this.setState({error2: true, error4: false});
    } else if (engineid === -1 || engineid === '') {
      this.setState({error3: true, error4: false});
    } else if (mileage.length === 0) {
      this.setState({error4: true});
    } else {
      this.props.firstAdd(
        brandid,
        brandname,
        modelid,
        modelname,
        engineid,
        capacity,
        mileage,
      );
      Actions.add1();
    }
  };

  // returnBrandPicker = () => {
  //   if (Platform.OS === 'ios') {
  //     return <BrandPickerIOS onUpdateBrand={this.onUpdateBrand} />;
  //   } else if (Platform.OS === 'android') {
  //     <BrandPicker onUpdateBrand={this.onUpdateBrand} />;
  //   }
  // };

  render() {
    const {
      brandIdSelected,
      brandNameSelected,
      modelIdSelected,
      modelNameSelected,
      engineIdSelected,
      engineCapacitySelected,
      mileage,
    } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.text}> Your bike brand </Text>
            <View>
              <View>
                {Platform.OS === 'ios' ? (
                  <BrandPickerIOS onUpdateBrand={this.onUpdateBrand} />
                ) : (
                  <BrandPicker onUpdateBrand={this.onUpdateBrand} />
                )}
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error1 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {/* <BrandPicker /> */}

            <Text style={styles.text}> Model of your bike </Text>
            <View>
              <View>
                {Platform.OS === 'ios' ? (
                  <ModelPickerIOS onUpdateModel={this.onUpdateModel} />
                ) : (
                  <ModelPicker onUpdateModel={this.onUpdateModel} />
                )}
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error2 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {/* <ModelPicker/> */}

            <Text style={styles.text}>Engine capacity in cc</Text>
            <View>
              <View>
                {Platform.OS === 'ios' ? (
                  <EnginecapacityPickerIOS
                    onUpdateEngine={this.onUpdateEngine}
                  />
                ) : (
                  <EnginecapacityPicker onUpdateEngine={this.onUpdateEngine} />
                )}
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error3 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {/* <EnginecapacityPicker /> */}

            <Text style={styles.text}>Approx. mileage per litre</Text>
            <View>
              <View>
                <TextInput
                  style={styles.inputText}
                  type="number"
                  keyboardType="numeric"
                  required
                  name="mileage"
                  placeholder="e.g 25,30"
                  placeholderTextColor="#808080"
                  // onChange={this.handleMileage.bind(this)}
                  onChangeText={mileage =>
                    this.setState({mileage, error4: false})
                  }
                  value={this.state.mileage}
                  // style={{
                  //   borderWidth: 1,
                  //   borderColor: "red",
                  //   padding: 5
                  // }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 300,
                  right: 0,
                  bottom: 0,
                  margin: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.error4 ? (
                  <Icon name={'error'} color={'red'} size={20} />
                ) : null}
              </View>
            </View>
            {this.state.error4 ? (
              <View
                style={{
                  justifyContent: 'flex-end',
                  marginRight: 5,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    padding: 2,
                    marginLeft: '50%',
                    backgroundColor: 'black',
                    borderTopWidth: 4,
                    borderTopColor: 'red',
                  }}>
                  Please provide mileage
                </Text>
              </View>
            ) : null}
            <TouchableOpacity
              style={{
                backgroundColor: Theme.colors.navyBlue,
                paddingTop: 10,
                paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                height: 50,
              }}
              onPress={val =>
                this.onNextPressed(
                  brandIdSelected,
                  brandNameSelected,
                  modelIdSelected,
                  modelNameSelected,
                  engineIdSelected,
                  engineCapacitySelected,
                  mileage,
                )
              }>
              <Text style={{color: 'white', fontSize: 20}}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     // flex: 3,
//     padding: 10,
//     // backgroundColor: "white",
//     justifyContent: "space-evenly"
//   },
//   text: {
//     paddingBottom: 10,
//     paddingTop: 10,
//     color: "#002248",
//     fontSize: 20
//   }
// });

const mapStateToProps = state => {
  // console.log("login list details", state.login.sellList);

  return {
    error_msg: state.login.notify,
    list: state.login.sellList,
  };
};

export default connect(
  mapStateToProps,
  {firstAdd},
)(AddVehicle);

// export default AddVehicle;
