import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  NativeModules,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {connect} from 'react-redux';
import {
  generateProductId,
  resetGenProductId,
} from '../../../../actions/CreditsAction';
import Spinner from '../../../common/Utility/Spiner';
import Storage from '../../../storage/Storage';
// import firebase from 'react-native-firebase';

class ProceedEsewa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      total_amount: '',
      esewaResponse: [],
      esewaSuccess: false,
      product_id: '',
    };
    // this.proceedEsewa = this.proceedEsewa.bind(this);
  }

  // async getToken() {
  //   let fcmToken = await AsyncStorage.getItem('fcmToken');
  //   if (!fcmToken) {
  //     fcmToken = await firebase.messaging().getToken();
  //     if (fcmToken) {
  //       await AsyncStorage.setItem('fcmToken', fcmToken);
  //     }
  //   }
  // }

  // async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }

  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     this.getToken();
  //   } catch (error) {
  //     console.log('permission rejected');
  //   }
  // }

  // async createNotificationListeners() {
  //   firebase.notifications().onNotification(notification => {
  //     notification.android.setChannelId('insider').setSound('default');
  //     firebase.notifications().displayNotification(notification);
  //   });
  // }

  turnOn = (amount, productId) => {
    this.props.resetGenProductId();

    // NativeModules.EsewaGateway.turnOn(amount.toString(), productId.toString())
    //   .then(data => {
    //     console.log('data', data);
    //     // Storage.removeCredits();
    //     //success
    //   })
    //   .catch(error => {
    //     console.log('data error', error);
    //     //failure
    //   });
  };

  updateStatus = () => {
    NativeModules.EsewaGateway.getStatus((error, esewaSuccess) => {
      console.log('esewa success', esewaSuccess);
      this.setState({esewaSuccess}, () =>
        console.log('response from esewa', this.state.esewaSuccess),
      );
      if (esewaSuccess === true) {
        Actions.credits();
      }
    });
  };

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({total_amount: this.props.credit * 450});
    });
    // const channel = new firebase.notifications.Android.Channel(
    //   'insider',
    //   'insider channel',
    //   firebase.notifications.Android.Importance.Max,
    // );
    // firebase.notifications().android.createChannel(channel);
    // this.checkPermission();
    // this.createNotificationListeners();

    // firebase
    //   .auth()
    //   .signInAnonymously()
    //   .then(credential => {
    //     if (credential) {
    //       console.log('default app user ->', credential.user.toJSON());
    //     }
    //   });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product_id !== this.props.product_id) {
      this.setState({product_id: nextProps.product_id}, () =>
        console.log('product id', this.state.product_id),
      );
    }
  }
  proceedEsewa = (credit, rate) => {
    // console.log('rate and credit', rate + credit);
    this.props.generateProductId(credit.toString(), rate);
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.generated === false ? (
          <View>
            {this.turnOn(this.state.total_amount, this.state.product_id)}
          </View>
        ) : null}
        <View>
          <View style={styles.lineStyle1} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'purple',
            }}>
            You are purchasing {this.props.credit} credits from
          </Text>

          <View style={styles.lineStyle2} />
          <View style={{alignItems: 'center', margin: 20}}>
            <Image source={require('../../../../../images/logo.png')} />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              color: Theme.colors.navyBlue,
            }}>
            A.M Nepal
          </Text>

          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: Theme.colors.navyBlue,
              marginBottom: 10,
            }}>
            Bhaisepati, Lalitpur
          </Text>
          <View style={styles.lineStyle1} />
          <View
            style={{
              flexDirection: 'row',
              marginRight: 5,
              marginLeft: 5,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                color: Theme.colors.gray,
                textAlign: 'left',
              }}>
              Credit Quantity
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 18,
                color: Theme.colors.gray,
                textAlign: 'right',
              }}>
              {this.props.credit}
            </Text>
          </View>
          <View style={styles.lineStyle1} />
          <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 5}}>
            <Text
              style={{
                flex: 1,
                textAlign: 'left',
                fontSize: 18,
                color: Theme.colors.gray,
              }}>
              Rate
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'right',
                fontSize: 18,
                color: Theme.colors.gray,
              }}>
              Rs. 450
            </Text>
          </View>
          <View style={styles.lineStyle1} />
          <View style={{flexDirection: 'row', marginRight: 5, marginLeft: 5}}>
            <Text
              style={{
                flex: 1,
                textAlign: 'left',
                fontSize: 18,
                color: Theme.colors.gray,
              }}>
              Total Amount
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: 18,
                textAlign: 'right',
                color: Theme.colors.gray,
              }}>
              {/* Rs. {this.props.credit * 450} */}
              Rs. {this.state.total_amount}
            </Text>
          </View>
          <View
            style={{
              marginTop: 50,
              marginRight: 10,
              marginLeft: 10,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{padding: 10, backgroundColor: Theme.colors.red}}
              onPress={
                () => this.proceedEsewa(this.props.credit, '450')
                // this.turnOn()
              }>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Proceed with eSewa
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 15,
              color: Theme.colors.gray,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            Payment will be handled through E-Payment SDK
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineStyle1: {
    borderWidth: 0.3,
    borderColor: Theme.colors.orangeLine,
    marginTop: 10,
    marginBottom: 10,
  },
  lineStyle2: {
    borderWidth: 0.3,
    borderColor: Theme.colors.orangeLine,
    marginTop: 10,
    marginBottom: 20,
  },
});

const mapStateToProps = state => {
  return {
    loading: state.credit.loading,
    credit: state.credit.save_credit,
    product_id: state.credit.product_id,
    generated: state.credit.generate_product_id_msg,
  };
};

export default connect(
  mapStateToProps,
  {generateProductId, resetGenProductId},
)(ProceedEsewa);
