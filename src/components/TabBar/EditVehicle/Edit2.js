import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
import { Rating } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { secondEdit } from "../../../actions/LoginAction";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import Theme from "../../common/Utility/Colors";

class Edit2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: 0,
      lot: props.uniqueList.lot,
      odometer: props.uniqueList.odometer.toString(),
      price: props.uniqueList.price.toString(),
      rating: props.uniqueList.rating,
      // lot: "",
      // odometer: "",
      // price: "",
      // rating: "",
      changedLot: false,
      changeOdometer: false,
      changePrice: false,
      changeRating: false
      // list: this.props.uniqueList
    };
    this.ratingCompleted = this.ratingCompleted.bind(this);
    this.onNextPressed = this.onNextPressed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("next props in second edit", nextProps);
    if (nextProps.uniqueList !== this.props.uniqueList) {
      this.setState({
        lot: nextProps.uniqueList.lot,
        odometer: nextProps.uniqueList.odometer.toString(),
        price: nextProps.uniqueList.price.toString(),
        rating: nextProps.uniqueList.rating
      });
    }
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    Actions.edit1();
    // return true;
  }
  onNextPressed = () => {
    console.log("odometer", this.state.odometer);
    console.log("price", this.state.price);
    console.log("rating", this.state.rating);
    console.log("lot", this.state.lot);
    this.props.secondEdit(
      this.state.lot,
      this.state.odometer,
      this.state.price,
      this.state.rating
    );
    Actions.edit3();
  };
  ratingCompleted(rating) {
    this.setState({ rating: rating, changeRating: true });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Vehicle registration Lot</Text>

          <TextInput
            style={styles.inputText}
            type="string"
            required
            name="lot"
            // placeholder={item.lot}
            onChangeText={lot => this.setState({ lot, changedLot: true })}
            // value={
            //   this.state.changedLot ? this.state.lot : item.lot.toString()
            // }
            value={
              this.state.lot
              // .toString()
            }
          />

          <Text style={styles.text}>Total odometer readings in ktm</Text>

          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            type="string"
            required
            name="odometer"
            // placeholder={item.odometer.toString()}
            onChangeText={odometer =>
              this.setState({ odometer, changeOdometer: true })
            }
            value={
              // this.state.changeOdometer
              //   ? this.state.odometer
              //   : item.odometer.toString()
              this.state.odometer
              // .toString()
            }
          />

          <Text style={styles.text}>Your selling price in NRs</Text>

          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            type="string"
            required
            name="price"
            // placeholder={item.price.toString()}
            onChangeText={price => this.setState({ price, changePrice: true })}
            value={
              // this.state.changePrice
              //   ? this.state.price
              //   : item.price.toString()
              this.state.price
              // .toString()
            }
          />

          <Text style={styles.text}>Rate your bike's condition</Text>
          {/* 
          <Rating
            style={{
              alignItems: "center",
              borderColor: "#002248",
              paddingTop: 10,
              paddingBottom: 30
            }}
            type="custom"
            ratingCount={5}
            // ratingColor={Theme.colors.navyBlue}
            // borderColor={"#0E113D"}
            tintColor={Theme.colors.lightBlue}
            startingValue={
              // this.state.changeRating ? this.state.rating : item.rating
              this.state.rating
              // .toString()
            }
            onFinishRating={this.ratingCompleted}
            imageSize={30}
          /> */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 4,
              marginRight: 4,
              marginTop: 5,
              marginBottom: 5
            }}
          >
            <StarRating
              containerStyle={{ margin: 2 }}
              disabled={false}
              emptyStar={require("../../../../images/star_lg_gray.png")}
              fullStar={require("../../../../images/star_lg_blue.png")}
              maxStars={5}
              starSize={25}
              rating={this.state.rating}
              selectedStar={rating => this.ratingCompleted(rating)}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Theme.colors.navyBlue,
              marginTop: 20,
              paddingTop: 10,
              paddingBottom: 10,
              alignItems: "center"
            }}
            onPress={val => this.onNextPressed()}
          >
            <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log("details in second edit", state.login.detailList);
  return {
    error_msg: state.login.notify,
    uniqueList: state.login.sellDetails,
    loading: state.login.loading
  };
};

export default connect(
  mapStateToProps,
  { secondEdit }
)(Edit2);
