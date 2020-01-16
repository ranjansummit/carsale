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

let screenWidth = Dimensions.get('window').width;

class SwitchCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstletter: '',
      secondletter: '',
      thirdletter: '',
      fourthletter: '',
    };
  }
  componentDidMount() {
    var number = this.props.list.code;

    var number = number.toString();
    // var lengths = number.length;
    this.setState({firstletter: number.toString()[0]});
    this.setState({secondletter: number.toString()[1]});
    this.setState({thirdletter: number.toString()[2]});
    this.setState({fourthletter: number.toString()[3]});
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      console.log('changes?');
      var number = nextProps.list.code;

      var number = number.toString();
      var lengths = number.length;
      this.setState({firstletter: number.toString()[0]});
      this.setState({secondletter: number.toString()[1]});
      this.setState({thirdletter: number.toString()[2]});
      this.setState({fourthletter: number.toString()[3]});
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.loading ? <Spinner /> : null}
        <ScrollView>
          <View style={{padding: 10}}>
            <Text style={styles.text}>
              You are agreeing to sell and transfer 1 credit at Rs. 450 {'\n'}{' '}
              {'\n'}
            </Text>
            <View style={{marginTop: 5}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <Text style={styles.boxtext}>{this.state.firstletter}</Text>

                <Text style={styles.boxtext}>{this.state.secondletter}</Text>
                <Text style={styles.boxtext}>{this.state.thirdletter}</Text>

                <Text style={styles.boxtext}>{this.state.fourthletter}</Text>
              </View>
            </View>

            <Text style={styles.text}>
              {'\n'}
              {'\n'}
              Ask the buyer to enter above code in the Bhatbhate app under
              credits section and pay cash payment of Rs. 450 at the same time.
              {'\n'}
            </Text>
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
});

const mapStateToProps = state => {
  console.log('4 digit code', state.credit.generated_QR.code);

  return {
    loading: state.credit.loading,
    list: state.credit.generated_QR,
  };
};

export default connect(
  mapStateToProps,
  {},
)(SwitchCode);
