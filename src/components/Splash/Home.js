/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {Actions} from 'react-native-router-flux';
// import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderFlatlistItem = this.renderFlatlistItem.bind(this);
    this.state = {
      bikes: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        'http://bhatbhate.net/api/v1/vehicle/prelogin?offset=5&limit=5&client_id=1&client_secret=W8ZZci58qPeERpaIKyA38GDesnpTnXXxrNxxnIL2',
      )
      .then(response => {
        const bikes = response.data.data;
        this.setState({bikes});
      });
  }

  renderFlatlistItem(item, index) {
    return (
      <View style={{paddingBottom: 40}}>
        <View>
          <ImageBackground
            // onPress={() => {
            //   Actions.like();
            // }}
            style={{height: 300, width: 300, resizeMode: 'contain'}}
            source={{uri: item.front_side_image}}>
            {item.wish_count === '0' && item.buyer_count === '0' ? (
              <View />
            ) : item.wish_count === '0' && item.buyer_count >= '0' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    position: 'relative',
                    // top:50,
                    left: 10,
                    backgroundColor: '#002248',
                    padding: 5,
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {item.buyer_count} buyer interested
                </Text>
              </View>
            ) : item.wish_count >= '0' && item.buyer_count === '0' ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 150,
                    left: 10,
                    backgroundColor: '#002248',
                    padding: 5,
                    color: 'white',
                    fontSize: 10,
                  }}>
                  <Icon name="heart" size={20} color="red" />
                  {item.wish_count}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 150,
                    left: 10,
                    backgroundColor: '#002248',
                    padding: 5,
                    color: 'white',
                    fontSize: 10,
                  }}>
                  <Icon name="heart" size={20} color="red" />
                  {item.wish_count}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 150,
                    left: 40,
                    backgroundColor: '#002248',
                    padding: 5,
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {item.buyer_count} buyers interested
                </Text>
              </View>
            )}

            <Text
              style={{
                fontWeight: 'bold',
                backgroundColor: 'red',
                color: 'white',
                position: 'absolute',
                bottom: 10,
                left: 10,
                fontSize: 15,
                padding: 10,
              }}>
              Rs. {item.price}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.details}>
          <TouchableOpacity
            style={{justifyContent: 'space-around'}}
            // onPress={() => {
            //   Actions.search();
            // }}
          >
            <Icon name={'heart'} color={'red'} borderColor={'red'} size={20} />
          </TouchableOpacity>
          <Text style={styles.textbody}>{item.brand_name}</Text>
          <Text style={styles.textbody}>{item.model_name}</Text>
          <Text style={styles.textbody}>{item.rating}</Text>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.bikes} //array of data to create list
          keyExtractor={(item, index) => item.front_side_image + index}
          renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CAD9F8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  details: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'flex-start',
  },
  textbody: {
    color: '#002248',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 15,
  },
});

export default Home;
