/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Dimensions,
  FlatList,
  Animated,
} from 'react-native';
import {Avatar, Rating} from 'react-native-elements';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Theme from '../../common/Utility/Colors';
import Spinner from '../../common/Utility/Spiner';
import {
  PagerTabIndicator,
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerDotIndicator,
} from 'rn-viewpager';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class ImageComponent extends Component {
  scrollX = new Animated.Value(0); // this will be the scroll location of our ScrollView
  constructor() {
    super();
    this.state = {
      login: 'true',
      toggle: false,
      imgWidth: 0,
      imgHeight: 0,
    };
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  // componentDidMount() {
  //   const { navigation } = this.props;
  //   this.focusListener = navigation.addListener("didFocus", () => {
  //     if (this.viewPager) {
  //       this.viewPager.setPage(0);
  //     }
  //   });
  // }
  // componentWillUnmount() {
  //   this.focusListener.remove();
  // }
  componentDidUpdate() {
    // this.viewPager.setPage(0);
  }
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={4}
        selectedDotStyle={{backgroundColor: Theme.colors.navyBlue}}
      />
    );
  }
  renderFlatlistItem(item, index) {
    if (this.viewPager) {
      this.viewPager.setPage(0);
    }
    // Image.getSize(item.front_side_image, (width, height) => {
    //   // calculate image width and height
    //   const scaleFactor = width / screenWidth;
    //   const imageHeight = height / scaleFactor;
    //   this.setState(
    //     { imgWidth: screenWidth - 20, imgHeight: imageHeight },
    //     () => console.log(this.state.imgWidth)
    //   );
    // });
    // const { imgWidth, imgHeight } = this.state;
    let position = Animated.divide(this.scrollX, screenWidth);
    let photos = [
      {uri: item.front_side_image},
      {uri: item.back_side_image},
      {uri: item.right_side_image},
      {uri: item.left_side_image},
      ,
    ];
    return (
      <View style={{marginTop: 5}}>
        <View
        // style={{
        //   paddingTop: 10,
        //   paddingLeft: 10,
        //   paddingRight: 10,
        //   paddingBottom: 5
        // }}
        >
          {/* <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { x: this.scrollX } } }
            ])}
            scrollEventThrottle={16}
          >
            {photos.map((source, i) => {
              return (
                <ImageBackground
                  key={i}
                  style={{
                    height: this.state.imgHeight,
                    width: this.state.imgWidth,
                    aspectRatio: 1.2
                  }}
                  source={source}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      left: 120,
                      right: 120,
                      position: "absolute",
                      bottom: 20
                    }}
                  >
                    {photos.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                      });
                      return (
                        <Animated.View
                          key={i}
                          style={{
                            opacity,
                            height: 10,
                            width: 10,
                            backgroundColor: "#002248",
                            margin: 8,
                            borderRadius: 5
                          }}
                        />
                      );
                    })}
                  </View>
                </ImageBackground>
              );
            })}
          </ScrollView> */}
          <IndicatorViewPager
            ref={viewPager => {
              this.viewPager = viewPager;
            }}
            style={{height: screenHeight / 2.5}}
            indicator={this._renderDotIndicator()}
            initialPage={0}>
            {photos.map((source, i) => {
              return (
                <View
                  key={i}
                  // backgroundColor={Theme.colors.navyBlue}
                >
                  <Image
                    source={source}
                    style={{
                      height: screenHeight / 2.5,
                      // width: screenWidth
                      marginLeft: 5,
                      marginRight: 5,
                    }}
                  />
                </View>
              );
            })}
          </IndicatorViewPager>
        </View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <FlatList
            extraData={this.state}
            data={this.props.list}
            // data={this.state.details} //array of data to create list
            keyExtractor={(item, index) => item.id + item.lot}
            renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // slide: {
  //   height: screenHeight / 3,
  //   width: screenWidth,
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   backgroundColor: "white",
  //   padding: 10
  // },
  mainContainer: {
    flex: 1,
    backgroundColor: Theme.colors.lightBlue,
  },
  imgView: {
    height: screenHeight / 2.5,
    width: screenWidth,
    // justifyContent: "space-evenly",
    alignItems: 'center',
    backgroundColor: 'white',
    // padding: 10
  },
  middle: {
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 5,
  },
  mid: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    marginRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Theme.colors.black,
    padding: 5,
    // margin: 5,
    fontSize: 18,
  },
  button: {
    width: screenWidth - 30,
    alignItems: 'center',
    backgroundColor: Theme.colors.red,
    margin: 5,
    padding: 15,
  },
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: Theme.colors.fadedBlack,
    margin: 10,
  },
  midLower: {
    backgroundColor: 'white',
    marginTop: 5,
  },
});

const mapStateToProps = state => {
  console.log('list', state.prelogin.preloginDetails);
  return {
    list: state.prelogin.preloginDetails,
    loading: state.prelogin.loading,
  };
};

export default connect(
  mapStateToProps,
  {},
)(ImageComponent);
