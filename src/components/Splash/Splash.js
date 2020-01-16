/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
// import Spinner from "../common/Utility/Spiner";
import {Actions} from 'react-native-router-flux';
import {preloginlist} from '../../actions/PreLoginAction';
import {connect} from 'react-redux';
import Storage from '../storage/Storage';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstletter: '0',
      secondletter: '0',
      thirdletter: '0',
      fourthletter: '0',
      fifthletter: '0',
      sixthletter: '0',
      vehiclecount: '',
    };
    // // var num = numeral(1000)
    // var strings = num.format('000000');
    // firstletter= strings.toString()[1];
    // secondletter= strings.toString()[2];
    // thirdletter= strings.toString()[3];
    // fourthletter= strings.toString()[4];
    // fifthletter= strings.toString()[5];
    // sixthletter= strings.toString()[6];

    // if(this.state.logedin=="1"){

    //   Actions.buy();
    // }
  }

  // state = {
  //   bikes: []
  // };

  // performTimeConsumingTask = async () => {
  //   return new Promise(resolve =>
  //     setTimeout(() => {
  //       resolve("result");
  //     }, 2000)
  //   );
  // };

  // async componentDidMount() {
  //   axios
  //     .get(
  //       "http://uat.bhatbhate.net/api/v1/vehicle/prelogin?offset=5&limit=5&client_id=1&client_secret=W8ZZci58qPeERpaIKyA38GDesnpTnXXxrNxxnIL2"
  //     )
  //     .then(response => {
  //       const bikes = response.data;
  //       this.setState({ bikes });
  //     });
  //   // this.props.preloginlist();
  //   const data = await this.performTimeConsumingTask();

  //   if (data !== null) {
  //     // this.props.preloginlist();
  //     // <Spinner />;
  //     return Actions.buy();
  //   }
  // }
  performTimeConsumingTask = async ms => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, ms),
    );
  };

  async componentDidMount() {
    this.props.preloginlist();

    const data = await this.performTimeConsumingTask(1000);

    if (data !== null) {
      // this.props.preloginlist();

      var number = this.props.vehiclecount;

      var number = number.toString();
      var lengths = number.length;
      var zerotobeadded = 6 - lengths;
      // eslint-disable-next-line no-undef
      for (i = 0; i < zerotobeadded; i++) {
        number = '0' + number;
      }
      this.setState({firstletter: number.toString()[0]});
      this.setState({secondletter: number.toString()[1]});
      this.setState({thirdletter: number.toString()[2]});
      this.setState({fourthletter: number.toString()[3]});
      this.setState({fifthletter: number.toString()[4]});

      this.setState({sixthletter: number.toString()[5]});
    }

    // this.setState.sixthletter= number.toString()[5];
    const data2 = await this.performTimeConsumingTask(2000);

    if (data2 !== null) {
      Promise.resolve(Storage.getLoggedin()).then(function(value) {
        console.log('rantest valuesss', value);
        if (value === '0') {
          console.log('go to pre login buylist');
          Actions.buyl(); // this.props.navigation.navigate("buyl");
        } else {
          Actions.loggedinBuy();
          // this.props.navigation.navigate("loggedinBuy");
        }
      });
      // Actions.loggedinBuy();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '70%',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Image
            source={require('../../../images/bhatbhatesplash.png')}
            style={styles.img}
          />
        </View>
        <View
          style={{
            backgroundColor: '#FF003D',
            height: '30%',
            alignItems: 'center',
            paddingTop: 50,
            justifyContent: 'space-evenly',
          }}>
          <Text style={styles.text}>Nepal's Biggest Bike Store</Text>

          <View style={{marginTop: 5}}>
            <View style={{backgroundColor: '#FF003D', flexDirection: 'row'}}>
              <Text style={styles.boxtext}>{this.state.firstletter}</Text>

              <Text style={styles.boxtext}>{this.state.secondletter}</Text>
              <Text style={styles.boxtext}>{this.state.thirdletter}</Text>

              <Text style={styles.boxtext}>{this.state.fourthletter}</Text>

              <Text style={styles.boxtext}>{this.state.fifthletter}</Text>

              <Text style={styles.boxtext}>{this.state.sixthletter}</Text>
            </View>

            <Image
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FF003D',
                height: 4,
                position: 'absolute',
                top: 20,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              // source={require("../../images/bhatbhatesplash.png")}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF003D',
  },
  img: {
    height: '70%',
    width: '80%',
    aspectRatio: 0.9,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },

  boxtext: {
    backgroundColor: '#012D6C',
    // backgroundColor: "#002248",
    borderRadius: 5,
    height: 40,
    width: 35,
    color: 'white',
    textAlign: 'center',
    fontSize: 32,
    marginRight: 3,
  },
});

const mapStateToProps = state => {
  // console.log("rantest for numbers", state.prelogin.preloginList);
  return {
    vehiclecount: state.prelogin.preloginList.vehicles_count
      ? state.prelogin.preloginList.vehicles_count
      : '400',
  };
};

export default connect(
  mapStateToProps,
  {preloginlist},
)(Splash);
