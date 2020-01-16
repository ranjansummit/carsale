/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
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
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getProfile,
  sendFeedback,
  resetFeedback,
} from '../../../actions/ProfileAction';
import Theme from '../../common/Utility/Colors';
import {Actions} from 'react-native-router-flux';
import Spinner from '../../common/Utility/Spiner';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class HelpAndFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      profile_list: [],
      feedback_success: true,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getProfile();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile_details !== this.props.profile_details) {
      this.setState({profile_list: nextProps.profile_details});
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
    Actions.others();
    return true;
  }

  onSubmit = (name, email, content) => {
    if (content.length === 0) {
      Alert.alert('', 'You must fill the content');
    } else {
      this.props.sendFeedback(name, email, content);
    }
    // this.setState({feedback_success: true});
  };
  // successAlert = () => {
  //   this.setState({text: ''});
  //   this.props.resetFeedback();
  //   Alert.alert(
  //     'Success!',
  //     'Feedback submitted successfully.',
  //     [
  //       {
  //         text: 'OK',
  //         onPress: () => {
  //           Actions.others();
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };
  failureAlert = () => {
    this.setState({text: ''});
    this.props.resetFeedback();
    Alert.alert(
      'Failed!',
      'Failed to send feedback. Try again.',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}

        {this.props.feedback_res === 'Feedback submited succesfully.' ? (
          <Modal
            style={{
              borderWidth: 1,
              borderColor: '#002248',
            }}
            visible={this.state.feedback_success}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              this.Show_Custom_Alert(!this.state.feedback_success);
            }}>
            <View
              style={{
                flex: 1,
                // alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}>
              <View style={{flexDirection: 'row', margin: 5}}>
                <View style={{flex: 0.9, justifyContent: 'flex-start'}} />
                <View
                  style={{
                    flex: 0.1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      fontSize: 0.04 * screenWidth,
                      textAlign: 'right',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 15,
                    }}
                    onPress={() =>
                      this.setState({feedback_success: false, text: ''}, () =>
                        console.log('text', this.state.text),
                      )
                    }>
                    X
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.Alert_Title}>
                  Thank you for your feedback. If you've sent us a bug, we will
                  look into it asap and provide an update to your email. If
                  you've submitted a new feature, thank you for your
                  recommendation, we will share it with the team and hopefully
                  have it as part of our rollout soon! -look out for new
                  releases and bug fixes on social media (and of course in the
                  app).
                  {'\n'} {'\n'} {'\n'}
                  Gracious!
                  {'\n'} {'\n'}
                  The Bhat-bhat-bhat-bhat-bhate team!!
                </Text>
              </View>
            </View>
          </Modal>
        ) : null}
        {this.props.error === true ? <View>{this.failureAlert()}</View> : null}
        <ScrollView style={{padding: 10}}>
          <Text style={{margin: 10}}>Hi! </Text>

          <Text style={{margin: 10}}>
            At Bhatbhate we love to hear your feedback and tips on how to
            improve the app- It's how we make our updates by first listening and
            then updating. Please fill out the form below which goes to our
            design and development team. Of course any issues using the app, let
            us know here too!
          </Text>
          <TextInput
            value={this.state.profile_list.name}
            style={styles.textinput}
          />
          <TextInput
            style={styles.textinput}
            value={this.state.profile_list.email}
          />
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Help & Feedback"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              onChangeText={text => this.setState({text})}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.onSubmit(
                this.state.profile_list.name,
                this.state.profile_list.email,
                this.state.text,
              )
            }>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Theme.colors.lightBlue,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#F7003C',
    padding: 5,
    margin: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  textinput: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  textAreaContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    // justifyContent: 'flex-start',
  },

  Alert_Title: {
    backgroundColor: Theme.colors.navyBlue,
    fontSize: 0.04 * screenWidth,
    color: 'white',
    textAlign: 'left',
    margin: 8,
    padding: 10,
  },
});
const mapStateToProps = state => {
  console.log('profile', state.profile.profile_details);
  return {
    profile_details: state.profile.profile_details,
    feedback_res: state.profile.feedback_res,
    error: state.profile.error,
    loading: state.profile.loading,
  };
};

export default connect(
  mapStateToProps,
  {getProfile, sendFeedback, resetFeedback},
)(HelpAndFeedback);
