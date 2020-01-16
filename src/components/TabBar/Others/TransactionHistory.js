/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getTransactionList,
  deleteTransaction,
  resetDeleteTransaction,
} from '../../../actions/TransactionAction';
import Spinner from '../../common/Utility/Spiner';
import Theme from '../../common/Utility/Colors';
import Swipeout from 'react-native-swipeout';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: [],
      activeRow: null,
      transaction_id: '',
      isRefreshing: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.props.getTransactionList();
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({formData: nextProps.data});
    }
  }
  swipeBtns = [
    {
      component: (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <Image
            source={require('../../../../images/ic_delete_white.png')}
            style={{
              height: screenHeight * 0.05,
              width: screenWidth * 0.1,
            }}
          />
        </View>
      ),
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        // console.log('Deleting Row with Id ', this.state.activeRow);
        this.onDeleteTransaction(
          // this.state.activeRow,
          this.state.transaction_id,
        );
      },
    },
  ];
  removeItem = (items, i) =>
    items.slice(0, i).concat(items.slice(i + 1, items.length));

  onDeleteTransaction = transaction_id => {
    this.props.deleteTransaction(transaction_id);
  };
  onSwipeOpen(rowId, direction, transaction_id) {
    if (typeof direction !== 'undefined') {
      this.setState({activeRow: rowId, transaction_id});
      console.log('Active Row', rowId);
    }
  }
  renderFlatlistItem(item, index) {
    return (
      <Swipeout
        right={this.swipeBtns}
        close={this.state.activeRow !== index}
        rowID={index}
        sectionId={1}
        autoClose={true}
        onOpen={(secId, rowId, direction) =>
          this.onSwipeOpen(rowId, direction, item.id)
        }>
        <View style={{flex: 1, marginBottom: 5, marginTop: 5}}>
          <View
            style={{
              flex: 1,
              padding: 5,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 0.1,
                // justifyContent: "flex-start",
                alignItems: 'center',
                padding: 5,
              }}>
              {item.status === 'Credit purchased' ? (
                <Image
                  source={require('../../../../images/ic_bought.png')}
                  style={{width: 20, height: 20, marginRight: 2}}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require('../../../../images/ic_transfer.png')}
                  style={{width: 20, height: 20, marginRight: 2}}
                  resizeMode="contain"
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.6,
                justifyContent: 'flex-start',
                marginRight: 2,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  marginTop: 5,
                  // fontFamily: 'Qanelas-SemiBold',
                }}>
                {item.status}
              </Text>
              {item.status === 'Vehicle published' ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    color: 'black',
                    // fontFamily: 'Qanelas-Light',
                  }}>
                  Number of Credit Consumed:
                </Text>
              ) : item.status === 'Credit purchased' ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    color: 'black',
                    // fontFamily: 'Qanelas-Light',
                  }}>
                  Number of Purchases:
                </Text>
              ) : item.status === 'Credit transferred' ? (
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 5,
                    color: 'black',
                    // fontFamily: 'Qanelas-Light',
                  }}>
                  Number of Transfers:
                </Text>
              ) : null}
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  marginTop: 5,
                  // fontFamily: 'Qanelas-Light',
                }}>
                Voucher id:
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 0.3,
                justifyContent: 'flex-start',
                marginLeft: 2,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  marginTop: 5,
                  // fontFamily: 'Qanelas-Light',
                }}>
                {item.date}
              </Text>
              {item.number_of_credits === 0 ? (
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    marginTop: 5,
                    // fontFamily: 'Qanelas-Light',
                  }}>
                  Promotion
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    marginTop: 5,
                    // fontFamily: 'Qanelas-Light',
                  }}>
                  {item.number_of_credits}
                </Text>
              )}
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  marginTop: 5,
                  // fontFamily: 'Qanelas-Light',
                }}>
                {item.transaction_id}
              </Text>
            </View>
          </View>
          {/* <View style={styles.lineStyle} /> */}
        </View>
      </Swipeout>
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };
  onRefresh() {
    this.setState({isRefreshing: true});
    this.props.getTransactionList();
    if (this.props.loading === false) {
      this.setState({isRefreshing: false});
    }
  }
  deleteSuccessAlert = () => {
    let filteredData = this.removeItem(
      this.state.formData,
      this.state.activeRow,
    );
    this.setState({formData: []}, () => {
      this.setState({formData: filteredData}, () => {
        console.log('Row deleted.', this.state.activeRow);
        this.props.resetDeleteTransaction();
      });
    });
    // Alert.alert(
    //   'Success!',
    //   'Transaction deleted.',
    //   [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         this.props.resetDeleteTransaction();
    //       },
    //     },
    //   ],
    //   {cancelable: false},
    // );
  };
  deleteFailAlert = () => {
    Alert.alert(
      'Failed!',
      'Try again',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.resetDeleteTransaction();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    return (
      <View style={{flex: 1}}>
        {this.props.loading ? <Spinner /> : null}
        {this.props.transaction_delete_success === false ? (
          <View>{this.deleteSuccessAlert()}</View>
        ) : null}
        {/* {this.props.transaction_delete_error === true ? (
          <View>{this.deleteFailAlert()}</View>
        ) : null} */}
        {/* <View style={{paddingTop: 15}}> */}
        <FlatList
          extraData={this.state}
          data={this.state.formData}
          keyExtractor={(item, index) => item.id + item.transaction_id}
          renderItem={({item, index}) => this.renderFlatlistItem(item, index)}
          ItemSeparatorComponent={this.renderSeparator}
          refreshing={this.state.isRefreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 10,
  },
});

const mapStateToProps = state => {
  console.log('transaction history', state.transaction.transaction_list);
  console.log('delete message', state.transaction.transaction_delete_success);
  return {
    loading: state.transaction.loading,
    data: state.transaction.transaction_list,
    transaction_delete_success: state.transaction.transaction_delete_success,
    transaction_delete_error: state.transaction.transaction_delete_error,
  };
};

export default connect(
  mapStateToProps,
  {getTransactionList, deleteTransaction, resetDeleteTransaction},
)(TransactionHistory);
