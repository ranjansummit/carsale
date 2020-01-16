import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Theme from '../../../common/Utility/Colors';
import {Avatar} from 'react-native-elements';
import {generateQr} from '../../../../actions/CreditsAction';
import {connect} from 'react-redux';

let screenWidth = Dimensions.get('window').width;

class GenerateQR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credit: 1,
      clicked: false,
    };
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
  generateQR = credit => {
    this.setState({clicked: true});
    this.props.generateQr(credit);

    Actions.scanToSell();
  };
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('../../../../../images/mob_qr.png')}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text style={styles.text}>Sell your credits easily! {'\n'} </Text>
          <Text style={styles.text1}>
            1. Enter the amount of credits to sell {'\n'} {'\n'}
            2. Generate QR code {'\n'} {'\n'}
            3. Ask buyer to scan your QR Code or, enter the code manually
          </Text>
          <View style={{marginTop: 50, flexDirection: 'row', marginBottom: 30}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'purple',
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
                  padding: 10,
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
          <Text style={styles.text}>
            You are transferring 1 credit at Rs. 450 {'\n'}
          </Text>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: Theme.colors.red,
              width: screenWidth * 0.9,
              // marginHorizontal: 20,
              // position: 'relative',
              // bottom: 10,
            }}
            onPress={() => {
              this.generateQR(this.state.credit);
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              GENERATE QR CODE
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
    padding: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  text1: {
    fontSize: 16,
    color: 'purple',
    textAlign: 'left',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    generateQr,
  },
)(GenerateQR);
