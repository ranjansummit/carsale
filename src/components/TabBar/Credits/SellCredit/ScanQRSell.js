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
import {connect} from 'react-redux';
import Spinner from '../../../common/Utility/Spiner';
import {WebView} from 'react-native-webview';
import QRCode from 'react-native-qrcode-svg';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class ScanQRSell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      qr_code: props.qr_code,
      location: props.location,
      sellerImage: props.sellerImage,
      creditQuantity: props.creditQuantity,
      code: props.code,
      totalAmount: props.totalAmount,
      codeId: props.codeId,
      sellerName: props.sellerName,
      rate: props.rate,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.setState(
        {
          list: nextProps.list,
          qr_code: nextProps.qr_code,
          location: nextProps.location,
          sellerImage: nextProps.sellerImage,
          creditQuantity: nextProps.creditQuantity,
          code: nextProps.code,
          totalAmount: nextProps.totalAmount,
          codeId: nextProps.codeId,
          sellerName: nextProps.sellerName,
          rate: nextProps.rate,
        },
        () => console.log('qr code ', this.state.list),
      );
    }
  }
  render() {
    const {
      qr_code,
      location,
      sellerImage,
      creditQuantity,
      code,
      totalAmount,
      codeId,
      sellerName,
      rate,
    } = this.state;
    let JsonObj = {
      qr_code: qr_code,
      location: location,
      sellerImage: sellerImage,
      creditQuantity: creditQuantity,
      code: code,
      totalAmount: totalAmount,
      codeId: codeId,
      sellerName: sellerName,
      rate: rate,
    };
    let data = JSON.stringify(JsonObj);
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        <ScrollView contentContainerStyle={{padding: 10}}>
          {/* <View style={{padding: 10, flex: 1}}> */}
          <View style={{flex: 0.15}}>
            <Text style={styles.text}>
              You are agreeing to sell and transfer 1 credit at Rs. 450 {'\n'}
            </Text>
          </View>
          {this.props.list ? (
            <View
              style={{
                height: screenHeight * 0.4,

                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                marginHorizontal: 40,
              }}>
              {/* <QRCode
                  // value={this.state.qr_code}
                  value={data}
                  //Setting the value of QRCode
                  size={300}
                  //Size of QRCode
                  // bgColor="#000"
                  bgColor="black"
                  //Backgroun Color of QRCode
                  fgColor="#fff"
                  //Front Color of QRCode
                /> */}
              <QRCode
                // value={data}
                value={data}
                size={250}
                // color={'white'}
                // backgroundColor={'black'}
              />
            </View>
          ) : null}
          <View style={{flex: 0.35, alignContent: 'center'}}>
            <Text style={styles.text}>
              {'\n'}
              Ask the buyer to scan this QR code in the Bhatbhate app under
              credits section and pay cash payment of Rs. 450 at the same time.
              {/* {'\n'} */}
              {'\n'}
              OR
              {'\n'}
            </Text>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: Theme.colors.navyBlue,
                width: screenWidth * 0.8,
                marginHorizontal: 20,
              }}
              onPress={() => {
                Actions.switchCode();
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Switch to code
              </Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
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
  console.log('qr code', state.credit.generated_QR);
  console.log('loader', state.credit.loading);
  return {
    loading: state.credit.loading,
    list: state.credit.generated_QR,
    qr_code: state.credit.generated_QR.qr_code,
    location: state.credit.generated_QR.location,
    sellerImage: state.credit.generated_QR.seller_image,
    creditQuantity: state.credit.generated_QR.credit,
    code: state.credit.generated_QR.code,
    totalAmount: state.credit.generated_QR.amount,
    codeId: state.credit.generated_QR.id,
    sellerName: state.credit.generated_QR.seller_name,
    rate: state.credit.generated_QR.rate,
  };
};

export default connect(
  mapStateToProps,
  {},
)(ScanQRSell);
