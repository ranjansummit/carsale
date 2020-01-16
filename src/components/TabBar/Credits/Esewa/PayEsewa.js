import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {esewaProceed} from '../../../../actions/CreditsAction';
import Theme from '../../../common/Utility/Colors';
import {Avatar} from 'react-native-elements';
import {connect} from 'react-redux';
import Storage from '../../../storage/Storage';

class PayEsewa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: 10,
      credit_balance: '',
    };
    this.onProceedPressed = this.onProceedPressed.bind(this);
  }
  onDecrease = credit => {
    this.setState({credit: credit - 1}, () =>
      console.log('credit', this.state.credit),
    );
  };
  onIncrease = credit => {
    this.setState({credit: credit + 1}, () =>
      console.log('credit', this.state.credit),
    );
  };
  onProceedPressed = credit => {
    this.props.esewaProceed(credit);
    Actions.proceedEsewa();
  };
  componentDidMount() {
    Storage.getCredits('credits').then(credits => {
      this.setState(
        {
          credit_balance: credits,
        },
        () => console.log('credits', this.state.credit_balance),
      );
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Theme.colors.lightBlue,
          padding: 5,
          marginBottom: 5,
        }}>
        <View style={styles.lineStyle1} />
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 16,
              color: Theme.colors.gray,
              flex: 2,
              textAlign: 'center',
            }}>
            Your credit balance
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: Theme.colors.gray,
              flex: 1,
              textAlign: 'center',
            }}>
            {this.state.credit_balance}
          </Text>
        </View>
        <View style={styles.lineStyle2} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'purple',
          }}>
          Purchase
        </Text>
        <View style={{marginTop: 50, flexDirection: 'row', marginBottom: 30}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                color: Theme.colors.gray,
                textAlign: 'center',
              }}>
              Credit Quantity
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginRight: 5,
              marginLeft: 5,
            }}>
            {this.state.credit === 1 ? (
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: 10,
                  marginRight: 2,
                  color: Theme.colors.gray,
                  backgroundColor: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                -
              </Text>
            ) : (
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: 10,
                  marginRight: 2,
                  color: Theme.colors.gray,
                  backgroundColor: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => this.onDecrease(this.state.credit)}>
                -
              </Text>
            )}

            <Text
              style={{
                flex: 2,
                color: Theme.colors.red,
                fontSize: 20,
                fontWeight: 'bold',
                marginRight: 2,
                padding: 5,
                textAlign: 'center',

                justifyContent: 'center',
                backgroundColor: 'white',
              }}>
              {this.state.credit}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                padding: 10,
                color: Theme.colors.gray,
                backgroundColor: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
              onPress={() => this.onIncrease(this.state.credit)}>
              +
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: Theme.colors.gray,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          at Rs. 450 (each credit) from
        </Text>
        <View style={{alignItems: 'center', margin: 20}}>
          <Image source={require('../../../../../images/AMLogo.png')} />
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Theme.colors.navyBlue,
          }}>
          A.M Nepal
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: Theme.colors.navyBlue,
          }}>
          Bhaisepati, Lalitpur
        </Text>
        <View
          style={{
            marginTop: 50,
            marginRight: 5,
            marginLeft: 5,
            marginBottom: 5,
          }}>
          <TouchableOpacity
            style={{padding: 10, backgroundColor: Theme.colors.red}}
            onPress={() => {
              this.onProceedPressed(this.state.credit);
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              PROCEED
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: 30,
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
  return {};
};

export default connect(
  mapStateToProps,
  {esewaProceed},
)(PayEsewa);
