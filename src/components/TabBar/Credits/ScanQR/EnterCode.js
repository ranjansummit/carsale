import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Alert,
  Modal,
  ImageBackground,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {connect} from 'react-redux';
import Spinner from '../../../common/Utility/Spiner';
import {submitCode, resetConfirmCode} from '../../../../actions/CreditsAction';

let screenWidth = Dimensions.get('window').width;

class EnterCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   list: props.list,
      firstletter: '',
      secondletter: '',
      thirdletter: '',
      fourthletter: '',
      successModal: false,
    };
    this.onSubmitCode = this.onSubmitCode.bind(this);
  }
  componentDidMount() {}

  onSubmitCode = (first, second, third, fourth) => {
    var result = first + second + third + fourth;
    console.log('result', result.toString());
    this.props.submitCode(result);
  };

  matchSuccessAlert = () => {
    // Alert.alert(
    //   'Success!',
    //   'QR code matched.',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         this.props.resetConfirmCode();
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
    this.setState({successModal: true});
    this.props.resetConfirmCode();
  };
  matchFailureAlert = () => {
    // this.setState({
    //   firstletter: '',
    //   secondletter: '',
    //   thirdletter: '',
    //   fourthletter: '',
    // });

    Alert.alert(
      'Failure!',
      'Code invalid. Try again.',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetConfirmCode();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.match_success_result === false ? (
          <View>{this.matchSuccessAlert()}</View>
        ) : null}
        {this.props.confirm_code_error ? (
          this.props.confirm_code_error.error ? (
            <View>{this.matchFailureAlert()}</View>
          ) : null
        ) : null}
        <Modal
          style={{borderWidth: 1, borderColor: '#002248'}}
          visible={this.state.successModal}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.successModal);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: Theme.colors.navyBlue,
              paddingTop: '10%',
              paddingHorizontal: '5%',
            }}>
            <View style={{flex: 0.1}}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({successModal: false});
                }}>
                <Text style={{color: 'white', textAlign: 'right'}}>
                  {' '}
                  Cancel{' '}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.8,
              }}>
              <ImageBackground
                style={{
                  height: 250,
                  width: 250,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                source={require('../../../../../images/ic_credit_large.png')}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {this.state.credit}
                  {'\n'} credits
                </Text>
              </ImageBackground>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  marginVertical: 20,
                }}>
                Congratulations{'\n'} {'\n'}You have purchased
                {this.state.credit} credits.
              </Text>
              <View style={styles.lineStyleWhite} />
              <View style={styles.mid}>
                <Text style={styles.midTextWhite}>Credit Rate</Text>
                <Text style={styles.midTextWhite}>Rs. {this.state.credit}</Text>
              </View>
              <View style={styles.lineStyleWhite} />
              <View style={styles.mid}>
                <Text style={styles.midTextWhite}>Total Amount</Text>
                <Text style={styles.midTextWhite}>Rs. {this.state.credit}</Text>
              </View>
              <View style={styles.lineStyleWhite} />
            </View>
            <View style={{flex: 0.1}}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Please check your email for transaction receipt
              </Text>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={{padding: 10}}>
            <Text style={styles.text}>
              Enter the case sensitive code shown by seller below and pay the
              seller on confirmation of code transfer{'\n'}
              {'\n'}
            </Text>
            <View style={{marginTop: 5, marginBottom: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TextInput
                  style={styles.boxtext}
                  type="string"
                  required
                  // onChangeText={firstletter => this.setState({firstletter})}
                  value={this.state.firstletter}
                  maxLength={1}
                  ref="input_1"
                  onChangeText={firstletter => {
                    this.setState({firstletter});
                    if (firstletter) {
                      this.refs.input_2.focus();
                    } else {
                      this.refs.input_1.focus();
                    }
                  }}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.boxtext}
                  type="string"
                  required
                  // onChangeText={secondletter => this.setState({secondletter})}
                  value={this.state.secondletter}
                  maxLength={1}
                  ref="input_2"
                  onChangeText={secondletter => {
                    this.setState({secondletter});
                    if (secondletter) {
                      this.refs.input_3.focus();
                    } else {
                      this.refs.input_1.focus();
                    }
                  }}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.boxtext}
                  type="string"
                  required
                  // onChangeText={thirdletter => this.setState({thirdletter})}
                  value={this.state.thirdletter}
                  maxLength={1}
                  ref="input_3"
                  onChangeText={thirdletter => {
                    this.setState({thirdletter});
                    if (thirdletter) {
                      this.refs.input_4.focus();
                    } else {
                      this.refs.input_2.focus();
                    }
                  }}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.boxtext}
                  type="string"
                  required
                  // onChangeText={fourthletter => this.setState({fourthletter})}
                  value={this.state.fourthletter}
                  maxLength={1}
                  ref="input_4"
                  onChangeText={fourthletter => {
                    this.setState({fourthletter});
                    if (!fourthletter) this.refs.input_3.focus();
                  }}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Theme.colors.navyBlue,
                width: screenWidth * 0.8,
                marginHorizontal: 20,
              }}
              onPress={
                () => {
                  this.onSubmitCode(
                    this.state.firstletter,
                    this.state.secondletter,
                    this.state.thirdletter,
                    this.state.fourthletter,
                  );
                }
                // this.setState({successModal: true})
              }>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
    // padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: Theme.colors.navyBlue,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  boxtext: {
    backgroundColor: 'white',
    // backgroundColor: "#002248",
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 50,
    width: 50,
    color: Theme.colors.navyBlue,
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
    padding: 10,
  },
  mid: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
  },
  midTextWhite: {
    fontSize: 16,
    color: 'white',
  },
  lineStyleWhite: {
    borderWidth: 0.5,
    borderColor: 'white',
  },
});

const mapStateToProps = state => {
  console.log('success', state.credit.confirm_code_result);
  return {
    loading: state.credit.loading,
    list: state.credit.generated_QR,
    match_success: state.credit.confirm_code,
    match_success_result: state.credit.confirm_code_result,
    error: state.credit.confirm_code_error,
  };
};

export default connect(
  mapStateToProps,
  {submitCode, resetConfirmCode},
)(EnterCode);
